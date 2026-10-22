# Thisula Lewhan: personal site

"Radix" is a dark, immersive personal-brand site. Skyradix takes its name from *radix*, Latin for root, so the whole site is set under a √ radical drawn in ultramarine light. It opens with √ THISULA LEWHAN and closes with √ LET'S TALK. The design rationale is in [docs/DESIGN.md](docs/DESIGN.md).

Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4 and Motion for React. It has no backend, database or API routes, and every page is prerendered as static HTML.

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build (static prerender) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | Type check |

## Editing content

Personal details and copy are kept out of the components:

| File | Contains |
| --- | --- |
| `src/config/site.ts` | Name, roles, headline, contact emails, Skyradix links, social links, portrait |
| `src/content/copy.ts` | Section copy: About, Perspective, Skyradix, Groundwork, Person (including the conversation starters) |

Set any contact value in `site.ts` to an empty string and the links that depend on it disappear. No broken links are shown.

## Deploy to Vercel

1. Push this repository to GitHub.
2. In Vercel, choose **Add New → Project**, import the repository, and keep the detected Next.js settings.
3. Once you have a production domain, add an environment variable `NEXT_PUBLIC_SITE_URL` (for example `https://thisulalewhan.com`) and redeploy. This turns on canonical URLs, absolute Open Graph URLs, the sitemap entry and the robots sitemap line. Until then, the site falls back to Vercel's production URL.

Or use the CLI:

```bash
npx vercel
```

```bash
npx vercel --prod
```
