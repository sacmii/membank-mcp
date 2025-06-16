import { Server } from '@modelcontextprotocol/sdk/server/index';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio';
import { ListToolsRequestSchema, Tool } from '@modelcontextprotocol/sdk/types';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const MEMBANK_API_URL = process.env.MEMBANK_API_URL ?? '';

console.log(`Using MEMBANK_API_URL: ${MEMBANK_API_URL}`);

const server = new Server({
  name: 'membank-mcp',
  version: '1.0.0',
});

const tools: Tool[] = [
  {
    name: 'addMemory',
    description: 'Add a memory to the bank',
    inputSchema: {
      type: 'object',
      properties: {
        content: {
          type: 'string',
          description: 'The content to store in memory',
        },
        tags: {
          type: 'array',
          items: { type: 'string' },
          description: 'Optional tags for organizing the memory',
        },
      },
      required: ['content'],
    },
  },
  {
    name: 'searchMemory',
    description: 'Search for a memory in the bank',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Search query to find relevant memories',
        },
        tags: {
          type: 'array',
          items: { type: 'string' },
          description: 'Filter by specific tags',
        },
        limit: {
          type: 'number',
          description: 'Maximum number of results to return',
          default: 10,
        },
      },
      required: ['query'],
    },
  },
];

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools,
}));

const main = async () => {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log('Mempry Bank MCP server running...');
};

// Graceful shutdown on SIGINT
const gracefulShut = async () => {
  await server.close();
  process.exit(0);
};
process.on('SIGINT', gracefulShut);

// Main Process
const onMainError = (error: Error | any) => {
  console.error('Failed to start MCP server:', error);
  process.exit(1);
};
main().catch(onMainError);
