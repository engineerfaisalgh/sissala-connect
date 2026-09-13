# Sissala Connect - Backend API

Production-grade REST API built with Node.js, TypeScript, and Express.

## Setup

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Update .env.local with your configuration
```

### Development

```bash
# Start dev server (with auto-reload)
npm run dev

# Run linter
npm run lint

# Run tests
npm run test

# Run tests with coverage
npm run test:cov
```

### Database Migrations

```bash
# Create new migration
npm run migrate:make migration_name

# Run all pending migrations
npm run migrate:latest

# Rollback last migration batch
npm run migrate:rollback
```

## Project Structure

```
src/
├── config/           # Configuration files
│   ├── logger.ts     # Pino logger setup
│   └── database.ts   # Knex database configuration
├── middleware/       # Express middleware
│   └── errorHandler.ts
├── modules/          # Feature modules (coming soon)
│   ├── auth/
│   ├── users/
│   ├── profiles/
│   └── ...
├── utils/            # Utility functions
│   ├── validators.ts # Input validation schemas
│   ├── encryption.ts # Password hashing
│   └── otp.ts        # OTP generation/verification
├── types/            # TypeScript interfaces
└── index.ts          # Entry point
```

## API Endpoints

All endpoints under `/api/v1/`

### Authentication (Coming Soon)
- `POST /auth/register` - User registration
- `POST /auth/verify-otp` - Phone verification
- `POST /auth/login` - User login
- `POST /auth/refresh` - Refresh JWT token
- `POST /auth/logout` - User logout

### Users (Coming Soon)
- `GET /users/me` - Get current user
- `PATCH /users/me` - Update current user
- `GET /users/:id` - Get user by ID

### Profiles (Coming Soon)
- `GET /profiles/me` - Get current user profile
- `PATCH /profiles/me` - Update current user profile
- `GET /profiles/:id` - Get profile by ID
- `GET /profiles` - Search profiles

### More modules coming...

## Security

- HTTPS enforced in production
- Password hashing with bcryptjs (10 rounds)
- JWT-based authentication
- OTP verification for phone numbers
- Rate limiting on public endpoints
- CORS configuration
- Helmet for security headers
- Input validation with Joi
- Comprehensive error handling
- Audit logging for sensitive operations

## Testing

Test files are located in `__tests__` directories adjacent to source files.

```bash
# Run all tests
npm run test

# Run with watch mode
npm run test:watch

# Run with coverage
npm run test:cov
```

## Performance

- Connection pooling for database
- Pino for fast logging
- Pagination for large datasets (implemented in modules)
- Caching strategies (Redis ready, coming soon)
- Indexes on frequently queried fields

## Error Handling

All errors are caught and returned in consistent format:

```json
{
  "error": {
    "message": "Error message",
    "statusCode": 400
  }
}
```

## Environment Variables

See `.env.example` for complete list. Key variables:

- `NODE_ENV` - Environment (development, staging, production)
- `PORT` - Server port (default: 3000)
- `DB_*` - Database connection
- `JWT_SECRET` - JWT signing key (must be changed in production)
- `OTP_*` - OTP configuration
- `S3_*` - Object storage configuration
- `CORS_ORIGIN` - Allowed CORS origin
- `LOG_LEVEL` - Logging level

## Deployment

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist/ ./dist/
EXPOSE 3000
CMD ["node", "dist/index.js"]
```

### Environment Setup

1. Set production environment variables
2. Ensure database is accessible and initialized
3. Run migrations: `npm run migrate:latest`
4. Start server: `npm start`

## License

MIT
