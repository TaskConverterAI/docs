# TaskConverterAI - Service Port Configuration

## Port Assignments

Each microservice now runs on its dedicated port to avoid conflicts during development:

| Service | Port | Documentation URL |
|---------|------|------------------|
| **Auth Service** | 8081 | http://localhost:8081 |
| **Task Service** | 8082 | http://localhost:8082 |
| **Analyzer Service** | 8083 | http://localhost:8083 |
| **Gateway Service** | 8084 | http://localhost:8084 |

## Development Setup

### Running Individual Services

Each service can now be started independently on its assigned port:

```bash
# Auth Service
cd auth-service
npm start --port=8081

# Task Service  
cd task-service
npm start --port=8082

# Analyzer Service
cd analyzer-service  
npm start --port=8083

# Gateway Service
cd gateway-service
npm start --port=8084
```

### Running All Services

To run the complete system, start all services in separate terminals:

```bash
# Terminal 1
npm run start:auth    # Starts on port 8081

# Terminal 2  
npm run start:task    # Starts on port 8082

# Terminal 3
npm run start:analyzer # Starts on port 8083

# Terminal 4
npm run start:gateway  # Starts on port 8084
```

## Service Documentation

The service directory now displays port information for each service. You can access:

- **Main Directory**: http://localhost:8000 (for documentation browsing)
- **Individual Services**: Use the ports listed above

## Gateway Configuration

The gateway service (port 8084) routes requests to backend services:

- `/api/auth/*` → Auth Service (8081)
- `/api/tasks/*` → Task Service (8082)  
- `/api/analyzer/*` → Analyzer Service (8083)

## Health Checks

Each service provides health check endpoints:

- Auth: http://localhost:8081/health
- Task: http://localhost:8082/health
- Analyzer: http://localhost:8083/health
- Gateway: http://localhost:8084/health

## Benefits

✅ **No Port Conflicts**: All services can run simultaneously  
✅ **Clear Separation**: Each service has its own dedicated port  
✅ **Easy Development**: Start/stop individual services independently  
✅ **Consistent URLs**: Predictable port assignments across environments  
✅ **Gateway Integration**: Unified API access through port 8084  

## Environment Variables

For containerized deployments, use these environment variables:

```bash
AUTH_SERVICE_PORT=8081
TASK_SERVICE_PORT=8082
ANALYZER_SERVICE_PORT=8083
GATEWAY_SERVICE_PORT=8084
```
