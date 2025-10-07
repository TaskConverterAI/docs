# HTML Structure Contract

**Version**: 1.0.0
**Purpose**: Define required HTML structure and DOM contracts for TaskConverterAI

## Page Templates

### Main Page (index.html)

Required DOM structure:

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
    <!-- Header section -->
    <header class="app-header">
        <img src="assets/logo.png" alt="TaskConverterAI Logo" class="app-logo">
        <h1 class="app-title">TaskConverterAI</h1>
    </header>

    <!-- Main content area -->
    <main class="main-content">
        <!-- Loading state -->
        <div id="loading-indicator" class="loading-indicator">
            Loading services...
        </div>

        <!-- Error state -->
        <div id="error-message" class="error-message" style="display: none;">
            <h2>Error Loading Services</h2>
            <p id="error-details"></p>
        </div>

        <!-- Service cards container -->
        <div id="service-cards-container" class="service-cards-grid">
            <!-- Dynamic service cards inserted here -->
        </div>
    </main>

    <!-- Footer -->
    <footer class="app-footer">
        <p>&copy; 2025 TaskConverterAI</p>
    </footer>

    <script src="js/main.js"></script>
</body>
</html>
```

### Service Documentation Page Template

Required structure for service pages (e.g., `services/test-service.html`):

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{Service Name} - TaskConverterAI</title>
    <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist/swagger-ui.css">
    <link rel="stylesheet" href="../css/styles.css">
</head>
<body>
    <!-- Navigation header -->
    <header class="service-header">
        <nav class="service-nav">
            <a href="../index.html" class="back-link">← Back to Services</a>
        </nav>
        <h1 class="service-title">{Service Name}</h1>
    </header>

    <!-- Swagger UI container -->
    <main class="service-content">
        <div id="swagger-ui"></div>
    </main>

    <!-- Swagger UI scripts -->
    <script src="https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js"></script>
    <script>
        SwaggerUIBundle({
            url: 'openapi/{service-id}-openapi.json',
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

## Dynamic Content Contracts

### Service Card Template

JavaScript must generate cards with this structure:

```html
<div class="service-card" data-service-id="{service-id}">
    <div class="service-card__header">
        <h3 class="service-card__title">{service-name}</h3>
        <span class="service-card__status service-card__status--{status}">{status}</span>
    </div>
    <div class="service-card__content">
        <p class="service-card__description">{service-description}</p>
        <div class="service-card__meta">
            <span class="service-card__version">v{version}</span>
            <div class="service-card__tags">
                <!-- Tag elements if present -->
                <span class="service-card__tag">{tag}</span>
            </div>
        </div>
    </div>
    <div class="service-card__actions">
        <button class="service-card__button" data-url="{documentation-url}">
            View Documentation
        </button>
    </div>
</div>
```

### Loading States

Required loading indicator structure:

```html
<div class="loading-indicator">
    <div class="loading-spinner"></div>
    <p class="loading-text">Loading services...</p>
</div>
```

### Error States

Required error message structure:

```html
<div class="error-message">
    <div class="error-icon">⚠️</div>
    <h2 class="error-title">Error Loading Services</h2>
    <p class="error-details">{specific-error-message}</p>
    <button class="error-retry" onclick="location.reload()">Retry</button>
</div>
```

## Accessibility Requirements

### ARIA Labels and Roles

```html
<!-- Service cards container -->
<div id="service-cards-container" 
     class="service-cards-grid" 
     role="grid" 
     aria-label="Available microservices">

<!-- Individual service card -->
<div class="service-card" 
     role="gridcell" 
     tabindex="0"
     aria-describedby="service-{id}-description">

<!-- Service status indicator -->
<span class="service-card__status" 
      aria-label="Service status: {status}">

<!-- Documentation button -->
<button class="service-card__button" 
        aria-label="View documentation for {service-name}">
```

### Keyboard Navigation

Required keyboard support:
- Tab navigation through service cards
- Enter/Space to activate service cards
- Escape to return from service pages

### Screen Reader Support

Required content structure:
- Proper heading hierarchy (h1 → h2 → h3)
- Descriptive link text
- Status indicators with text alternatives
- Loading state announcements

## Meta Tags and SEO

Required meta tags in all pages:

```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="{page-description}">
<meta name="keywords" content="microservices, api, documentation, openapi, swagger">
<meta name="author" content="TaskConverterAI">

<!-- Open Graph tags for social sharing -->
<meta property="og:title" content="{page-title}">
<meta property="og:description" content="{page-description}">
<meta property="og:type" content="website">
```

This contract ensures consistent DOM structure for reliable JavaScript interaction and styling.
