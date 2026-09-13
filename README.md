# next-base

A reusable **Next.js + TypeScript base project** with standardized development tooling, code quality checks, formatting, Git hooks, environment configuration, database infrastructure, API development tooling, and a structured application architecture.

The goal of `next-base` is to provide a consistent starting point for future Next.js projects without repeatedly configuring the same development workflow and project structure from scratch.

## Features

- Next.js with App Router
- React
- TypeScript
- Tailwind CSS
- ESLint
- Prettier
- Husky
- lint-staged
- Commitlint
- Node.js version management with `.nvmrc`
- Environment variable configuration with `.env.example`
- Conventional Commit validation
- pnpm package management
- PostgreSQL database foundation
- Neon PostgreSQL
- Drizzle ORM
- Database schema and migration setup
- Zod API request validation
- Next.js Route Handlers
- Entity-first API architecture
- Bruno API development and testing setup
- Structured `src/` application architecture

## Tech Stack

| Technology   | Purpose                      |
| ------------ | ---------------------------- |
| Next.js      | React framework              |
| React        | UI library                   |
| TypeScript   | Type-safe development        |
| Tailwind CSS | Styling                      |
| PostgreSQL   | Relational database          |
| Neon         | PostgreSQL database platform |
| Drizzle ORM  | Type-safe database access    |
| Zod          | API request validation       |
| ESLint       | Code linting                 |
| Prettier     | Code formatting              |
| Husky        | Git hooks                    |
| lint-staged  | Run checks on staged files   |
| Commitlint   | Commit message validation    |
| pnpm         | Package management           |
| Bruno        | API development and testing  |

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- pnpm
- Git

The recommended Node.js version is defined in `.nvmrc`.

If you use `nvm`, you can switch to the project's Node.js version with:

```bash
nvm use
```

### Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd next-base
pnpm install
```

### Environment Setup

Create your local environment file from the example:

```bash
cp .env.example .env
```

Add the required environment variables to `.env`.

The environment configuration includes the variables required by the project's application and database setup. Use `.env.example` as the source of truth for the exact variables required by the current version of the project.

`.env` files containing local or sensitive configuration are ignored by Git. Only `.env.example` should be committed when documenting required variables.

### Start Development Server

```bash
pnpm dev
```

The application will be available at:

```text
http://localhost:3000
```

## Available Commands

### Development

```bash
pnpm dev
```

Starts the Next.js development server.

### Build

```bash
pnpm build
```

Creates a production build of the application.

### Start

```bash
pnpm start
```

Starts the production server after building the application.

### Lint

```bash
pnpm lint
```

Runs ESLint against the project.

### Format

```bash
pnpm format
```

Formats project files using Prettier.

### Format Check

```bash
pnpm format:check
```

Checks whether project files are correctly formatted without modifying them.

### Type Check

```bash
pnpm exec tsc --noEmit
```

Runs the TypeScript compiler without generating JavaScript output.

This is used as a manual type-safety check during development.

## Git Workflow

This project uses Git hooks to maintain code quality and consistent commit messages.

### Pre-commit

The `pre-commit` hook runs `lint-staged`.

Only staged files are processed. The configured checks include ESLint and Prettier for supported source files and Prettier for supported configuration/documentation files.

This keeps commits fast while ensuring changed files meet the project's formatting and code-quality rules.

### Commit Message Validation

Commit messages are validated using Commitlint and follow the **Conventional Commits** specification.

Examples of valid commit messages:

```text
feat: add product service

fix: resolve navigation issue

docs: update project README

refactor: simplify API client

chore: update dependencies
```

Common commit types include:

| Type       | Usage                                        |
| ---------- | -------------------------------------------- |
| `feat`     | New functionality                            |
| `fix`      | Bug fix                                      |
| `docs`     | Documentation changes                        |
| `refactor` | Code restructuring without changing behavior |
| `test`     | Test-related changes                         |
| `chore`    | Maintenance tasks                            |
| `style`    | Formatting or style-only changes             |

## Project Structure

The project uses a structured `src/` architecture designed to provide clear boundaries between application routing, UI, business logic, infrastructure, and shared code.

```text
next-base/

