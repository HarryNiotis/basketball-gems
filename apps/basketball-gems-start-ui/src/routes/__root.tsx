/// <reference types="vite/client" />

import type { ApolloClientIntegration } from '@apollo/client-integration-tanstack-start';
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import type { ReactNode } from 'react';
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary';
import { NotFound } from '~/components/NotFound';
import { fetchCurrentUser } from '~/lib/session';
import appCss from '~/styles/app.css?url';

export const Route =
  createRootRouteWithContext<ApolloClientIntegration.RouterContext>()({
    beforeLoad: async () => ({
      user: await fetchCurrentUser(),
    }),
    head: () => ({
      meta: [
        {
          charSet: 'utf-8',
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        {
          title: 'Basketball Gems Start UI',
        },
        {
          name: 'description',
          content:
            'TanStack Start version of Basketball Gems with Apollo-driven EuroLeague pages.',
        },
      ],
      links: [{ rel: 'stylesheet', href: appCss }],
    }),
    errorComponent: (props) => (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    ),
    notFoundComponent: () => (
      <RootDocument>
        <NotFound />
      </RootDocument>
    ),
    component: RootComponent,
  });

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        {import.meta.env.DEV ? (
          <TanStackRouterDevtools position="bottom-right" />
        ) : null}
        <Scripts />
      </body>
    </html>
  );
}
