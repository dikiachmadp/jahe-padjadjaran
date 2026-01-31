# ⚡ Quick Start Guide

Get your website running in 5 minutes!

## 🎯 Prerequisites

Before starting, ensure you have:
- **Node.js 18+** installed ([Download here](https://nodejs.org))
- A code editor (VS Code recommended)
- Terminal/Command Prompt access

Check if Node.js is installed:
```bash
node --version
npm --version
```

## 🚀 Step-by-Step Setup

### 1. Navigate to Project
Open terminal and go to the project folder:
```bash
cd jahe-padjajaran-website
```

### 2. Install Dependencies
Install all required packages:
```bash
npm install
```

This will take 1-2 minutes. You'll see a progress bar.

### 3. Start Development Server
Run the development server:
```bash
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

### 4. View Website
Open your browser and go to:
```
http://localhost:3000
```

🎉 **Success!** Your website is now running locally!

## 🎨 Customizing Content

All content is in one file for easy updates:

**File**: `src/data/constants.js`

Update this file to change:
- Company information (address, phone, email)
- Product details and benefits
- Pricing structure
- Partner list
- Contact information

**How to update**:
1. Open `src/data/constants.js` in your code editor
2. Find the section you want to change
3. Edit the text inside quotes `"..."`
4. Save the file
5. The website will automatically refresh!

## 📱 Testing on Mobile

To test on your phone:

1. Make sure your phone is on the same WiFi network
2. Find your computer's IP address:
   - Windows: `ipconfig` (look for IPv4)
   - Mac/Linux: `ifconfig` (look for inet)
3. On your phone's browser, go to:
   ```
   http://YOUR-IP-ADDRESS:3000
   ```
   Example: `http://192.168.1.100:3000`

## 🏗️ Building for Production

When ready to deploy:

```bash
npm run build
```

This creates a `dist` folder with your production-ready website.

Preview the production build:
```bash
npm run preview
```

## 🌐 Deploy to Internet

### Fastest Way: Vercel (Free)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow prompts (press Enter for defaults)
4. Your site is live! You'll get a URL like: `https://your-site.vercel.app`

### Alternative: Netlify Drag & Drop

1. Build the site:
```bash
npm run build
```

2. Go to [netlify.com/drop](https://app.netlify.com/drop)
3. Drag the `dist` folder to the page
4. Done! Your site is live!

## 🐛 Common Issues & Solutions

### "npm: command not found"
- **Solution**: Install Node.js from [nodejs.org](https://nodejs.org)

### "Cannot find module"
- **Solution**: Run `npm install` again

### Port 3000 already in use
- **Solution**: Stop other apps using port 3000, or edit `vite.config.js` to use a different port:
```js
server: {
  port: 3001
}
```

### Changes not showing
- **Solution**: Hard refresh browser (Ctrl+F5 or Cmd+Shift+R)

## 📚 Next Steps

1. ✅ Review all content in `src/data/constants.js`
2. ✅ Test all contact links (WhatsApp, Email, Instagram)
3. ✅ Test on mobile devices
4. ✅ Build for production: `npm run build`
5. ✅ Deploy using Vercel or Netlify
6. ✅ Set up custom domain (optional)

## 🆘 Need Help?

- Check `README.md` for detailed documentation
- Check `DEPLOYMENT.md` for deployment options
- Contact: jahepadjajaran@gmail.com

---

**You're all set! Start customizing your website! 🎨**
