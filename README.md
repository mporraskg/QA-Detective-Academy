# QA Security Academy

Security training platform for QA: batches with missions, labs, and quizzes.

## Structure

- `apps/web` – Frontend (Next.js)
- `apps/api` – Backend (NestJS + Prisma)
- `packages/shared` – Shared FE/BE types
- `content/` – Batch content (data, not code)
- `labs/` – Isolated vulnerable apps (future)
- `infra/` – Docker Compose

## Quick Start

```bash
cp .env.example .env
pnpm install
pnpm db:up
pnpm build:shared
pnpm db:migrate        # creates the User table
pnpm dev:api           # http://localhost:4000/health
pnpm dev:web           # http://localhost:3000
