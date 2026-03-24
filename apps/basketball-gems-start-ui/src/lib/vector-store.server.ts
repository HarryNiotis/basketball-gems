import { OpenAIEmbeddings } from '@langchain/openai';
import { MongoDBAtlasVectorSearch } from '@langchain/mongodb';
import { MongoClient } from 'mongodb';

const embeddings = new OpenAIEmbeddings({
  model: 'text-embedding-3-small',
});

const client = new MongoClient(process.env.MONGODB_ATLAS_URI || '');
const collection = client
  .db(process.env.MONGODB_ATLAS_DB_NAME)
  .collection(process.env.MONGODB_ATLAS_COLLECTION_NAME || 'basketball_blogs');

export const vectorStore = new MongoDBAtlasVectorSearch(embeddings, {
  collection,
  indexName: 'vector_search',
  textKey: 'text',
  embeddingKey: 'embedding',
});
