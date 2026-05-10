import {
  ApolloClient,
  InMemoryCache,
  routerWithApolloClient,
} from '@apollo/client-integration-tanstack-start';
import { HttpLink } from '@apollo/client';
import { createRouter } from '@tanstack/react-router';
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary';
import { NotFound } from '~/components/NotFound';
import { routeTree } from './routeTree.gen';

const graphQlUrl =
  import.meta.env.VITE_GRAPHQL_URL ?? 'http://localhost:5000/graphql';

export function getRouter() {
  const apolloClient = new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            teams: {
              merge(_existing, incoming) {
                return incoming;
              },
            },
            games: {
              merge(_existing, incoming) {
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
    link: new HttpLink({
      uri: graphQlUrl,
    }),
  });

  const router = createRouter({
    routeTree,
    context: {
      ...routerWithApolloClient.defaultContext,
    },
    defaultPreload: 'intent',
    defaultErrorComponent: DefaultCatchBoundary,
    defaultNotFoundComponent: () => <NotFound />,
    scrollRestoration: true,
  });

  return routerWithApolloClient(router, apolloClient);
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
