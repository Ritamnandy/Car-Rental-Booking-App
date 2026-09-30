# Car Rental Booking App

A full-stack car-rental application with a customer booking experience and an owner/admin workspace for managing cars and booking statuses.

## Technology

- **Client:** React 19, TypeScript, Vite, React Router, and Tailwind CSS
- **Server:** NestJS, TypeScript, Prisma, PostgreSQL, Redis, BullMQ, ImageKit, and Nodemailer

## Project structure

```text
Car-Rental-Booking-App/
├── client/                  # React single-page application
│   ├── src/
│   │   ├── components/       # shared UI and authentication components
│   │   ├── pages/            # customer and owner views
│   │   ├── assets/           # images and SVG assets
│   │   └── types/            # client TypeScript types
│   └── package.json
├── server/                  # NestJS REST API
│   ├── prisma/               # data schema and migrations
│   ├── src/                  # API modules and application code
│   ├── test/                 # end-to-end tests
│   ├── docker-compose.yml    # local PostgreSQL and Redis
│   └── README.md             # setup instructions and API reference
└── README.md
```

## Features

- Email-OTP registration, login, JWT refresh, logout, and password reset
- Browse rental cars and submit bookings
- Owner/admin dashboard for adding cars, changing availability, and updating booking statuses
- Image uploads, Redis caching, queued email delivery, API validation, throttling, and Swagger docs

## Quick start

1. Start backend services and the API:

   ```bash
   cd server
   bun install
   docker compose up -d
   bunx prisma migrate dev
   bun run start:dev
   ```

2. In a second terminal, start the web client:

   ```bash
   cd client
   bun install
   bun run dev
   ```

3. Open the client URL printed by Vite (normally `http://localhost:5173`). The API runs at `http://localhost:3000/api/v1`, and Swagger is at `http://localhost:3000/api/docs`.

Before starting the API, configure `server/.env` for PostgreSQL, Redis, JWT, email, ImageKit, and `COR_ORIGIN`. The full variable list, API endpoints, request formats, and server architecture are in [server/README.md](./server/README.md).

## Useful commands

| Area | Command | Purpose |
| --- | --- | --- |
| Client | `bun run dev` | Start Vite development server |
| Client | `bun run build` | Type-check and build production assets |
| Server | `bun run start:dev` | Start NestJS with watch mode |
| Server | `bun test` | Run server unit tests |
| Server | `bun run test:e2e` | Run server end-to-end tests |
