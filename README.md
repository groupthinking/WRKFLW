```markdown
# constructiononline-starter

Starter monorepo for ConstructionOnline MVP. Contains minimal backend API, React frontend, Expo mobile app, Terraform infra stub, OpenAPI & GraphQL schemas, and seed data.

Structure:
- backend/  - TypeScript Express API (time & upload scaffold)
- frontend/ - React app (Next.js or CRA-compatible minimal app)
- mobile/   - Expo React Native app
- infra/    - Terraform examples (S3 bucket)

Quickstart (local):
1. Create repo and paste files.
2. From repo root:
   - npm install
   - cd backend && npm install && npm run dev
   - cd frontend && npm install && npm start
   - cd mobile && npm install && npm start

For production: add CI/CD, Terraform configuration values, secure secrets, and deploy to managed infra.
```