import dotenv from 'dotenv';
import { initStore } from './store';
import { agent } from './agent';
import readline from 'readline/promises';

dotenv.config();

async function main() {
  console.log('Starting the basketball RAG node...');
  // const rl = readline.createInterface({
  //   input: process.stdin,
  //   output: process.stdout,
  // });

  await initStore();

  // const inputMessage = 'Πες μου για τον Παναθηναϊκό';

  // const agentInputs = {
  //   messages: [{ role: 'user', content: inputMessage }],
  // };

  // const stream = await agent.stream(agentInputs, {
  //   streamMode: 'values',
  // });

  // for await (const step of stream) {
  //   console.log({
  //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //     // @ts-expect-error
  //     messages: JSON.stringify(step.messages[step.messages.length - 1]),
  //   });
  //   // const lastMessage = step.messages[step.messages.length - 1];
  //   // console.log(`[${lastMessage.role}]: ${lastMessage.content}`);
  //   console.log('-----\n');
  // }
}

main();
