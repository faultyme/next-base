# Database Capability

The Database capability adds database access and a complete example database/API workflow to the project.

It is an optional bundle in the project generator.

When enabled, the entire Database capability is included. Database-related parts such as API, validation, Bruno, and the Example domain are not selected independently.

## What's Included

- PostgreSQL
- Neon
- Drizzle ORM
- Drizzle Kit
- Zod validation
- Next.js API Route Handlers
- Example database domain
- Bruno API collection

## Dependencies

```text
@neondatabase/serverless
drizzle-orm
drizzle-kit
```

`@neondatabase/serverless` and `drizzle-orm` are runtime dependencies.

`drizzle-kit` is a development dependency used for database schema and migration tooling.

## Database Structure

```text
src/lib/db/
├── index.ts
└── schemas/
    ├── index.ts
    └── example.schema.ts
```

`src/lib/db/index.ts` creates the Drizzle database instance using the Neon connection.

The schema directory contains the application's database schemas.

## Environment

The Database capability requires:

```text
DATABASE_URL
```

The generated project should expose the variable through its environment configuration.

The actual database connection value must be provided by the developer.

## Example Domain

The Example domain is included as a reference implementation.

```text
src/lib/db/schemas/example.schema.ts
```

It demonstrates how a database schema is defined and connected to the rest of the application.

The Example domain is not a separate generator capability.

## Validation

Validation schemas are stored under:

```text
src/lib/validation/examples/
├── index.ts
├── create-example.schema.ts
└── update-example.schema.ts
```

Zod is used to validate API input.

## API

The Example API follows the project's entity-first API convention:

```text
/api/examples
/api/examples/{id}
```

The API handles HTTP concerns and uses validation before working with database data.

## Application Flow

The basic flow is:

```text
Request
   ↓
API Route Handler
   ↓
Zod Validation
   ↓
Application / Service Logic
   ↓
Drizzle ORM
   ↓
PostgreSQL
```

Routes should focus on HTTP concerns. Business and application logic belongs in services when that logic becomes necessary.

## Bruno

Bruno API requests are included as part of the Database capability.

They provide example requests for working with the Example API.

Bruno is not a separate generator option.

## Migrations

Migration history is intentionally not included when generating a new project.

The generated project starts with the database schema and Drizzle configuration.

After modifying or establishing the schema, migrations can be generated with:

```bash
pnpm db:generate
```

This allows each generated project to maintain its own migration history.

## Configuration

The Database capability also provides:

```text
drizzle.config.ts
```

This points Drizzle Kit to the project's database schema and uses `DATABASE_URL` for the database connection.

## Design Principle

The Database capability is intentionally packaged as one complete bundle.

Selecting Database means receiving the complete reference workflow:

```text
Database
├── PostgreSQL
├── Neon
├── Drizzle
├── Validation
├── API
├── Example domain
└── Bruno
```

This keeps the generator simple while providing a useful working starting point.
