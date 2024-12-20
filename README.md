# Photo Sharing API

A RESTful API built with Node.js, Express, and TypeScript.

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

## Project Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd photo-sharing-api
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```plaintext
PORT=5000
```

## Available Scripts

- `npm run dev`: Starts the development server with hot-reload
- `npm run build`: Builds the TypeScript code to JavaScript
- `npm start`: Runs the built application in production mode
- `npm test`: Runs the test suite (not configured yet)

## Project Structure

```
photo-sharing-api/
├── src/
│   ├── config/
│   │   └── database.ts
│   ├── controllers/
│   │   └── userController.ts
│   ├── models/
│   │   └── User.ts
│   ├── routes/
│   │   ├── index.ts
│   │   └── userRoutes.ts
│   ├── services/
│   │   └── userService.ts
│   ├── middleware/
│   │   ├── auth.ts
│   │   └── error.ts
│   ├── utils/
│   │   └── helpers.ts
│   └── server.ts
├── .env
├── .gitignore
├── nodemon.json
├── package.json
├── tsconfig.json
└── README.md
```

## Architecture Overview

The project follows a functional architecture pattern with clear separation of concerns:

### Core Components

- **Models**: Define TypeScript interfaces and types

  ```typescript
  interface User {
    id: number;
    name: string;
  }
  type CreateUserDto = Omit<User, 'id'>;
  ```

- **Services**: Pure functions for business logic

  ```typescript
  const getUsers = async (): Promise<User[]> => { ... }
  const createUser = async (userData: CreateUserDto): Promise<User> => { ... }
  ```

- **Controllers**: Request handlers with error management

  ```typescript
  const getUsers = async (_req: Request, res: Response) => { ... }
  ```

- **Routes**: Express router configuration
  ```typescript
  router.get('/', userController.getUsers);
  ```

### Design Principles

- Pure functions over classes
- Explicit typing with TypeScript
- Immutable state updates
- Centralized error handling
- Clear dependency flow
- Predictable data transformations

### Data Flow

1. Route receives request
2. Controller handles request/response cycle
3. Service performs business logic
4. Models ensure type safety

## API Endpoints

All endpoints are prefixed with `/api`

### Users

- `GET /api/users`: Get all users
- `GET /api/users/:id`: Get a specific user
- `POST /api/users`: Create a new user

### Route Structure

```
routes/
├── index.ts         # Route aggregator
└── userRoutes.ts    # User-specific routes
```

The application uses a route aggregator pattern where:

- All routes are centrally managed in `routes/index.ts`
- Each feature has its own route file (e.g., `userRoutes.ts`)
- All endpoints are automatically prefixed with `/api`
- New route modules can be easily added by registering them in the aggregator

## Technology Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Development Server**: nodemon
- **TypeScript Compiler**: ts-node

## Configuration Files

- `tsconfig.json`: TypeScript compiler configuration
- `nodemon.json`: Development server configuration
- `.env`: Environment variables
- `.gitignore`: Git ignore rules

## Development

To start the development server:

```bash
npm run dev
```

The server will start on `http://localhost:5000` (or the PORT specified in your .env file).

## Building for Production

To build the project:

```bash
npm run build
```

This will create a `dist` directory with the compiled JavaScript code.

To run the production build:

```bash
npm start
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Logging

The application uses Winston for structured logging with different severity levels and formats.

### Logger Configuration

```typescript
// config/logger.ts
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});
```

### Log Files Structure

```
logs/
├── error.log     # Error-level logs only
└── combined.log  # All logs (info, warn, error)
```

### Features

- **Severity Levels**: ERROR, WARN, INFO, DEBUG
- **Request Logging**: HTTP method, URL, status code, response time
- **Environment-based Formatting**:
  - Development: Colorized console output
  - Production: JSON format for better parsing
- **Automatic Log Directory Creation**: Via npm scripts
- **Request Context**: Includes method, URL, status, and timing

### Usage Examples

```typescript
// Info level logging
logger.info('Server started', { port: 5000 });

// Error logging with context
logger.error('Database connection failed', {
  error: err.message,
  stack: err.stack,
});

// Request logging (automatic via middleware)
// Output: "HTTP Request" { method: "GET", url: "/api/users", status: 200, duration: "123ms" }
```

### Environment Variables

- `LOG_LEVEL`: Set logging level (default: 'info')
- `NODE_ENV`: Determines log format (development/production)

### Log Rotation

- Daily rotation of log files
- Maximum file size: 20MB
- Retention period: 14 days
- Naming format: `error-YYYY-MM-DD.log` and `combined-YYYY-MM-DD.log`

### Additional Environment Variables

- `LOG_MAX_SIZE`: Maximum size of each log file (default: '20m')
- `LOG_MAX_FILES`: Number of days to keep logs (default: '14d')
- `LOG_DATE_PATTERN`: Date pattern for rotated files (default: 'YYYY-MM-DD')

## Database

This project uses PostgreSQL as its database. To set up the database connection:

1. Make sure you have PostgreSQL installed on your system
2. Configure your database connection in the `.env` file:
   ```env
   DB_USER=your_username
   DB_HOST=localhost
   DB_NAME=your_database_name
   DB_PASSWORD=your_password
   DB_PORT=5432
   ```
3. The application will automatically attempt to connect to the database on startup

### Database Features

- Connection pooling for optimal performance
- Automatic connection management
- Error handling and logging for database operations

### Database Connection Management

The application includes robust database connection handling:

- **Connection Retries**: Automatically attempts to reconnect to the database up to 5 times

  ```typescript
  // Retry logic in database initialization
  for (let i = 0; i < retries; i++) {
    try {
      await pool.connect();
    } catch (error) {
      if (i === retries - 1) throw error;
      await delay(5000); // Wait 5 seconds before retrying
    }
  }
  ```

- **Docker Health Checks**: PostgreSQL container includes health monitoring

  ```yaml
  healthcheck:
    test: ['CMD-SHELL', 'pg_isready -U ${DB_USER} -d ${DB_NAME}']
    interval: 5s
    timeout: 5s
    retries: 5
  ```

- **Dependency Management**: Application waits for database readiness
- **Debug Tools**: PostgreSQL client tools included in application container
- **Error Logging**: Detailed connection attempt logging with attempt counts

These features ensure reliable database connectivity in both development and production environments.

## Docker Setup

The application can be run using Docker and Docker Compose. This setup includes both the Node.js application and PostgreSQL database.

### Prerequisites

- Docker
- Docker Compose

### Running with Docker

1. Build and start the containers:

   ```bash
   docker-compose up --build
   ```

2. The application will be available at `http://localhost:5000`

3. To stop the containers:
   ```bash
   docker-compose down
   ```

### Docker Environment

- The Node.js application runs in a container with Node 18
- PostgreSQL runs in a separate container
- Data is persisted using Docker volumes
- Logs are mounted to the host machine

### Docker Commands

- Start containers: `docker-compose up`
- Start in background: `docker-compose up -d`
- Stop containers: `docker-compose down`
- View logs: `docker-compose logs -f`
