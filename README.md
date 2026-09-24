# Portfolio site

Plain HTML, CSS, and JavaScript — no build step, no frameworks, no external
requests (fonts, scripts, and analytics are all avoided on purpose so the
pages have zero third-party calls).

## Pages

```
index.html          Home — hero, selected credits, links to the other pages
film-vfx.html        Film & VFX — skills and full experience timeline
photography.html     Photography — image grid
music.html           Music Composition — click-to-load SoundCloud player
writing.html         Writing — science fiction & fantasy novels, with cover, status, and synopsis
projects.html        Development Projects — pipeline tools and personal work
about.html           About — bio, education, contact
css/style.css         shared styling for every page
js/main.js            shared nav toggle + footer year
assets/photography/  put your real photos here
assets/reel/          put a self-hosted reel video here, if you want one
assets/books/         book cover images for writing.html
```

Each page repeats the same `<header class="site-nav">` and `<footer>` markup
— there's no templating layer, since six small pages don't need one. If the
site grows much beyond this, a static site generator (11ty, Astro) would be
worth it to avoid editing the nav in six places; for now, plain files are
simpler to host and easier to hand-edit.

## Customizing content

Spots that still need your input are marked `<!-- EDIT: ... -->` — search
each file for `EDIT`:

- **film-vfx.html** — drop in a reel embed or self-hosted video. Movie
  posters go in `assets/posters/` — see the filename list in that folder's
  README. A couple of entries (Zoic, Blur Studio) keep a plain text credit
  line instead of posters, since TV/commercial/trailer work doesn't have a
  theatrical poster to show.
- **photography.html** — images live in `assets/photography/` and are
  linked by filename (e.g. `London-Underground.jpg`); captions come from the
  filenames — edit each `<figcaption>` and `alt` as needed. Clicking any photo opens it enlarged in a lightbox
  (caption included), with arrow-key/click navigation between photos.
- **projects.html** — the studio pipeline tools and generative workflow
  entries are pulled straight from your resume; "Procedural Graphics
  Experiments" is a placeholder for a personal project — replace or remove it.
- **about.html** — your phone number and full street address from the
  resume were left off on purpose (see Privacy below). Add them back in
  the contact list if you want them public.

## A few choices worth knowing about

- **Contact info**: the site publishes your email, LinkedIn, and city, but
  not your phone number or full home address — a public portfolio gets
  crawled and scraped, and a phone number/street address there mostly
  invites spam rather than real inquiries. Easy to add back in `about.html`
  if you'd rather have them visible.
- **References**: your resume lists colleagues' names and personal work
  emails as references. Those went into "References available on request"
  instead of being posted publicly — standard practice, and it avoids
  publishing other people's contact details without asking them first.
- **Studio tools**: the previs automation tool and the Unreal↔Houdini USD
  bridge are described but not linked to a repo, since that code belongs to
  LAIKA and DreamWorks respectively, not to you personally.
- **Movie posters**: official poster art is owned by the studio/distributor,
  not by the artists who worked on the film. Using them on a personal
  portfolio to identify films you worked on is common practice in the
  industry, but it's still their copyrighted artwork rather than yours —
  worth keeping in mind if the site ever gets more public-facing (e.g.
  linked from a resume you send to a new studio).

## The reel

Each Film & VFX page has a placeholder box. Replace it with either:

- A privacy-enhanced embed (e.g. YouTube's `youtube-nocookie.com` or Vimeo's
  "do not track" embed option) — the only external request the page would
  then make, and only when a visitor plays the video, or
- A self-hosted `<video>` tag pointing at a file in `assets/reel/`, e.g.:

  ```html
  <video controls poster="assets/reel/poster.jpg">
    <source src="assets/reel/reel.mp4" type="video/mp4">
  </video>
  ```

## Hosting

This is a fully static site — any static host works: GitHub Pages,
Netlify, Cloudflare Pages, or your own server. There's nothing to build or
install; just upload the folder as-is. You can also just double-click
`index.html` to preview it locally in a browser before you host it.

## Design notes

- Dark palette built around a lighting metaphor (amber = tungsten/bounce
  light, cyan = cool key light) rather than a single neon accent.
- Home's hero is treated like a film title card, with camera-frame corner
  marks as the one deliberate motion moment on load.
- The experience timeline is real markup (headings, dates, lists) rather
  than styled `<div>`s, so it's easy to copy-paste and keep editing.
- Respects `prefers-reduced-motion` and keeps visible keyboard focus
  throughout.
