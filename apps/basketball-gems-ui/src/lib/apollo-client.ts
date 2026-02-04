// Apollo Client configuration for Next.js App Router
// Supports both Server Components (RSC) and Client Components

import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { registerApolloClient } from '@apollo/client-integration-nextjs';

// GraphQL endpoint - configure this in your environment variables
const GRAPHQL_ENDPOINT = process.env.GRAPHQL_URL;

/**
 * Creates an Apollo Client instance for server-side usage
 * This is used by React Server Components
 */
function makeClient() {
  const httpLink = new HttpLink({
    uri: GRAPHQL_ENDPOINT,
    // Include credentials if your GraphQL server requires authentication
    // credentials: 'include',
    // You can add custom headers here
    headers: {
      // 'Authorization': `Bearer ${process.env.API_TOKEN}`,
    },
    // Disable fetch cache for fresh data on each request
    fetchOptions: {
      cache: 'no-store',
    },
  });

  return new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            // Configure cache policies for specific queries
            teams: {
              merge(existing, incoming) {
                return incoming;
              },
            },
            games: {
              merge(existing, incoming) {
                return incoming;
              },
            },
          },
        },
        Team: {
          keyFields: ['code'],
        },
        Game: {
          keyFields: ['id'],
        },
        TeamStanding: {
          keyFields: ['club', ['code']],
        },
      },
    }),
    link: httpLink,
    defaultOptions: {
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
    },
  });
}

/**
 * Registered Apollo Client for React Server Components
 * Use getClient() in your server components to get a client instance
 */
export const { getClient } = registerApolloClient(() => makeClient());

/**
 * Export makeClient for use in other contexts if needed
 */
export { makeClient };
