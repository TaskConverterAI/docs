// Service configuration - Single test service for MVP
const serviceConfig = {
    applicationTitle: "TaskConverterAI",
    description: "Central access point for TaskConverterAI microservices",
    lastUpdated: "2025-10-07T00:00:00Z",
    services: [
        {
            id: "test-service",
            name: "Test Service",
            description: "Example service for demonstrating OpenAPI documentation and TaskConverterAI functionality",
            openApiUrl: "services/openapi/test-service-openapi.yml",
            documentationUrl: "services/test-service.html",
            status: "active",
            version: "1.0.0",
            tags: ["demo", "testing", "example"]
        }
    ]
};

// DOM elements
let loadingIndicator;
let errorMessage;
let errorDetails;
let serviceCardsContainer;

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

/**
 * Initialize the application
 */
function initializeApp() {
    // Get DOM elements
    loadingIndicator = document.getElementById('loading-indicator');
    errorMessage = document.getElementById('error-message');
    errorDetails = document.getElementById('error-details');
    serviceCardsContainer = document.getElementById('service-cards-container');

    // Load services
    loadServices();
}

/**
 * Load and display services
 */
function loadServices() {
    try {
        // Simulate loading delay for better UX
        setTimeout(() => {
            // Hide loading indicator
            if (loadingIndicator) {
                loadingIndicator.style.display = 'none';
            }
            
            // Validate configuration
            if (!serviceConfig || !serviceConfig.services || serviceConfig.services.length === 0) {
                throw new Error('No services configured');
            }
            
            // Render service cards
            renderServiceCards(serviceConfig.services);
            
        }, 500); // Small delay to show loading state
        
    } catch (error) {
        console.error('Error loading services:', error);
        showError('Failed to load services: ' + error.message);
    }
}

/**
 * Render service cards from configuration
 * @param {Array} services - Array of service objects
 */
function renderServiceCards(services) {
    if (!serviceCardsContainer) {
        showError('Service cards container not found');
        return;
    }

    // Clear existing content
    serviceCardsContainer.innerHTML = '';
    
    // Create and append service cards
    services.forEach(service => {
        try {
            const card = createServiceCard(service);
            serviceCardsContainer.appendChild(card);
        } catch (error) {
            console.error('Error creating service card:', error);
        }
    });

    // Add empty state if no cards were created
    if (serviceCardsContainer.children.length === 0) {
        serviceCardsContainer.innerHTML = '<p class="empty-state">No services available</p>';
    }
}

/**
 * Create a service card element
 * @param {Object} service - Service configuration object
 * @returns {HTMLElement} Service card element
 */
function createServiceCard(service) {
    // Validate service object
    if (!service || !service.id || !service.name || !service.description) {
        throw new Error('Invalid service configuration');
    }

    // Create card container
    const card = document.createElement('div');
    card.className = 'service-card';
    card.setAttribute('data-service-id', service.id);
    card.setAttribute('role', 'gridcell');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-describedby', `service-${service.id}-description`);

    // Build card HTML
    card.innerHTML = `
        <div class="service-card__header">
            <h3 class="service-card__title">${escapeHtml(service.name)}</h3>
            ${service.status ? `<span class="service-card__status service-card__status--${service.status}" aria-label="Service status: ${service.status}">${service.status}</span>` : ''}
        </div>
        <div class="service-card__content">
            <p id="service-${service.id}-description" class="service-card__description">${escapeHtml(service.description)}</p>
            <div class="service-card__meta">
                ${service.version ? `<span class="service-card__version">v${escapeHtml(service.version)}</span>` : ''}
                <div class="service-card__tags">
                    ${service.tags ? service.tags.map(tag => 
                        `<span class="service-card__tag">${escapeHtml(tag)}</span>`
                    ).join('') : ''}
                </div>
            </div>
        </div>
        <div class="service-card__actions">
            <button class="service-card__button" 
                    aria-label="View documentation for ${escapeHtml(service.name)}"
                    data-url="${escapeHtml(service.documentationUrl)}">
                View Documentation
            </button>
        </div>
    `;

    // Add click handlers
    addCardEventListeners(card, service);

    return card;
}

/**
 * Add event listeners to service card
 * @param {HTMLElement} card - Service card element
 * @param {Object} service - Service configuration object
 */
function addCardEventListeners(card, service) {
    // Click handler for card
    const clickHandler = (event) => {
        // Prevent double navigation if button was clicked
        if (event.target.classList.contains('service-card__button')) {
            return;
        }
        navigateToService(service.documentationUrl);
    };

    // Keyboard handler for accessibility
    const keyHandler = (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            navigateToService(service.documentationUrl);
        }
    };

    // Button click handler
    const buttonHandler = (event) => {
        event.stopPropagation();
        navigateToService(service.documentationUrl);
    };

    // Add event listeners
    card.addEventListener('click', clickHandler);
    card.addEventListener('keydown', keyHandler);
    
    const button = card.querySelector('.service-card__button');
    if (button) {
        button.addEventListener('click', buttonHandler);
    }
}

/**
 * Navigate to service documentation
 * @param {string} url - Documentation URL
 */
function navigateToService(url) {
    if (!url) {
        showError('Documentation URL not specified');
        return;
    }

    try {
        // Add loading indication
        const button = event.target.closest('.service-card').querySelector('.service-card__button');
        if (button) {
            const originalText = button.textContent;
            button.textContent = 'Loading...';
            button.disabled = true;
            
            // Restore button after a delay (in case navigation fails)
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
            }, 3000);
        }

        // Navigate to documentation
        window.location.href = url;
        
    } catch (error) {
        console.error('Navigation error:', error);
        showError('Failed to navigate to documentation: ' + error.message);
    }
}

/**
 * Show error message
 * @param {string} message - Error message to display
 */
function showError(message) {
    // Hide loading indicator
    if (loadingIndicator) {
        loadingIndicator.style.display = 'none';
    }
    
    // Show error message
    if (errorMessage && errorDetails) {
        errorDetails.textContent = message;
        errorMessage.style.display = 'block';
    } else {
        // Fallback to console and alert if DOM elements not available
        console.error('Error:', message);
        alert('Error: ' + message);
    }
}

/**
 * Escape HTML to prevent XSS
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeHtml(text) {
    if (typeof text !== 'string') {
        return '';
    }
    
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

/**
 * Update service status (for future use)
 * @param {string} serviceId - Service ID
 * @param {string} status - New status
 */
function updateServiceStatus(serviceId, status) {
    const card = document.querySelector(`[data-service-id="${serviceId}"]`);
    if (card) {
        const statusElement = card.querySelector('.service-card__status');
        if (statusElement) {
            statusElement.className = `service-card__status service-card__status--${status}`;
            statusElement.textContent = status;
            statusElement.setAttribute('aria-label', `Service status: ${status}`);
        }
    }
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        serviceConfig,
        loadServices,
        renderServiceCards,
        createServiceCard,
        navigateToService,
        updateServiceStatus,
        escapeHtml
    };
}
