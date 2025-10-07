# Data Model: TaskConverterAI Service Gateway

**Purpose**: Define data structures and relationships for service management
**Created**: 2025-10-07
**Feature**: TaskConverterAI Service Gateway

## Core Entities

### Service

Represents a microservice in the TaskConverterAI ecosystem.

**Fields**:
- `id` (string, required): Unique identifier for the service
- `name` (string, required): Display name of the service
- `description` (string, required): Brief description of service functionality
- `openApiUrl` (string, required): URL to OpenAPI specification file
- `documentationUrl` (string, required): URL to service documentation page
- `status` (string, optional): Service availability status ("active", "inactive", "maintenance")
- `version` (string, optional): Service version for display
- `tags` (array of strings, optional): Categorization tags

**Validation Rules**:
- `id` must be unique across all services
- `name` must be non-empty and max 50 characters
- `description` must be non-empty and max 200 characters
- `openApiUrl` must be valid URL pointing to JSON file
- `documentationUrl` must be valid relative or absolute URL
- `status` must be one of predefined values if provided

**Example**:
```json
{
  "id": "test-service",
  "name": "Test Service",
  "description": "Example service for demonstrating OpenAPI documentation",
  "openApiUrl": "services/openapi/test-service-openapi.json",
  "documentationUrl": "services/test-service.html",
  "status": "active",
  "version": "1.0.0",
  "tags": ["demo", "testing"]
}
```

### ServiceConfiguration

Container for all service definitions and application settings.

**Fields**:
- `services` (array of Service, required): List of all available services
- `applicationTitle` (string, required): Main application title
- `logoUrl` (string, optional): URL to application logo
- `description` (string, optional): Application description
- `lastUpdated` (string, optional): ISO date of last configuration update

**Validation Rules**:
- `services` array must contain at least one service
- `applicationTitle` must be non-empty
- `logoUrl` must be valid URL if provided
- `lastUpdated` must be valid ISO date format if provided

**Example**:
```json
{
  "applicationTitle": "TaskConverterAI",
  "logoUrl": "assets/logo.png",
  "description": "Central access point for TaskConverterAI microservices",
  "lastUpdated": "2025-10-07T00:00:00Z",
  "services": [
    {
      "id": "test-service",
      "name": "Test Service",
      "description": "Example service for demonstrating OpenAPI documentation",
      "openApiUrl": "services/openapi/test-service-openapi.json",
      "documentationUrl": "services/test-service.html",
      "status": "active",
      "version": "1.0.0",
      "tags": ["demo", "testing"]
    }
  ]
}
```

## State Management

### Service Card States

Service cards can exist in multiple visual states:

1. **Default**: Service is available and operational
2. **Loading**: Service information is being fetched
3. **Error**: Service is unavailable or configuration invalid
4. **Maintenance**: Service is temporarily unavailable

**State Transitions**:
- Default → Loading: When user clicks card
- Loading → Default: When documentation loads successfully
- Loading → Error: When documentation fails to load
- Any state → Maintenance: When service status is set to "maintenance"

### Application States

1. **Loading**: Initial service configuration loading
2. **Ready**: Services loaded and cards displayed
3. **Error**: Configuration failed to load
4. **Empty**: No services configured

## Data Flow

### Service Discovery Flow

1. Application loads `main.js`
2. JavaScript fetches service configuration (embedded or external)
3. Configuration is validated against data model
4. Service cards are rendered for each valid service
5. Invalid services are logged but not displayed

### Documentation Navigation Flow

1. User clicks service card
2. Application validates documentation URL
3. Navigation occurs to service documentation page
4. Swagger UI loads OpenAPI specification
5. Documentation is rendered for user interaction

## File Structure Mapping

```
Configuration: js/main.js (embedded) or config/services.json
Service Pages: services/{service-id}.html
OpenAPI Specs: services/openapi/{service-id}-openapi.json
```

This data model supports the core functionality while maintaining simplicity and static delivery principles.
