'use client';

// Apollo Provider for Client Components
// Wrap your application with this provider to use Apollo Client hooks

import { HttpLink } from '@apollo/client';
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from '@apollo/client-integration-nextjs';

// GraphQL endpoint - this will be available in the browser
const GRAPHQL_ENDPOINT =
  process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:4000/graphql';

/**
 * Creates an Apollo Client for client-side usage
 * This runs in the browser
 */
function makeClient() {
  const httpLink = new HttpLink({
    uri: GRAPHQL_ENDPOINT,
    // Include credentials if needed for authentication
    // credentials: 'include',
  });

  return new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
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
  });
}

/**
 * Apollo Provider component for wrapping Client Components
 *
 * Usage in layout.tsx:
 * ```tsx
 * import { ApolloWrapper } from '@/lib/apollo-provider';
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         <ApolloWrapper>{children}</ApolloWrapper>
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 */
export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
