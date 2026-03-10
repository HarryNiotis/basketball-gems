# Basketball API

A simple REST API built with **FastAPI** and **SQLAlchemy**, backed by a **PostgreSQL** database. It exposes read endpoints for basketball competitions and teams.

## Tech Stack

- [FastAPI](https://fastapi.tiangolo.com/) — Web framework
- [SQLAlchemy](https://www.sqlalchemy.org/) — ORM for PostgreSQL
- [Pydantic](https://docs.pydantic.dev/) — Data validation & serialisation
- [Uvicorn](https://www.uvicorn.org/) — ASGI server
- [Poetry](https://python-poetry.org/) — Dependency management
- [Poetry Export plugin](https://github.com/python-poetry/poetry-plugin-export) - Poetry export plugin
- [Nx python plugin](https://www.npmjs.com/package/@nxlv/python) - Nx Python plugin
- [Nx](https://nx.dev/) — Monorepo build system

## Database Schema

### Teams

| Column | Type    | Constraints        |
| ------ | ------- | ------------------ |
| Id     | Integer | Primary Key, Index |
| Name   | String  |                    |
| Code   | String  |                    |

### Competitions

| Column | Type    | Constraints        |
| ------ | ------- | ------------------ |
| Id     | Integer | Primary Key, Index |
| Name   | String  |                    |

## API Endpoints

| Method | Path             | Description           |
| ------ | ---------------- | --------------------- |
| GET    | `/`              | Welcome message       |
| GET    | `/teams/`        | List all teams        |
| GET    | `/competitions/` | List all competitions |

## Configuration

The API connects to PostgreSQL via environment variables. Create a `.env` file in the project root:

```env
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_HOST=localhost
POSTGRES_DB=basketball
```

## Running

```bash
# Install dependencies
poetry install

# Serve locally
nx serve basketball-api

# Run tests
nx test basketball-api
```

The server starts on **http://localhost:8000** by default. Interactive API docs are available at `/docs` (Swagger UI) and `/redoc` (ReDoc).
