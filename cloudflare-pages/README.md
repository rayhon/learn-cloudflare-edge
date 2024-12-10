# Next.js 14 on Cloudflare Pages

This project demonstrates a modern Next.js 14 application deployed on Cloudflare Pages, leveraging Edge Runtime capabilities for optimal performance and global distribution.

## Architecture Overview

This application uses `@cloudflare/next-on-pages` to integrate Next.js API routes with Cloudflare's infrastructure:

1. **Development Mode**:
   - API routes are handled by Next.js's development server
   - Full access to Cloudflare's platform APIs through Wrangler
   - Local KV store emulation for development

2. **Production (Cloudflare Pages)**:
   - The `@cloudflare/next-on-pages` package transforms your Next.js application
   - API routes marked with `export const runtime = 'edge'` are optimized for Cloudflare's edge network
   - Direct access to Cloudflare's platform features (KV, R2, D1) through `getRequestContext()`

### API Route Implementation

```typescript
// src/app/api/post/[id]/route.ts
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';  // Enable edge runtime

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Access Cloudflare's platform features
  const ctx = getRequestContext();
  const postKV = ctx.env.QA_POSTS;  // Access KV storage

  // Your API logic here
  const data = await postKV.get('post_data', { type: "json" });
  return Response.json(data);
}
```

### How It Works

1. **Build Process**:
   - When you run `npm run pages:build`, `@cloudflare/next-on-pages` processes your Next.js application
   - API routes are bundled with their dependencies
   - Environment bindings are configured for Cloudflare services

2. **Edge Runtime**:
   - Your API routes run on Cloudflare's edge network
   - Access to platform features through `getRequestContext()`
   - Native integration with Cloudflare KV, R2, and other services

3. **Deployment**:
   - `npm run deploy` uses Wrangler to deploy to Cloudflare Pages
   - Each API route is deployed as an edge function
   - Automatic routing and request handling

### Platform Integration

- **KV Storage**: Direct access to Cloudflare KV through `ctx.env`
- **Edge Runtime**: Optimized for Cloudflare's global network
- **Type Safety**: Full TypeScript support with `@cloudflare/workers-types`

## Key Features

- **Edge-First Architecture**:
  - API routes automatically deploy as Cloudflare Workers
  - Global distribution across 300+ data centers
  - No cold starts, instant response times

- **Next.js Integration**:
  - Full Next.js 14 App Router support
  - Seamless development experience
  - TypeScript and ESM support

- **Cloudflare Pages Benefits**:
  - Automatic builds and deployments
  - Built-in CI/CD pipeline
  - Zero-config edge functions
  - Automatic HTTPS and cache invalidation

## Tech Stack

- Next.js 14.2.20
- React 18
- TypeScript 5
- Cloudflare Pages with @cloudflare/next-on-pages 1.13.6
- Wrangler CLI for local development and deployment

## Development Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run development server:
   ```bash
   npm run dev
   ```

3. Preview Cloudflare Pages locally:
   ```bash
   npm run preview
   ```

## Local Development

### Managing KV Store Data

You can modify the KV store data locally during development:

1. Update your JSON data file in the `data` directory
2. Update the local KV store:
   ```bash
   npx wrangler kv:key put --local --binding=QA_POSTS post_data --path=data/data-modified.json
   ```
3. Verify changes by accessing the API endpoint (e.g., `/api/post/1`)

The changes will be immediately reflected in your local development environment.

## Deployment

Deploy to Cloudflare Pages:
```bash
npm run deploy
```

## Project Structure

```bash
.
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/               # Edge API routes
│   │   │   └── post/         # Post-related endpoints
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Home page
│   └── components/           # Shared React components
├── data/                     # Sample data and KV store content
│   ├── data.json            # Initial data
│   └── data-modified.json   # Modified data for testing
├── public/                   # Static assets
├── next.config.js           # Next.js configuration
├── package.json             # Project dependencies
└── README.md               # Project documentation
```

## Edge Runtime Configuration

The application uses Cloudflare's Edge Runtime for optimal performance:

1. API routes are configured with:
   ```typescript
   export const runtime = 'edge';
   ```

2. Cloudflare Pages specific optimizations in `next.config.js`:
   ```javascript
   const nextConfig = {
     assetPrefix: process.env.NODE_ENV === 'production' ? '/_next' : '',
     distDir: '.next',
     generateBuildId: async () => 'build'
   }
   ```

## Development Commands

- `npm run dev`: Start development server
- `npm run build`: Build the application
- `npm run pages:build`: Build for Cloudflare Pages
- `npm run preview`: Preview Pages deployment locally
- `npm run deploy`: Deploy to Cloudflare Pages
- `npm run cf-typegen`: Generate Cloudflare environment types

## Environment Setup

Ensure you have the following:
1. Node.js installed (v18 or later recommended)
2. Cloudflare account with Pages enabled
3. Wrangler CLI installed globally (`npm i -g wrangler`)

Last updated: December 9, 2024
