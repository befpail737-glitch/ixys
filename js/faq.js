/*
 * IXYS Distributor Website - FAQ JavaScript
 * FAQ accordion functionality and filtering
 */

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize FAQ functionality
    initializeFaqAccordion();
    initializeFaqFiltering();
});

// Initialize FAQ accordion
function initializeFaqAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            
            // Toggle open class on question
            this.classList.toggle('open');
            
            // Toggle open class on answer
            answer.classList.toggle('open');
            
            // Get current height for smooth animation
            if (answer.classList.contains('open')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = '0';
            }
        });
    });
}

// Initialize FAQ filtering
function initializeFaqFiltering() {
    const categoryButtons = document.querySelectorAll('.faq-category');
    const faqItems = document.querySelectorAll('.faq-item');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get selected category
            const selectedCategory = this.getAttribute('data-category');
            
            // Filter FAQ items
            faqItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (selectedCategory === 'all' || itemCategory === selectedCategory) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
}

// Function to expand all FAQ items
function expandAllFaqs() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        if (!question.classList.contains('open')) {
            question.click();
        }
    });
}

// Function to collapse all FAQ items
function collapseAllFaqs() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        if (question.classList.contains('open')) {
            question.click();
        }
    });
}

// Initialize other FAQ page functionality
function initializeFaqPage() {
    // Add any additional functionality needed for the FAQ page
    console.log('FAQ page initialized');
}