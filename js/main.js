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

// Photography tabs: show only the photos from one place (matched on each
// figure's data-region). The choice goes in the URL hash so a tab can be linked to.
const photoTabs = Array.from(document.querySelectorAll('.photo-tabs__tab'));

if (photoTabs.length) {
  const photoItems = document.querySelectorAll('.photo-grid__item');

  function selectTab(region) {
    photoTabs.forEach((tab) => tab.setAttribute('aria-pressed', String(tab.dataset.region === region)));
    // Photos of me only appear under their own tab, never in All
    photoItems.forEach((item) => {
      item.hidden = region === 'all' ? item.dataset.region === 'personal' : item.dataset.region !== region;
    });
  }

  photoTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const region = tab.dataset.region;
      selectTab(region);
      history.replaceState(null, '', region === 'all' ? location.pathname : `#${region}`);
    });
  });

  const linked = location.hash.slice(1);
  if (photoTabs.some((tab) => tab.dataset.region === linked)) selectTab(linked);
}

// Lightbox: click a grid photo, project screenshot or page-head photo to view it enlarged, with
// keyboard/click navigation between images. Project screenshots are links to
// the full-size file, which the lightbox shows in place of the thumbnail.
// No-ops on pages without a photo grid/screenshots or lightbox element.
const allPhotoButtons = Array.from(document.querySelectorAll('.photo-grid__link, .project-list__shot, .page-head__zoom'));
const lightbox = document.getElementById('lightbox');

if (allPhotoButtons.length && lightbox) {
  const lightboxImg = lightbox.querySelector('.lightbox__img');
  const lightboxCaption = lightbox.querySelector('.lightbox__caption');
  const closeBtn = lightbox.querySelector('.lightbox__close');
  const prevBtn = lightbox.querySelector('.lightbox__prev');
  const nextBtn = lightbox.querySelector('.lightbox__next');
  let photoButtons = allPhotoButtons; // the images prev/next step through
  let currentIndex = 0;

  function showPhoto(index) {
    currentIndex = (index + photoButtons.length) % photoButtons.length;
    const btn = photoButtons[currentIndex];
    const img = btn.querySelector('img');
    const caption = btn.closest('figure')?.querySelector('figcaption')
      ?? btn.closest('.project-list__item')?.querySelector('h3');
    lightboxImg.src = btn.getAttribute('href') || img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = caption ? caption.textContent : '';
  }

  function openLightbox(btn) {
    // Step only through the photos the current tab is showing
    photoButtons = allPhotoButtons.filter((b) => !b.closest('[hidden]'));
    // Nothing to step through with a single image
    prevBtn.hidden = photoButtons.length === 1;
    nextBtn.hidden = photoButtons.length === 1;
    showPhoto(photoButtons.indexOf(btn));
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  allPhotoButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openLightbox(btn);
    });
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
