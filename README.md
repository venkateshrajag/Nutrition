# Nutrition App = Saffron - Suvai

A minimalistic nutrition app with Google OAuth authentication, built with React, TypeScript, and Tailwind CSS.

## Features

- Clean, minimalistic design with top menu bar
- Google OAuth authentication integration
- Responsive layout for desktop and mobile
- Built with modern tech stack (React 18, TypeScript, Vite, Tailwind CSS)
- Ready for Azure Static Web Apps deployment

## Project Structure

```
nutrition-app/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx       # Top menu bar with login button
│   │   │   └── Layout.tsx       # Main layout wrapper
│   │   └── auth/                # Auth components (future)
│   ├── App.tsx                  # Main app component
│   ├── main.tsx                 # App entry point
│   └── index.css                # Tailwind CSS imports
├── staticwebapp.config.json     # Azure SWA configuration with Google OAuth
├── index.html
├── vite.config.ts
├── tailwind.config.js
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:5173](http://localhost:5173) in your browser

### Build for Production

```bash
npm run build
```

The production build will be in the `dist` folder.

## Google OAuth Setup

The app is configured to work with Azure Static Web Apps Google OAuth. To enable authentication:

1. Create a Google Cloud Project at [Google Cloud Console](https://console.cloud.google.com/)
2. Enable Google+ API
3. Create OAuth 2.0 credentials
4. Set authorized redirect URI to: `https://<your-swa-domain>/.auth/login/google/callback`
5. Configure the credentials in Azure Portal → Static Web App → Configuration → Identity providers

## Deployment to Azure Static Web Apps

### Using Azure CLI

```bash
# Login to Azure
az login

# Create a resource group
az group create --name rg-nutrition-app --location eastus

# Create Static Web App
az staticwebapp create \
  --name swa-nutrition-app \
  --resource-group rg-nutrition-app \
  --source https://github.com/YOUR_USERNAME/nutrition-app \
  --location eastus2 \
  --branch main \
  --app-location "/" \
  --api-location "api" \
  --output-location "dist" \
  --login-with-github
```

### Manual Deployment

1. Push your code to a GitHub repository
2. Go to Azure Portal → Create a resource → Static Web App
3. Connect your GitHub repository
4. Set build configuration:
   - App location: `/`
   - API location: `api` (for future API functions)
   - Output location: `dist`
5. Azure will automatically deploy on every push to main branch

## Configuration

The `staticwebapp.config.json` file contains:
- Google OAuth configuration
- Route protection rules
- Security headers
- Redirect rules for authentication

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Authentication**: Azure Static Web Apps + Google OAuth
- **Hosting**: Azure Static Web Apps

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Next Steps

According to the specification, the following features will be added:
- User access control (domain and email allowlist)
- Survey system for user profiles
- Personalized feedback generation
- Admin panel
- Cookbook module with recipes
- Azure Functions API backend
- Cosmos DB integration

## License

ISC
