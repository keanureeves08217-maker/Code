# Scam Recovery Application

A professional, full-featured web application for scam victims to submit compensation recovery claims. The application includes automated compensation calculation, image upload with validation, email notifications, and a sophisticated processing experience.

## Features

✓ **Professional Recovery Form**
- 8 required fields for applicant information
- Input validation using React Hook Form + Zod
- Real-time error messages and guidance

✓ **Image Upload System**
- Drag-and-drop interface
- Click-to-browse functionality
- Image preview before submission
- File size validation (max 5MB)
- Supports PNG and JPG formats

✓ **Automated Processing**
- Full-screen circular loading animation
- Exactly 5-minute processing countdown
- Real-time progress percentage display
- Professional UI messaging

✓ **Compensation Calculation**
- Automatic 80% compensation calculation
- Based on reported loss amount
- Instant calculation display on result screen

✓ **Email Integration**
- Admin notifications with detailed application data
- Applicant confirmation emails
- Attached proof of payment image
- HTML-formatted professional emails
- Gmail SMTP support

✓ **Result Display**
- Large compensation amount display
- 5-step process explanation
- Email confirmation notification
- Option to submit another application
- Download confirmation as text file

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **React**: v19
- **UI Components**: shadcn/ui
- **Form Validation**: React Hook Form + Zod
- **Email**: Nodemailer with Gmail
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Language**: TypeScript

## Installation

1. **Clone or extract the project:**
```bash
cd scam-recovery-app
```

2. **Install dependencies:**
```bash
npm install
# or
pnpm install
# or
yarn install
```

3. **Set up environment variables:**

Create a `.env.local` file in the project root:

```env
# Gmail Configuration (Required)
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-char-app-password
ADMIN_EMAIL=admin@example.com
```

### How to Generate Gmail App Password

1. Go to [myaccount.google.com/security](https://myaccount.google.com/security)
2. Enable "2-Step Verification" if not already enabled
3. Go back to Security and find "App passwords"
4. Select "Mail" and "Windows Computer" (or your device)
5. Google will generate a 16-character password
6. Copy and paste it as `GMAIL_APP_PASSWORD`

## Running Locally

**Development mode:**
```bash
npm run dev
```

**Production build:**
```bash
npm run build
npm run start
```

The application will be available at `http://localhost:3000`

## Deployment to Vercel

### Option 1: Direct Deployment (Recommended)

1. Use the "Publish" button in v0 interface
2. Connect your GitHub repository (optional)
3. Add environment variables in Vercel project settings
4. Deploy automatically

### Option 2: Manual CLI Deployment

```bash
npm install -g vercel
vercel
```

Follow the prompts to:
- Link your Vercel account
- Confirm project settings
- Add environment variables

### Option 3: GitHub Integration

1. Push code to GitHub repository
2. Connect repository to Vercel dashboard
3. Vercel auto-deploys on every push
4. Add environment variables in Vercel settings

## Project Structure

```
scam-recovery-app/
├── app/
│   ├── api/
│   │   └── submit-recovery/
│   │       └── route.ts          # API endpoint for form submission
│   ├── layout.tsx                # Root layout with metadata
│   ├── page.tsx                  # Main page
│   └── globals.css               # Global styles & theme
├── components/
│   ├── recovery-form.tsx         # Main form component
│   ├── image-upload.tsx          # File upload with preview
│   ├── processing-loader.tsx     # 5-minute loader animation
│   ├── result-screen.tsx         # Compensation result display
│   └── ui/                       # shadcn/ui components
├── public/
│   └── test-payment-proof.jpg    # Test image
├── package.json
├── tsconfig.json
├── next.config.mjs
├── tailwind.config.ts
├── postcss.config.mjs
└── README.md
```

## API Endpoint

### POST `/api/submit-recovery`

**Request body:**
```json
{
  "fullName": "John Doe",
  "country": "United States",
  "phoneNumber": "+1-555-123-4567",
  "emailAddress": "john@example.com",
  "scammerUsername": "scammer_user123",
  "totalAmount": "5000",
  "paymentDate": "2024-05-15",
  "proofOfPaymentBase64": "data:image/jpeg;base64,...",
  "fileName": "proof_1234567890.jpg"
}
```

**Response:**
```json
{
  "success": true,
  "compensationAmount": "4000.00",
  "message": "Application submitted successfully"
}
```

## Email Features

### Admin Email
- Detailed applicant information table
- Calculated compensation amount (80%)
- Attached proof of payment image
- Submission timestamp

### Applicant Confirmation Email
- Application received confirmation
- Estimated compensation amount displayed
- 5-step processing timeline
- Reference number for tracking

## Styling & Theme

The application uses a professional dark theme with:
- Primary color: Blue/Purple (`oklch(0.55 0.22 258.55)`)
- Accent color: Cyan (`oklch(0.65 0.2 192.24)`)
- Background: Dark gray (`oklch(0.12 0 0)`)
- Text: Light/White (`oklch(0.95 0 0)`)

All colors are defined as CSS variables in `globals.css` and can be easily customized.

## Validation Rules

**Form Fields:**
- Full Name: Minimum 2 characters
- Country: Minimum 2 characters
- Phone Number: Minimum 10 digits
- Email: Valid email format
- Scammer Username: Required
- Total Amount: Positive number only
- Payment Date: Valid date required
- Proof of Payment: Image file required (PNG/JPG, max 5MB)

## Loading Screen

The processing screen displays:
- Circular progress animation (0-100%)
- Real-time countdown timer (5:00 to 0:00)
- Animated loading dots
- Professional messaging
- Prevents window closing warning

## Error Handling

The application includes comprehensive error handling for:
- Missing environment variables
- Email sending failures
- Invalid file uploads
- Form validation errors
- Network errors
- Server errors

## Security Considerations

- Environment variables stored securely in `.env.local`
- Base64 image encoding for safe transmission
- Email validation before sending
- Input sanitization via Zod schema
- CORS-friendly API design
- No sensitive data in logs

## Performance

- Optimized Next.js 16 with Turbopack
- Efficient form validation
- Lazy-loaded components
- CSS-in-JS optimization
- Minimal bundle size

## Support & Troubleshooting

**Email not sending?**
- Verify Gmail credentials are correct
- Ensure 2-Step Verification is enabled
- Check that App Password is 16 characters
- Verify ADMIN_EMAIL environment variable is set

**Images not uploading?**
- Check file size (max 5MB)
- Verify file format (PNG or JPG)
- Ensure browser allows file uploads

**Loading screen not appearing?**
- Clear browser cache
- Try in incognito/private mode
- Verify JavaScript is enabled

## License

This application is provided as-is for scam recovery assistance purposes.

## Support

For deployment issues, visit [vercel.com/help](https://vercel.com/help)

For Next.js documentation, visit [nextjs.org](https://nextjs.org)
