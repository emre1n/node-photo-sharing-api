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
│   └── server.ts
├── .env
├── .gitignore
├── nodemon.json
├── package.json
├── tsconfig.json
└── README.md
```

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
