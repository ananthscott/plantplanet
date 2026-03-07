# 🌿 Verdant — Premium Plant Shop

A beautiful, full-featured React plant e-commerce app with rich nature imagery, plant details, cart functionality, and a contemporary green design.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed ([download](https://nodejs.org))

### 1. Install dependencies
```bash
npm install
```

### 2. Install Tailwind CSS
```bash
npm install -D tailwindcss postcss autoprefixer
```

### 3. Start the app
```bash
npm start
```

The app opens at **http://localhost:3000**

---

## ✨ Features

- 🌱 **12 premium plants** with rich Unsplash images
- 🔍 **Live search** from the navbar
- 🏷️ **Filter by category** (All / Indoor / Succulents)
- 📊 **Sort** by price, rating, reviews
- 🖼️ **Plant detail modal** with care guide, image gallery, quantity selector
- 🛒 **Shopping cart** with quantity controls, subtotal, free delivery progress
- 💰 **Prices in Indian Rupees (₹)** with discounts
- ⭐ **Ratings & reviews** count
- 🎨 **Animated hero carousel** with nature photography
- 📱 **Fully responsive** — mobile, tablet, desktop

## 🎨 Tech Stack

- **React 18** — functional components, hooks, context API
- **Tailwind CSS** — utility-first styling, custom green theme
- **MUI (Material UI)** — icons, Badge, Dialog, Drawer, Rating, Snackbar, etc.
- **Google Fonts** — Playfair Display, Cormorant Garamond, Lato
- **Unsplash** — high-quality plant & nature photography

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Sticky navbar with search & cart
│   ├── Hero.jsx            # Animated image carousel hero
│   ├── PlantGrid.jsx       # Filterable, sortable plant grid
│   ├── PlantCard.jsx       # Individual plant card with hover effects
│   ├── PlantDetailModal.jsx # Full detail view with care guide
│   ├── Cart.jsx            # Side drawer cart
│   └── Footer.jsx          # Features strip, quote banner, footer
├── context/
│   └── CartContext.jsx     # Global cart state
├── data/
│   └── plants.js           # Plant catalogue with all details
├── App.js
├── index.js
└── index.css
```
