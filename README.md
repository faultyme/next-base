# next-base

A reusable, production-ready **Next.js + TypeScript base project** with standardized development tooling, code quality checks, formatting, Git hooks, environment configuration, database infrastructure, and API development tooling.

The goal of `next-base` is to provide a consistent starting point for future Next.js projects without repeatedly configuring the same development workflow from scratch.

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
- EditorConfig
- Node.js version management with `.nvmrc`
- Environment variable configuration with `.env.example`
- Conventional Commit validation
- pnpm package management
- PostgreSQL database
- Neon PostgreSQL
- Drizzle ORM
- Database schema and migration setup
- Zod API request validation
- Next.js Route Handlers
- Bruno API development and testing setup

## Tech Stack

| Technology   | Purpose                         |
| ------------ | ------------------------------- |
| Next.js      | React framework                 |
| React        | UI library                      |
| TypeScript   | Type-safe development           |
| Tailwind CSS | Styling                         |
| PostgreSQL   | Relational database             |
| Neon         | PostgreSQL database platform    |
| Drizzle ORM  | Type-safe database access       |
| Zod          | API request validation          |
| ESLint       | Code linting                    |
| Prettier     | Code formatting                 |
| Husky        | Git hooks                       |
| lint-staged  | Run checks on staged files      |
| Commitlint   | Commit message validation       |
| EditorConfig | Consistent editor configuration |
| pnpm         | Package management              |
| Bruno        | API development and testing     |

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

> `.env` files containing local or sensitive configuration are ignored by Git. Only `.env.example` should be committed when documenting required variables.

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

Checks whether files are correctly formatted without modifying them.

## Git Workflow

This project uses Git hooks to maintain code quality and consistent commit messages.

### Pre-commit

The `pre-commit` hook runs `lint-staged`.

Only staged files are checked, which helps keep commits fast while ensuring changed files meet the project's quality standards.

### Commit Message Validation

Commit messages are validated using Commitlint and follow the **Conventional Commits** specification.

Examples of valid commit messages:

```text
feat: add user dashboard

fix: resolve navigation issue

docs: update project README

refactor: simplify API client

chore: update dependencies
```

Examples of commit types commonly used:

| Type       | Usage                                        |
| ---------- | -------------------------------------------- |
| `feat`     | New functionality                            |
| `fix`      | Bug fix                                      |
| `docs`     | Documentation changes                        |
| `refactor` | Code restructuring without changing behavior |
| `test`     | Test-related changes                         |
| `chore`    | Maintenance tasks                            |
| `style`    | Formatting/style-only changes                |

## Project Structure

```text
next-base/

├── .husky/                         # Git hooks
├── .vscode/                        # Editor configuration, if applicable
├── bruno/                          # Bruno API testing collections
│   └── Testing/                    # Bruno collection
├── public/                         # Static assets
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── api/                    # API route handlers
│   │   │   └── users/              # Users API endpoints
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/                 # Reusable UI components
│   └── lib/                        # Shared infrastructure and non-UI logic
│       ├── db/                     # Database infrastructure
│       │   ├── migrations/         # Database migrations
│       │   └── schemas/            # Database schema definitions
│       └── validation/              # API request validation schemas
├── .editorconfig                   # Editor configuration
├── .env.example                    # Example environment variables
├── .gitignore                      # Git ignored files
├── .nvmrc                           # Node.js version
├── commitlint.config.*              # Commitlint configuration
├── eslint.config.*                  # ESLint configuration
├── next.config.*                    # Next.js configuration
├── package.json                     # Project scripts and dependencies
├── pnpm-lock.yaml                   # Locked dependency versions
├── prettier.config.*                # Prettier configuration
├── tsconfig.json                    # TypeScript configuration
└── README.md                        # Project documentation
```

> The exact structure may change as the base project evolves.

## API

The project includes a basic API foundation using Next.js Route Handlers.

API routes are located under:

```text
src/app/api/
```

The current API follows a resource-based structure:

```text
/api/[entity]
```

The current implementation includes a Users API.

Request validation is handled at the API layer using Zod schemas located under:

```text
src/lib/validation/
```

API responses use a consistent success/error response structure to make API behavior predictable for clients and development tools.

### Bruno

Bruno is included as the local API client for API development and manual verification.

The Bruno collection is located at:

```text
bruno/Testing/
```

The collection currently contains the API development workflow used during Phase 3.

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

The current database foundation contains a `users` table.

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

## Configuration Philosophy

`next-base` intentionally focuses on the development foundation rather than application-specific functionality.

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
- API development infrastructure

Application-specific concerns should be added by individual projects built from this base.

## Current Scope

### Included

- Next.js App Router
- TypeScript
- `src/` directory
- `@/*` import alias
- Tailwind CSS
- ESLint
- Prettier
- Husky
- lint-staged
- Commitlint
- EditorConfig
- `.nvmrc`
- `.env`
- `.env.example`
- Basic Git workflow
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
- Project generator / CLI
- Custom ESLint rules
- Custom VS Code configuration
- Business-specific features

## Project Status

### Phase 1 — Core Development Foundation: Completed

The first phase established the reusable Next.js + TypeScript foundation and standardized development workflow.

### Phase 2 — Database Foundation: Completed

The second phase established the project's database foundation using PostgreSQL, Neon, and Drizzle ORM.

Completed:

- PostgreSQL database setup
- Neon database connection
- Drizzle ORM integration
- Database schema setup
- Users database schema
- Database migrations
- Database connection and type-safe access
- Database architecture documentation

### Phase 3 — API Development Foundation: In Progress

The third phase establishes a simple and reusable API development workflow on top of the existing Next.js and database foundation.

Completed so far:

- Next.js Route Handlers
- Basic Users API
- API and database integration
- Zod request validation
- Consistent API response structure
- Bruno API client setup
- Bruno `Testing` collection
- Local Bruno environment configuration
- Manual API workflow verification
- API architecture documentation updates
- Database architecture documentation updates

Remaining Phase 3 work includes final project documentation updates and any remaining API architecture decisions.

## Future Goal

The long-term goal of `next-base` is to evolve from a static base repository into a **configurable project starter**.

Eventually, developers should be able to choose the features and development tools they need when creating a new project instead of manually repeating the same setup.

For example:

```text
Create a new project

✓ Next.js
✓ TypeScript
✓ Tailwind CSS
✓ ESLint
✓ Prettier
✓ Husky
✓ Commitlint
✓ Database
□ Authentication
□ Docker
□ Testing
```

The project could then generate a customized, ready-to-use Next.js application based on those choices.

> Project generation / CLI functionality is intentionally out of scope for the current foundation phases.

## Contributing

Before committing changes, make sure the project passes the available checks:

```bash
pnpm lint

pnpm format:check
```

Commits should follow the project's Conventional Commit rules.

Example:

```bash
git add .

git commit -m "feat: add reusable API utilities"
```

Git hooks will automatically run the configured checks during the commit process.

## License

This project is currently intended as a reusable internal/project starter.

Add an appropriate license here if the repository is later intended for public distribution.
