# CPX Jersey Commerce

Production-oriented ecommerce built with Next.js 16, React 19, Neon Postgres, and Drizzle ORM.

## Features

- Responsive product catalog and product detail pages
- Persistent client cart and functional checkout flow
- Signed, HTTP-only cookie authentication with customer/admin roles
- Customer order history
- Admin overview, product CRUD, inventory visibility, and order status management
- Neon serverless database, Drizzle schema/migrations, seed script, Zod validation
- Security headers and health endpoint
- Demo mode when no database is configured

## Local setup

```bash
cp .env.example .env.local
npm install
npm run db:generate
npm run db:migrate
npm run db:seed
npm run dev
```

Use a Neon pooled connection string for `DATABASE_URL`. Generate a strong `AUTH_SECRET` with `openssl rand -base64 32`. Change the seeded administrator password before deployment.

## Demo mode

Without `DATABASE_URL`, catalog pages use fixture data and these preview accounts are available:

- Customer: `demo@cpxindo.id` / `customer123`
- Admin: `admin@cpxindo.id` / `admin12345`

Writes are intentionally disabled in demo mode. Production deployments must set `DATABASE_URL` and `AUTH_SECRET`.

## Deployment checklist

1. Create a Neon production database and a separate preview branch.
2. Configure all variables from `.env.example` in the hosting provider.
3. Run `npm run db:migrate` and `npm run db:seed` once against production.
4. Replace the consultation email in `app/custom-jersey/page.tsx` with CPX's production support channel.
5. Connect a payment gateway and transactional email provider before accepting live payments.
6. Monitor `/api/health`, server errors, database usage, and checkout conversion.
