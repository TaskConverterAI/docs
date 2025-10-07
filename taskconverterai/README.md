# TaskConverterAI - Local Development Setup

## Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Python 3.x OR Node.js (for local HTTP server)

### Local Development Commands

#### Option 1: Python (Most systems have this)
```bash
cd taskconverterai
python -m http.server 8000
```
Then visit: http://localhost:8000

#### Option 2: Node.js
```bash
cd taskconverterai
npx http-server
```
Then visit: http://localhost:8080

#### Option 3: VS Code Live Server
1. Install "Live Server" extension in VS Code
2. Right-click `index.html` → "Open with Live Server"

## Project Structure

```
taskconverterai/
├── index.html                          # Main page
├── assets/                             # Static assets
├── css/
│   └── styles.css                      # Main stylesheet
├── js/
│   └── main.js                         # JavaScript logic
└── services/
    ├── test-service.html               # Service documentation
    └── openapi/
        └── test-service-openapi.yml    # OpenAPI spec
```

## Testing the Application

1. Start local server using one of the options above
2. Open browser and navigate to the local URL
3. Verify main page loads with service card
4. Click service card to navigate to documentation
5. Verify Swagger UI loads with API specification
6. Test back navigation to main page

## Adding New Services

1. Add service definition to `js/main.js` configuration
2. Create service HTML page in `services/`
3. Add OpenAPI specification in `services/openapi/`

That's it! No build process required - all files are static.
