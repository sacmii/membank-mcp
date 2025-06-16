#!/usr/bin/env node
import dotenv from 'dotenv';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import axios from 'axios';

// Load environment variables from .env file
dotenv.config();

const MEMORY_END = (process.env.MEMBANK_API_URL ?? '') + '/memory';

// Create your server
const server = new McpServer({
name: 'memflow-mcp',
version: '1.0.0',
});

server.tool('addMemory', { content: z.string() }, async ({ content }) => {
  try {
    const response = await axios.post(MEMORY_END, { content });
    if (response.status < 200 || response.status >= 300) {
      throw new Error(`Failed to add memory: ${response.statusText}`);
    }
    console.log(`Memory added: ${content}`);
    return { content: [{ type: 'text', text: 'Saved content to memory' }] };
  } catch (error: Error | any) {
    console.error(error);
    return { content: [{ type: 'text', text: `Failed to add memory: ${error?.message}` }] };
  }
});

server.tool('searchMemory', { query: z.string() }, async ({ query }) => {
  try {
    const response = await axios.get(MEMORY_END);
    if (response.status < 200 || response.status >= 300) {
      throw new Error(`Failed to search memory: ${response.statusText}`);
    }
    const allMemories = response.data;
    const filteredMemories = allMemories.filter((memory: any) => {
      const lowerCaseQuery = query.toLowerCase();
      const contentMatches = memory.content.toLowerCase().includes(lowerCaseQuery);
      const tagsMatch = memory.tags.some((tag: string) =>
        tag.toLowerCase().includes(lowerCaseQuery),
      );
      return contentMatches || tagsMatch;
    });
    let responseText = '';
    if (filteredMemories.length > 0) {
      responseText = filteredMemories.map((memory: any) => memory?.content ?? '').join('\n');
    }
    return { content: [{ type: 'text', text: responseText }] };
  } catch (error: Error | any) {
    console.error(error);
    return { content: [{ type: 'text', text: `Failed to search memory: ${error?.message}` }] };
  }
});

// Connect it to work with the terminal
const transport = new StdioServerTransport();
await server.connect(transport);
