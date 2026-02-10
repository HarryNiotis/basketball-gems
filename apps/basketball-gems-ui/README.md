# Basketball Gems UI

A Next.js 16 application (App Router) for browsing Euroleague basketball data and chatting with an AI assistant about Euroleague topics.

## Tech Stack

- **Next.js 16** — App Router with React Server Components
- **Tailwind CSS v4** — Utility-first styling
- **shadcn/ui** — Pre-built accessible components (Card, Table, Sidebar, ScrollArea, Button, etc.)
- **Apollo Client** — GraphQL queries via `@apollo/client-integration-nextjs` for both RSC and client components
- **Auth0** — Authentication with `@auth0/nextjs-auth0`
- **Vercel AI SDK** — Streaming chat via `ai` and `@ai-sdk/react`
- **LangChain + MongoDB Atlas** — Vector store retrieval for RAG-powered chatbot responses

## Pages

| Route | Description |
|---|---|
| `/` | Landing page with Auth0 login |
| `/dashboard` | Home — navigation cards for Teams, Standings, and AI Chat |
| `/teams` | Grid of all Euroleague teams fetched from the public API |
| `/teams/[code]` | Team detail with roster info and game history |
| `/standings` | Current season standings table, fetched via the GraphQL layer |
| `/chat` | AI chatbot for Euroleague questions |

## Data Sources

- **Public Euroleague REST API** — Teams, games, rounds, and standings are fetched server-side using `fetch`.
- **GraphQL layer** — Standings are queried via Apollo Client against the companion `basketball-graphql` Apollo Server.

## AI Chatbot

The `/chat` page uses the **Vercel AI SDK** (`useChat` on the client, `streamText` on the server) to provide a streaming conversational interface.

The API route (`app/api/chat/route.ts`) is configured with:

- **OpenAI GPT-5** as the language model
- A **tool** called `basketball` that performs similarity search against a **MongoDB Atlas Vector Store** (populated by the `basketball-rag-node` pipeline)
- A system prompt specialised in Euroleague basketball, instructing the model to use retrieved context from blog posts when available

## Running

```sh
# Development
npx nx dev basketball-gems-ui

# Production build
npx nx build basketball-gems-ui

# Start production server
npx nx start basketball-gems-ui
```
