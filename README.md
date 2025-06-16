# memflow-mcp

A Model Context Protocol (MCP) server that enables Large Language Models to store and retrieve persistent memories with intelligent search capabilities.

## Description

MemFlow MCP provides seamless integration between LLMs like Claude and your Memory Bank API, allowing for persistent memory management across conversations. The server supports adding memories with tags, semantic search, and flexible memory retrieval.

## Installation

```bash
npx memflow-mcp
```

Or install globally:

```bash
npm install -g memflow-mcp
```

## Configuration

### Environment Variables

```bash
MEMBANK_API_URL=http://localhost:3000
MEMBANK_API_KEY=your-api-key  # optional
```

### Claude Desktop

See [CLAUDE_DESKTOP_CONFIG.md](./CLAUDE_DESKTOP_CONFIG.md) for detailed configuration options for different Node.js installations.

**Quick start** - Find your npx path and use it:

```bash
which npx
```

Then configure Claude Desktop:

```json
{
  "mcpServers": {
    "memflow": {
      "command": "/your/npx/path",
      "args": ["-y", "memflow-mcp"],
      "env": {
        "MEMBANK_API_URL": "http://localhost:3000"
      }
    }
  }
}
```

## Available Tools

- **addMemory** - Store content with optional tags
- **searchMemory** - Search memories with semantic matching
- **listMemories** - Browse stored memories with filtering

## Usage

Once configured, you can use these commands in Claude:

```
Add this to memory: "Claude can now remember things across conversations"

Search my memories for "conversations"

List my recent memories
```

## Requirements

- Node.js 18+
- Memory Bank API server running

## Troubleshooting

### "spawn npx ENOENT" Error

1. **Find your npx path**:

   ```bash
   which npx
   ```

   Use this full path in your Claude Desktop config.

2. **Common paths**:

   - asdf: `/Users/username/.asdf/shims/npx`
   - Homebrew (Intel): `/usr/local/bin/npx`
   - Homebrew (Apple Silicon): `/opt/homebrew/bin/npx`
   - System: `/usr/bin/npx`

3. **Test it works**:
   ```bash
   /your/npx/path -y memflow-mcp
   ```

### "Unexpected token" JSON Errors

- Ensure `MEMBANK_API_URL` is set correctly
- Check that your Memory Bank API is running
- Restart Claude Desktop after config changes

## API Endpoints

Your Memory Bank API should support:

- `POST /memory` - Create memory
- `GET /memory` - List/search memories

## License

MIT
