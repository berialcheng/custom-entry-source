# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js application implementing a Custom Entry Source for Salesforce Marketing Cloud Engagement (MCE) Journey Builder. It provides contact data to Journey Builder from an external system.

## Commands

```bash
npm run dev      # Start development server at http://localhost:3000
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint (uses eslint-config-next with core-web-vitals and typescript)
```

## Architecture

### Entry Source Lifecycle

Journey Builder communicates with this app through a series of endpoints that follow the MCE Entry Source protocol:

1. **`/api/entry-source/config`** - Returns configuration JSON that tells Journey Builder about this entry source (output fields, UI modal URL, callback URLs)
2. **`/api/entry-source/execute`** - Called to retrieve contacts to inject into the Journey
3. **`/api/entry-source/validate`** - Called before Journey activation to validate configuration
4. **`/api/entry-source/publish`** - Called when Journey is published/activated
5. **`/api/entry-source/stop`** - Called when Journey is stopped
6. **`/api/entry-source/save`** - Called when configuration is saved

### Output Fields

The entry source provides these fields to Journey Builder (defined in `src/app/api/entry-source/config/route.ts`):
- `contactKey`, `email`, `firstName`, `lastName`, `phone`, `customerId`

### Key Files

- **`src/types/entry-source.ts`** - TypeScript types for MCE Entry Source protocol (requests/responses)
- **`src/lib/mock-data.ts`** - Mock data service; replace `MockDataService` with real data source for production
- **`src/app/config-modal/page.tsx`** - React UI shown inside Journey Builder when configuring the entry source (uses postMessage to communicate with parent)

### Path Alias

Use `@/` to import from `src/` (e.g., `import { Contact } from "@/types/entry-source"`)

## Environment Variables

Set `NEXT_PUBLIC_BASE_URL` to your deployed URL. This is used to generate endpoint URLs in the config response. If not set, falls back to request host.
