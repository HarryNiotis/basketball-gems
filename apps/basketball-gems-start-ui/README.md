# Basketball Gems Start UI

TanStack Start version of the Basketball Gems frontend.

## Commands

- `pnpm nx dev basketball-gems-start-ui`
- `pnpm nx build basketball-gems-start-ui`
- `pnpm nx start basketball-gems-start-ui`

## Environment

- `VITE_GRAPHQL_URL` for the public GraphQL endpoint used by Apollo Client.
- `SESSION_SECRET` for the demo cookie session used by the scaffold.
- `OPENAI_API_KEY`, `MONGODB_ATLAS_URI`, `MONGODB_ATLAS_DB_NAME`, `MONGODB_ATLAS_COLLECTION_NAME` to enable the chat route.

The scaffold uses a lightweight email-based demo session so the route guard and navigation flow are already in place. It is intended to be replaced with the real auth provider in a later iteration.
