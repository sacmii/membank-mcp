# Memory Bank MCP Server

A Model Context Protocol (MCP) server that provides seamless integration with your Memory Bank API. This server allows Large Language Models like Claude to store and retrieve persistent memories using semantic search capabilities.

## 🚀 Features

- **Add Memory**: Store content with optional tags for organization
- **Search Memory**: Find relevant memories using semantic search
- **List Memories**: Browse stored memories with filtering options
- **Tag Support**: Organize memories with tags
- **Error Handling**: Graceful error handling with helpful messages

## 📋 Prerequisites

- Node.js 18+ 
- pnpm (or npm/yarn)
- Memory Bank API running (your backend service)

## 🛠️ Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd /Users/aswinlakshmanan/workspace/agentic/membank-mcp
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Build the project:**
   ```bash
   pnpm run build
   ```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file or set these environment variables:

```bash
# Required: Your Memory Bank API URL
MEMBANK_API_URL=http://localhost:3000

# Optional: API key if your backend requires authentication
MEMBANK_API_KEY=your-api-key-here
```

### For Claude Desktop

Add this configuration to your Claude Desktop config file:

**On macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
**On Windows:** `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "membank": {
      "command": "node",
      "args": ["/Users/aswinlakshmanan/workspace/agentic/membank-mcp/dist/index.js"],
      "env": {
        "MEMBANK_API_URL": "http://localhost:3000",
        "MEMBANK_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

## 🎯 Usage

### Available Tools

#### 1. `addMemory`
Store new content in your memory bank.

**Parameters:**
- `content` (string, required): The content to store
- `tags` (array of strings, optional): Tags for organization

**Example:**
```
Add this to memory: "Today I learned that TypeScript has great support for MCP servers" with tags ["learning", "typescript"]
```

#### 2. `searchMemory`
Find relevant memories using semantic search.

**Parameters:**
- `query` (string, required): Search query
- `tags` (array of strings, optional): Filter by specific tags
- `startDate` (string, optional): Filter from date (ISO format)
- `endDate` (string, optional): Filter until date (ISO format)  
- `limit` (number, optional): Maximum results to return

**Example:**
```
Search my memories for "TypeScript learning" with tags ["typescript"] and limit 5 results
```

#### 3. `listMemories`
Browse all stored memories with optional filtering.

**Parameters:**
- `tags` (array of strings, optional): Filter by specific tags
- `limit` (number, optional): Maximum results to return

**Example:**
```
List all my memories with tag "learning" from the last week
```

## 🏃‍♂️ Running the Server

### Development Mode
```bash
pnpm run dev
```

### Production Mode
```bash
pnpm run build
pnpm start
```

### Testing the Server
You can test the server using the MCP Inspector:
```bash
npx @modelcontextprotocol/inspector node dist/index.js
```

## 🔧 Development

### Project Structure
```
membank-mcp/
├── src/
│   └── index.ts          # Main MCP server implementation
├── dist/                 # Compiled JavaScript output
├── package.json
├── tsconfig.json
└── README.md
```

### Building
```bash
pnpm run build
```

### Development Scripts
- `pnpm run dev` - Run in development mode with hot reload
- `pnpm run build` - Compile TypeScript to JavaScript
- `pnpm start` - Run the compiled server

## 🐛 Troubleshooting

### Common Issues

1. **"Failed to add memory" error**
   - Check if your Memory Bank API is running
   - Verify the `MEMBANK_API_URL` is correct
   - Ensure API authentication is properly configured

2. **"Connection refused" error**
   - Make sure your Memory Bank API server is running
   - Check if the URL and port are correct

3. **"Tool not found" error in Claude**
   - Restart Claude Desktop after configuration changes
   - Check the path to the compiled `index.js` file is correct
   - Verify the config file syntax is valid JSON

### Debug Mode

To see detailed logs, run the server with:
```bash
NODE_ENV=development node dist/index.js
```

## 📝 API Endpoints Expected

Your Memory Bank API should support these endpoints:

- `POST /api/memories` - Create new memory
- `GET /api/memories/search` - Search memories
- `GET /api/memories` - List memories

### Expected Request/Response Format

**Add Memory:**
```bash
POST /api/memories
Content-Type: application/json

{
  "content": "Memory content here",
  "tags": ["tag1", "tag2"]
}
```

**Search/List Response:**
```json
{
  "memories": [
    {
      "id": "uuid",
      "content": "Memory content",
      "tags": ["tag1", "tag2"],
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Verify your Memory Bank API is working correctly
3. Check Claude Desktop logs for additional error details
4. Create an issue with detailed error messages and configuration

---

**Happy Memory Banking! 🧠✨**
