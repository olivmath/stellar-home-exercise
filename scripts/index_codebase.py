"""Index the Stellar codebase into Milvus using Ollama embeddings."""

import os
import glob
import requests
from pymilvus import MilvusClient, DataType, CollectionSchema, FieldSchema

MILVUS_URI = "http://localhost:19530"
COLLECTION = "stellar_codebase"
OLLAMA_URL = "http://localhost:11434/api/embed"
MODEL = "nomic-embed-text"
DIMENSION = 768
MAX_CONTENT_LEN = 4000
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

EXTENSIONS = {".ts", ".tsx", ".js", ".jsx", ".json", ".md", ".css"}
IGNORE_DIRS = {"node_modules", ".git", "dist", "build", ".next", "out", ".firecrawl"}


def get_files(root: str) -> list[str]:
    files = []
    for ext in EXTENSIONS:
        for path in glob.glob(f"{root}/**/*{ext}", recursive=True):
            if not any(d in path.split(os.sep) for d in IGNORE_DIRS):
                files.append(path)
    return sorted(files)


def chunk_file(filepath: str, max_chars: int = 2000) -> list[dict]:
    """Split file into chunks with overlap."""
    rel_path = os.path.relpath(filepath, PROJECT_ROOT)
    try:
        with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
            content = f.read()
    except Exception:
        return []

    if not content.strip():
        return []

    chunks = []
    lines = content.split("\n")
    current_chunk = []
    current_len = 0

    for i, line in enumerate(lines):
        current_chunk.append(line)
        current_len += len(line) + 1

        if current_len >= max_chars:
            chunk_text = "\n".join(current_chunk)
            start_line = i - len(current_chunk) + 2
            chunks.append({
                "filepath": rel_path,
                "start_line": start_line,
                "end_line": i + 1,
                "content": chunk_text[:MAX_CONTENT_LEN],
                "text": f"File: {rel_path} (lines {start_line}-{i + 1})\n\n{chunk_text}",
            })
            current_chunk = current_chunk[-3:]
            current_len = sum(len(l) + 1 for l in current_chunk)

    if current_chunk:
        start_line = len(lines) - len(current_chunk) + 1
        chunk_text = "\n".join(current_chunk)
        chunks.append({
            "filepath": rel_path,
            "start_line": start_line,
            "end_line": len(lines),
            "content": chunk_text[:MAX_CONTENT_LEN],
            "text": f"File: {rel_path} (lines {start_line}-{len(lines)})\n\n{chunk_text}",
        })

    return chunks


def embed(texts: list[str]) -> list[list[float]]:
    results = []
    for text in texts:
        truncated = text[:6000]
        resp = requests.post(OLLAMA_URL, json={"model": MODEL, "input": truncated})
        if resp.status_code != 200:
            print(f"  ERROR {resp.status_code}: {resp.text[:200]}")
            resp.raise_for_status()
        results.append(resp.json()["embeddings"][0])
    return results


def create_collection(client: MilvusClient):
    if client.has_collection(COLLECTION):
        client.drop_collection(COLLECTION)
        print(f"Dropped existing collection '{COLLECTION}'")

    schema = CollectionSchema(fields=[
        FieldSchema("id", DataType.INT64, is_primary=True, auto_id=False),
        FieldSchema("vector", DataType.FLOAT_VECTOR, dim=DIMENSION),
        FieldSchema("filepath", DataType.VARCHAR, max_length=512),
        FieldSchema("start_line", DataType.INT64),
        FieldSchema("end_line", DataType.INT64),
        FieldSchema("content", DataType.VARCHAR, max_length=MAX_CONTENT_LEN + 100),
    ], enable_dynamic_field=False)

    client.create_collection(
        collection_name=COLLECTION,
        schema=schema,
    )

    index_params = client.prepare_index_params()
    index_params.add_index(field_name="vector", metric_type="COSINE", index_type="AUTOINDEX")
    client.create_index(collection_name=COLLECTION, index_params=index_params)
    client.load_collection(COLLECTION)

    print(f"Created collection '{COLLECTION}' (dim={DIMENSION}, metric=COSINE)")


def main():
    client = MilvusClient(uri=MILVUS_URI)
    create_collection(client)

    files = get_files(PROJECT_ROOT)
    print(f"Found {len(files)} files to index")

    all_chunks = []
    for f in files:
        all_chunks.extend(chunk_file(f))
    print(f"Split into {len(all_chunks)} chunks")

    batch_size = 32
    total_inserted = 0

    for i in range(0, len(all_chunks), batch_size):
        batch = all_chunks[i : i + batch_size]
        texts = [c["text"] for c in batch]
        vectors = embed(texts)

        data = []
        for j, (chunk, vec) in enumerate(zip(batch, vectors)):
            data.append({
                "id": i + j,
                "vector": vec,
                "filepath": chunk["filepath"],
                "start_line": chunk["start_line"],
                "end_line": chunk["end_line"],
                "content": chunk["content"],
            })

        client.insert(collection_name=COLLECTION, data=data)
        total_inserted += len(data)
        print(f"  Inserted {total_inserted}/{len(all_chunks)} chunks")

    print(f"\nDone! Indexed {total_inserted} chunks into '{COLLECTION}'")


if __name__ == "__main__":
    main()
