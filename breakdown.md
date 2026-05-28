# MINK MGMT. — Design Breakdown

> Photography & filmmaker management agency. Offices in Stockholm, Paris, London.  
> [minkmgmt.com](https://minkmgmt.com)

---

## Philosophy

The design has one guiding principle: **get out of the way of the work.**  
No hero section, no brand manifesto, no decorative elements. The photographs *are* the interface. Every design decision — typography scale, color restraint, layout rhythm — exists to make the images feel like the only thing that matters on the page.

This is the purest form of portfolio-agency design: **confidence through subtraction.**

---

## Layout & Structure

### Single-Page Vertical Scroll
The entire roster lives on one page. No pagination, no filtering, no categories. You arrive and scroll.

### Artist Entry Pattern
Each artist is presented as a repeating unit:

```
[ image ] [ image ] [ image ] [ image ]   ← horizontal image strip
Artist Name                               ← link, sentence case
Photographer, Director                    ← role descriptor, lighter weight
```

This unit repeats for every artist, creating a perfectly predictable cadence — visual rhythm through repetition.

### No Hero
The page begins immediately with the first artist's image strip. There is no introductory section, no tagline, no decorative landing moment. The roster *is* the homepage.

---

## Navigation

Minimal to the point of near-invisibility:

| Element | Position | Behavior |
|---|---|---|
| `MINK MGMT.` wordmark | Top-left | Links to homepage `/` |
| `Contact` | Top-right | Links to `/contact` |

No hamburger menu. No secondary navigation. No search. Two links. Done.

---

## Image System

### Horizontal Strip (Carousel Row)
Each artist gets a horizontal strip of **3–4 images**, all at a fixed height (320px). Images are:
- Uniform height, variable width (portrait and landscape crops coexist)
- Cropped to focal point via Imgix parameters (`fit=crop`, `crop=focalpoint`)
- Lazy-loaded and responsive (1.5× DPR for retina displays)

### Image Delivery (Imgix CDN)
All images are served through `mink.imgix.net` with consistent URL parameters:

```
?auto=format
&fit=crop
&fm=jpg
&h=320
&q=70
&dpr=1.5
```

Quality is deliberately set to `q=70` — good enough for screen, light enough for fast loading.

### Interaction
The image strips are horizontally scrollable/draggable. On hover or interaction, the strip can be panned to reveal additional images not visible in the initial viewport. Clicking an artist name navigates to their full portfolio page.

---

## Typography

| Element | Style |
|---|---|
| Artist name | Small, sentence case, linked, standard weight |
| Role descriptor | Same size, lighter gray, no link |
| Navigation | Same typeface, same size as body |
| Logo | Wordmark in caps: `MINK MGMT.` |

No display font. No size hierarchy beyond the absolute minimum. The typeface is a clean grotesque — restrained, functional, invisible.

**Key choice:** Artist names are *not* bold, *not* oversized, *not* in caps. They sit quietly below the images, confident they don't need to shout.

---

## Color

| Role | Value |
|---|---|
| Background | `#FFFFFF` — pure white |
| Body text | Near-black |
| Role descriptors | Light gray |
| Accent color | None |
| Borders / dividers | None |

Zero decorative color. The palette is defined entirely by the photographs.

---

## Interactions & Motion

| Interaction | Behavior |
|---|---|
| Image strip hover/drag | Horizontal pan to reveal additional images |
| Artist name hover | Likely subtle underline or color shift (standard link state) |
| Artist name click | Routes to individual portfolio page (`/[slug]`) |
| Page scroll | Standard vertical — no parallax, no scroll-triggered animations |

Motion is minimal or absent. The site does not animate to impress; it stays still so the images can breathe.

---

## Page Structure (Simplified DOM)

```
<header>
  <a href="/">MINK MGMT.</a>
  <a href="/contact">Contact</a>
</header>

<main>
  <section class="artist">
    <div class="image-strip">
      <img /> <img /> <img /> <img />
    </div>
    <a href="/artist-slug">Artist Name</a>
    <p>Photographer, Director</p>
  </section>

  <!-- × 20 artists -->
</main>

<footer>
  <a href="https://instagram.com/minkmgmt">Instagram</a>
  <a href="...">Newsletter</a>
</footer>
```

---

## Full Artist Roster

| Name | Role |
|---|---|
| Amie Milne | Photographer, Director, Art Director |
| Andy Massaccesi | Photographer, Director |
| Anton Olin | DOP |
| Bohman+Sjöstrand | Photographers, Directors |
| Calle Stoltz | Photographer, Director |
| Daisy Walker | Photographer, Director, Art Director |
| Ellen Nykvist | Photographer |
| Fauve Bouwman | Photographer, Director |
| Frida-My | Photographer, Director |
| Geray Mena | Photographer |
| Jack Grange | Photographer |
| Jacob Tovedal | DOP |
| Joel Rhodin | Photographer |
| Jonas Bresnan | Photographer, Director |
| Keir Laird | Photographer, Director |
| Matthieu Delbreuve | Photographer |
| Studio Kleiner | Photographer, Set Design, Film |
| Theresa Marx | Photographer, Art Director |

---

## Technical Stack

| Layer | Technology |
|---|---|
| Framework | Gatsby 2.x (React-based static site generator) |
| Image CDN | Imgix (`mink.imgix.net`) |
| Hosting | Inferred static hosting (Netlify/Vercel pattern) |
| Meta / SEO | Open Graph, Twitter Card, theme-color `#FFFFFF` |
| Social | [@minkmgmt](https://instagram.com/minkmgmt) |

---

## Design Principles (Distilled)

1. **The work is the design.** Every pixel that isn't a photograph is a pixel that should justify its existence.
2. **Restraint as confidence.** A white background and minimal type signal that the agency doesn't need to sell itself — the roster does.
3. **Consistent rhythm, zero noise.** Repeating the same artist-entry pattern creates a calm, browseable flow. No surprise layouts, no grid-breaking moments.
4. **Speed through simplicity.** Fewer UI elements = faster loads = more time spent looking at images.
5. **Navigation as an afterthought.** Two links in the header. If you need more than that, you're probably already on an artist page.

---

*Analysis based on live site crawl — May 2026.*