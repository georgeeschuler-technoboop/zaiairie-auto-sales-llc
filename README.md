# Zaiairie Auto Sales LLC — Website

Customer-facing website + admin inventory manager for Zaiairie Auto Sales, a used car dealership in Newburgh, NY.

**Live site:** _(add Netlify/Vercel URL once deployed)_
**Admin:** `/admin.html` (password gate)

## Stack

- HTML / Tailwind (via CDN) / vanilla JavaScript
- No build step, no framework — just open the files
- Data layer lives in `shared.js` and currently uses `localStorage` (demo mode)
- Phase 2 will swap the data layer to Supabase for real multi-device sync, real auth, and cloud image storage

## Files

| File | What it is |
|---|---|
| `index.html` | Customer-facing site: hero, featured cars, filterable inventory, vehicle detail with photo gallery, request-info form, contact, map |
| `admin.html` | Admin page: password gate, add/edit/delete vehicles, multi-image upload with drag-to-reorder, status management |
| `shared.js` | Inventory data layer (currently localStorage; swappable to Supabase later) |
| `showroom-hero.jpg` | Hero image of the indoor showroom |

## Running locally

Open `index.html` directly in a browser, or for a more realistic test:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Admin

Default demo password: `admin123` (defined in `admin.html` as `DEMO_PASSWORD`). Change before deploying.

In demo mode, all changes are stored in the browser's localStorage on whatever device made them — they do **not** sync across devices. This is expected until Phase 2.

## Deployment

Push to `main`, connect the repo to Netlify or Vercel — no build step needed, just publish the root.

## Phase 2 — what's next

- [ ] Supabase project + `vehicles` table
- [ ] Supabase Storage for car photos
- [ ] Replace localStorage calls in `shared.js` with Supabase client calls
- [ ] Replace demo password with Supabase Auth (magic link or password)
- [ ] Wire request-info form to a real handler (Supabase function or Netlify Forms) that emails the dealership and stores leads
- [ ] Real NY dealer license number in footer
- [ ] Replace placeholder About copy with the owner's actual story
- [ ] Real photos of current inventory replacing seed data

## Contact

Zaiairie Auto Sales LLC
24 Johnes St, Suite M, Newburgh, NY 12550
(845) 685-5521 · zaiairieautosalesllc@gmail.com
