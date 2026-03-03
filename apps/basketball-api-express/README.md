# Basketball API Express

A simple REST API built with **Express** and **Sequelize**, backed by a **PostgreSQL** database. It exposes read endpoints for basketball competitions and teams.

## Tech Stack

- [Express](https://expressjs.com/) — Web framework
- [Sequelize](https://sequelize.org/) — ORM for PostgreSQL
- [TypeScript](https://www.typescriptlang.org/)
- [Nx](https://nx.dev/) — Monorepo build system

## Database Schema

### Competitions

| Column | Type    | Constraints |
| ------ | ------- | ----------- |
| Id     | INTEGER | Primary Key, Auto Increment |
| Name   | STRING  |             |
| Code   | STRING  |             |

### Teams

| Column | Type    | Constraints |
| ------ | ------- | ----------- |
| Id     | INTEGER | Primary Key, Auto Increment |
| Name   | STRING  | Unique      |
| Code   | STRING  |             |

## API Endpoints

| Method | Path            | Description              |
| ------ | --------------- | ------------------------ |
| GET    | `/`             | Welcome message          |
| GET    | `/teams`        | List all teams           |
| GET    | `/competitions` | List all competitions    |

## Configuration

The API connects to PostgreSQL via a `DATABASE_URL` environment variable. Create a `.env` file in the project root:

```env
DATABASE_URL=postgres://user:password@localhost:5432/basketball
```

The server listens on the port defined by the `PORT` environment variable, defaulting to **3333**.

## Running

```bash
# Serve in development mode
nx serve basketball-api-express

# Build
nx build basketball-api-express
```
