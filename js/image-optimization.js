/*
 * IXYS Distributor Website - Image Optimization
 * JavaScript for image format optimization and lazy loading
 */

document.addEventListener('DOMContentLoaded', function() {
    // Set up image optimization features
    setupImageOptimization();
});

// Set up image optimization features
function setupImageOptimization() {
    // Convert images to use srcset for responsive loading
    setupResponsiveImages();
    
    // Implement lazy loading for offscreen images
    setupLazyLoading();
    
    // Try to detect WebP support and update image sources accordingly
    updateImageFormats();
}

// Set up responsive images with srcset
function setupResponsiveImages() {
    // Find all images and create responsive srcset
    const images = document.querySelectorAll('img[data-srcset-original]');
    
    images.forEach(img => {
        const originalSrcset = img.getAttribute('data-srcset-original');
        if (originalSrcset) {
            img.setAttribute('srcset', originalSrcset);
        }
    });
}

// Set up lazy loading for images
function setupLazyLoading() {
    // Use native loading="lazy" attribute where supported
    const lazyImages = document.querySelectorAll('img[data-src]:not([loading])');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Set the actual image source
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    
                    if (img.dataset.srcset) {
                        img.srcset = img.dataset.srcset;
                    }
                    
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(function(img) {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for older browsers - just load all images
        lazyImages.forEach(function(img) {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
    }
}

// Update image formats based on browser support
function updateImageFormats() {
    // Check for WebP support
    checkWebPSupport(function(supportsWebP) {
        if (supportsWebP) {
            // Update image sources to WebP where possible
            const images = document.querySelectorAll('img[data-webp]');
            
            images.forEach(img => {
                // Only update if the image hasn't been loaded yet
                if (!img.src || img.src === window.location.href) {
                    img.src = img.getAttribute('data-webp');
                } else {
                    // For already loaded images, update the src attribute
                    img.setAttribute('data-original-src', img.src);
                    img.src = img.getAttribute('data-webp');
                }
            });
        }
    });
}

// Check if browser supports WebP
function checkWebPSupport(callback) {
    const webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
}