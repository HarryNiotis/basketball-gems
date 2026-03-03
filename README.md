# Basketball Gems

An [Nx](https://nx.dev) monorepo exploring Euroleague basketball data through multiple backend technologies, a GraphQL layer, a Next.js frontend, and a RAG-powered chatbot.

## Projects

### REST APIs (`apps/basketball-api*`)

Three equivalent REST APIs built with different stacks, all backed by a sample basketball database:

| Project | Stack | Path |
|---|---|---|
| **basketball-api** | Python (FastAPI) | `apps/basketball-api` |
| **basketball-api-dotnet** | .NET (ASP.NET Core) | `apps/basketball-api-dotnet` |
| **basketball-api-express** | Node.js (Express + TypeScript) | `apps/basketball-api-express` |

### GraphQL Server (`apps/basketball-graphql`)

An Apollo Server that wraps the public Euroleague APIs, exposing competition, team, and game data through a unified GraphQL schema.

### Next.js Frontend (`apps/basketball-gems-ui`)

A Next.js application that provides:

- Euroleague team stats and standings
- A chatbot interface for asking questions about Euroleague basketball

### RAG Pipeline (`apps/basketball-rag-node`)

A Node.js pipeline that:

1. Scrapes and processes blog posts from a basketball website
2. Creates a vector store from the processed content
3. Serves as the knowledge base used by the chatbot in the frontend

## Nx

Run `npx nx graph` to visualise the project dependency graph.

For available tasks in each project, see the individual project READMEs.
