/*
 * IXYS Distributor Website - Main JavaScript
 * General functionality and utility functions
 */

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize main functionality
    initializeNavigation();
    initializeAccessibilityFeatures();
    initializePerformanceFeatures();
});

// Initialize Navigation
function initializeNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const isExpanded = navMenu.classList.contains('active');
            navToggle.setAttribute('aria-expanded', isExpanded);
        });
    }
}

// Initialize Accessibility Features
function initializeAccessibilityFeatures() {
    // Add focus indicators for keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Ensure landmark roles are properly set
    ensureLandmarks();
}

// Ensure landmark roles for accessibility
function ensureLandmarks() {
    // Header should have banner role (already set in HTML)
    // Navigation should have navigation role (already set in HTML)
    // Main content should have main role (already set in HTML)
    // Footer should have contentinfo role (already set in HTML)
    
    // Add label to search if present
    const searchInputs = document.querySelectorAll('input[type="search"], input[role="search"]');
    searchInputs.forEach(input => {
        if (!input.getAttribute('aria-label')) {
            input.setAttribute('aria-label', 'Search');
        }
    });
}

// Initialize Performance Features
function initializePerformanceFeatures() {
    // Implement lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Optimize loading for non-critical CSS
    loadNonCriticalCSS();
}

// Load non-critical CSS asynchronously
function loadNonCriticalCSS() {
    // In a real implementation, we would load non-critical CSS here
    // For this static site, all CSS is loaded in the head
}

// Utility function to check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to handle smooth scrolling
function smoothScrollTo(target) {
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}