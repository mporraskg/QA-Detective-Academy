# QA Security Academy

Plataforma de training de seguridad para QA: batches con misiones, labs y quizzes.

## Estructura
- `apps/web` – Frontend (Next.js)
- `apps/api` – Backend (NestJS + Prisma)
- `packages/shared` – Tipos compartidos FE/BE
- `content/` – Contenido de batches (datos, no código)
- `labs/` – Apps vulnerables aisladas (futuro)
- `infra/` – Docker Compose

## Arranque
```bash
cp .env.example .env
pnpm install
pnpm db:up
pnpm build:shared
pnpm db:migrate        # crea la tabla User
pnpm dev:api           # http://localhost:4000/health
pnpm dev:web           # http://localhost:3000
```

## Próximos pasos
1. Auth + perfil  2. Batches y desbloqueo  3. Actividades  4. Dashboard admin
