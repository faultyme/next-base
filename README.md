# Next Base — Core / Foundation

The Core / Foundation is the base layer of the project.

It provides the basic Next.js application structure, TypeScript setup, styling, code quality, developer workflow, environment configuration, and reusable project folders.

## What's Included

### Application

- Next.js
- React
- TypeScript
- Tailwind CSS

### Code Quality

- ESLint
- Prettier

### Developer Workflow

- Git
- Husky
- lint-staged
- Commitlint

### Environment Configuration

- `.env`
- `.env.example`
- `.nvmrc`

### Project Architecture

```text
src/
├── app/
│   └── api/
│       └── public/
├── actions/
├── components/
├── hooks/
├── lib/
├── services/
├── utils/
└── types/
```

## Folder Responsibilities

- `src/app/` — Next.js pages, layouts, and routing
- `src/app/api/` — API Route Handlers
- `src/app/api/public/` — convention for genuinely public API routes
- `src/actions/` — Server Actions
- `src/components/` — reusable React/UI components
- `src/hooks/` — custom React hooks
- `src/lib/` — shared infrastructure and libraries
- `src/services/` — application and business logic
- `src/utils/` — small reusable utilities
- `src/types/` — shared TypeScript types

Empty foundation folders are kept in Git with `.gitkeep` files.

## Optional Capabilities

The Core / Foundation does not contain application-specific capabilities.

Optional capabilities can be added on top of the foundation.

Currently available:

- **Database** — PostgreSQL + Neon + Drizzle ORM + validation + API + Bruno + Example domain

The Database capability is treated as one bundle. Its individual parts are not separate options.

## API Convention

API routes follow an entity-first structure:

```text
/api/{entity}

/api/{entity}/{id}
```

For example:

```text
/api/examples

/api/examples/{id}
```

Authorization should determine who can access a resource rather than creating separate entity routes for different roles.

## Design Principle

The foundation should stay small and reusable.

Capability-specific code should not be placed in the Core / Foundation unless it is required by every project.
