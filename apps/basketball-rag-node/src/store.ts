import 'cheerio';
import { Chroma } from '@langchain/community/vectorstores/chroma';
import { CheerioWebBaseLoader } from '@langchain/community/document_loaders/web/cheerio';
import { ChatOpenAI, OpenAIEmbeddings } from '@langchain/openai';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';

const model = new ChatOpenAI({
  model: 'gpt-5-nano',
  openAIApiKey: process.env.OPENAI_API_KEY,
});

const embeddings = new OpenAIEmbeddings({
  model: 'text-embedding-3-small',
});
export const vectorStore = new Chroma(embeddings, {
  collectionName: 'basketball-blogs',
  clientParams: {
    host: 'localhost',
    port: 8000,
  },
});

export const initStore = async () => {
  vectorStore.similaritySearch('Παναθηναϊκός', 1).then((res) => {
    if (res.length > 0) {
      console.log('Vector store already initialized.');
      return;
    }
  });
  const pTagSelector = 'div.content.is-relative > p';
  const cheerioLoader = new CheerioWebBaseLoader(
    'https://www.gazzetta.gr/basketball/euroleague/2505200/filtro-boytigmeno-ston-idrota/',
    {
      selector: pTagSelector,
    },
  );

  const docs = await cheerioLoader.load();

  console.assert(docs.length === 1);
  console.log(`Total characters: ${docs[0].pageContent.length}`);

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });
  const allSplits = await splitter.splitDocuments(docs);
  console.log(`Split blog post into ${allSplits.length} sub-documents.`);

  await vectorStore.addDocuments(allSplits);
};
