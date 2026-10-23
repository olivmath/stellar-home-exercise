import asyncio
import json
from pathlib import Path

from edge_tts import Communicate


ROOT = Path(__file__).resolve().parents[1]
TEXT = ROOT / "public/audio/narration/ethereum-script.txt"
AUDIO = ROOT / "public/audio/narration/ethereum-narration.mp3"
TIMESTAMPS = ROOT / "src/modules/ethereum/audioTimestamps.json"


async def main() -> None:
    communicate = Communicate(
        TEXT.read_text(),
        voice="en-US-GuyNeural",
        rate="-4%",
        boundary="SentenceBoundary",
    )
    audio = bytearray()
    sentences = []
    async for chunk in communicate.stream():
        if chunk["type"] == "audio":
            audio.extend(chunk["data"])
        elif chunk["type"] == "SentenceBoundary":
            sentences.append({
                "startSec": chunk["offset"] / 10_000_000,
                "durationSec": chunk["duration"] / 10_000_000,
                "text": chunk["text"],
            })
    AUDIO.write_bytes(audio)
    TIMESTAMPS.write_text(json.dumps({"durationSec": sentences[-1]["startSec"] + sentences[-1]["durationSec"], "sentences": sentences}, indent=2) + "\n")
    print(f"wrote {AUDIO} and {TIMESTAMPS} ({len(sentences)} sentence marks)")


asyncio.run(main())
