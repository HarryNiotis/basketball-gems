import { Chroma } from '@langchain/community/vectorstores/chroma';
import { OpenAIEmbeddings } from '@langchain/openai';

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
