# Express Boilerplate

A robust and scalable Express.js boilerplate with modern development practices and essential middleware setup.

## Features

- **Express.js 5.x** - Latest version of Express framework
- **MongoDB Integration** - Database connectivity with Mongoose
- **Environment Configuration** - Flexible configuration management
- **Global Error Handling** - Centralized error handling middleware
- **ES6 Modules** - Modern JavaScript module system
- **Development Tools** - ESLint for code quality and Husky for Git hooks
- **Docker Support** - Containerized development environment
- **GitHub Actions** - Automated CI/CD pipeline for testing and linting
- **Utility Functions** - Helper functions for common operations

## Project Structure

```
express-boilerplate/
├── src/
│   ├── config/
│   │   ├── config.js          # Application configuration
│   │   └── mongoose.js        # MongoDB connection setup
│   └── utilis/
│       ├── returnResponse.js  # Response formatting utility
│       └── validateMissingFields.js # Field validation utility
├── app.js                     # Express application setup
├── server.js                  # Server startup file
├── Dockerfile                 # Docker configuration for development
├── .github/workflows/         # GitHub Actions CI/CD workflows
├── .env.sample               # Environment variables template
├── .gitignore                # Git ignore rules
├── eslint.config.js          # ESLint configuration
└── package.json              # Project dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher, recommended: v20 or v22)
- MongoDB (local or cloud instance)
- npm or yarn

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
cp .env.sample .env
```

4. Configure your `.env` file:
```env
NODE_ENVIRONMENT=development
PORT=3000
dbURI=mongodb://localhost:27017/your-database-name
```

### Running the Application

#### Development Mode
```bash
npm run dev
```
This will start the server with nodemon for automatic restarting on file changes.

#### Production Mode
```bash
npm start
```

### Available Scripts

- `npm run dev` - Start development server with nodemon
- `npm run lint` - Run ESLint to check code quality
- `npm test` - Run tests (currently placeholder)
- `npm run prepare` - Set up Husky git hooks

## Docker Support

**Note:** The included Dockerfile is optimized for development purposes and is not production-ready.

Build and run the application using Docker for development:

```bash
# Build the Docker image
docker build -t express-boilerplate .

# Run the container
docker run -p 3000:3000 --env-file .env express-boilerplate
```

For production deployment, you should create a separate production-optimized Dockerfile with multi-stage builds, security hardening, and optimized layer caching.

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

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENVIRONMENT` | Application environment (development/production) | development |
| `PORT` | Server port | 3000 |
| `dbURI` | MongoDB connection string | - |

## API Structure

The boilerplate includes:

- **Global Error Handler** - Centralized error handling with stack traces in development
- **JSON & URL-encoded Body Parsing** - Built-in middleware for request parsing
- **Utility Functions** - Common helper functions for response formatting and validation

## Development Guidelines

### Code Quality

This project uses ESLint for maintaining code quality. Run the linter before committing:

```bash
npm run lint
```

### Git Hooks

Husky is configured to run pre-commit hooks. The hooks are automatically installed when you run `npm install`.

### Adding New Features

1. Create feature branches from `main`
2. Follow the existing project structure
3. Add appropriate error handling
4. Update documentation as needed
5. Ensure code passes linting

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
