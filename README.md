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

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "memflow": {
      "command": "npx",
      "args": ["memflow-mcp"],
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

## API Endpoints

Your Memory Bank API should support:

- `POST /memory` - Create memory
- `GET /memory` - List/search memories

## License

MIT
