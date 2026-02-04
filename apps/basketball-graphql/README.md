# Basketball GraphQL Server

A GraphQL API server that acts as a Backend for Frontend (BFF) for the Euroleague public API.

## Features

- **Apollo Server 4** - Modern GraphQL server implementation
- **TypeScript** - Full type safety
- **Euroleague API Integration** - Proxies requests to the public Euroleague API

## Available Queries

```graphql
# Get all teams
query GetTeams {
  teams {
    code
    name
    city
    country {
      name
    }
  }
}

# Get a specific team
query GetTeam($code: String!) {
  team(code: $code) {
    code
    name
    city
    website
  }
}

# Get games for a team
query GetTeamGames($teamCode: String!) {
  teamGames(teamCode: $teamCode) {
    id
    date
    local {
      club {
        name
      }
      score
    }
    road {
      club {
        name
      }
      score
    }
    played
  }
}

# Get current standings
query GetCurrentStandings {
  currentStandings {
    club {
      code
      name
    }
    data {
      position
      gamesPlayed
      gamesWon
      gamesLost
    }
  }
}

# Get all rounds
query GetRounds($phaseTypeCode: String) {
  rounds(phaseTypeCode: $phaseTypeCode) {
    round
    name
    minGameStartDate
    maxGameStartDate
  }
}
```

## Running the Server

```bash
# Development
nx serve basketball-graphql

# Production build
nx build basketball-graphql
node dist/apps/basketball-graphql/main.js
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

- `PORT` - Server port (default: 4000)
- `EUROLEAGUE_API_URL` - Euroleague API base URL

## GraphQL Playground

After starting the server, visit `http://localhost:4000` to access the GraphQL Playground for exploring and testing queries.
