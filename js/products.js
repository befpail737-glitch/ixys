/*
 * IXYS Distributor Website - Product JavaScript
 * Product-specific functionality and interactivity
 */

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize product-specific functionality
    initializeProductFilters();
    initializeProductTable();
    initializeFaqs();
    initializeTabNavigation();
});

// Initialize product filters
function initializeProductFilters() {
    const searchInput = document.querySelector('.search-box input');
    const filterSelects = document.querySelectorAll('.filter');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            filterProductTable();
        });
    }
    
    if (filterSelects.length > 0) {
        filterSelects.forEach(select => {
            select.addEventListener('change', function() {
                filterProductTable();
            });
        });
    }
}

// Filter product table based on search and filters
function filterProductTable() {
    const table = document.querySelector('.product-table tbody');
    const rows = table.querySelectorAll('tr');
    const searchTerm = document.querySelector('.search-box input').value.toLowerCase();
    const seriesFilter = document.querySelector('.filter:nth-child(1)').value;
    const voltageFilter = document.querySelector('.filter:nth-child(2)').value;
    
    rows.forEach(row => {
        const model = row.cells[0].textContent.toLowerCase();
        const series = row.cells[1].textContent.toLowerCase();
        const voltage = row.cells[2].textContent.toLowerCase();
        
        let showRow = true;
        
        // Apply search filter
        if (searchTerm && !model.includes(searchTerm)) {
            showRow = false;
        }
        
        // Apply series filter
        if (seriesFilter && !series.includes(seriesFilter)) {
            showRow = false;
        }
        
        // Apply voltage filter
        if (voltageFilter) {
            let voltageMatch = false;
            const voltageValue = parseFloat(voltage.replace('V', ''));
            
            if (voltageFilter === 'low' && voltageValue <= 120) {
                voltageMatch = true;
            } else if (voltageFilter === 'medium' && voltageValue >= 200 && voltageValue <= 600) {
                voltageMatch = true;
            } else if (voltageFilter === 'high' && voltageValue > 600) {
                voltageMatch = true;
            }
            
            if (!voltageMatch) {
                showRow = false;
            }
        }
        
        row.style.display = showRow ? '' : 'none';
    });
}

// Initialize product table functionality
function initializeProductTable() {
    const table = document.querySelector('.product-table');
    if (!table) return;
    
    // Add sorting functionality to headers
    const headers = table.querySelectorAll('th');
    headers.forEach((header, index) => {
        header.style.cursor = 'pointer';
        header.addEventListener('click', () => {
            sortTableByColumn(index);
        });
    });
}

// Sort table by column
function sortTableByColumn(columnIndex) {
    const table = document.querySelector('.product-table');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    // Determine if we're sorting by numeric or text values
    const isNumeric = !isNaN(rows[0].cells[columnIndex].textContent.replace(/[^\d.-]/g, ''));
    
    rows.sort((a, b) => {
        const aVal = a.cells[columnIndex].textContent;
        const bVal = b.cells[columnIndex].textContent;
        
        if (isNumeric) {
            return parseFloat(aVal.replace(/[^\d.-]/g, '')) - parseFloat(bVal.replace(/[^\d.-]/g, ''));
        } else {
            return aVal.localeCompare(bVal);
        }
    });
    
    // Append sorted rows back to tbody
    rows.forEach(row => tbody.appendChild(row));
}

// Initialize FAQ accordions
function initializeFaqs() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('h4');
        
        if (question) {
            question.style.cursor = 'pointer';
            question.addEventListener('click', () => {
                const answer = item.querySelector('p');
                const isVisible = answer.style.display === 'block';
                
                // Close all FAQs
                document.querySelectorAll('.faq-item p').forEach(p => {
                    p.style.display = 'none';
                });
                
                // Toggle clicked FAQ
                answer.style.display = isVisible ? 'none' : 'block';
            });
        }
    });
}

// Initialize tab navigation for product detail pages
function initializeTabNavigation() {
    const tabButtons = document.querySelectorAll('[role="tab"]');
    const tabPanels = document.querySelectorAll('[role="tabpanel"]');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            
            // Remove active state from all buttons and panels
            tabButtons.forEach(btn => btn.setAttribute('aria-selected', 'false'));
            tabPanels.forEach(panel => panel.setAttribute('hidden', 'true'));
            
            // Set active state for clicked button and associated panel
            this.setAttribute('aria-selected', 'true');
            document.getElementById(targetId).removeAttribute('hidden');
        });
    });
}

// Function to add product to comparison
function addProductToComparison(productId) {
    // Get existing comparison list from localStorage or create new one
    let comparisonList = JSON.parse(localStorage.getItem('productComparison')) || [];
    
    // Add product if not already in list
    if (!comparisonList.includes(productId)) {
        comparisonList.push(productId);
        localStorage.setItem('productComparison', JSON.stringify(comparisonList));
        
        // Update UI to reflect added product
        updateComparisonUI();
    }
}

// Function to update comparison UI
function updateComparisonUI() {
    const comparisonCount = document.querySelector('.comparison-count');
    const comparisonList = JSON.parse(localStorage.getItem('productComparison')) || [];
    
    if (comparisonCount) {
        comparisonCount.textContent = comparisonList.length;
    }
}

// Initialize comparison functionality
document.addEventListener('DOMContentLoaded', function() {
    updateComparisonUI();
    
    // Add event listeners to comparison buttons
    const compareButtons = document.querySelectorAll('.compare-btn');
    compareButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');
            addProductToComparison(productId);
        });
    });
});