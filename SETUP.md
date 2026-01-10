# Horizon Web Services - Setup Instructions

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn** or **pnpm**

## Step-by-Step Setup

### 1. Install Dependencies

Open your terminal/command prompt in the project directory and run:

```bash
npm install
```

This will install all required packages including:
- React and React DOM
- React Router
- Framer Motion
- Tailwind CSS
- TypeScript
- Vite
- And all other dependencies

### 2. Environment Variables (Optional)

If you have Base44 credentials, create a `.env` file in the root directory:

```env
VITE_BASE44_PROJECT_ID=your_project_id_here
VITE_BASE44_API_KEY=your_api_key_here
```

**Note:** The website will work without Base44 credentials - it will use a mock implementation for the contact form. The form will still function and show success messages, but data won't be saved to Base44.

### 3. Start the Development Server

Run the following command:

```bash
npm run dev
```

You should see output similar to:
```
  VITE v5.0.0  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### 4. Open in Browser

Open your web browser and navigate to:
```
http://localhost:5173
```

The website should now be running locally!

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (creates `dist` folder)
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check for code issues

## Troubleshooting

### Port Already in Use

If port 5173 is already in use, Vite will automatically try the next available port (5174, 5175, etc.). Check the terminal output for the actual port number.

### Module Not Found Errors

If you encounter module not found errors:
1. Delete `node_modules` folder
2. Delete `package-lock.json` (if it exists)
3. Run `npm install` again

### TypeScript Errors

If you see TypeScript errors:
1. Make sure you're using Node.js 18+
2. Run `npm install` to ensure all type definitions are installed
3. Check that `tsconfig.json` is properly configured

### Base44 SDK Errors

If you see errors related to Base44 SDK:
- This is normal if you don't have Base44 credentials
- The website will use a mock implementation
- Form submissions will log to the browser console instead of saving to Base44
- To use real Base44 integration, install the SDK and add your credentials to `.env`

## Project Structure

```
HWS/
├── src/
│   ├── components/     # Reusable React components
│   ├── pages/         # Page components (Home, Services, etc.)
│   ├── lib/           # Utilities and integrations
│   ├── App.tsx        # Main app component
│   └── main.tsx       # Entry point
├── public/            # Static assets (if any)
├── index.html         # HTML template
├── package.json       # Dependencies and scripts
├── vite.config.ts     # Vite configuration
├── tailwind.config.js # Tailwind CSS configuration
└── tsconfig.json      # TypeScript configuration
```

## Features to Test

1. **Navigation** - Click through all pages (Home, Services, Portfolio, Contact)
2. **Responsive Design** - Resize browser window to test mobile/tablet views
3. **Animations** - Scroll through pages to see Framer Motion animations
4. **Service Cards** - Click "View Pricing" on service cards to see pricing tiers
5. **Contact Form** - Fill out and submit the quote request form
6. **Portfolio Carousel** - Navigate through projects using arrow buttons
7. **Cookie Consent** - Should appear on first visit

## Next Steps

1. **Customize Content** - Update text, images, and pricing in the page components
2. **Add Real Images** - Replace placeholder images in Portfolio with actual project screenshots
3. **Configure Base44** - Set up Base44 project and add credentials for form submissions
4. **Deploy** - Build for production and deploy to your hosting service

## Building for Production

When ready to deploy:

```bash
npm run build
```

This creates an optimized production build in the `dist` folder that you can deploy to any static hosting service (Vercel, Netlify, GitHub Pages, etc.).

## Support

If you encounter any issues not covered here, check:
- Browser console for JavaScript errors
- Terminal output for build/compilation errors
- Network tab in browser DevTools for API issues
