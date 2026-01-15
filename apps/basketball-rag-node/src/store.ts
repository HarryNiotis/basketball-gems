import 'cheerio';
import { CheerioWebBaseLoader } from '@langchain/community/document_loaders/web/cheerio';
import { OpenAIEmbeddings } from '@langchain/openai';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { MongoDBAtlasVectorSearch } from '@langchain/mongodb';
import { MongoClient } from 'mongodb';

const embeddings = new OpenAIEmbeddings({
  model: 'text-embedding-3-small',
});

const client = new MongoClient(process.env.MONGODB_ATLAS_URI || '');
const collection = client
  .db(process.env.MONGODB_ATLAS_DB_NAME)
  .collection(process.env.MONGODB_ATLAS_COLLECTION_NAME);

export const vectorStore = new MongoDBAtlasVectorSearch(embeddings, {
  collection: collection,
  indexName: process.env.MONGODB_BASKETBALL_VECTOR_INDEX_NAME,
  textKey: 'text',
  embeddingKey: 'embedding',
});

export const initStore = async () => {
  const res = await vectorStore.similaritySearch('Παναθηναϊκός', 1);
  if (res.length > 0) {
    console.log('Vector store already initialized.');
    return;
  }

  console.log('Initializing vector store with basketball blog data...');

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

  collection.createSearchIndex({
    name: process.env.MONGODB_BASKETBALL_VECTOR_INDEX_NAME,
    type: 'vectorSearch',
    definition: {
      fields: [
        {
          type: 'vector',
          path: 'embedding',
          numDimensions: 1536,
          similarity: 'cosine',
        },
      ],
    },
  });
};
