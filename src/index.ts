import dotenv from 'dotenv';
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Load environment variables from .env file
dotenv.config();

const MEMBANK_API_URL = process.env.MEMBANK_API_URL ?? '';

console.log(`Using MEMBANK_API_URL: ${MEMBANK_API_URL}`);

// Create your server
const server = new McpServer({
  name: "membank-mcp",
  version: "1.0.0"
});

// Add a simple tool (like a calculator)
server.tool("add", 
  { a: z.number(), b: z.number() },
  async ({ a, b }) => ({
    content: [{ type: "text", text: String(a + b) }]
  })
);

// Connect it to work with the terminal
const transport = new StdioServerTransport();
await server.connect(transport);