# SETUP GUIDE - Scam Recovery Application

## Quick Start (5 Minutes)

### Step 1: Download & Install
```bash
# Navigate to project folder
cd scam-recovery-app

# Install dependencies
npm install
```

### Step 2: Get Gmail Credentials
1. Go to [myaccount.google.com/security](https://myaccount.google.com/security)
2. Enable "2-Step Verification" if needed
3. Click "App passwords" → Select "Mail" and your device
4. Copy the 16-character password

### Step 3: Configure Environment
Create `.env.local` file in project root:
```
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-char-password
ADMIN_EMAIL=admin-email@gmail.com
```

### Step 4: Run Locally
```bash
npm run dev
```
Open http://localhost:3000 in your browser

### Step 5: Deploy to Vercel
```bash
npm install -g vercel
vercel
```

---

## Detailed Setup Instructions

### Prerequisites
- Node.js 18+ installed
- npm/pnpm/yarn package manager
- Gmail account (for email functionality)
- Vercel account (for deployment)
- GitHub account (optional, for automatic deployments)

### Local Development Setup

#### 1. Install Node.js (if not already installed)
Download from [nodejs.org](https://nodejs.org) - choose LTS version

#### 2. Extract Project Files
```bash
# Extract the downloaded ZIP file
unzip scam-recovery-app.zip
cd scam-recovery-app
```

#### 3. Install Dependencies
```bash
# Using npm
npm install

# OR using pnpm (faster)
pnpm install

# OR using yarn
yarn install
```

#### 4. Create Environment Variables File

Create a new file named `.env.local` in the project root:

```
# .env.local

# Gmail SMTP Configuration
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password
ADMIN_EMAIL=admin@example.com
```

**Important:** Replace the values with your actual credentials

#### 5. Test Locally
```bash
npm run dev
```

Visit http://localhost:3000 in your browser

You should see:
- The Scam Recovery title with shield icon
- Recovery Application Form with 8 fields
- Image upload area
- Submit button at the bottom

### Testing the Form

1. Fill out all required fields:
   - Full Name: John Doe
   - Country: United States
   - Phone: +1-555-123-4567
   - Email: john@example.com
   - Scammer Username: scammer123
   - Total Amount: 5000
   - Payment Date: Select a date
   - Upload an image (PNG or JPG, max 5MB)

2. Click "Submit Application"

3. Observe:
   - Full-screen loader appears
   - 5-minute countdown starts (or test shorter duration by modifying the code)
   - After timer completes, result screen shows compensation (80% of amount)
   - Two emails sent:
     - Admin email with full details + attachment
     - Confirmation email to applicant

### Troubleshooting Local Setup

**Problem: "Cannot find module" errors**
- Solution: Delete `node_modules` folder and `.next` folder, then run `npm install` again

**Problem: Port 3000 already in use**
- Solution: Run `npm run dev -- -p 3001` to use port 3001

**Problem: "GMAIL_USER is undefined"**
- Solution: Ensure `.env.local` file exists in project root with correct values

**Problem: Emails not sending**
- Solution: 
  - Verify Gmail credentials are correct
  - Enable "Less secure app access" or generate an App Password
  - Check ADMIN_EMAIL is valid

---

## Production Deployment

### Option 1: Deploy via Vercel CLI (Recommended)

#### 1. Install Vercel CLI
```bash
npm install -g vercel
```

#### 2. Deploy to Vercel
```bash
vercel
```

Follow the prompts:
- Log in to Vercel (create account if needed)
- Confirm project name
- Select "Next.js" when asked
- Let it build automatically

#### 3. Add Environment Variables
After deployment:

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to Settings → Environment Variables
4. Add three variables:
   - Name: `GMAIL_USER` → Value: your-email@gmail.com
   - Name: `GMAIL_APP_PASSWORD` → Value: 16-char password
   - Name: `ADMIN_EMAIL` → Value: admin@example.com
5. Click "Save"
6. Redeploy: Click "Redeploy" button

#### 4. Access Your Live Site
Your app is now live at: `https://your-project-name.vercel.app`

### Option 2: Deploy via GitHub + Vercel

#### 1. Create GitHub Repository
```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit: Scam Recovery App"

# Create repo on github.com and push
git remote add origin https://github.com/yourusername/scam-recovery-app.git
git push -u origin main
```

#### 2. Connect to Vercel
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Select "Import Git Repository"
4. Choose your GitHub repo
5. Vercel auto-detects Next.js settings
6. Click "Deploy"

#### 3. Add Environment Variables
Same as Option 1 Step 3

#### 4. Auto-Deploys on Push
Now every time you push to GitHub, Vercel automatically redeploys your app!

### Option 3: Manual File Upload to Vercel

1. Build the project locally:
```bash
npm run build
```

2. Upload `.next`, `public`, `app`, `components`, `package.json`, etc. to Vercel

*(This method is not recommended - use CLI or GitHub integration instead)*

---

## Project File Structure Explained

```
scam-recovery-app/
│
├── app/                              # Next.js App Router directory
│   ├── api/
│   │   └── submit-recovery/
│   │       └── route.ts              # API that handles form submission & sends emails
│   ├── layout.tsx                    # Root layout - wraps all pages
│   ├── page.tsx                      # Home page that displays the form
│   └── globals.css                   # Global styles & theme colors
│
├── components/                       # React components
│   ├── recovery-form.tsx             # Main form component (8 input fields)
│   ├── image-upload.tsx              # Image upload with drag-drop
│   ├── processing-loader.tsx         # 5-minute loading animation
│   ├── result-screen.tsx             # Compensation display screen
│   └── ui/                           # shadcn/ui components (pre-built)
│
├── public/                           # Static files (images, etc)
│   └── test-payment-proof.jpg        # Sample image
│
├── .env.local                        # Environment variables (GITIGNORED)
├── package.json                      # Dependencies & scripts
├── tsconfig.json                     # TypeScript configuration
├── next.config.mjs                   # Next.js configuration
├── tailwind.config.ts                # Tailwind CSS configuration
├── postcss.config.mjs                # PostCSS configuration
├── .gitignore                        # Git ignore rules
└── README.md                         # Project documentation
```

---

## Environment Variables Reference

| Variable | Required | Example | Description |
|----------|----------|---------|-------------|
| `GMAIL_USER` | Yes | admin@gmail.com | Your Gmail email address |
| `GMAIL_APP_PASSWORD` | Yes | abcd efgh ijkl mnop | 16-char app password from Google |
| `ADMIN_EMAIL` | Yes | admin@company.com | Email to receive applications |

---

## Common Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linter
npm run lint

# Deploy to Vercel
vercel
```

---

## Email Configuration Details

### What Happens When Form is Submitted:

1. **Form Validation**
   - All 8 fields checked
   - Image file validated (PNG/JPG, max 5MB)
   - Total amount validated as positive number

2. **Compensation Calculation**
   - 80% of reported loss calculated
   - Example: $5000 loss → $4000 compensation

3. **Email to Admin**
   - Detailed application table
   - All applicant information
   - Calculated compensation amount
   - **Proof of payment image attached**
   - Timestamp of submission

4. **Email to Applicant**
   - Application received confirmation
   - Estimated compensation amount
   - 5-step processing timeline
   - Reference number for tracking

5. **Processing Screen**
   - 5-minute circular loader appears
   - Shows progress percentage (0-100%)
   - Countdown timer (5:00 → 0:00)
   - After timer: Result screen with compensation

---

## Next Steps After Deployment

1. **Test the Live Application**
   - Visit your Vercel URL
   - Fill out form with test data
   - Check that emails arrive

2. **Configure Custom Domain**
   - Go to Vercel Project Settings
   - Add your custom domain
   - Update DNS records

3. **Monitor Analytics**
   - Track form submissions
   - Monitor email delivery
   - Check error logs

4. **Customize Content**
   - Edit form fields as needed
   - Adjust compensation percentage
   - Modify email templates

---

## Support Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Vercel Docs**: https://vercel.com/docs
- **React Docs**: https://react.dev
- **Tailwind Docs**: https://tailwindcss.com/docs
- **Nodemailer Docs**: https://nodemailer.com/

---

## Security Best Practices

✓ Keep `.env.local` file in `.gitignore` (never commit)
✓ Use app-specific Gmail password (not main account password)
✓ Enable 2-Step Verification on Gmail account
✓ Regularly rotate app passwords
✓ Monitor email delivery for suspicious activity
✓ Keep dependencies updated: `npm update`

---

## Performance Optimization

- Next.js automatically optimizes:
  - Code splitting
  - Image optimization
  - JavaScript minification
  - CSS purging
  - Font optimization

No additional configuration needed!

---

## Questions?

- Check the README.md file
- Review the code comments in components
- Visit Vercel's help: https://vercel.com/help

Good luck with your deployment!
