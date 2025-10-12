# Gateway Service Configuration

## Port Assignments

| Service  | Port | URL |
|----------|------|-----|
| Auth     | 8081 | http://localhost:8081 |
| Task     | 8082 | http://localhost:8082 |
| Analyzer | 8083 | http://localhost:8083 |
| Gateway  | 8084 | http://localhost:8084 |

## Backend Service Routing

The gateway service (running on port 8084) should be configured to route requests to backend services as follows:

### Auth Service Routes
- `/api/auth/*` → `http://localhost:8081/auth/*`

### Task Service Routes  
- `/api/tasks/*` → `http://localhost:8082/tasks/*`

### Analyzer Service Routes
- `/api/analyzer/*` → `http://localhost:8083/*`

## Environment Configuration

```bash
# Gateway Service Configuration
GATEWAY_PORT=8084

# Backend Services
AUTH_SERVICE_URL=http://localhost:8081
TASK_SERVICE_URL=http://localhost:8082
ANALYZER_SERVICE_URL=http://localhost:8083
```

## Development Server Startup

To run all services with their dedicated ports:

```bash
# Terminal 1 - Auth Service
cd auth-service && npm start --port=8081

# Terminal 2 - Task Service  
cd task-service && npm start --port=8082

# Terminal 3 - Analyzer Service
cd analyzer-service && npm start --port=8083

# Terminal 4 - Gateway Service
cd gateway-service && npm start --port=8084
```

## Service Health Checks

With the new port configuration, health check URLs are:

- Auth Service: http://localhost:8081/health
- Task Service: http://localhost:8082/health  
- Analyzer Service: http://localhost:8083/health
- Gateway Service: http://localhost:8084/health
