import 'cheerio';
import * as cheerio from 'cheerio';
import { CheerioWebBaseLoader } from '@langchain/community/document_loaders/web/cheerio';
import { OpenAIEmbeddings } from '@langchain/openai';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { MongoDBAtlasVectorSearch } from '@langchain/mongodb';
import { MongoClient } from 'mongodb';
import type { Document } from '@langchain/core/documents';

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
  console.log('Initializing vector store with basketball blog data...');

  const baseUrl = 'https://www.gazzetta.gr';
  const blogListUrl = `${baseUrl}/basketball/euroleague/bloggers`;

  // Step 1: Fetch the blog list page to extract article links
  const response = await fetch(blogListUrl);
  const html = await response.text();
  const $ = cheerio.load(html);

  // Step 2: Extract all article links using the CSS selector
  const linkSelector = 'article.list-article .list-article__info h2 a';

  const articleLinks: string[] = [];
  $(linkSelector).each((_, element) => {
    const href = $(element).attr('href');
    if (href) {
      // Handle relative URLs
      const fullUrl = `${baseUrl}${href}`;
      articleLinks.push(fullUrl);
    }
  });

  console.log(`Found ${articleLinks.length} article links`);

  // Step 3: Load each article page using CheerioWebBaseLoader
  const allDocs: Document[] = [];

  for (const articleUrl of articleLinks) {
    try {
      console.log(`Loading article: ${articleUrl}`);
      const loader = new CheerioWebBaseLoader(articleUrl, {
        selector: 'div.content.is-relative > p', // Adjust selector for article content
      });
      const docs = await loader.load();

      // Add the source URL to metadata
      docs.forEach((doc) => {
        doc.metadata.source = articleUrl;
      });

      allDocs.push(...docs);
    } catch (error) {
      console.error(`Failed to load article ${articleUrl}:`, error);
    }
  }

  console.log(
    `Loaded ${allDocs.length} documents from ${articleLinks.length} articles`,
  );

  //Step 4: Split documents into chunks
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });
  const allSplits = await splitter.splitDocuments(allDocs);
  console.log(`Split into ${allSplits.length} sub-documents`);

  // Step 5: Add to vector store
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
