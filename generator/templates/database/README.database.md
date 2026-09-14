## Database

This project includes the Database capability from next-base.

### Database Stack

- **PostgreSQL** — Relational database
- **Neon** — Serverless PostgreSQL
- **Drizzle ORM** — Type-safe database ORM
- **Zod** — Request validation

### Environment Configuration

The Database capability requires a `DATABASE_URL`.

Add your database connection string to `.env`:

```env
DATABASE_URL=
```

Use `.env.example` as a reference.

Do not commit `.env` or other files containing private database credentials.

### Database Commands

Generate migrations from schema changes:

```bash
pnpm db:generate
```

Apply migrations:

```bash
pnpm db:migrate
```

Open Drizzle Studio:

```bash
pnpm db:studio
```

### Database Structure

```text
src/lib/db/
├── index.ts
└── schemas/
    ├── example.schema.ts
    └── index.ts
```

The database connection is created in `src/lib/db/index.ts`.

Database schemas are defined inside `src/lib/db/schemas/`.

### Example Domain

The generated Database capability includes an `examples` domain as a reference implementation.

API routes:

```text
/api/examples
/api/examples/:id
```

The Example domain demonstrates:

- Database schema
- CRUD API routes
- Request validation
- Type-safe database operations

### Validation

Request validation uses Zod.

Validation schemas are located in:

```text
src/lib/validation/
```

### Bruno

Bruno request collections are included for testing the Example API.

The collection is located in:

```text
bruno/Testing/
```

### Migrations

Migration files are generated from the current database schema.

After configuring `DATABASE_URL`, generate migrations with:

```bash
pnpm db:generate
```

The generated project does not include migration history from the next-base repository.
