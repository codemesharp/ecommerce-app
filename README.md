# E-commerce Product Card UI

This project implements a responsive Product Card component as part of a Frontend Developer Test. It uses data from a mock e-commerce API and provides a clean, modern UI that follows UX best practices.

## 🔧 Setup Instructions

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/codemesharp/ecommerce-app.git
   cd ecommerce-app
   ```

2. **Install Dependencies:**
   ```bash
   yarn
   ```

3. **Run the Development Server:**
   ```bash
   yarn dev
   ```

4. **Open in Browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the app.

## 🧪 Test Overview

This project is part of a Frontend Developer Test. The task was to build a reusable, responsive **Product Card** component using real-world data and modern design principles.

### ✅ Features

- Product image, title, and price
- Variant option shown via a label or dropdown
- “Add to Cart” button, dynamically disabled if the product is out of stock
- Responsive design for mobile and desktop
- Skeleton loader and product details page
- SEO metadata and breadcrumbs

## 📋 Developer Note

**Layout Approach:**  
I followed a clean, modern card-based layout using Tailwind CSS, ensuring visual clarity and consistent spacing. Each Product Card displays the product image, name, price, variant label, and a dynamic "Add to Cart" button, with a clear distinction for out-of-stock items.

**Responsiveness Considerations:**  
The layout is fully responsive using utility-first CSS classes — it uses flex/grid for structure, adapts to various screen sizes, and maintains visual hierarchy on both mobile and desktop devices.