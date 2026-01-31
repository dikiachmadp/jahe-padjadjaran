# Permen Jahe Padjajaran - Official Website

A modern, production-ready website for PT Padjajaran Pratama Wijaya and their flagship product, Permen Jahe Padjajaran. Built with React, Tailwind CSS, and Framer Motion for smooth animations.

## 🌟 Features

- **Responsive Design**: Fully optimized for mobile, tablet, and desktop
- **Modern UI/UX**: Clean, warm design emphasizing Indonesian heritage
- **Smooth Animations**: Scroll-based animations using Framer Motion
- **SEO Optimized**: Semantic HTML with proper meta tags
- **Performance Optimized**: Fast loading with optimized bundle size
- **Production Ready**: Built with Vite for optimal production builds

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone or extract the project:
```bash
cd jahe-padjajaran-website
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

The site will be available at `http://localhost:3000`

## 📦 Build for Production

Create an optimized production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## 🌐 Deployment

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

### Deploy to Netlify

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Deploy:
```bash
netlify deploy --prod
```

Or drag and drop the `dist` folder to Netlify's web interface.

### Manual Deployment

After running `npm run build`, upload the contents of the `dist` folder to your web hosting provider.

## 📁 Project Structure

```
jahe-padjajaran-website/
├── src/
│   ├── components/          # React components
│   │   ├── Header.jsx       # Navigation header
│   │   ├── Hero.jsx         # Hero section
│   │   ├── About.jsx        # Company overview
│   │   ├── Product.jsx      # Product showcase
│   │   ├── Pricing.jsx      # Pricing structure
│   │   ├── Partners.jsx     # Distribution partners
│   │   ├── Contact.jsx      # Contact information
│   │   └── Footer.jsx       # Footer
│   ├── data/
│   │   └── constants.js     # Company and product data
│   ├── hooks/
│   │   └── useScrollAnimation.js  # Scroll animation hook
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── index.html              # HTML template
├── package.json            # Dependencies
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── README.md               # This file
```

## 🎨 Customization

### Updating Content

All company and product information is centralized in `src/data/constants.js`. Update this file to modify:
- Company information
- Product details
- Pricing structure
- Partner list
- Contact information

### Styling

The website uses a custom color palette defined in `tailwind.config.js`:
- `warmth`: Warm orange/brown tones for accent colors
- `earth`: Natural earth tones for backgrounds
- `heritage`: Deep heritage colors for text and sections

Modify these colors in `tailwind.config.js` to match your brand.

### Adding Sections

To add new sections:
1. Create a new component in `src/components/`
2. Import and add it to `src/App.jsx`
3. Update navigation in `src/data/constants.js`

## 🔧 Technology Stack

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **PostCSS**: CSS processing
- **ESLint**: Code linting

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## ⚡ Performance

The website is optimized for:
- Fast initial load (< 2s on 3G)
- Smooth 60fps animations
- Excellent Core Web Vitals scores
- Minimal JavaScript bundle size

## 📄 License

Copyright © 2024 PT Padjajaran Pratama Wijaya. All rights reserved.

## 📞 Support

For technical support or questions:
- Email: jahepadjajaran@gmail.com
- WhatsApp: 0812-2188-6566
- Instagram: @jahepadjajaran.id

---

Built with ❤️ for Indonesian Heritage
