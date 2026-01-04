# Express Boilerplate

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/) [![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)](https://nodejs.org/) [![License](https://img.shields.io/badge/license-ISC-blue)](LICENSE)

A robust and scalable Express.js boilerplate with TypeScript, modern development practices, and production-ready patterns.

## Features

- **TypeScript** - Fully typed codebase with strict type checking and modern ESNext features
- **Express.js 5.x** - Latest version of Express framework
- **MongoDB Integration** - Database connectivity with Mongoose and connection pooling
- **JWT Authentication** - JWT-based authentication middleware with RS256 algorithm support
- **Zod Validation** - Runtime type validation for MongoDB ObjectIds
- **Environment Configuration** - Type-safe configuration management with runtime validation
- **Global Error Handling** - Centralized error handling with custom error types
- **ES Modules** - Modern JavaScript module system (ESM)
- **Utility Functions** - Helper functions for async handling, database operations, and response formatting
- **Development Tools** - ESLint with TypeScript support and Husky for Git hooks
- **Docker Support** - Multi-stage production Dockerfile and Docker Compose for local services
- **GitHub Actions** - Automated CI/CD pipeline with multi-version Node.js testing

## Project Structure

```
express-boilerplate/
├── src/
│   ├── config/
│   │   ├── config.ts          # Type-safe configuration with runtime validation
│   │   └── mongoose.ts        # MongoDB connection with connection pooling
│   ├── middleware/
│   │   ├── authMiddleware.ts  # JWT authentication with optional auth for dev
│   │   └── validateObjectId.ts # Zod-based ObjectId validation middleware
│   └── utilis/
│       ├── returnResponse.ts  # Response formatting utility
│       ├── validateMissingFields.ts # Field validation utility
│       └── advanceFunctions.ts # Async handler, error factory, DB/service wrappers
├── Docker/
│   ├── Dockerfile             # Multi-stage production Docker build
│   ├── Dockerfile.dev         # Development Docker configuration
│   ├── compose.yml            # MongoDB & Redis services for local development
│   └── entrypoint.sh          # Docker entrypoint script
├── .github/workflows/
│   └── backendCI.yaml         # CI pipeline for linting across Node versions
├── .husky/
│   └── pre-commit             # Pre-commit hook for linting
├── app.ts                     # Express application setup with global error handler
├── server.ts                  # Server startup file
├── tsconfig.json              # TypeScript configuration with strict settings
├── eslint.config.ts           # ESLint configuration for TypeScript
├── .env.sample                # Environment variables template
├── .env.development           # Development environment variables
├── .env.production            # Production environment variables
└── package.json               # Project dependencies and scripts
```

## Getting Started

### TL;DR (Quick Start)
```bash
git clone <repository-url> && cd express-boilerplate && npm install && cp .env.sample .env.development && npm run dev
```

For the impatient: This gets you running in 30 seconds. Configure `.env.development` fully for production-ready setup.

### Prerequisites

- Node.js (v18 or higher, recommended: v20 or v22)
- MongoDB (local or cloud instance, or use Docker Compose)
- npm (yarn not recommended due to ES modules configuration)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd express-boilerplate
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.sample .env.development
cp .env.sample .env.production
```

4. Configure your `.env.development` file:
```env
NODE_ENVIRONMENT=development
PORT=3000
dbURI=mongodb://localhost:27017/your-database-name
JWT_PUBLIC_KEY=your-base64-encoded-public-key
BYPASS_AUTH=true
TEST_USER_EMAIL=test@example.com
```

### Running the Application

#### Development Mode
```bash
npm run dev
```
This will start the server with nodemon and ts-node for automatic restarting on file changes. Uses `.env.development` for configuration.

#### Production Mode
```bash
npm run build  # Compile TypeScript to JavaScript
npm start      # Run compiled code from dist/
```
Production mode uses `.env.production` for configuration and runs the compiled JavaScript.

#### Using Docker Compose for Local Services
```bash
cd Docker
docker compose up -d  # Start MongoDB and Redis
```

### Available Scripts

- `npm run dev` - Start development server with nodemon and ts-node (uses `.env.development`)
- `npm run build` - Compile TypeScript to JavaScript in `dist/` directory
- `npm start` - Run production build (uses `.env.production`)
- `npm run lint` - Run ESLint to check code quality
- `npm test` - Run tests (currently placeholder)
- `npm run prepare` - Set up Husky git hooks

## Docker Support

### Production Dockerfile

The project includes a multi-stage production Dockerfile (`Docker/Dockerfile`) with:
- Multi-stage build for optimized image size
- Non-root user for security
- Dependency pruning (dev dependencies removed)
- Custom entrypoint script

```bash
# Build the production image
docker build -f Docker/Dockerfile -t express-boilerplate .

# Run the container
docker run -p 5000:5000 --env-file .env.production express-boilerplate
```

### Development Dockerfile

For local development with hot reload:

```bash
# Build the dev image
docker build -f Docker/Dockerfile.dev -t express-boilerplate-dev .

# Run the dev container
docker run -p 3000:3000 --env-file .env.development express-boilerplate-dev
```

### Docker Compose

Use Docker Compose to run MongoDB and Redis locally:

```bash
cd Docker
docker compose up -d    # Start services in background
docker compose down     # Stop services
```

Services included:
- **MongoDB 7** - Available on port 27017 (credentials: root/example)
- **Redis 7** - Available on port 6379 with persistence enabled

## Continuous Integration

This project uses GitHub Actions for automated testing and code quality checks.

### CI Pipeline

The CI pipeline runs on every push to the `main` branch and includes:

- **Multi-Node Testing** - Tests against Node.js versions 18.x, 20.x, and 22.x
- **Dependency Installation** - Uses `npm ci` for clean, reproducible builds
- **Code Linting** - Runs ESLint to ensure code quality standards

### Workflow Configuration

The workflow is defined in `.github/workflows/backendCI.yaml` and automatically:

1. Checks out the code
2. Sets up the Node.js environment
3. Installs dependencies
4. Runs linting checks

This ensures that all code pushed to the main branch meets quality standards and is compatible across supported Node.js versions.

## Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `NODE_ENVIRONMENT` | Application environment (development/production) | development | No |
| `PORT` | Server port | 3000 | Yes |
| `dbURI` | MongoDB connection string | mongodb://localhost:27017/base | No |
| `JWT_PUBLIC_KEY` | Base64-encoded RS256 public key for JWT verification | - | Yes |
| `BYPASS_AUTH` | Skip JWT authentication in development (true/false) | false | No |
| `TEST_USER_EMAIL` | Email to use when BYPASS_AUTH is enabled | - | No |

## Architecture & Patterns

### Configuration Management

Type-safe configuration system (`src/config/config.ts`):
- Runtime validation of required environment variables
- TypeScript generics for exact return types
- Process exits if required config is missing

```typescript
const port = config.get("PORT");  // Typed as number
```

### Database Connection

MongoDB connection with best practices (`src/config/mongoose.ts`):
- Connection pooling with `maxIdleTimeMS`
- Connection status tracking
- Error handling and reconnection logic
- Proper event listeners for errors and disconnections

### Authentication Middleware

JWT-based authentication (`src/middleware/authMiddleware.ts`):
- RS256 algorithm with public key verification
- Optional authentication bypass for development
- Token expiration and error handling
- Extends Express Request with user info
- Cookie-based token storage

### Validation Middleware

Runtime validation using Zod (`src/middleware/validateObjectId.ts`):
- MongoDB ObjectId validation
- Supports validation from params, body, or query
- Type-safe validation with proper error messages

### Utility Functions

**Response Formatting** (`src/utilis/returnResponse.ts`):
- Consistent API response structure
- Support for additional fields via spread operator

**Field Validation** (`src/utilis/validateMissingFields.ts`):
- Validates single fields or objects
- Returns boolean for missing/null/undefined values

**Advanced Functions** (`src/utilis/advanceFunctions.ts`):
- `asyncHandler` - Wraps async route handlers to catch errors
- `createError` - Custom error factory with status codes
- `dbOperation` - Database operation wrapper with error handling
- `serviceOperation` - External service call wrapper with error handling

### Error Handling

Global error handler with:
- Custom error types with status codes
- Stack traces in development only
- Consistent error response format
- Integration with `http-errors` package

## Development Guidelines

### TypeScript Configuration

The project uses strict TypeScript settings:
- **Module System**: NodeNext with ESM support
- **Strict Mode**: Enabled with additional strict checks
- **Type Safety**: `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`
- **Source Maps**: Enabled for debugging
- **Isolated Modules**: Required for ts-node/ESM

### Code Quality

ESLint is configured for TypeScript with:
- TypeScript parser with project references
- Separate rules for `.ts` and `.js` files
- Node.js globals support

Run the linter before committing:

```bash
npm run lint
```

### Git Hooks

Husky is configured with a pre-commit hook that:
- Automatically runs `npm run lint` before each commit
- Prevents commits if linting fails
- Hooks are automatically installed on `npm install`

### Adding New Features

1. Create feature branches from `main`
2. Follow the existing project structure (separate config, middleware, utilities)
3. Use TypeScript with proper typing - avoid `any` types
4. Wrap async operations with `asyncHandler` or error wrappers
5. Add appropriate error handling with custom error types
6. Use the centralized configuration system for env variables
7. Update documentation as needed
8. Ensure code passes linting and builds successfully
9. Test with both `.env.development` and `.env.production` configurations

### Best Practices Observed

- **ES Modules**: All imports use `.js` extension (TypeScript convention for ESM)
- **Type Safety**: Explicit typing for Express handlers, requests, responses
- **Error Handling**: Custom error types with status codes for proper HTTP responses
- **Separation of Concerns**: Config, middleware, utilities are properly separated
- **Environment-specific Config**: Separate files for development and production
- **Security**: Non-root Docker user, JWT with RS256, base64-encoded keys
- **Database Best Practices**: Connection pooling, status tracking, error handlers

## Upcoming Features

🚧 **Active Development** - The following features are planned and will be added incrementally.

**Why:** "Active Development" signals project isn't abandoned

---

### 1. Winston Logger Setup

File-based structured logging:
- File-based logging with rotation
- JSON formatted logs for production
- Request/response logging middleware
- Error logging with stack traces
- Separate log files for errors and combined logs

**Environment Variables:**
```env
LOG_LEVEL=info
LOG_FILE_PATH=./logs/app.log
LOG_MAX_SIZE=10m
LOG_MAX_FILES=7
```

### 2. Redis Integration

Caching layer setup:
- Redis client configuration with connection pooling
- Caching middleware for API responses
- Helper utilities for cache operations

**Environment Variables:**
```env
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DB=0
REDIS_TTL=3600
```

**Note:** Redis is already available via Docker Compose at `localhost:6379`

### 3. Testing Framework

Pre-configured testing setup:
- **Jest** - Testing framework with TypeScript support
- **Supertest** - HTTP assertion library for API testing
- Complete Jest configuration for TypeScript
- Test coverage reporting setup
- Example test structure

**Note:** The framework will be configured and ready to use. You'll need to write your own unit and integration tests based on your application's requirements.

**New Scripts:**
```bash
npm test              # Run all tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Generate coverage report
```

**Test Configuration:**
```env
TEST_DB_URI=mongodb://localhost:27017/test-db
TEST_PORT=4000
```

### 4. Enhanced CI/CD Pipeline

Complete CI/CD workflow:
- **Linting** - Code quality checks across Node.js versions
- **Testing** - Automated test execution with coverage reports
- **Build** - Docker image building with multi-stage optimization
- **Push** - Automatic push to Docker Hub on successful builds
- Separate testing environment with `.env.testing`

**Pipeline Flow:**
```
Push to main → Lint → Test → Build Docker Image → Push to Docker Hub
```

**Required Secrets:**
- `DOCKERHUB_USERNAME` - Docker Hub username
- `DOCKERHUB_TOKEN` - Docker Hub access token

---

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Ensure all checks pass
6. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

For questions or issues, please create an issue in the repository.
