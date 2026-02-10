# Basketball API .NET

A REST API built with **.NET 10** and **Entity Framework**, backed by a **PostgreSQL** database. It exposes CRUD endpoints for basketball competitions and teams, secured with **Auth0 JWT authentication**.

## Tech Stack

- [ASP.NET Core](https://learn.microsoft.com/aspnet/core/) (.NET 10) — Web framework
- [Entity Framework Core](https://learn.microsoft.com/ef/core/) — ORM for PostgreSQL (via Npgsql)
- [Auth0](https://auth0.com/) — JWT bearer authentication
- [OpenAPI](https://learn.microsoft.com/aspnet/core/fundamentals/openapi) — API documentation (available in Development)

## Authentication

All controller endpoints require a valid **Auth0 JWT bearer token**. Configure your Auth0 domain and audience in `appsettings.json`:

```json
{
  "Auth0": {
    "Domain": "your-tenant.auth0.com",
    "Audience": "https://your-api-identifier"
  }
}
```

Include the token in requests via the `Authorization` header:

```
Authorization: Bearer <access_token>
```

## Database Schema

### Teams

| Column | Type   | Constraints                          |
| ------ | ------ | ------------------------------------ |
| Id     | int    | Primary Key                          |
| Name   | string | Required, Max 255, Unique Index      |
| Code   | string | Max 10                               |

### Competitions

| Column | Type   | Constraints                          |
| ------ | ------ | ------------------------------------ |
| Id     | int    | Primary Key                          |
| Name   | string | Required, Max 255                    |
| Code   | string | Max 10                               |

## API Endpoints

All endpoints are prefixed with `/api` and require authentication.

### Teams — `/api/teams`

| Method | Path             | Description         |
| ------ | ---------------- | ------------------- |
| GET    | `/api/teams`     | List all teams      |
| GET    | `/api/teams/:id` | Get a team by ID    |
| POST   | `/api/teams`     | Create a new team   |
| PUT    | `/api/teams/:id` | Update a team       |
| DELETE | `/api/teams/:id` | Delete a team       |

### Competitions — `/api/competitions`

| Method | Path                     | Description              |
| ------ | ------------------------ | ------------------------ |
| GET    | `/api/competitions`      | List all competitions    |
| GET    | `/api/competitions/:id`  | Get a competition by ID  |
| POST   | `/api/competitions`      | Create a new competition |
| PUT    | `/api/competitions/:id`  | Update a competition     |
| DELETE | `/api/competitions/:id`  | Delete a competition     |

### Other

| Method | Path | Description     |
| ------ | ---- | --------------- |
| GET    | `/`  | Welcome message |

## Configuration

The PostgreSQL connection string is read from `ConnectionStrings:DefaultConnection`. You can set it via **User Secrets** (recommended for development) or `appsettings.json`:

```bash
dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Host=localhost;Database=basketball;Username=user;Password=password"
```

The server listens on **http://localhost:5156** by default (configured in `Properties/launchSettings.json`).

## Running

```bash
# Run in development
dotnet run

# Or via Nx
nx serve basketball-api-dotnet
```

The OpenAPI document is available at `/openapi/v1.json` when running in Development mode.
