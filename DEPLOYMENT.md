# 🚀 Deployment Guide - Permen Jahe Padjajaran Website

This guide provides step-by-step instructions for deploying your website to various hosting platforms.

## 📋 Pre-Deployment Checklist

Before deploying, ensure you have:
- [ ] Node.js 18+ installed on your local machine
- [ ] All dependencies installed (`npm install`)
- [ ] Tested the production build locally (`npm run build && npm run preview`)
- [ ] Reviewed all content in `src/data/constants.js`
- [ ] Updated any placeholder content

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)

Vercel offers the easiest deployment with automatic HTTPS and global CDN.

#### Method A: Vercel CLI (Fastest)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Navigate to project directory:
```bash
cd jahe-padjajaran-website
```

3. Deploy:
```bash
vercel
```

4. Follow the prompts:
   - Set up and deploy: Yes
   - Which scope: Select your account
   - Link to existing project: No
   - Project name: jahe-padjajaran (or your choice)
   - Directory: `./` (current directory)
   - Build command: `npm run build`
   - Output directory: `dist`

5. Your site will be live at `https://[project-name].vercel.app`

#### Method B: Vercel GitHub Integration (Best for Teams)

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/jahe-padjajaran.git
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "Add New Project"
4. Import your GitHub repository
5. Configure:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Click "Deploy"

Your site will auto-deploy on every push to main branch.

### Option 2: Netlify

Netlify offers similar features with excellent build tools.

#### Method A: Netlify CLI

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Build the project:
```bash
npm run build
```

3. Deploy:
```bash
netlify deploy --prod
```

4. Follow prompts:
   - Create & configure new site: Yes
   - Team: Select your team
   - Site name: jahe-padjajaran (or your choice)
   - Publish directory: `dist`

#### Method B: Netlify Drag & Drop

1. Build the project:
```bash
npm run build
```

2. Go to [netlify.com](https://app.netlify.com)
3. Drag the `dist` folder to the deployment area
4. Your site is live!

#### Method C: Netlify GitHub Integration

1. Push to GitHub (same as Vercel method)
2. Go to [netlify.com](https://app.netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Choose GitHub and select your repository
5. Configure:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

### Option 3: Traditional Web Hosting (cPanel, FTP, etc.)

For traditional hosting providers:

1. Build the project:
```bash
npm run build
```

2. The `dist` folder contains your complete website

3. Upload via FTP:
   - Use FileZilla, WinSCP, or your hosting's file manager
   - Upload contents of `dist` folder to `public_html` or `www` directory
   - Ensure `.htaccess` file is uploaded (if using Apache)

4. Create `.htaccess` file in your hosting root (if not exists):
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### Option 4: GitHub Pages

For free hosting with GitHub:

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to `package.json`:
```json
{
  "homepage": "https://yourusername.github.io/jahe-padjajaran",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. Deploy:
```bash
npm run deploy
```

4. Enable GitHub Pages in repository settings

## 🔧 Post-Deployment Setup

### Custom Domain

#### Vercel:
1. Go to Project Settings → Domains
2. Add your domain (e.g., jahepadjajaran.com)
3. Follow DNS configuration instructions
4. Add these records to your DNS:
   - Type: A, Name: @, Value: 76.76.21.21
   - Type: CNAME, Name: www, Value: cname.vercel-dns.com

#### Netlify:
1. Go to Site Settings → Domain Management
2. Add custom domain
3. Configure DNS:
   - Type: A, Name: @, Value: 75.2.60.5
   - Type: CNAME, Name: www, Value: [your-site].netlify.app

### SSL Certificate

Both Vercel and Netlify provide automatic HTTPS certificates. No action needed!

For traditional hosting:
- Most providers offer free Let's Encrypt SSL
- Enable in cPanel → SSL/TLS → Manage SSL

### Analytics Setup

1. **Google Analytics**:
   - Get tracking ID from Google Analytics
   - Add to `index.html` in `<head>` section

2. **Vercel Analytics**:
   - Enable in Project Settings → Analytics
   - No code changes needed

3. **Netlify Analytics**:
   - Enable in Site Settings → Analytics
   - Paid feature

## 🔍 Testing Your Deployment

After deployment, test these aspects:

- [ ] Homepage loads correctly
- [ ] All sections scroll smoothly
- [ ] Navigation works (header links)
- [ ] Contact buttons open correct apps (WhatsApp, Email)
- [ ] Social media links work
- [ ] Mobile responsiveness (test on phone)
- [ ] Page speed (use PageSpeed Insights)
- [ ] SSL certificate is active (https://)

## 🐛 Troubleshooting

### Build Fails

**Error: "Cannot find module"**
- Solution: Run `npm install` to ensure all dependencies are installed

**Error: "Build command not found"**
- Solution: Ensure `package.json` has correct build script

### Routing Issues (404 on refresh)

**Problem**: Page refreshes show 404 error
- Solution: Ensure proper rewrite rules are configured
- Vercel: Uses `vercel.json` (already included)
- Netlify: Uses `netlify.toml` (already included)
- Traditional hosting: Add `.htaccess` file (see above)

### Images Not Loading

**Problem**: Images broken in production
- Solution: Ensure images are in `public` folder or properly imported
- Check that image paths don't start with `/` if using subdirectory

### Slow Performance

**Problem**: Site loads slowly
- Run `npm run build` to ensure production optimization
- Check bundle size: `npx vite-bundle-visualizer`
- Optimize images before uploading

## 📊 Monitoring & Maintenance

### Regular Updates

Keep dependencies updated:
```bash
npm update
npm audit fix
```

### Performance Monitoring

Use these tools to monitor:
- Google PageSpeed Insights
- Vercel Analytics
- Netlify Analytics
- Google Search Console (for SEO)

### Backup

Always keep backups:
- Use Git for version control
- Download `dist` folder periodically
- Keep source code on GitHub

## 🆘 Support

If you encounter issues:

1. Check error messages carefully
2. Review platform-specific documentation:
   - [Vercel Docs](https://vercel.com/docs)
   - [Netlify Docs](https://docs.netlify.com)
3. Search for similar issues on Stack Overflow
4. Contact your hosting provider's support

## ✅ Success Checklist

Your deployment is successful when:
- [ ] Website loads at your domain/URL
- [ ] HTTPS is working (green padlock)
- [ ] All pages and sections work
- [ ] Forms and contact links function
- [ ] Mobile version displays correctly
- [ ] Page loads in under 3 seconds
- [ ] No console errors in browser

---

**Congratulations! Your website is now live! 🎉**

For updates or questions, contact PT Padjajaran Pratama Wijaya at jahepadjajaran@gmail.com
