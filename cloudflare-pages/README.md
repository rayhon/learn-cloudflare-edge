# Next JS 14 with Cloudflare Pages


## Migration from Vite to Next.js
Next.js is a complete framework that includes: (so vite is not needed)
* Its own build tool (based on webpack)
* Development server
* File-based routing
* Server-side features
* API routes
* Edge runtime support

### Key Changes
1. **Project Structure**
   - Moved from Vite to Next.js App Router
   - Removed Vite files (`vite.config.js`, `index.html`)
   - Consolidated styles into `src/app/globals.css`

2. **Configuration**
   - Added `next.config.js` for Cloudflare Pages optimization:     ```javascript
     const nextConfig = {
       assetPrefix: process.env.NODE_ENV === 'production' ? '/_next' : '',
       distDir: '.next',
       generateBuildId: async () => 'build'
     }     ```
   - Updated dependencies in `package.json` to Next.js ecosystem

3. **Routing**
   - Migrated from React Router to Next.js App Router
   - Routes structure:
     * `app/page.jsx` → / (home page)
     * `app/post/[id]/page.jsx` → /post/123 (dynamic route)

4. **Components**
   - Added `'use client'` directive for client components
   - Updated imports to use Next.js components
   - Maintained component structure in `src/components/`

## Project Structure

```bash
your-project/
├── src/
│ ├── app/ # Next.js pages and layouts
│ ├── components/ # React components
│ └── lib/ # Utilities (if needed)
├── functions/ # Cloudflare Pages Functions
├── public/ # Static assets
├── next.config.js # Next.js configuration
└── package.json # Project dependencies
```

## Development

```bash
# Install dependencies
npm install

# build
npm run build

# Run the development server with Cloudflare Pages
# Ready on http://localhost:8788
npm run pages:dev

# deploy
npm run deploy
```


## Edge Runtime
* The pages will run on Cloudflare's edge network
* This aligns with your Cloudflare Pages Functions which are also running at the edge
* You get better performance as both your pages and APIs are running close to your users


## UI
### Post List

![Posts list](./public/images/posts.png)


### Post Detail
![Post detail](./public/images/post-detail.png)



## Future Enhancements
* KV Store integration using `wrangler.toml`
* Server-side data fetching optimization
* Enhanced error handling