├── .husky/                         # Git hooks
│
├── bruno/                          # Bruno API testing collections
│   └── Testing/                    # Bruno collection
│
├── public/                         # Static assets
│
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── api/                    # API Route Handlers
│   │   │   └── public/             # Public API route area
│   │   │
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── actions/                    # Next.js Server Actions
│   │
│   ├── components/                 # Reusable React/UI components
│   │
│   ├── hooks/                      # Custom React hooks
│   │
│   ├── lib/                        # Shared infrastructure and libraries
│   │   ├── db/                     # Database infrastructure
│   │   │   ├── migrations/         # Database migrations
│   │   │   └── schemas/            # Database schema definitions
│   │   │
│   │   └── validation/             # Request validation schemas
│   │
│   ├── services/                   # Application/business service logic
│   │
│   ├── types/                      # Shared TypeScript types
│   │
│   └── utils/                      # Generic reusable utilities
│
├── .env.example                    # Example environment variables
├── .gitignore                      # Git ignored files
├── .nvmrc                          # Node.js version
├── commitlint.config.js            # Commitlint configuration
├── eslint.config.mjs               # ESLint configuration
├── next.config.ts                  # Next.js configuration
├── package.json                    # Project scripts and dependencies
├── pnpm-lock.yaml                  # Locked dependency versions
├── pnpm-workspace.yaml             # pnpm workspace configuration
├── postcss.config.mjs              # PostCSS configuration
├── .prettierrc                     # Prettier configuration
├── tsconfig.json                   # TypeScript configuration
└── README.md                       # Project documentation
```

Some architectural directories may initially contain only `.gitkeep` files. These directories establish the intended project structure even before application-specific code is added.

The exact structure may evolve as the base project develops.

## Architecture Principles

The project follows a responsibility-based architecture.

### `src/app`

Contains Next.js App Router pages, layouts, and routing.

### `src/app/api`

Contains Next.js Route Handlers.

API routes use an **entity-first** structure.

### `src/actions`

Contains Next.js Server Actions.

Server Actions are intended for server-side operations initiated by the application UI.

### `src/components`

Contains reusable React and UI components.

### `src/hooks`

Contains custom React hooks used to share client-side React behavior.

### `src/lib`

Contains shared infrastructure and libraries.

Current infrastructure includes database and validation functionality.

### `src/services`

Contains application and business logic.

Services are responsible for coordinating application operations and communicating with infrastructure such as the database.

API routes should remain thin and delegate business operations to services where appropriate.

The intended flow is:

```text
API Route
    ↓
Service
    ↓
Database
```

### `src/utils`

Contains small, generic, reusable helper functions.

Utilities should remain independent of application-specific business logic where possible.

### `src/types`

Contains shared TypeScript types that are used across application boundaries.

## API

The project includes a basic API foundation using Next.js Route Handlers.

API routes are located under:

```text
src/app/api/
```

### Entity-First API Architecture

The API follows an **entity-first** resource-based structure.

The default pattern is:

```text
/api/[entity]
/api/[entity]/[id]
```

For example:

```text
/api/products
/api/products/123
```

The entity/resource is the primary API boundary.

Roles and permissions are not encoded into the default API URL structure. Authorization can determine which users or roles are allowed to perform specific operations on an entity.

For example, the same product API can support different permissions:

```text
GET    /api/products
POST   /api/products
PUT    /api/products/123
DELETE /api/products/123
```

without creating separate URLs such as:

```text
/api/admin/products
/api/public/products
```

This keeps shared entity logic reusable across different callers and permissions.

### API and Service Separation

API Route Handlers are responsible primarily for handling HTTP concerns such as:

- Reading requests
- Parsing route parameters
- Validating input
- Calling application services
- Returning HTTP responses

Application/business logic belongs in services where appropriate.

The intended architecture is:

```text
HTTP Request
     ↓
API Route Handler
     ↓
Validation
     ↓
Service
     ↓
Database
     ↓
HTTP Response
```

## API Validation

Request validation is handled using Zod.

Validation schemas are located under:

```text
src/lib/validation/
```

The current example validation structure is:

```text
src/lib/validation/
└── examples/
    ├── create-example.schema.ts
    ├── update-example.schema.ts
    └── index.ts
