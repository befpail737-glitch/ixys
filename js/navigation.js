/*
 * IXYS Distributor Website - Navigation JavaScript
 * Navigation-specific functionality and loading animations
 */

// Initialize navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    setupLoadingAnimation();
    setupMobileNavigation();
    setupDropdownMenus();
    setupCurrentPageHighlight();
    setupHeaderScrollEffect();
});

// Set up loading animation
function setupLoadingAnimation() {
    // Hide loading overlay after page load
    const loadingOverlay = document.getElementById('loadingOverlay');

    if (loadingOverlay) {
        // Wait for content to be visible before hiding loading overlay
        window.addEventListener('load', function() {
            setTimeout(function() {
                loadingOverlay.classList.add('hidden');

                // Add fade-in class to main content
                document.querySelector('main')?.classList.add('fade-in');
            }, 500);
        });
    }
}

// Set up mobile navigation toggle
function setupMobileNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        // Set initial ARIA attributes
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.setAttribute('aria-hidden', 'true');
        
        navToggle.addEventListener('click', function() {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.setAttribute('aria-hidden', isExpanded);
            
            // Toggle active class for styling
            navMenu.classList.toggle('active');
        });
    }
}

// Set up dropdown menus (if any)
function setupDropdownMenus() {
    // Check for dropdown menus (not implemented in current design)
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            
            const dropdown = this.nextElementSibling;
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            this.setAttribute('aria-expanded', !isExpanded);
            dropdown.hidden = isExpanded;
        });
    });
}

// Set up current page highlighting
function setupCurrentPageHighlight() {
    // Get current URL and highlight matching navigation item
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        // Convert relative URLs to absolute for comparison
        const linkPath = new URL(link.href).pathname;
        
        // Remove any trailing slashes for comparison
        const normalizedCurrentPath = currentPath.replace(/\/$/, '');
        const normalizedLinkPath = linkPath.replace(/\/$/, '');
        
        if (normalizedCurrentPath === normalizedLinkPath) {
            link.setAttribute('aria-current', 'page');
        } else {
            link.removeAttribute('aria-current');
        }
    });
}

// Close mobile menu when clicking on a link
function setupMobileMenuClosing() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('.nav-toggle');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu && navToggle) {
                // Close the menu
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                navMenu.setAttribute('aria-hidden', 'true');
            }
        });
    });
}

// Setup header scroll effect
function setupHeaderScrollEffect() {
    const header = document.querySelector('.main-header');

    if (header) {
        let ticking = false;

        function updateHeader() {
            if (window.scrollY > 10) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            ticking = false;
        }

        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        }

        window.addEventListener('scroll', requestTick);
    }
}

// Initialize the mobile menu closing functionality
document.addEventListener('DOMContentLoaded', setupMobileMenuClosing);

// Handle keyboard navigation for accessibility
function setupKeyboardNavigation() {
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach((link, index) => {
        // Set tabindex for navigation links
        link.setAttribute('tabindex', '0');

        // Handle arrow key navigation
        link.addEventListener('keydown', function(e) {
            let targetIndex;

            switch(e.key) {
                case 'ArrowRight':
                case 'ArrowDown':
                    e.preventDefault();
                    targetIndex = (index + 1) % navLinks.length;
                    navLinks[targetIndex].focus();
                    break;

                case 'ArrowLeft':
                case 'ArrowUp':
                    e.preventDefault();
                    targetIndex = (index - 1 + navLinks.length) % navLinks.length;
                    navLinks[targetIndex].focus();
                    break;

                case 'Home':
                    e.preventDefault();
                    navLinks[0].focus();
                    break;

                case 'End':
                    e.preventDefault();
                    navLinks[navLinks.length - 1].focus();
                    break;
            }
        });
    });
}

// Initialize keyboard navigation
document.addEventListener('DOMContentLoaded', setupKeyboardNavigation);