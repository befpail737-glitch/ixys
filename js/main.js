// Main JavaScript file for IXYS Agent Website

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
  const navbarToggle = document.querySelector('.js-navbar-toggle');
  const navbarMenu = document.querySelector('.js-navbar-menu');

  if (navbarToggle && navbarMenu) {
    navbarToggle.addEventListener('click', function() {
      navbarMenu.classList.toggle('show');
    });
  }

  // Tab functionality
  const tabContainer = document.querySelector('.js-tab-container');
  if (tabContainer) {
    const tabButtons = tabContainer.querySelectorAll('.js-tab-button');
    const tabPanels = tabContainer.querySelectorAll('.js-tab-panel');

    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons and panels
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanels.forEach(panel => panel.classList.remove('active'));

        // Add active class to clicked button
        button.classList.add('active');

        // Show corresponding panel
        const targetPanel = document.getElementById(button.dataset.target);
        if (targetPanel) {
          targetPanel.classList.add('active');
        }
      });
    });
  }

  // Accordion functionality
  const accordionHeaders = document.querySelectorAll('.js-accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const accordionItem = this.parentElement;
      const accordionBody = accordionItem.querySelector('.js-accordion-body');

      accordionItem.classList.toggle('active');
      accordionBody.classList.toggle('show');
    });
  });

  // Form submission handling
  const inquiryForms = document.querySelectorAll('.js-inquiry-form');
  inquiryForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      // Simple validation
      let isValid = true;
      const requiredFields = form.querySelectorAll('[required]');

      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('is-invalid');
        } else {
          field.classList.remove('is-invalid');
        }
      });

      if (isValid) {
        // In a real implementation, you would submit the form
        alert('Inquiry submitted successfully! Our team will contact you shortly.');
        form.reset();
      } else {
        alert('Please fill in all required fields.');
      }
    });
  });
});