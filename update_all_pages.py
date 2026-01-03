import os
import re

# Define the files to update
html_files = [
    'index.html',
    'faq.html',
    'test-design.html',
    'about/index.html',
    'contact/index.html',
    'news/index.html',
    'news/ixys-new-igbt-series.html',
    'products/diodes.html',
    'products/igbt-modules.html',
    'products/power-mosfets.html',
    'products/rectifier-bridges.html',
    'products/thyristors.html',
    'solutions/industrial-motor-control.html',
    'solutions/renewable-energy.html',
    'solutions/ups-power-systems.html',
    'support/index.html',
    'support/application-notes/how-to-select-ixys-igbt-motor-drive.html'
]

# Define the CSS additions
css_additions = '''
    <link rel="stylesheet" href="../css/grid-system.css">
    <link rel="stylesheet" href="../css/feature-grid.css">
    <link rel="stylesheet" href="../css/cta-section.css">
    <link rel="stylesheet" href="../css/animations.css">

    <!-- Preload critical font -->
    <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"></noscript>

    <!-- Optimized Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=optional" rel="stylesheet">
'''

# Define the loading overlay HTML
loading_overlay = '''
    <!-- Loading Overlay -->
    <div class="loading-overlay" id="loadingOverlay">
        <div class="loading-spinner"></div>
        <div class="loading-text">Loading IXYS Solutions...</div>
    </div>
'''

# Define the JavaScript additions
js_additions = '''
    <script src="../js/image-optimization.js"></script>
'''

# Define the updated logo tag
updated_logo = '                        <img data-src="../images/logo.svg" data-webp="../images/logo.webp" alt="LiTong Logo - Official IXYS Distributor" width="150" height="50">'

def update_html_file(file_path):
    """Updates a single HTML file with the new CSS, loading overlay, JS, and logo changes."""
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()
        
        # Add CSS additions before the closing head tag
        content = re.sub(r'(<link[^>]*rel="stylesheet"[^>]*>\s*</head>)', f'{css_additions}\n    \\1', content, count=1)
        
        # Add loading overlay after the opening body tag
        content = re.sub(r'(<body[^>]*>)', f'\\1\n{loading_overlay}', content, count=1)
        
        # Add JS additions before the closing body tag
        content = re.sub(r'(</body>)', f'{js_additions}\n\\1', content, count=1)
        
        # Update logo tag
        content = re.sub(r'<img\s+src="([^"]*images/logo\.[^"]+)"\s+alt="([^"]+)"\s+width="(\d+)"\s+height="(\d+)"', updated_logo, content)
        
        # Write the updated content back to the file
        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(content)
        
        print(f"Updated: {file_path}")
    
    except Exception as e:
        print(f"Error updating {file_path}: {e}")

# Update all HTML files
for file in html_files:
    full_path = os.path.join('C:\\Users\\ymlt\\Desktop\\ixys', file)
    if os.path.exists(full_path):
        update_html_file(full_path)
    else:
        print(f"File not found: {full_path}")

print("All HTML files have been updated.")