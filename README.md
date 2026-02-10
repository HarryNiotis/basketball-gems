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

## Nx Tasks

Run any target with `npx nx <target> <project>`.

### basketball-api (Python)

| Target | Description |
|---|---|
| `build` | Build the Python package |
| `test` | Run pytest unit tests |
| `lint` | Run flake8 linter |
| `serve` | — *(run manually via Poetry)* |
| `install` | Install Poetry dependencies |

### basketball-api-dotnet (.NET)

| Target | Description |
|---|---|
| `build` | Build the .NET project (Debug) |
| `build:release` | Build in Release configuration |
| `run` | Run the application (`dotnet run`) |
| `watch` | Watch for changes and rebuild/rerun |
| `restore` | Restore NuGet dependencies |
| `clean` | Clean build artifacts |
| `publish` | Publish the application |

### basketball-api-express (Express)

| Target | Description |
|---|---|
| `build` | Webpack production build |
| `serve` | Start the dev server (Node) |
| `test` | Run Jest tests |
| `lint` | Run ESLint |

### basketball-graphql (Apollo Server)

| Target | Description |
|---|---|
| `build` | esbuild bundle |
| `serve` | Start the GraphQL server |
| `test` | Run Jest tests |
| `lint` | Run ESLint |

### basketball-gems-ui (Next.js)

| Target | Description |
|---|---|
| `dev` | Start Next.js dev server |
| `build` | Production build |
| `start` | Start the production server |
| `test` | Run Jest tests |
| `lint` | Run ESLint |

### basketball-rag-node (RAG Pipeline)

| Target | Description |
|---|---|
| `build` | esbuild bundle |
| `start` | Run the pipeline |
| `lint` | Run ESLint |

Run `npx nx graph` to visualise the project dependency graph.
