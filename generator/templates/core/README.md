# <project-name>

A Next.js project generated with next-base.

## Getting Started

### Install dependencies

```bash
pnpm install
```

### Start development server

```bash
pnpm dev
```

Open http://localhost:3000

## Available Commands

| Command             | Description                             |
| ------------------- | --------------------------------------- |
| `pnpm dev`          | Start the development server            |
| `pnpm build`        | Build the application                   |
| `pnpm start`        | Start the production server             |
| `pnpm lint`         | Run ESLint                              |
| `pnpm types:check`  | Check TypeScript types                  |
| `pnpm format`       | Format the project with Prettier        |
| `pnpm format:check` | Check formatting without changing files |

## Code Quality

This project includes:

- **ESLint** for code linting
- **TypeScript** for type safety
- **Prettier** for consistent formatting

Run the following before committing when needed:

```bash
pnpm lint
pnpm types:check
pnpm format:check
```

## Git Workflow

This project includes a Git workflow using:

- **Husky** for Git hooks
- **lint-staged** for checking staged files
- **Commitlint** for validating commit messages
- **Conventional Commits** for consistent commit messages

### Commit messages

Use the Conventional Commits format:

```text
type: description
```

Examples:

```text
feat: add product api
fix: handle invalid request
docs: update readme
refactor: simplify service
chore: update dependencies
```

Before a commit, staged files are automatically checked and formatted, and the commit message is validated.

## Environment Configuration

Use `.env` for local environment variables.

The `.env.example` file provides a template for environment configuration.

Do not commit `.env` or other files containing private environment values.

## Project Structure

```text
src/
├── actions/
├── app/
│   └── api/
│       └── public/
├── components/
├── hooks/
├── lib/
├── services/
├── types/
└── utils/
```

### Folder responsibilities

- `actions/` — Server actions
- `app/` — Next.js application routes and pages
- `components/` — Reusable UI components
- `hooks/` — Custom React hooks
- `lib/` — Shared libraries and foundation code
- `services/` — Application services
- `types/` — Shared TypeScript types
- `utils/` — Utility functions

## Generated With next-base

This project was generated using next-base.

The generated project is independent after creation. Changes made to the next-base template later do not automatically change this project.
