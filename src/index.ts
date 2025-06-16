import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const MEMBANK_API_URL = process.env.MEMBANK_API_URL ?? '';

console.log(`Using MEMBANK_API_URL: ${MEMBANK_API_URL}`);
