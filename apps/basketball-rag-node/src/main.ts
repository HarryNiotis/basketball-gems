import { ChatOpenAI, OpenAIEmbeddings } from '@langchain/openai';
import { MemoryVectorStore } from '@langchain/classic/vectorstores/memory';
import 'cheerio';
import { CheerioWebBaseLoader } from '@langchain/community/document_loaders/web/cheerio';
import dotenv from 'dotenv';

dotenv.config();

async function main() {
  const model = new ChatOpenAI({
    model: 'gpt-5-nano',
    apiKey: process.env.OPENAPI_KEY,
  });

  const embeddings = new OpenAIEmbeddings({
    model: 'text-embedding-3-small',
  });

  const vectorStore = new MemoryVectorStore(embeddings);

  const pTagSelector = 'p';
  const cheerioLoader = new CheerioWebBaseLoader(
    'https://www.gazzetta.gr/basketball/euroleague/2505200/filtro-boytigmeno-ston-idrota/',
    {
      selector: pTagSelector,
    },
  );

  const docs = await cheerioLoader.load();

  console.assert(docs.length === 1);
  console.log(`Total characters: ${docs[0].pageContent.length}`);
}

main();
