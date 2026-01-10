# Horizon Web Services - Professional Web Agency Website

A modern, professional website for Horizon Web Services, a South African web design and digital marketing agency.

## Features

- **Modern Design**: Light mode with strategic dark hero sections, glass morphism effects, and smooth animations
- **Responsive**: Fully responsive design for mobile and desktop devices
- **Service Pages**: Comprehensive service listings with pricing packages
- **Portfolio**: Dynamic carousel showcasing previous work
- **Contact Form**: Quote request form with Base44 integration
- **Animations**: Smooth transitions and parallax effects using Framer Motion

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Navigation
- **Base44 SDK** - Backend integration
- **React Query** - Data fetching
- **Lucide React** - Icons
- **Vite** - Build tool

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```env
   VITE_BASE44_PROJECT_ID=your_project_id_here
   VITE_BASE44_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## Project Structure

```
src/
├── components/       # Reusable components
│   ├── GlassCard.tsx
│   ├── NeonButton.tsx
│   ├── SectionTitle.tsx
│   ├── ServiceCard.tsx
│   ├── ProjectCarousel.tsx
│   ├── CookieConsent.tsx
│   ├── Navbar.tsx
│   └── Footer.tsx
├── pages/           # Page components
│   ├── Home.tsx
│   ├── Services.tsx
│   ├── Portfolio.tsx
│   └── Contact.tsx
├── lib/             # Utilities and integrations
│   ├── utils.ts
│   └── base44.ts
├── App.tsx          # Main app component with routing
└── main.tsx         # Entry point
```

## Color Palette

- **Primary (Cyan)**: `#06b6d4`
- **Secondary (Purple)**: `#8b5cf6`
- **Accent (Pink)**: `#ec4899`

## Services

The website includes the following services with pricing:

1. **Custom Websites** - 3 tiers (Starter, Professional, Premium)
2. **Custom Web Applications** - Custom pricing only
3. **Google Ads Management** - 3 monthly tiers
4. **Social Media Advertising** - 3 monthly tiers
5. **Poster & Graphic Design** - 3 tiers
6. **Website Maintenance** - 3 monthly tiers

## Base44 Integration

The contact form integrates with Base44 for:
- Storing quote requests in the `QuoteRequest` entity
- Sending email notifications on form submission

Make sure to set up your Base44 project and configure the entity schema before deploying.

## Building for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

## License

Copyright © 2024 Horizon Web Services. All rights reserved.
