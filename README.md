# next-base

A reusable, production-ready **Next.js + TypeScript base project** with standardized development tooling, code quality checks, formatting, Git hooks, and environment configuration.

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
- Bruno API development/testing setup

## Tech Stack

| Technology   | Purpose                         |
| ------------ | ------------------------------- |
| Next.js      | React framework                 |
| React        | UI library                      |
| TypeScript   | Type-safe development           |
| Tailwind CSS | Styling                         |
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
├── .husky/                 # Git hooks
├── .vscode/                # Editor configuration, if applicable
├── public/                 # Static assets
├── src/
│   └── app/                # Next.js App Router
│       ├── favicon.ico
│       ├── globals.css
│       ├── layout.tsx
│       └── page.tsx
├── .editorconfig           # Editor configuration
├── .env.example            # Example environment variables
├── .gitignore              # Git ignored files
├── .nvmrc                  # Node.js version
├── commitlint.config.*     # Commitlint configuration
├── eslint.config.*         # ESLint configuration
├── next.config.*           # Next.js configuration
├── package.json             # Project scripts and dependencies
├── pnpm-lock.yaml          # Locked dependency versions
├── prettier.config.*       # Prettier configuration
├── tailwind.config.*       # Tailwind configuration, if applicable
└── tsconfig.json           # TypeScript configuration
```

> The exact structure may change as the base project evolves.

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
- Bruno

### Not Included

The following are intentionally outside the current scope:

- Authentication
- Database
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

**Phase 1 — Core Development Foundation: Completed**

The current version provides a working Next.js + TypeScript foundation with standardized development tooling and Git workflow.

### Completed

- Next.js App Router setup
- TypeScript configuration
- `src/` directory
- Import alias
- Tailwind CSS
- ESLint
- Prettier
- Husky
- lint-staged
- Commitlint
- Conventional Commit validation
- EditorConfig
- Node.js version configuration
- Environment configuration

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
□ Database
□ Authentication
□ Docker
□ Testing
```

The project could then generate a customized, ready-to-use Next.js application based on those choices.

> Project generation / CLI functionality is intentionally out of scope for Phase 1.

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
