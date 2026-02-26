# LITONG Official Website

This is a professional IXYS power device distributor website, providing product information, solutions, technical support, and news updates.

## Website Structure

- **Home Page** (`/index.html`) - Website entrance, showcasing core advantages and product categories
- **Product Center** (`/pages/products/`) - Detailed product categories and specifications
- **Solutions** (`/pages/solutions/`) - Industry application solutions
- **Technical Support** (`/pages/support/`) - Technical documents, selection guides, and FAQs
- **News Center** (`/pages/news/`) - Company news and industry updates
- **About Us** (`/pages/about/`) - Company information and team introduction
- **Contact Us** (`/pages/contact/`) - Contact information and inquiry forms

## Technical Features

- Responsive design, supporting desktop and mobile devices
- SEO optimized, including structured data
- Modular CSS architecture
- Accessibility support
- Fast loading performance

## Local Operation

To preview the website locally, run the following command in the project root directory:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

Or using Node.js:

```bash
npx http-server
```

## Deployment to Cloudflare Pages

1. Connect this code repository to GitHub/GitLab/Bitbucket
2. Create a new project in the Cloudflare Pages console
3. Select your repository and configure build settings
4. Build command: `echo "Build step not required for static site"`
5. Output directory: `./`
6. Deploy!

## File Structure

```
ixys/
├── index.html          # Home page
├── 404.html           # Error page
├── css/               # Style sheets
│   ├── style.css      # Main stylesheet
│   ├── components.css # Component styles
│   ├── layout.css     # Layout styles
│   ├── reset.css      # Reset styles
│   ├── utilities.css  # Utility classes
│   └── variables.css  # CSS variables
├── js/                # JavaScript files
│   └── main.js        # Main script
├── images/            # Image resources
│   ├── logo.svg       # Website logo
│   ├── *.svg          # Icons
│   └── tech-background.svg # Background image
├── pages/             # Content pages
│   ├── products/      # Product pages
│   ├── solutions/     # Solution pages
│   ├── support/       # Technical support pages
│   ├── news/          # News pages
│   ├── about/         # About us pages
│   └── contact/       # Contact us pages
├── robots.txt         # Search engine robot configuration
└── sitemap.xml        # Website map
```

## SEO Optimization

- Each page has unique titles and meta descriptions
- Includes Open Graph tags for social sharing
- Structured data (JSON-LD) enhances search visibility
- Semantic HTML markup
- Responsive design improves mobile experience

## Browser Compatibility

- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile browsers (iOS Safari, Chrome for Android)

## Maintenance Guide

To add new products or content:
1. Create a new HTML file in the appropriate directory
2. Use existing CSS classes to maintain design consistency
3. Add appropriate meta tags and structured data
4. Update the sitemap.xml file
5. Test responsive design and cross-browser compatibility