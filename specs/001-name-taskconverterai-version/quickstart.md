# Quickstart Guide: TaskConverterAI Service Gateway

**Purpose**: Get TaskConverterAI running locally and deploy to GitHub Pages
**Created**: 2025-10-07
**Prerequisites**: Modern web browser, text editor, GitHub account

## Quick Setup (2 minutes)

### 1. Create Project Structure

```bash
mkdir taskconverterai
cd taskconverterai

# Create directory structure
mkdir -p assets css js services/openapi

# Create required files
touch index.html
touch css/styles.css
touch js/main.js
touch services/test-service.html
touch services/openapi/test-service-openapi.json
```

### 2. Basic HTML Setup

Create `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TaskConverterAI</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <header class="app-header">
        <h1 class="app-title">TaskConverterAI</h1>
    </header>

    <main class="main-content">
        <div id="loading-indicator" class="loading-indicator">Loading services...</div>
        <div id="error-message" class="error-message" style="display: none;"></div>
        <div id="service-cards-container" class="service-cards-grid"></div>
    </main>

    <script src="js/main.js"></script>
</body>
</html>
```

### 3. Basic Styling

Create `css/styles.css`:

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    color: #333;
    background: #f5f5f5;
}

.app-header {
    background: #fff;
    padding: 2rem;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.app-title {
    color: #2c3e50;
    font-size: 2.5rem;
}

.main-content {
    max-width: 1200px;
    margin: 2rem auto;
    padding: 0 1rem;
}

.service-cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
}

.service-card {
    background: #fff;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    transition: transform 0.2s;
    cursor: pointer;
}

.service-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.service-card__title {
    font-size: 1.25rem;
    color: #2c3e50;
    margin-bottom: 0.5rem;
}

.service-card__description {
    color: #666;
    margin-bottom: 1rem;
}

.service-card__button {
    background: #3498db;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
}

.service-card__button:hover {
    background: #2980b9;
}

.loading-indicator {
    text-align: center;
    padding: 2rem;
    color: #666;
}

.error-message {
    background: #e74c3c;
    color: white;
    padding: 1rem;
    border-radius: 4px;
    text-align: center;
}
```

### 4. Basic JavaScript

Create `js/main.js`:

```javascript
// Service configuration
const serviceConfig = {
    applicationTitle: "TaskConverterAI",
    services: [
        {
            id: "test-service",
            name: "Test Service",
            description: "Example service for demonstrating OpenAPI documentation",
            openApiUrl: "services/openapi/test-service-openapi.json",
            documentationUrl: "services/test-service.html",
            status: "active",
            version: "1.0.0"
        }
    ]
};

// DOM elements
const loadingIndicator = document.getElementById('loading-indicator');
const errorMessage = document.getElementById('error-message');
const serviceCardsContainer = document.getElementById('service-cards-container');

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    loadServices();
});

function loadServices() {
    try {
        // Hide loading indicator
        loadingIndicator.style.display = 'none';
        
        // Render service cards
        renderServiceCards(serviceConfig.services);
    } catch (error) {
        showError('Failed to load services: ' + error.message);
    }
}

function renderServiceCards(services) {
    serviceCardsContainer.innerHTML = '';
    
    services.forEach(service => {
        const card = createServiceCard(service);
        serviceCardsContainer.appendChild(card);
    });
}

function createServiceCard(service) {
    const card = document.createElement('div');
    card.className = 'service-card';
    card.innerHTML = `
        <h3 class="service-card__title">${service.name}</h3>
        <p class="service-card__description">${service.description}</p>
        <button class="service-card__button" onclick="navigateToService('${service.documentationUrl}')">
            View Documentation
        </button>
    `;
    return card;
}

function navigateToService(url) {
    window.location.href = url;
}

function showError(message) {
    loadingIndicator.style.display = 'none';
    errorMessage.style.display = 'block';
    errorMessage.innerHTML = `
        <h2>Error</h2>
        <p>${message}</p>
    `;
}
```

### 5. Test Service Page

Create `services/test-service.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test Service - TaskConverterAI</title>
    <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist/swagger-ui.css">
    <style>
        body { margin: 0; font-family: sans-serif; }
        .header { background: #fff; padding: 1rem; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .back-link { color: #3498db; text-decoration: none; }
        .back-link:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <div class="header">
        <a href="../index.html" class="back-link">← Back to Services</a>
        <h1>Test Service Documentation</h1>
    </div>
    <div id="swagger-ui"></div>

    <script src="https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js"></script>
    <script>
        SwaggerUIBundle({
            url: 'openapi/test-service-openapi.json',
            dom_id: '#swagger-ui',
            presets: [
                SwaggerUIBundle.presets.apis,
                SwaggerUIBundle.presets.standalone
            ]
        });
    </script>
</body>
</html>
```

### 6. Sample OpenAPI Spec

Create `services/openapi/test-service-openapi.json`:

```json
{
  "openapi": "3.0.0",
  "info": {
    "title": "Test Service API",
    "description": "Example service for TaskConverterAI demonstration",
    "version": "1.0.0"
  },
  "servers": [
    {
      "url": "https://api.example.com/v1",
      "description": "Production server"
    }
  ],
  "paths": {
    "/health": {
      "get": {
        "summary": "Health check",
        "description": "Returns service health status",
        "responses": {
          "200": {
            "description": "Service is healthy",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "string",
                      "example": "ok"
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
```

## Testing Locally

### Option 1: Simple Python Server

```bash
# Python 3
python -m http.server 8000

# Visit http://localhost:8000
```

### Option 2: Node.js Server

```bash
# Install globally
npm install -g http-server

# Run server
http-server

# Visit http://localhost:8080
```

### Option 3: VS Code Live Server

1. Install "Live Server" extension in VS Code
2. Right-click `index.html` → "Open with Live Server"

## GitHub Pages Deployment

### 1. Create Repository

```bash
git init
git add .
git commit -m "Initial TaskConverterAI setup"
git remote add origin https://github.com/yourusername/taskconverterai.git
git push -u origin main
```

### 2. Enable GitHub Pages

1. Go to repository settings
2. Scroll to "Pages" section
3. Select "Deploy from a branch"
4. Choose "main" branch, "/ (root)" folder
5. Click "Save"

### 3. Access Your Site

Your site will be available at:
`https://yourusername.github.io/taskconverterai/`

## Adding New Services

### 1. Update Configuration

Add to `serviceConfig.services` array in `js/main.js`:

```javascript
{
    id: "user-service",
    name: "User Management Service",
    description: "Handles user authentication and profiles",
    openApiUrl: "services/openapi/user-service-openapi.json",
    documentationUrl: "services/user-service.html",
    status: "active",
    version: "2.0.0"
}
```

### 2. Create Service Page

Copy `services/test-service.html` to `services/user-service.html` and update:
- Page title
- OpenAPI URL reference
- Service name in header

### 3. Add OpenAPI Specification

Create `services/openapi/user-service-openapi.json` with your service's API specification.

## Next Steps

- **Customize styling**: Modify `css/styles.css` for your brand
- **Add logo**: Place logo file in `assets/` and update HTML
- **Configure services**: Add your actual microservices to the configuration
- **Set up CI/CD**: Automate deployment with GitHub Actions

Your TaskConverterAI service gateway is now ready to use!
