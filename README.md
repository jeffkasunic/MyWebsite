# Jeff Kasunic — Personal Website

**Live site:** https://jeffkasunic.com

The portfolio site of Jeff Kasunic: computer artist, developer, and science
fiction & fantasy writer. It collects 25 years of film and VFX lighting work,
photography, music composition, writing, development projects, and an
interactive exploration of higher-dimensional geometry.

The site is plain HTML, CSS, and JavaScript. There is no framework, no build
step, no package manager, and no analytics. It makes no third-party requests on
page load: embedded players such as SoundCloud only load when a visitor clicks
to start them.

## Pages

| Page | File | What's there |
|------|------|--------------|
| Home | `index.html` | Introduction and links into each section |
| About | `about.html` | Background and bio |
| Film & VFX | `film-vfx.html` | Lighting and rendering work in feature animation, live-action VFX, and episodic TV |
| Photography | `photography.html` | Travel photography grouped by place, with filter tabs and a lightbox |
| Music | `music.html` | Original compositions with click-to-load players |
| Writing | `writing.html` | Science fiction and fantasy novels |
| Projects | `projects.html` | Pipeline tools, generative workflows, and other development work |
| Mathematics | `mathematics.html` | Notes on multi-dimensional geometry |
| Platonic Solids | `mathematics/platonic-solids.html` | A self-contained interactive guide to the regular polytopes, from the five Platonic solids to 4D and beyond |

## Project layout

```
.
├── index.html, about.html, …   Top-level pages
├── mathematics/                 Standalone interactive math pages
├── css/style.css                Shared styles and design tokens
├── js/main.js                   Shared behavior (nav, tabs, lightbox, embeds)
├── assets/                      Images, one folder per section
│   ├── photography/             Photos, with subfolders for larger trips
│   ├── posters/, projects/, …
│   └── math/                    Images and icons for the math pages
├── favicon.svg, favicon-32.png, apple-touch-icon.png
├── robots.txt
└── sitemap.xml
```

### Design

`css/style.css` opens with the design tokens. The palette is built around a
lighting idea rather than a generic dark theme:

- **Charcoal panels** (`--void`, `--panel`) are like a screening room with the
  lights down.
- **Bone** (`--bone`) is a neutral light grey used as reference white for text.
- **Amber** (warm tungsten light) and **cyan** (cool key light) work as a
  two-light rig. Each section picks one as its accent through `--accent`; add
  the `.accent-cyan` class to switch a section to cyan.

### JavaScript

`js/main.js` is shared by every page and quietly does nothing on pages that
don't use a feature:

- **Mobile nav:** opens and closes the menu on small screens.
- **Photography tabs:** show the photos from one place, matched on each
  figure's `data-region`. The chosen tab goes in the URL hash so it can be
  linked to.
- **Lightbox:** click a photo or project screenshot to view it enlarged, with
  keyboard and click navigation.
- **Click-to-load embeds:** a placeholder stands in for each third-party player
  until the visitor clicks it.

The Platonic Solids page carries its own styles and scripts inline, so it works
on its own.

---

© Jeff Kasunic. All rights reserved.