```

Validation remains separate from database schemas because API input validation and database structure have different responsibilities.

## Bruno

Bruno is included as the local API client for API development and manual verification.

The Bruno collection is located at:

```text
bruno/Testing/
```

The current collection contains the API development workflow used during the foundation phases.

Automated assertions inside Bruno requests are not currently configured.

## Database

The project includes a PostgreSQL database foundation using Neon and Drizzle ORM.

Database-related code is located under:

```text
src/lib/db/
```

The database layer includes:

- Database connection and Drizzle configuration
- Database schemas
- Database migrations
- Type-safe database access
- Database-level data integrity through constraints

The current database foundation contains an `examples` table.

Database schemas are kept under:

```text
src/lib/db/schemas/
```

The current example schema is:

```text
src/lib/db/schemas/example.schema.ts
```

Database request validation is handled separately by the API layer using Zod.

The database remains responsible for protecting the integrity of stored data.

## Import Alias

The project uses the `@/*` import alias for imports from the source directory.

Example:

```typescript
import { something } from "@/lib/something";
```

This avoids deeply nested relative imports such as:

```typescript
import { something } from "../../../lib/something";
```

## Environment Configuration

Environment variables are documented through:

```text
.env.example
```

Local environment values are stored in:

```text
.env
```

The `.env` file is ignored by Git and should not contain values that are committed to the repository.

The `.env.example` file documents the environment variables required by the project without containing local secrets.

## Configuration Philosophy

`next-base` intentionally focuses on reusable development foundations rather than application-specific functionality.

The base project provides:

- Framework configuration
- TypeScript configuration
- Styling
- Linting
- Formatting
- Git hooks
- Commit validation
- Environment configuration
- Node.js version consistency
- Database infrastructure
- API infrastructure
- Reusable application architecture

Application-specific concerns should be added by individual projects built from this base.

## Current Scope

### Included

- Next.js App Router
- React
- TypeScript
- `src/` directory
- `@/*` import alias
- Tailwind CSS
- ESLint
- Prettier
- Husky
- lint-staged
- Commitlint
- `.nvmrc`
- `.env`
- `.env.example`
- Basic Git workflow
- Structured `src/` architecture
- Entity-first API architecture
- PostgreSQL
- Neon
- Drizzle ORM
- Database schemas
- Database migrations
- Zod validation
- Next.js Route Handlers
- Bruno API development/testing setup

### Not Included

The following are intentionally outside the current scope:

- Authentication
- Redis
- Docker
- Swagger / OpenAPI
- Advanced testing setup
- CI/CD
- Custom ESLint rules
- Custom VS Code configuration
- Business-specific features
- Production-grade project generator
- npm package publishing

The current `examples` domain exists only as a demonstration of the database, API, and validation foundations. It is not intended to be a reusable generated application feature.

## Project Status

### Phase 1 — Core Development Foundation: Completed

The first phase established the reusable Next.js + TypeScript foundation and standardized development workflow.

Completed:

- Next.js App Router
- TypeScript
- Tailwind CSS
- ESLint
- Prettier
- Git
- pnpm
- Husky
- lint-staged
- Commitlint
- Environment configuration
- Node.js version management

### Phase 2 — Database Foundation: Completed

The second phase established the project's database foundation using PostgreSQL, Neon, and Drizzle ORM.

Completed:

- PostgreSQL database setup
- Neon database connection
- Drizzle ORM integration
- Database schema setup
- Example database schema
- Database migrations
- Database connection and type-safe access
- Database architecture documentation

### Phase 3 — API Development Foundation: Completed

The third phase established a simple and reusable API development workflow on top of the existing Next.js and database foundation.

Completed:

- Next.js Route Handlers
- Entity-first API architecture
- Basic example API
- API and database integration
- Zod request validation
- Consistent API response structure
- Bruno API client setup
- Bruno `Testing` collection
- Local Bruno environment configuration
- Manual API workflow verification
- API architecture documentation
- Database architecture documentation

### Phase 4 — Feature Architecture and Project Generator: In Progress

Phase 4 evolves `next-base` from a static base project toward a configurable project foundation.

Current work includes:

- Reviewing existing project capabilities
- Identifying core and optional capabilities
- Defining feature boundaries
- Defining capability dependencies
- Defining file and folder ownership
- Defining environment and configuration ownership
- Establishing a reusable application architecture
- Establishing the entity-first API convention
- Designing a minimal project configuration model
- Designing a minimal project generator/CLI

The generator is intended to allow developers to select reusable capabilities and generate a project containing only the selected optional capabilities and their required dependencies/files.

The example/demo domain will not be generated by the future generator.

## Future Goal

The long-term goal of `next-base` is to evolve from a static base repository into a **configurable project starter**.

Developers should eventually be able to choose the capabilities they need when creating a new project instead of manually repeating the same setup.

For example:

```text
Create a new project

Core foundation
✓ Next.js
✓ TypeScript
✓ Tailwind CSS
✓ ESLint
✓ Prettier
✓ Git
✓ Husky
✓ lint-staged
✓ Commitlint

Optional capabilities
✓ Database
✓ API
✓ Validation
□ Bruno
```

The generator can then create a customized Next.js application based on those selections.

The generator is intentionally being designed as a **minimal project generator**, not as a production-grade package or generalized scaffolding platform.

## Feature Architecture Direction

Optional capabilities are grouped by responsibility rather than exposing every underlying package as a separate choice.

For example, the database capability represents the database foundation as a single capability:

```text
Database
├── PostgreSQL
├── Neon
├── Drizzle ORM
├── Database schemas
├── Database migrations
├── DATABASE_URL
└── src/lib/db/
```

Similarly, API functionality is treated as an API capability rather than exposing individual Next.js Route Handler files as separate selections.

This keeps generator configuration understandable while allowing each capability to own its required dependencies, files, configuration, and environment variables.

## Contributing

Before committing changes, make sure the project passes the available checks:

```bash
pnpm lint
pnpm format:check
pnpm exec tsc --noEmit
```

Commits should follow the project's Conventional Commit rules.

Example:

```bash
git add .
git commit -m "feat: add reusable API utilities"
```

Git hooks will automatically run the configured staged-file checks and commit-message validation.

## License

This project is currently intended as a reusable internal/project starter.

Add an appropriate license here if the repository is later intended for public distribution.
