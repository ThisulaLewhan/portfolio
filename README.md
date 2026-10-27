# Thisula Lewhan: personal site

A single-page personal site for an entrepreneur and the founder of Skyradix. Its foundation is Swiss typography: a 12-column grid, an oversized Inter Tight name and Swiss red as the only accent. Apple-style glass is used in three places: the floating nav, the Skyradix panel and the contact panel. The design rationale is in [docs/DESIGN.md](docs/DESIGN.md).

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
| `src/config/site.ts` | Name, identity line, email, LinkedIn, Skyradix URL, portrait, `showNotes` switch |
| `src/content/copy.ts` | All section copy, plus `notes.items`: add real notes there and they're listed automatically |

Set any contact value in `site.ts` to an empty string and the links that depend on it disappear. No broken links are shown.

## Deploy to Vercel

1. Push this repository to GitHub.
2. In Vercel, choose **Add New → Project**, import the repository, and keep the detected Next.js settings.
3. The canonical domain `https://thisulalewhan.me` is set in `src/config/site.ts` (`SITE_URL`). Canonical URLs, Open Graph, the sitemap, robots.txt and the Person JSON-LD all use it.

Or use the CLI:

```bash
npx vercel
```

```bash
npx vercel --prod
```
