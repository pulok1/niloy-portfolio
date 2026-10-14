# Deployment

The site is a fully static export (`next build` writes plain HTML, CSS, JS and images to `out/`). It needs no server, database or secrets, so it runs on GitHub Pages, Vercel, Netlify or any static host.

## Environment variables

All are optional build-time variables (see [.env.example](.env.example)). Copy that file to `.env.local` for local builds.

| Variable | Purpose | Example |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public URL including any sub-path, without a trailing slash. Used for canonical links, Open Graph and Twitter tags, the sitemap and JSON-LD. **Set it in production**, or link previews will point at `localhost`. | `https://pulok.github.io/niloy-portfolio` |
| `NEXT_PUBLIC_BASE_PATH` | Sub-path the site is served from. Needed only for a GitHub Pages *project* site; leave it empty for Vercel, a custom domain or a `<user>.github.io` repo. | `/niloy-portfolio` |
| `NEXT_PUBLIC_HIDE_PLACEHOLDERS` | `true` hides unfilled TODO badges. | `false` |

## Option A: GitHub Pages (workflow included)

[`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) runs lint, unit tests and the build, then publishes `out/` on every push to `main`.

1. Create a GitHub repository (e.g. `niloy-portfolio`) and push this project:
   ```sh
   git remote add origin https://github.com/<user>/niloy-portfolio.git
   git push -u origin main
   ```
2. On GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. The workflow takes the URL and base path from `actions/configure-pages`, so the site works at `https://<user>.github.io/niloy-portfolio/` with no extra setup.
4. Watch the run under **Actions**. When it finishes, the URL appears on the deploy job.

**Custom domain:** add the domain under Settings → Pages. Then, under **Settings → Secrets and variables → Actions → Variables**, add `USE_ROOT_PATH` = `true` and `NEXT_PUBLIC_SITE_URL` = `https://your-domain`. Re-run the workflow.

**Hide placeholders on the live site:** add the repository variable `NEXT_PUBLIC_HIDE_PLACEHOLDERS` = `true`.

## Option B: Vercel

1. Import the repository at [vercel.com/new](https://vercel.com/new). The framework (Next.js) is detected automatically; the static export works as-is.
2. Under **Environment Variables**, set `NEXT_PUBLIC_SITE_URL` to the production URL (e.g. `https://niloy-bhattacharjee.vercel.app`). Leave `NEXT_PUBLIC_BASE_PATH` unset.
3. Deploy. Each later push to `main` redeploys.

## Local build and preview

```sh
npm ci
npm run build     # writes out/
npm start         # serves out/ at http://localhost:3000 (via `serve`)
```

To reproduce a GitHub Pages project build locally (in Git Bash, prefix with `MSYS_NO_PATHCONV=1` so `/niloy-portfolio` is not rewritten to a Windows path):

```sh
NEXT_PUBLIC_BASE_PATH=/niloy-portfolio NEXT_PUBLIC_SITE_URL=https://<user>.github.io/niloy-portfolio npm run build
```

## Checks before going live

```sh
npm run typecheck && npm run lint && npm test && npm run build
npm run check:links      # every DOI is registered and resolves
npm run check:crossref   # new DOIs or metadata differences to review (prints only)
```

After deploying, paste the URL into a WhatsApp chat with yourself to confirm the preview card shows the title and image. If an old preview is cached, the [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) can refresh it for Messenger.

## Admin interface

There is none, deliberately. Content lives in version-controlled files (`publications.json`, `src/content/*.ts`), and the site has no server-side code, so it has no login to protect. To edit content, change the files and push; the workflow redeploys.
