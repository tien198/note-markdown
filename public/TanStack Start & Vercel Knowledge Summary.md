# TanStack Start & Vercel Knowledge Summary

This document summarizes the core technical concepts, rules, and best practices we applied to build and deploy your TanStack Start application.

## 1. Data Loading & Server Functions
- **Client-First Routing**: TanStack Router uses a `loader` property on routes to fetch data before the page renders.
- **Server Functions**: We use `createServerFn` to write backend code (like reading files or querying databases). This code never ships to the browser; TanStack Start replaces it with a type-safe RPC (Remote Procedure Call) stub.
- **The Pattern**: You call the server function inside the route's `loader` and consume the data in your component using `Route.useLoaderData()`.

## 2. Vercel Deployment & Nitro
- **Full-Stack Build**: TanStack Start uses **Nitro** under the hood. To deploy a full-stack Server-Side Rendering (SSR) app to Vercel, the `nitro/vite` plugin MUST be included in your `vite.config.ts`.
- **The `.vercel` Output**: When Vercel runs `npm run build`, Nitro intercepts the build process and creates a `.vercel/output` folder containing Serverless Functions instead of a basic `dist` folder.
- **Git Tracking**: You should never commit the `.vercel` or `dist` folders to version control. They are generated dynamically by Vercel during deployment.

## 3. Serverless File System (The "Not Found" Fix)
- **The Problem**: When deployed, Vercel Serverless Functions do not have direct access to your repository's `public` folder via Node's `fs.readFile`.
- **The Solution (`import.meta.glob`)**: Instead of relying on the runtime file system, use Vite's `import.meta.glob(..., { query: '?raw' })`. This evaluates at build time and compiles the raw text of your markdown files directly into the compiled JavaScript of the serverless function.

## 4. Static Prerendering (Alternative)
- If your app doesn't need dynamic server endpoints, you can instruct TanStack Start to crawl all your links at build time and generate static `.html` files.
- You enable this in the `tanstackStart` plugin config with `prerender: { enabled: true, crawlLinks: true }`. This allows Vercel to serve the app purely via its Edge CDN without invoking Serverless Functions.

## 5. UI & Styling (GitHub Aesthetics)
- To achieve a perfect GitHub markdown aesthetic without writing custom CSS, we used `github-markdown-css` combined with `highlight.js`.
- Applying the `markdown-body` class to the wrapper `div` forces all nested elements (headers, tables, code blocks) to inherit GitHub's native typography and spacing.
