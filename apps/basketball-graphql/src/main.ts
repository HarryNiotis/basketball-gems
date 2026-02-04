// Basketball GraphQL Server
// Apollo Server acting as BFF for Euroleague API

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs, resolvers } from './schema/index.js';
import { EuroleagueDataSource } from './datasources/index.js';

// Context type
interface Context {
  dataSources: {
    euroleague: EuroleagueDataSource;
  };
}

async function startServer() {
  // Create Apollo Server instance
  const server = new ApolloServer<Context>({
    typeDefs,
    resolvers,
    introspection: true, // Enable introspection for GraphQL Playground
  });

  // Start the server
  const port = parseInt(process.env.PORT || '4000', 10);

  const { url } = await startStandaloneServer(server, {
    listen: { port },
    context: async () => {
      // Create a new data source instance for each request
      // This ensures proper isolation between requests
      return {
        dataSources: {
          euroleague: new EuroleagueDataSource(),
        },
      };
    },
  });

  console.log(`🏀 Basketball GraphQL Server ready at ${url}`);
  console.log(`📊 GraphQL Playground available at ${url}`);
}

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
