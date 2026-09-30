# Car Rental Booking API

NestJS REST API for the Car Rental Booking App. It manages account verification, JWT-based authentication, cars, bookings, image uploads, email jobs, and caching.

## Stack

- NestJS 12, TypeScript, Prisma, and PostgreSQL
- Redis and BullMQ for cache and email queues
- ImageKit for uploaded images and Nodemailer/Gmail for email
- Swagger, Helmet, compression, CORS, and request throttling

## Run locally

From this directory:

```bash
npm install
docker compose up -d
npx prisma migrate dev
npm run start:dev
```

The API starts at `http://localhost:3000` by default. Interactive Swagger documentation is available at `http://localhost:3000/api/docs`.

### Environment variables

Create `server/.env` with values for the services you use. Do not commit this file.

```dotenv
PORT=3000
NODE_ENV=development
COR_ORIGIN=http://localhost:5173

DATABASE_URL=postgresql://<user>:<password>@localhost:5432/<database>
POSTGRES_USER=<user>
POSTGRES_PASSWORD=<password>
POSTGRES_DB=<database>
REDIS_HOST=localhost
REDIS_PORT=6379

JWT_SECRET=<long-random-secret>
JWT_EXPIRES_IN=1h
REFRESH_TOKEN_SECRET=<different-long-random-secret>
REFRESH_TOKEN_EXPIRES_IN=10d
FORGET_PASSWORD_URL=http://localhost:5173/forget-password

MAIL_USER=<gmail-address>
MAIL_PASSWORD=<gmail-app-password>
APP_EMAIL=<sender-address>
IMAGEKIT_PRIVATE_KEY=<imagekit-private-key>
IMAGEKIT_PUBLIC_KEY=<imagekit-public-key>
IMAGEKIT_URL_ENDPOINT=<imagekit-url-endpoint>
```

`docker compose up -d` uses the `POSTGRES_*` variables to start PostgreSQL and also starts Redis. Generate the Prisma client after schema changes with `npx prisma generate`.

## API conventions

- **Base URL:** `/api/v1`
- Requests and responses are JSON unless an endpoint is marked `multipart/form-data`.
- Validation strips unknown fields and rejects requests containing them. Passwords must satisfy `class-validator`'s `IsStrongPassword` rule.
- Protected routes accept either the `accessToken` HTTP-only cookie set during login/verification or `Authorization: Bearer <access-token>`.
- `ADMIN` routes require an authenticated user whose JWT role is `ADMIN`; `USER/ADMIN` means either role is allowed.
- Auth endpoints are rate-limited to 5 requests/minute (profile image: 10); car endpoints to 6/minute; booking creation to 6/minute and listing/update to 10/minute.

Successful domain responses generally use:

```json
{ "success": true, "message": "...", "data": {} }
```

Authentication responses use `user`, `accessToken`, and `refreshToken` where applicable. Standard NestJS validation, authentication, authorization, and not-found errors use their corresponding HTTP status codes.

## Authentication endpoints

| Method | Path | Access | Body / purpose |
| --- | --- | --- | --- |
| `POST` | `/auth/register` | Public | `{ name, email, password }`; sends an email OTP. `name` is 3–50 characters. |
| `POST` | `/auth/resend-otp` | Public | `{ email }`; sends another signup OTP while the registration session is valid. |
| `POST` | `/auth/verify` | Public | `{ email, otp }`; OTP is exactly 6 characters. Creates the account and sets auth cookies. |
| `POST` | `/auth/login` | Public | `{ email, password }`; sets auth cookies and returns tokens. |
| `PATCH` | `/auth/refresh-access-token` | Public | `{ refreshToken }`; validates and rotates the refresh token, then sets new auth cookies. |
| `DELETE` | `/auth/logout` | Authenticated | Clears auth cookies and invalidates the stored refresh token. |
| `POST` | `/auth/forget-password` | Public | `{ email }`; queues a password-reset email. |
| `PATCH` | `/auth/reset-password` | Public | `{ password, token }`; reset token comes from the email link. |
| `GET` | `/auth/profile` | **ADMIN** | Returns the current admin profile. |
| `POST` | `/auth/profile-image` | **ADMIN** | `multipart/form-data` with `profileImage`; JPEG, PNG, or WebP, maximum 5 MB. |

Example registration:

```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "name": "Alex Driver",
  "email": "alex@example.com",
  "password": "SecurePass123!"
}
```

## Car endpoints

Every car endpoint requires authentication. `GET /cars/:ownerId` must be used for an owner identifier; there is currently no public `GET /cars/:id` endpoint.

| Method | Path | Access | Body / purpose |
| --- | --- | --- | --- |
| `POST` | `/cars` | **ADMIN** | `multipart/form-data`; creates a car with a `carImage` file and the fields below. |
| `GET` | `/cars` | USER or ADMIN | Lists all cars. |
| `PATCH` | `/cars/:id` | **ADMIN** | `{ isAvailable: boolean }`; changes availability. |
| `DELETE` | `/cars/:id` | **ADMIN** | Deletes a car. |
| `GET` | `/cars/:ownerId` | **ADMIN** | Lists cars owned by the supplied user ID. |

`POST /cars` form fields:

```text
brand, model, year, category, seating_capacity, fuelType,
transmission, pricePerDay, location, description, carImage
```

Constraints: `year` is 1900–2100; `seating_capacity` is at least 2; `pricePerDay` is at least 50; and `description` is 10–500 characters. Valid enum values are defined in [`prisma/schema.prisma`](./prisma/schema.prisma): `CarCategory`, `FuelType`, `Transmission`, and `Location`.

Example availability update:

```json
{ "isAvailable": false }
```

## Booking endpoints

All booking routes require authentication. A user can create and retrieve their own bookings; only an admin can change status.

| Method | Path | Access | Body / purpose |
| --- | --- | --- | --- |
| `POST` | `/bookings` | Authenticated | Creates a booking for the current user. |
| `GET` | `/bookings` | Authenticated | Lists bookings belonging to the current user. |
| `PATCH` | `/bookings/:id` | **ADMIN** | `{ status }`; updates a booking status. |

Create-booking body:

```json
{
  "carId": "car_cuid",
  "pickupDate": "2026-10-10T09:00:00.000Z",
  "returnDate": "2026-10-13T09:00:00.000Z",
  "paymentBy": "UPI",
  "price": 4500
}
```

`paymentBy` must be one of `CREDIT_CARD`, `DEBIT_CARD`, `PAYPAL`, `CASH`, or `UPI`. The booking `status` may be `PENDING`, `CONFIRMED`, `COMPLETED`, or `CANCELLED`.

## Server structure

```text
server/
├── prisma/                 # Prisma schema and migrations
├── src/
│   ├── auth/               # registration, login, JWT and role guards
│   ├── bookings/           # booking controller, service, DTOs, repository
│   ├── cars/               # car controller, service, DTOs, repository
│   ├── config/             # configuration factories
│   ├── generated/prisma/   # generated Prisma client (do not edit)
│   ├── images/             # validation/compression and ImageKit uploads
│   ├── mail/               # BullMQ email producer and processor
│   ├── prisma/             # Prisma service/module
│   ├── redis/              # Redis service/module
│   ├── app.module.ts       # application composition
│   └── main.ts             # API prefix, middleware, Swagger, bootstrap
├── test/                   # end-to-end tests
├── docker-compose.yml      # local PostgreSQL and Redis
└── package.json
```

## Scripts

```bash
npm run start:dev  # start with watch mode
npm run build      # build the server
npm run lint       # run Oxlint
npm test           # run unit tests
npm run test:e2e   # run end-to-end tests
```
