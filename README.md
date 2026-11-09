# Amaro Café — Landing Page

React + Vite + Tailwind CSS + GSAP (ScrollTrigger) + Lenis + Lucide icons.
Fully responsive (320px phones → 4K), lazy-loaded sections, real loading progress bar,
reduced-motion support, self-hosted fonts (no Google Fonts requests).

## Run it in VS Code

1. Install **Node.js 18.18+** (LTS 20 or 22 recommended): https://nodejs.org  
   Check: `node -v` and `npm -v` in a terminal.
2. Unzip, then in VS Code: **File → Open Folder…** → choose the `amaro-cafe` folder.
3. Open the built-in terminal: **Terminal → New Terminal** (`Ctrl + ``).  
   The terminal must be inside the project folder (where `package.json` is).
4. Install everything (one time):
   ```bash
   npm install
   ```
5. Start the dev server:
   ```bash
   npm run dev
   ```
   Open the link it prints (usually http://localhost:5173). Edits reload instantly.
6. Production build + local preview:
   ```bash
   npm run build
   npm run preview
   ```

## Libraries (already listed in package.json — `npm install` gets them all)

| Package | Why |
|---|---|
| react, react-dom | UI |
| vite, @vitejs/plugin-react | dev server / bundler |
| tailwindcss@3, postcss, autoprefixer | styling |
| gsap | animations + ScrollTrigger |
| lenis | smooth scrolling |
| lucide-react | icons (tree-shaken) |
| @fontsource-variable/fraunces, /dm-sans | self-hosted fonts |

To install them manually in a fresh project instead:
```bash
npm install react react-dom gsap lucide-react lenis @fontsource-variable/fraunces @fontsource-variable/dm-sans
npm install -D vite@6 @vitejs/plugin-react@4 tailwindcss@3 postcss autoprefixer
```

## Use your own photos
All pictures ship as built-in SVG illustrations. To swap in a real photo, put the file in
`public/images/` and register it in `src/data/images.js`, e.g. `hero: '/images/hero-cup.webp'`.

## Edit content
Menu items, prices, hours, stage text: `src/data/content.js`.
Colours / fonts / fluid type sizes: `tailwind.config.js`.

## Deploy to Vercel
**Option A (GitHub):** push the project to GitHub → vercel.com → *Add New → Project* → import the repo.
Vercel auto-detects Vite (Build: `npm run build`, Output: `dist`). Click Deploy.

**Option B (CLI):**
```bash
npm i -g vercel
vercel          # first deploy (preview)
vercel --prod   # production
```
