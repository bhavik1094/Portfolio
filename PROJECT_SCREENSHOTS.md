# Project screenshots

Place your manually captured homepage screenshots in `public/images/projects/`:

| Project | Filename |
| --- | --- |
| Aurelia Admin | `aurelia-admin.webp` |
| Invoxa | `invoxa.webp` |
| Adhyashakti Solar | `adhyashakti-solar.webp` |
| Shree Krishna Nasta House | `shree-krishna-nasta-house.webp` |

Use optimized WebP images, preferably landscape **16:10** (for example, 1600 × 1000). Other aspect ratios are supported: images fit inside the existing pastel artwork area without stretching or cropping. Keep files reasonably small, ideally below 250 KB.

No screenshots were supplied with this update. Until a matching file exists, the existing decorative artwork remains visible. Failed images also return to this artwork. Only existing files are included in the image configuration; no screenshot requests are made for missing files.

To add or replace an image, save it with the exact lowercase filename above, then restart `npm run dev` or rebuild with `npm run build`. File discovery occurs when Vite transforms the component, so adding files to an already built `dist/` alone will not enable them. For a local check, run `npm run dev`, open the Projects section at `/Portfolio/`, and select All Projects. Aurelia Admin appears in the featured area; the other three appear in their existing cards. Check the details dialogs, both themes, and mobile layout manually.
