# Basketball RAG Node

An intelligent Retrieval-Augmented Generation (RAG) application built with Node.js that leverages OpenAI, LangChain, LangGraph, and MongoDB to provide context-aware answers about Euroleague basketball.

## Overview

This application implements a RAG pipeline that combines:

- **Document Ingestion**: Automatically scrapes Euroleague basketball blog articles from Gazzetta.gr
- **Semantic Understanding**: Converts documents into vector embeddings using OpenAI's text-embedding-3-small model
- **Vector Storage**: Persists embeddings in MongoDB Atlas Vector Search for efficient similarity retrieval
- **Intelligent Retrieval**: Uses LangChain agents to retrieve relevant context and generate informed responses
- **Conversational AI**: Integrates OpenAI's language models to answer user queries with basketball context

## Architecture

### Core Components

#### 1. **Vector Store (`store.ts`)**
Manages the entire data pipeline for building the RAG knowledge base:

```
Web Scraping → Document Loading → Text Splitting → Embedding Generation → Vector Storage
```

- **Data Source**: Gazzetta.gr basketball blog articles
- **Web Loader**: CheerioWebBaseLoader extracts article content
- **Text Splitting**: RecursiveCharacterTextSplitter chunks documents (1000 tokens, 200 overlap)
- **Embeddings**: OpenAI's text-embedding-3-small (1536-dimensional vectors)
- **Vector DB**: MongoDB Atlas Vector Search for similarity queries

#### 2. **Application Entry Point (`main.ts`)**
Node.js application that orchestrates the system:

- Loads environment configuration
- Initializes the vector store with blog data

### 3. **LangChain Agent (`agent.ts`)**
Defines a LangChain agent that: 
- Accepts user queries
- Retrieves relevant documents from the vector store
- Generates context-aware responses using OpenAI's language models  
This is an area mainly for testing and development. The RAG pipeline is used on the NextJS frontend. 

## Technology Stack

| Component | Technology |
|-----------|-----------|
| **Language Models** | OpenAI (GPT, Embeddings) |
| **Embedding Model** | text-embedding-3-small (1536 dims) |
| **Framework** | LangChain + LangGraph |
| **Vector Store** | MongoDB Atlas Vector Search |
| **Web Scraping** | CheerioWebBaseLoader |
| **Runtime** | Node.js with TypeScript |

## Key Features

### 🔍 **Intelligent Retrieval**
- Semantic similarity search using vector embeddings
- Multi-document context retrieval with source attribution
- Configurable chunk overlap for contextual continuity

### 📚 **Automated Knowledge Base**
- Periodic web scraping of basketball blog content
- Automatic document chunking and embedding generation
- Efficient vector indexing for sub-millisecond retrieval

### 🤖 **AI-Powered Responses**
- LangChain agents with tool integration
- Context-aware answer generation
- Streaming response support for real-time interactions

### 🌐 **Multilingual Support**
- Handles Greek language content (e.g., "Πες μου για τον Παναθηναϊκό")
- OpenAI embeddings support multiple languages

## Usage

### Setup

1. **Environment Variables**
   ```bash
   OPENAI_API_KEY=sk_...
   MONGODB_ATLAS_URI=mongodb+srv://...
   MONGODB_ATLAS_DB_NAME=basketball
   MONGODB_ATLAS_COLLECTION_NAME=documents
   MONGODB_BASKETBALL_VECTOR_INDEX_NAME=basketball-vector-search
   ```

2. **Install Dependencies**
   ```bash
   pnpm install
   ```

3. **Initialize Vector Store**
   ```bash
   # Builds and starts the application
   nx serve basketball-rag-node
   
   # Or build for production
   nx build basketball-rag-node
   node dist/apps/basketball-rag-node/main.js
   ```

### Querying the Agent

Example code:

```typescript
const agentInputs = {
  messages: [
    { 
      role: 'user', 
      content: 'Πες μου για τον Παναθηναϊκό' // "Tell me about Panathinaikos"
    },
  ],
};

const stream = await agent.stream(agentInputs, {
  streamMode: 'values',
});

for await (const step of stream) {
  const lastMessage = step.messages[step.messages.length - 1];
  console.log(`[${lastMessage.role}]: ${lastMessage.content}`);
}
```

## Data Pipeline Details

### Document Processing Workflow

1. **Scraping**: Fetches blog article list from `https://www.gazzetta.gr/basketball/euroleague/bloggers`
2. **Content Extraction**: Extracts article text using CSS selectors
3. **Chunking**: Splits documents into 1000-character chunks with 200-character overlap
4. **Embedding**: Converts text chunks to 1536-dimensional vectors
5. **Indexing**: Stores vectors in MongoDB with metadata (source URL, content)
6. **Search**: Retrieves top 2 documents for each user query

### Vector Index Configuration

MongoDB Vector Search index optimized for:
- **Similarity Metric**: Cosine distance
- **Dimensions**: 1536 (OpenAI embedding size)
- **Index Field**: `embedding`
- **Text Field**: `text`

## Development

### Project Structure

```
src/
├── main.ts      # Application entry point
├── agent.ts     # LangChain agent configuration
├── store.ts     # Vector store initialization & data pipeline
└── assets/      # Static resources
```

### Available Commands

```bash
# Development with hot reload
nx serve basketball-rag-node

# Build for production
nx build basketball-rag-node

# Run production build
node dist/apps/basketball-rag-node/main.js
```

## Future Enhancements

- [ ] Interactive CLI for real-time agent queries
- [ ] REST API endpoint for agent interactions
- [ ] Support for multiple data sources beyond blogs
- [ ] Document refresh scheduling
- [ ] Chat history management
- [ ] Query analytics and logging
- [ ] Multi-turn conversation context
- [ ] Custom prompt templates per query type

## Limitations & Considerations

- Initial data load scrapes all available articles (speed depends on blog size)
- Vector search limited to 2 top documents per query (configurable)
- Cost implications with OpenAI API usage (embeddings + model calls)
- Requires valid MongoDB Atlas Vector Search account
- Language-dependent performance (optimized for English/Greek content)

## Related Applications

This RAG node integrates with other services in the basketball-gems monorepo:

- **basketball-graphql**: GraphQL API for structured basketball data
- **basketball-api**: Django backend for core API services
- **basketball-api-express**: Express.js alternative API
- **basketball-gems-ui**: Frontend application

## License

See repository root for license information.
