# Salesforce MCE Custom Entry Source

A Next.js application that implements a Custom Entry Source for Salesforce Marketing Cloud Engagement (MCE) Journey Builder.

## Features

- Custom Entry Source for Journey Builder
- Mock data service (easily replaceable with real data source)
- Configuration modal for Journey Builder UI
- Full TypeScript support
- Ready for Vercel deployment

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/entry-source/config` | GET | Returns Entry Source configuration for Journey Builder |
| `/api/entry-source/execute` | POST/GET | Returns contact data to inject into Journey |
| `/api/entry-source/validate` | POST | Validates Entry Source configuration |
| `/api/entry-source/publish` | POST | Called when Journey is published |
| `/api/entry-source/stop` | POST | Called when Journey is stopped |
| `/api/entry-source/save` | POST | Called when configuration is saved |

## Output Fields

The Entry Source provides the following fields to Journey Builder:

- `contactKey` - Unique contact identifier
- `email` - Contact email address
- `firstName` - First name
- `lastName` - Last name
- `phone` - Phone number
- `customerId` - External customer ID

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### Environment Variables

Create a `.env.local` file with:

```env
# Base URL for your deployed application
NEXT_PUBLIC_BASE_URL=https://your-app.vercel.app
```

## Deploy to Vercel

### Option 1: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Option 2: GitHub Integration

1. Push your code to GitHub
2. Import the repository in [Vercel Dashboard](https://vercel.com/new)
3. Configure environment variables
4. Deploy

### Post-Deployment

After deploying, set the `NEXT_PUBLIC_BASE_URL` environment variable in Vercel to your deployment URL.

## Register in Salesforce Marketing Cloud

1. Go to **Setup > Apps > Installed Packages**
2. Create a new package or use existing one
3. Add a new component: **Journey Builder Entry Source**
4. Configure the Entry Source:
   - **Endpoint URL**: `https://your-app.vercel.app/api/entry-source/config`

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── entry-source/
│   │       ├── config/route.ts    # Configuration endpoint
│   │       ├── execute/route.ts   # Execute endpoint (returns contacts)
│   │       ├── validate/route.ts  # Validation endpoint
│   │       ├── publish/route.ts   # Publish endpoint
│   │       ├── stop/route.ts      # Stop endpoint
│   │       └── save/route.ts      # Save endpoint
│   └── config-modal/
│       └── page.tsx               # Configuration UI for Journey Builder
├── lib/
│   └── mock-data.ts               # Mock data service
└── types/
    └── entry-source.ts            # TypeScript type definitions
```

## Customization

### Replace Mock Data with Real Data Source

Edit `src/lib/mock-data.ts` or create a new data service:

```typescript
// Example: Fetch from external API
export class DataService {
  static async getContacts(): Promise<Contact[]> {
    const response = await fetch('https://your-api.com/contacts');
    return response.json();
  }
}
```

Then update `src/app/api/entry-source/execute/route.ts` to use your new service.

## License

MIT
