This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:


Environment setup: Create a .env file in the root directory of the project and add:

DATABASE_URL=
DATABASE_NEXT_PUBLIC_SUPABASE_ANON_KEY
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
NEXTAUTH_SECRET= 

Dependency installation:
npm install
npx prisma generate 
npx prisma migrate deploy
tsx prisma/seed.ts
Running the application in development mode: npm run dev


