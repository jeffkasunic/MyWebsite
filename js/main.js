// No external dependencies, no analytics, no network calls (third-party
// players like SoundCloud load only when the visitor clicks to load them).

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const toggle = document.querySelector('.site-nav__toggle');
const links = document.querySelector('.site-nav__links');

if (toggle && links) {
  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close the menu after a link is chosen
  links.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      links.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Until real photos/posters are dropped into their assets/ folders, hide the
// broken-image icon so the page shows a plain panel instead of a broken-link glyph.
document.querySelectorAll('.photo-grid__item img, .poster__frame img').forEach((img) => {
  img.addEventListener('error', () => {
    img.style.opacity = '0';
  }, { once: true });
});

// Photography lightbox: click a grid photo to view it enlarged, with
// keyboard/click navigation between photos. No-ops on pages without a
// photo grid or lightbox element.
const photoButtons = Array.from(document.querySelectorAll('.photo-grid__link'));
const lightbox = document.getElementById('lightbox');

if (photoButtons.length && lightbox) {
  const lightboxImg = lightbox.querySelector('.lightbox__img');
  const lightboxCaption = lightbox.querySelector('.lightbox__caption');
  const closeBtn = lightbox.querySelector('.lightbox__close');
  const prevBtn = lightbox.querySelector('.lightbox__prev');
  const nextBtn = lightbox.querySelector('.lightbox__next');
  let currentIndex = 0;

  function showPhoto(index) {
    currentIndex = (index + photoButtons.length) % photoButtons.length;
    const btn = photoButtons[currentIndex];
    const img = btn.querySelector('img');
    const caption = btn.closest('figure').querySelector('figcaption');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = caption ? caption.textContent : '';
  }

  function openLightbox(index) {
    showPhoto(index);
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  photoButtons.forEach((btn, i) => {
    btn.addEventListener('click', () => openLightbox(i));
  });

  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', () => showPhoto(currentIndex - 1));
  nextBtn.addEventListener('click', () => showPhoto(currentIndex + 1));

  // Click the dark backdrop (not the image itself) to close
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPhoto(currentIndex - 1);
    if (e.key === 'ArrowRight') showPhoto(currentIndex + 1);
  });
}

// Click-to-load embeds: swap the placeholder for the real player iframe only
// when the visitor asks, so the page makes no third-party requests on load.
document.querySelectorAll('[data-embed-src]').forEach((frame) => {
  const button = frame.querySelector('.player__load');
  if (!button) return;
  button.addEventListener('click', () => {
    const iframe = document.createElement('iframe');
    iframe.src = frame.dataset.embedSrc;
    iframe.title = frame.dataset.embedTitle
      ? `${frame.dataset.embedTitle} — SoundCloud player`
      : 'Jeff Kasunic on SoundCloud';
    iframe.allow = 'autoplay; encrypted-media';
    frame.replaceChildren(iframe);
    frame.classList.add('is-loaded');
  });
});
