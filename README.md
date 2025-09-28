 Instalacja
Aby uruchomić projekt lokalnie, wykonaj następujące kroki:

Konfiguracja środowiska: Stwórz w głównym katalogu projerktu plik .env i dodaj:

DATABASE_URL=
NEXTAUTH_URL=
NEXTAUTH_SECRET=
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

Instalacja zależności:
 npm install
 npx prisma generate
 npx prisma migrate deploy
 tsx prisma/seed.ts
Uruchamianie Aplikacji w trybie developerskim:
 npm run dev
