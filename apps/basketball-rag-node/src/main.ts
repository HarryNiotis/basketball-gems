import dotenv from 'dotenv';
import { initStore } from './store';

dotenv.config();

async function main() {
  console.log('Starting the basketball RAG node...');

  await initStore();

  console.log('Basketball RAG node is ready to handle queries.');
}

main();
