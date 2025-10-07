# Service Configuration Contract

**Version**: 1.0.0
**Format**: JSON Schema
**Purpose**: Define the structure for service configuration data

## Service Configuration Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "TaskConverterAI Service Configuration",
  "type": "object",
  "required": ["applicationTitle", "services"],
  "properties": {
    "applicationTitle": {
      "type": "string",
      "minLength": 1,
      "maxLength": 100,
      "description": "Main application title displayed on homepage"
    },
    "logoUrl": {
      "type": "string",
      "format": "uri-reference",
      "description": "Relative or absolute URL to application logo"
    },
    "description": {
      "type": "string",
      "maxLength": 500,
      "description": "Application description for metadata"
    },
    "lastUpdated": {
      "type": "string",
      "format": "date-time",
      "description": "ISO 8601 timestamp of last configuration update"
    },
    "services": {
      "type": "array",
      "minItems": 1,
      "items": {
        "$ref": "#/definitions/Service"
      },
      "description": "Array of available microservices"
    }
  },
  "definitions": {
    "Service": {
      "type": "object",
      "required": ["id", "name", "description", "openApiUrl", "documentationUrl"],
      "properties": {
        "id": {
          "type": "string",
          "pattern": "^[a-z0-9-]+$",
          "minLength": 1,
          "maxLength": 50,
          "description": "Unique service identifier (lowercase, alphanumeric, hyphens)"
        },
        "name": {
          "type": "string",
          "minLength": 1,
          "maxLength": 50,
          "description": "Human-readable service name"
        },
        "description": {
          "type": "string",
          "minLength": 1,
          "maxLength": 200,
          "description": "Brief description of service functionality"
        },
        "openApiUrl": {
          "type": "string",
          "format": "uri-reference",
          "description": "Relative or absolute URL to OpenAPI specification"
        },
        "documentationUrl": {
          "type": "string",
          "format": "uri-reference",
          "description": "Relative or absolute URL to service documentation page"
        },
        "status": {
          "type": "string",
          "enum": ["active", "inactive", "maintenance"],
          "default": "active",
          "description": "Service availability status"
        },
        "version": {
          "type": "string",
          "pattern": "^\\d+\\.\\d+\\.\\d+$",
          "description": "Semantic version of the service"
        },
        "tags": {
          "type": "array",
          "items": {
            "type": "string",
            "minLength": 1,
            "maxLength": 20
          },
          "uniqueItems": true,
          "description": "Categorization tags for filtering"
        }
      }
    }
  }
}
```

## Example Configuration

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
    },
    {
      "id": "user-management",
      "name": "User Management Service",
      "description": "Handles user authentication and profile management",
      "openApiUrl": "services/openapi/user-management-openapi.json",
      "documentationUrl": "services/user-management.html",
      "status": "active",
      "version": "2.1.0",
      "tags": ["auth", "users"]
    }
  ]
}
```

## File Naming Conventions

### Service Documentation Pages
- Pattern: `services/{service-id}.html`
- Example: `services/test-service.html`

### OpenAPI Specifications
- Pattern: `services/openapi/{service-id}-openapi.json`
- Example: `services/openapi/test-service-openapi.json`

### Configuration Location
- Embedded in: `js/main.js` (as JavaScript object)
- Or external: `config/services.json` (if separate file preferred)

## Usage Contract

### JavaScript API

The main.js file must expose these functions:

```javascript
// Load and validate service configuration
loadServiceConfig(): Promise<ServiceConfiguration>

// Render service cards from configuration
renderServiceCards(services: Service[]): void

// Navigate to service documentation
navigateToService(serviceId: string): void

// Handle service status display
updateServiceStatus(serviceId: string, status: string): void
```

### DOM Requirements

Required HTML elements in index.html:

```html
<!-- Service cards container -->
<div id="service-cards-container"></div>

<!-- Loading indicator -->
<div id="loading-indicator"></div>

<!-- Error message container -->
<div id="error-message"></div>
```

### CSS Classes

Required CSS classes for styling:

```css
.service-card { /* Service card styling */ }
.service-card--active { /* Active service state */ }
.service-card--inactive { /* Inactive service state */ }
.service-card--maintenance { /* Maintenance service state */ }
.service-card__title { /* Service name styling */ }
.service-card__description { /* Service description styling */ }
.service-card__status { /* Status indicator styling */ }
```

This contract ensures consistent integration between configuration, JavaScript logic, and presentation layers.
