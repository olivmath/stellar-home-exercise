# Milvus MCP - Setup Rápido

## Pré-requisitos

- Podman (ou Docker)
- Ollama
- Container `milvus-standalone` já criado

## 1. Iniciar os serviços

```bash
# Milvus
podman start milvus-standalone

# Ollama
ollama serve &
```

## 2. Verificar

```bash
# Milvus rodando?
podman ps --filter name=milvus-standalone

# Ollama rodando?
ollama list
```

## 3. Reiniciar o Claude Code

O MCP `@zilliz/claude-context-mcp` é carregado na inicialização. Após ligar Milvus e Ollama, reinicie o Claude Code para ativar as tools de busca semântica.

## 4. Parar os serviços

```bash
podman stop milvus-standalone
pkill ollama
```

## Config

O MCP está em `~/.claude/.mcp.json`:

```json
{
  "mcpServers": {
    "claude-context": {
      "command": "npx",
      "args": ["@zilliz/claude-context-mcp@latest"],
      "env": {
        "EMBEDDING_PROVIDER": "ollama",
        "OLLAMA_BASE_URL": "http://localhost:11434",
        "OLLAMA_MODEL": "nomic-embed-text",
        "MILVUS_ADDRESS": "localhost:19530",
        "MILVUS_TOKEN": ""
      }
    }
  }
}
```
