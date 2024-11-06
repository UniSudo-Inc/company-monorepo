# server

API server application built with Hono and Cloudflare Workers.

## Project Structure

```plaintext
.
├── src
│   ├── configs           # Configuration files and clients
│   ├── helpers           # Helper functions
│   ├── middlewares       # Middlewares/Interceptors
│   ├── services          # Business logic by domain
│   │   └── <service>     # Service module
│   │       ├── database  # Database table definitions
│   │       ├── schemas   # Data models and validation schemas
│   │       ├── functions # API endpoints and handlers
│   │       ├── utils     # Utility functions
│   │       └── index.ts  # Service routes
│   ├── types             # Type definitions
│   ├── schema.ts         # Database schema declaration
│   └── index.ts          # Entry point of Hono application
├── tests                 # Test files
│   ├── fixtures          # Test fixtures
│   └── integration       # Integration tests
├── drizzle.config.ts     # Drizzle Kit configuration
└── wrangler.toml         # Cloudflare Workers configuration
```

## Tech Stack

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Hono](https://hono.dev/) - A lightweight web framework for Cloudflare Workers
- [Cloudflare Workers](https://workers.cloudflare.com/) - Serverless platform for deploying functions globally
- [Drizzle ORM](https://orm.drizzle.team/) - A lightweight ORM for TypeScript
- [Zod](https://zod.dev/) - TypeScript-first schema declaration and validation library
- [Lodash](https://lodash.com/) - Utility library
- [Jest](https://jestjs.io/) - Testing framework

## Getting Started

### Installation

```bash
# Install dependencies
pnpm install
```

### Local Development

```bash
# Start the development server
pnpm dev
```

### Running Tests

```bash
# Run tests
pnpm test
```

### Deploy Application

```bash
# Deploy to Cloudflare Workers
pnpm deploy
```

## Development

### API Server

See [Cloudflare Workers - Hono](https://hono.dev/docs/getting-started/cloudflare-workers) for more information.

#### Middleware

Hono provides a wide range of built-in middlewares. (e.g. CORS, JWT, Logger, etc.)

See [Middleware - Hono](https://hono.dev/docs/guides/middleware) for more information.

#### Sharing API with Frontend

Hono provides a type-safe way to share API definitions with client application.

See [RPC - Hono](https://hono.dev/docs/guides/rpc) for more information.

### Database

#### Cloudflare D1

Cloudflare D1 is a serverless SQLite compatible database that can be used with Cloudflare Workers.

See [Cloudflare D1](https://developers.cloudflare.com/d1/) for more information on how to use Cloudflare D1.

See [Drizzle ORM - Getting Started](https://orm.drizzle.team/docs/get-started-sqlite#cloudflare-d1) for more information on how to connect to Cloudflare D1.

#### Database Schema

See [Drizzle ORM - Manage Schema](https://orm.drizzle.team/docs/sql-schema-declaration) for more information on how to manage database schema.

See [drizzle-zod](https://orm.drizzle.team/docs/zod) for more information on how to use Zod with Drizzle ORM.

#### Database Migration

```bash
# Generate migration files
pnpm db:generate

# Run migration
pnpm db:migrate
```

See [Drizzle Kit](https://orm.drizzle.team/kit-docs/overview) for more information on how to migrate database schema.

### Object Storage

Cloudflare R2 is a serverless object storage that can be used with Cloudflare Workers.

See [Cloudflare R2](https://developers.cloudflare.com/r2/) for more information on how to use Cloudflare R2.

### Cache

Cloudflare KV is a serverless key-value store that can be used with Cloudflare Workers.

See [Cloudflare KV](https://developers.cloudflare.com/kv) for more information on how to use Cloudflare KV.

### Environment Variables

Use env-var package to declare environment variables.

```typescript
import { env } from 'env-var';

const PORT = env.get('PORT').required().asPortNumber();
const NODE_ENV = env.get('NODE_ENV').default('development').asEnum(['development', 'production']);
```

## Writing Tests

...TBD

### Unit Test

### Integration Test

## Continuous Integration

...TBD
