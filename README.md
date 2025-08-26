# nilGPT

Chat interface with SecretLLM + SecretVaults.

## Getting Started

First, install the dependencies:

```bash
pnpm install
```

Fill out the .env local file.

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Docker

### Building and Running with Docker

To build and run the application using Docker:

```bash
# Build the Docker image
docker-compose build

# Run the application
docker-compose up
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Health Check

The application includes a health check endpoint at `/api/health` that Docker uses to monitor the application status.
