/*
 * IXYS Distributor Website - Contact JavaScript
 * Contact form functionality and validation
 */

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize contact form functionality
    initializeContactForm();
});

// Initialize contact form
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (validateContactForm()) {
                // Process form submission
                submitContactForm();
            }
        });
    }
}

// Validate contact form
function validateContactForm() {
    let isValid = true;
    
    // Get form elements
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    
    // Reset previous errors
    clearErrors();
    
    // Validate name
    if (!name.value.trim()) {
        showError(name, 'Name is required');
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
        showError(email, 'Email is required');
        isValid = false;
    } else if (!emailRegex.test(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate subject
    if (!subject.value) {
        showError(subject, 'Please select a subject');
        isValid = false;
    }
    
    // Validate message
    if (!message.value.trim()) {
        showError(message, 'Message is required');
        isValid = false;
    } else if (message.value.trim().length < 10) {
        showError(message, 'Message should be at least 10 characters long');
        isValid = false;
    }
    
    return isValid;
}

// Show error for a form field
function showError(field, message) {
    field.classList.add('error');
    
    // Create error element if it doesn't exist
    let errorElement = field.parentNode.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.style.color = '#ef4444';
        errorElement.style.fontSize = '0.875rem';
        errorElement.style.marginTop = '0.25rem';
        field.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
}

// Clear all errors
function clearErrors() {
    const errorFields = document.querySelectorAll('.error');
    errorFields.forEach(field => field.classList.remove('error'));
    
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(message => message.remove());
}

// Submit contact form
function submitContactForm() {
    // Get form data
    const formData = new FormData(document.getElementById('contactForm'));
    
    // Show loading state
    const submitButton = document.querySelector('.contact-form button');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate form submission
    // In a real implementation, you would send this data to your server
    setTimeout(() => {
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Show success message
        showSuccessMessage();
        
        // Reset form
        document.getElementById('contactForm').reset();
    }, 1500);
}

// Show success message
function showSuccessMessage() {
    // Create success message
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.style.backgroundColor = '#d1fae5';
    successMessage.style.border = '1px solid #a7f3d0';
    successMessage.style.borderRadius = '0.5rem';
    successMessage.style.padding = '1rem';
    successMessage.style.marginTop = '1rem';
    successMessage.style.textAlign = 'center';
    successMessage.style.color = '#065f46';
    successMessage.textContent = 'Thank you for your message! Our team will contact you shortly.';
    
    // Insert after the form
    const form = document.querySelector('.contact-form');
    form.parentNode.insertBefore(successMessage, form.nextSibling);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        if (successMessage.parentNode) {
            successMessage.remove();
        }
    }, 5000);
}

// Initialize other contact page functionality
function initializeContactPage() {
    // Add any additional functionality needed for the contact page
    console.log('Contact page initialized');
}