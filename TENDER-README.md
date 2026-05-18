# Tender Website - Deployment Instructions

This website contains all the required pages for Apple App Store submission:
- ✅ Privacy Policy
- ✅ Terms of Service  
- ✅ Support/Contact Page
- ✅ Homepage with app information

## Quick Start: Push to GitHub & Deploy to Vercel

### Step 1: Push to GitHub

1. **Initialize Git repository** (in the `tender-website` folder):
   ```bash
   cd tender-website
   git init
   git add .
   git commit -m "Initial commit: Tender website for App Store submission"
   ```

2. **Create a new repository on GitHub**:
   - Go to https://github.com/new
   - Name it: `tender-website` (or any name you prefer)
   - Leave it public (required for free Vercel hosting)
   - **Don't** initialize with README (you already have files)
   - Click "Create repository"

3. **Push your code**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/tender-website.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

1. **Sign up/Login to Vercel**:
   - Go to https://vercel.com
   - Click "Sign Up" and choose "Continue with GitHub"
   - Authorize Vercel to access your GitHub account

2. **Import your project**:
   - Click "Add New..." → "Project"
   - Select "Import Git Repository"
   - Find `tender-website` in your repository list
   - Click "Import"

3. **Configure deployment**:
   - **Framework Preset:** Leave as "Other" 
   - **Root Directory:** Leave as `./`
   - **Build Command:** Leave empty (static HTML site)
   - **Output Directory:** Leave as `public` (or empty)
   - Click "Deploy"

4. **Wait for deployment** (usually 30-60 seconds)

### Step 3: Get Your URLs for App Store

Once deployed, Vercel will give you a URL like: `https://tender-website.vercel.app`

Your required URLs for Apple App Store submission:

- **Privacy Policy:** `https://YOUR-SITE.vercel.app/privacy.html`
- **Terms of Service:** `https://YOUR-SITE.vercel.app/terms.html`
- **Support URL:** `https://YOUR-SITE.vercel.app/support.html`
- **Marketing URL (optional):** `https://YOUR-SITE.vercel.app`

### Step 4: Add URLs to App Store Connect

When submitting your app:

1. Go to App Store Connect
2. Create/edit your app listing
3. In the "App Information" section:
   - **Privacy Policy URL** (required): Add your privacy.html URL
   - **Support URL** (required): Add your support.html URL
   - **Marketing URL** (optional): Add your homepage URL

4. In "App Privacy" section:
   - Answer questions about data collection
   - Since Tender doesn't collect data, select "No" for most questions
   - For location: Select "Yes" → "Used for app functionality only"

## Custom Domain (Optional)

To use a custom domain like `tender-app.com`:

1. Buy a domain from Namecheap, GoDaddy, etc.
2. In Vercel project settings → "Domains"
3. Add your custom domain
4. Follow Vercel's DNS instructions
5. Wait for DNS propagation (can take 24-48 hours)

## Files Included

```
tender-website/
├── index.html          # Homepage
├── privacy.html        # Privacy Policy (REQUIRED for App Store)
├── terms.html          # Terms of Service (REQUIRED for App Store)
├── support.html        # Support/Contact (REQUIRED for App Store)
└── README.md           # This file
```

## Testing Locally

To test the website locally before deploying:

1. Open `index.html` in a web browser
2. Click through all the links to verify they work
3. Check on mobile device (responsive design)

Or use a simple HTTP server:
```bash
# Python 3
python -m http.server 8000

# Then open: http://localhost:8000
```

## What This Website Provides for App Store

✅ **Privacy Policy** - Legally compliant, explains:
- Local data storage only
- Location usage for venue search
- Notification permissions
- No data collection by developer
- Third-party API usage (TMDb, Ticketmaster)

✅ **Terms of Service** - Complete legal protection:
- License terms
- User responsibilities  
- Disclaimers and limitations
- Apple App Store specific clauses
- Relationship advice disclaimer

✅ **Support Page** - User assistance:
- Contact email
- Comprehensive FAQs
- Bug reporting
- Feature requests

✅ **Professional Design**:
- Warm, romantic aesthetic matching the app
- Mobile responsive
- Fast loading
- Clean navigation

## Need Changes?

If you need to update any content:

1. Edit the HTML files locally
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Update content"
   git push
   ```
3. Vercel will automatically redeploy (takes ~30 seconds)

## Troubleshooting

**Problem:** Can't push to GitHub
- Make sure you've replaced `YOUR_USERNAME` with your actual GitHub username
- Check you're logged into GitHub CLI or have SSH keys set up

**Problem:** Vercel deployment fails
- Make sure repository is public (required for free tier)
- Check that all HTML files are in the root directory

**Problem:** URLs showing 404
- Ensure file names match exactly: `privacy.html`, `terms.html`, `support.html`
- Check Vercel deployment logs for errors

**Problem:** Need to change email in Privacy Policy
- Edit `privacy.html` and `support.html`
- Search for "kevin.8@icloud.com" and replace with your new email
- Commit and push changes

## Contact

Questions about the website? Email: kevin.8@icloud.com

---

**You're ready to submit to the App Store!** 🎉
