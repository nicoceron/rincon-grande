import Lenis from 'lenis';

const nav = document.querySelector('[data-site-nav]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const navPanel = document.querySelector('#site-menu');
const menuContent = navPanel?.querySelector('[data-menu-content]');
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const prefersReducedMotion = motionPreference.matches;
const heroMedia = document.querySelector('.hero-video-container');

function syncResponsiveLinks() {
  // Resolve captured internal destinations to local Astro routes at every
  // viewport. External destinations keep their source href and rel/target.
  const isMobile = window.innerWidth <= 1199.98;
  document.querySelectorAll('[data-desktop-href]').forEach((link) => {
    const desktopHref = link.getAttribute('data-desktop-href');
    const mobileHref = link.getAttribute('data-mobile-href');
    const astroHref = link.getAttribute('data-astro-href');
    if (!desktopHref || !mobileHref) return;
    const shouldUseAstroRoute = Boolean(astroHref);
    link.setAttribute('href', shouldUseAstroRoute ? astroHref : (isMobile ? mobileHref : desktopHref));
  });
}

function syncResponsiveVariants() {
  const footer = document.querySelector('footer[data-framer-name]');
  if (!footer) return;
  footer.setAttribute(
    'data-framer-name',
    window.innerWidth < 810 ? 'Mobile' : window.innerWidth < 1200 ? 'Tablet' : 'Desktop',
  );
}

syncResponsiveLinks();
syncResponsiveVariants();
window.addEventListener('resize', syncResponsiveLinks);
window.addEventListener('resize', syncResponsiveVariants);

/* The standalone initializes Lenis 1.1.9 with duration: .8. Use that focused
   scroll dependency directly so wheel bursts, touch, keyboard input, anchors,
   scrollbar drags, and nested scrollers all share the source behavior. */
const smoothScroll = (() => {
  const root = document.documentElement;
  const enabled = !prefersReducedMotion;
  let lenis;

  document.querySelectorAll('*').forEach((element) => {
    const style = window.getComputedStyle(element);
    const scrollsY = /(auto|scroll|overlay)/.test(style.overflowY) && element.scrollHeight > element.clientHeight;
    const scrollsX = /(auto|scroll|overlay)/.test(style.overflowX) && element.scrollWidth > element.clientWidth;
    if (scrollsY || scrollsX) element.setAttribute('data-lenis-prevent', 'true');
  });

  if (enabled) {
    lenis = new Lenis({ duration: 0.8 });
    root.dataset.scrollDriver = 'lenis-1.1.9';

    const frame = (time) => {
      lenis.raf(time);
      window.requestAnimationFrame(frame);
    };
    window.requestAnimationFrame(frame);
  }

  const scrollTo = (value) => {
    if (lenis) lenis.scrollTo(value);
    else window.scrollTo({ top: value, behavior: 'auto' });
  };

  document.addEventListener('click', (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target instanceof Element ? event.target.closest('a[href]') : null;
    if (!link) return;
    const url = new URL(link.href, window.location.href);
    if (!url.hash || url.origin !== window.location.origin || url.pathname !== window.location.pathname) return;
    const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
    if (!target) return;
    event.preventDefault();
    window.history.pushState({}, '', `${url.pathname}${url.search}${url.hash}`);
    if (enabled) lenis.scrollTo(target, { offset: -parseInt(window.getComputedStyle(target).scrollMarginTop || '0', 10) });
    else target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
  });

  return {
    enabled,
    scrollTo,
    setStopped(stopped) {
      if (!lenis) return;
      if (stopped) lenis.stop();
      else lenis.start();
    },
  };
})();

function syncHeroVideoScale() {
  if (!heroMedia) return;
  if (prefersReducedMotion) {
    heroMedia.style.transform = 'none';
    return;
  }
  const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
  heroMedia.style.transform = `scale(${1 + progress * 2})`;
}

const categoryMedia = document.querySelectorAll('.category-media-container');
const roomsSection = document.querySelector('.rooms-section');
const roomsMedia = document.querySelectorAll('.rooms-image-media');
const logoTrack = document.querySelector('.logo-track');
const aboutImage = document.querySelector('.about-image');
const aboutImageOverlay = document.querySelector('.about-image-overlay');
const aboutStampWrap = document.querySelector('.about-stamp-wrap');
const routeParallaxFrames = [...document.querySelectorAll('.source-route-page [data-route-parallax]')].filter(
  (frame) => !frame.closest('.source-prefooter-media, .source-contact-image'),
);
const routeRevealElements = [...document.querySelectorAll('[data-route-reveal]')];
const contactMarqueeTrack = document.querySelector('.source-contact-marquee-track');
const imageTransitionContainers = [...document.querySelectorAll('[data-image-transition]')];

if (aboutImage && aboutImageOverlay) {
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    aboutImageOverlay.style.transform = 'none';
  } else {
    const aboutImageObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          aboutImage.classList.add('is-revealed');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.1 },
    );
    aboutImageObserver.observe(aboutImage);
  }
}

function syncCategoryMediaMotion() {
  if (!categoryMedia.length) return;
  const width = window.innerWidth;
  const firstCard = categoryMedia[0].closest('.category-card-wrapper');
  const desktopStart = firstCard
    ? firstCard.getBoundingClientRect().top + window.scrollY - 578.7
    : 3016;
  const [start, slope] = width >= 1200 ? [desktopStart, 0.05043] : width >= 810 ? [2448, 0.05318] : [2395, 0.04416];
  const offset = prefersReducedMotion ? -30 : Math.min(52, Math.max(-30, -30 + (window.scrollY - start) * slope));
  categoryMedia.forEach((media) => {
    media.style.transform = `translateY(${offset}px) scale(1.2)`;
  });
}

function syncStampRotation() {
  if (!aboutStampWrap) return;
  if (prefersReducedMotion) {
    aboutStampWrap.style.transform = 'none';
    return;
  }
  const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
  aboutStampWrap.style.transform = `rotate(${(progress * 360).toFixed(3)}deg)`;
}

function syncRoomsMediaMotion() {
  if (!roomsSection || !roomsMedia.length) return;
  if (prefersReducedMotion) {
    roomsMedia.forEach((media) => {
      media.style.transform = 'scale(1.2)';
    });
    return;
  }

  const sectionTop = roomsSection.getBoundingClientRect().top + window.scrollY;
  const viewportHeight = window.innerHeight;
  const durationMultiplier = window.innerWidth >= 1200 ? 1.2 : window.innerWidth >= 810 ? 0.7 : 1;
  // Framer's desktop interpolation shifts its trigger slightly as the viewport
  // gets shorter. Preserve the 900px reference and match the 720px export.
  const desktopStartCorrection = window.innerWidth >= 1200
    ? Math.max(0, (900 - viewportHeight) * 0.0651)
    : 0;
  const motionStart = sectionTop - viewportHeight + desktopStartCorrection;
  const motionDuration = Math.max(1, viewportHeight * durationMultiplier);
  const progress = Math.min(1, Math.max(0, (window.scrollY - motionStart) / motionDuration));
  const offset = -37 + progress * 74;

  roomsMedia.forEach((media) => {
    media.style.transform = `translateY(${offset}px) scale(1.2)`;
  });
}

function syncRouteParallax() {
  if (!routeParallaxFrames.length) return;
  if (prefersReducedMotion) {
    routeParallaxFrames.forEach((frame) => {
      frame.querySelectorAll('.route-media-parallax-content').forEach((media) => {
        media.style.transform = 'none';
      });
    });
    return;
  }

  const travel = 74;
  const desktopHeightDelta = window.innerHeight - 720;
  const duration = window.innerWidth >= 1200
    ? 1294 + desktopHeightDelta / 30
    : window.innerWidth >= 810
      ? 1150
      : 1280;
  const viewportLead = window.innerWidth >= 1200
    ? 1206.6 + desktopHeightDelta * 0.79667
    : Math.max(1350, window.innerHeight * 1.5);
  routeParallaxFrames.forEach((frame) => {
    const media = [...frame.querySelectorAll('.route-media-parallax-content')];
    if (!media.length) return;
    const documentTop = frame.getBoundingClientRect().top + window.scrollY;
    const start = Math.max(0, documentTop - viewportLead);
    const progress = Math.min(1, Math.max(0, (window.scrollY - start) / duration));
    const offset = -37 + progress * travel;
    media.forEach((item) => {
      item.style.transform = `translateY(${offset.toFixed(3)}px) scale(1.2)`;
    });
  });
}

function setupImageTransition(container) {
  const layers = [...container.querySelectorAll('.image-transition-layer')];
  if (layers.length < 2) return;

  let activeIndex = Math.max(0, layers.findIndex((layer) => layer.classList.contains('is-active')));
  let timer;
  let isVisible = true;
  const interval = Math.max(1000, Number(container.dataset.transitionInterval) || 5000);

  const schedule = () => {
    if (timer) window.clearTimeout(timer);
    if (prefersReducedMotion || document.hidden || !isVisible) return;
    timer = window.setTimeout(() => {
      layers[activeIndex].classList.remove('is-active');
      activeIndex = (activeIndex + 1) % layers.length;
      layers[activeIndex].classList.add('is-active');
      schedule();
    }, interval);
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries.some((entry) => entry.isIntersecting);
        schedule();
      },
      { threshold: 0.01 },
    );
    observer.observe(container);
  }

  document.addEventListener('visibilitychange', schedule);
  schedule();
}

function syncRouteReveals() {
  if (!routeRevealElements.length) return;
  routeRevealElements.forEach((element) => {
    if (prefersReducedMotion) {
      element.style.opacity = '1';
      element.style.transform = 'none';
      return;
    }
    const rect = element.getBoundingClientRect();
    const start = window.innerHeight * 0.98;
    const end = window.innerHeight * 0.22;
    const linearProgress = Math.min(1, Math.max(0, (start - rect.top) / Math.max(1, start - end)));
    const progress = 1 - (1 - linearProgress) ** 2;
    element.style.opacity = progress.toFixed(3);
    element.style.transform = `translateY(${((1 - progress) * 25).toFixed(3)}px)`;
  });
}

function syncContactMarquee() {
  if (!contactMarqueeTrack) return;
  contactMarqueeTrack.style.transform = prefersReducedMotion
    ? 'none'
    : `translateX(${(-window.scrollY * (window.innerWidth >= 810 ? 0.7485 : 0.5)).toFixed(3)}px)`;
}

function syncNavTheme() {
  const threshold = Math.max(0, window.innerHeight - 73);
  nav?.classList.toggle('is-scrolled', window.scrollY >= threshold);
}

syncNavTheme();
syncHeroVideoScale();
syncCategoryMediaMotion();
syncStampRotation();
syncRoomsMediaMotion();
syncRouteParallax();
syncRouteReveals();
syncContactMarquee();
imageTransitionContainers.forEach(setupImageTransition);
window.addEventListener('scroll', syncNavTheme, { passive: true });
window.addEventListener('resize', syncNavTheme);
window.addEventListener('scroll', syncHeroVideoScale, { passive: true });
window.addEventListener('resize', syncHeroVideoScale);
window.addEventListener('scroll', syncCategoryMediaMotion, { passive: true });
window.addEventListener('resize', syncCategoryMediaMotion);
window.addEventListener('scroll', syncStampRotation, { passive: true });
window.addEventListener('resize', syncStampRotation);
window.addEventListener('scroll', syncRoomsMediaMotion, { passive: true });
window.addEventListener('resize', syncRoomsMediaMotion);
window.addEventListener('scroll', syncRouteParallax, { passive: true });
window.addEventListener('resize', syncRouteParallax);
window.addEventListener('scroll', syncRouteReveals, { passive: true });
window.addEventListener('resize', syncRouteReveals);
window.addEventListener('scroll', syncContactMarquee, { passive: true });
window.addEventListener('resize', syncContactMarquee);

/* Framer's source ticker runs left at 60 px/s. The four authored logos are
   repeated three times in the Astro markup, so travelling from item 1 to item
   5 produces a genuinely seamless loop at every breakpoint. */
let logoTrackAnimation;
let logoTrackInView = false;
let logoResizeFrame;

function syncLogoPlayback() {
  if (!logoTrackAnimation) return;
  if (logoTrackInView && !document.hidden) logoTrackAnimation.play();
  else logoTrackAnimation.pause();
}

function buildLogoTicker() {
  if (!logoTrack) return;
  logoTrackAnimation?.cancel();
  logoTrackAnimation = undefined;
  logoTrack.style.transform = 'translate3d(0, 0, 0)';

  if (motionPreference.matches) return;
  const items = [...logoTrack.children];
  if (items.length < 5) return;

  const loopDistance = items[4].offsetLeft - items[0].offsetLeft;
  if (loopDistance <= 0) return;

  logoTrackAnimation = logoTrack.animate(
    [
      { transform: 'translate3d(0, 0, 0)' },
      { transform: `translate3d(-${loopDistance}px, 0, 0)` },
    ],
    {
      duration: (loopDistance / 60) * 1000,
      easing: 'linear',
      iterations: Infinity,
    },
  );
  syncLogoPlayback();
}

if (logoTrack) {
  if ('IntersectionObserver' in window) {
    const logoObserver = new IntersectionObserver((entries) => {
      logoTrackInView = entries.some((entry) => entry.isIntersecting);
      syncLogoPlayback();
    });
    logoObserver.observe(logoTrack);
  } else {
    logoTrackInView = true;
  }

  buildLogoTicker();
  document.addEventListener('visibilitychange', syncLogoPlayback);
  motionPreference.addEventListener('change', buildLogoTicker);
  window.addEventListener('resize', () => {
    cancelAnimationFrame(logoResizeFrame);
    logoResizeFrame = requestAnimationFrame(buildLogoTicker);
  });
}

function setMenu(open) {
  if (!nav || !menuToggle || !navPanel) return;
  if (open && menuContent && !menuContent.hasChildNodes()) {
    const menuPrefix = window.location.pathname === '/' ? './' : '/';
    menuContent.innerHTML = `
      <p class="eyebrow">Navigation</p>
      <div class="nav-panel-links">
        <a data-nav-link href="${menuPrefix}dining">Dining</a>
        <a data-nav-link href="${menuPrefix}about">The Estate</a>
        <a data-nav-link href="${menuPrefix}rooms">The Lodge</a>
        <a data-nav-link href="${menuPrefix}wellness">Fishing</a>
        <a data-nav-link href="${menuPrefix}experiences/winter">Hunting</a>
        <a data-nav-link href="${menuPrefix}contact">Contact</a>
      </div>
    `;
    menuContent.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setMenu(false));
    });
  }
  nav.classList.toggle('is-open', open);
  document.body.classList.toggle('menu-open', open);
  smoothScroll.setStopped(open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  menuToggle.setAttribute('data-framer-name', open ? 'Close' : 'Hamburger');
  navPanel.setAttribute('aria-hidden', String(!open));
  navPanel.inert = !open;
  menuToggle.focus({ preventScroll: true });
}

if (navPanel) navPanel.inert = true;

menuToggle?.addEventListener('click', () => {
  setMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuToggle?.getAttribute('aria-expanded') === 'true') {
    event.preventDefault();
    setMenu(false);
  }
});

const reveals = document.querySelectorAll('[data-reveal]');
if (prefersReducedMotion || !('IntersectionObserver' in window)) {
  reveals.forEach((element) => element.classList.add('is-visible'));
} else {
  const observers = new Map();
  reveals.forEach((element) => {
    const threshold = Number(
      element.getAttribute('data-reveal-threshold')
        ?? (element.closest('.source-route-page') ? '0.9' : '0.5'),
    );
    let observer = observers.get(threshold);
    if (!observer) {
      observer = new IntersectionObserver(
        (entries, currentObserver) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            currentObserver.unobserve(entry.target);
          });
        },
        { threshold },
      );
      observers.set(threshold, observer);
    }
    observer.observe(element);
  });
}

function revealPassedElements() {
  if (prefersReducedMotion) return;
  reveals.forEach((element) => {
    if (element.getBoundingClientRect().top < window.innerHeight * 0.85) {
      element.classList.add('is-visible');
    }
  });
}

revealPassedElements();
window.addEventListener('scroll', revealPassedElements, { passive: true });

const gallerySection = document.querySelector('[data-gallery-images]');
const galleryWindow = document.querySelector('[data-gallery-window]');
const galleryTrack = galleryWindow?.querySelector('.gallery-track');
const gallerySlots = galleryWindow ? [...galleryWindow.querySelectorAll('[data-gallery-slot]')] : [];
const galleryPrevious = galleryWindow?.querySelector('[data-gallery-prev]');
const galleryNext = galleryWindow?.querySelector('[data-gallery-next]');
const galleryCursor = document.querySelector('[data-gallery-cursor]');

if (gallerySection && galleryWindow && galleryTrack && gallerySlots.length >= 7) {
  const imagePool = JSON.parse(gallerySection.getAttribute('data-gallery-images') ?? '[]');
  let centerIndex = 0;
  let pointerStartX = 0;
  let pointerStartY = 0;
  let pointerId = null;
  let pointerOffset = 0;
  let pointerMoved = false;

  const relativeToCenter = (imageIndex, direction = 0) => {
    let relative = (imageIndex - centerIndex + imagePool.length) % imagePool.length;
    if (relative > imagePool.length / 2) relative -= imagePool.length;
    if (relative === imagePool.length / 2 && direction < 0) relative *= -1;
    return relative;
  };

  const layoutGallery = (direction = 0, dragOffset = 0, immediate = false) => {
    const step = 482;
    galleryTrack.classList.toggle('is-dragging-track', immediate);
    galleryTrack.dataset.galleryReady = 'true';

    gallerySlots.forEach((image) => {
      const imageIndex = Number(image.dataset.galleryIndex ?? '0');
      const relative = relativeToCenter(imageIndex, direction);
      const distance = Math.abs(relative);
      const scale = 0.85 ** distance;
      const visible = distance < imagePool.length / 2;
      image.style.setProperty('--gallery-x', `${relative * step + dragOffset}px`);
      image.style.setProperty('--gallery-scale', scale.toFixed(6));
      image.style.setProperty('--gallery-opacity', visible ? '1' : '0');
      image.style.setProperty('--gallery-z', String(Math.max(1, 10 - distance)));
      image.classList.toggle('is-center', relative === 0);
      image.setAttribute('aria-hidden', relative === 0 ? 'false' : 'true');
    });
  };

  const renderGallery = (nextCenter, direction = 0) => {
    if (!imagePool.length) return;
    centerIndex = (nextCenter + imagePool.length) % imagePool.length;
    galleryTrack.dataset.galleryDirection = String(direction);
    layoutGallery(direction);
  };

  const moveGallery = (direction) => renderGallery(centerIndex + direction, direction);

  galleryPrevious?.addEventListener('click', () => moveGallery(-1));
  galleryNext?.addEventListener('click', () => moveGallery(1));

  gallerySlots.forEach((image) => {
    image.addEventListener('click', () => {
      if (pointerMoved) return;
      const imageIndex = Number(image.dataset.galleryIndex ?? '0');
      const relative = relativeToCenter(imageIndex);
      if (relative) renderGallery(centerIndex + relative, Math.sign(relative));
    });
  });

  galleryWindow.addEventListener('pointerdown', (event) => {
    if (event.target instanceof Element && event.target.closest('button')) return;
    pointerId = event.pointerId;
    pointerStartX = event.clientX;
    pointerStartY = event.clientY;
    pointerOffset = 0;
    pointerMoved = false;
    galleryWindow.setPointerCapture?.(pointerId);
    galleryWindow.classList.add('is-dragging');
  });

  galleryWindow.addEventListener('pointermove', (event) => {
    if (galleryCursor) {
      galleryCursor.style.left = `${event.clientX}px`;
      galleryCursor.style.top = `${event.clientY}px`;
      if (event.pointerType !== 'touch') galleryCursor.classList.add('is-visible');
    }
    if (pointerId !== event.pointerId) return;
    pointerOffset = event.clientX - pointerStartX;
    const vertical = event.clientY - pointerStartY;
    pointerMoved = Math.abs(pointerOffset) > 6;
    if (Math.abs(pointerOffset) <= Math.abs(vertical)) return;
    layoutGallery(0, pointerOffset * 0.1, true);
  });

  galleryWindow.addEventListener('pointerup', (event) => {
    if (pointerId !== event.pointerId) return;
    const deltaX = event.clientX - pointerStartX;
    const deltaY = event.clientY - pointerStartY;
    pointerId = null;
    galleryWindow.releasePointerCapture?.(event.pointerId);
    galleryWindow.classList.remove('is-dragging');
    galleryTrack.classList.remove('is-dragging-track');
    if (Math.abs(deltaX) <= 100 || Math.abs(deltaX) < Math.abs(deltaY)) {
      layoutGallery();
      return;
    }
    moveGallery(deltaX < 0 ? 1 : -1);
  });

  galleryWindow.addEventListener('pointercancel', () => {
    pointerId = null;
    galleryWindow.classList.remove('is-dragging');
    galleryTrack.classList.remove('is-dragging-track');
    layoutGallery();
  });

  galleryWindow.addEventListener('pointerenter', (event) => {
    if (!galleryCursor || event.pointerType === 'touch') return;
    galleryCursor.style.left = `${event.clientX}px`;
    galleryCursor.style.top = `${event.clientY}px`;
    galleryCursor.classList.add('is-visible');
  });

  galleryWindow.addEventListener('pointerleave', () => {
    galleryCursor?.classList.remove('is-visible');
  });

  galleryWindow.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      moveGallery(-1);
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      moveGallery(1);
    }
  });

  // The source renders its initial seven-card composition without tweening in
  // from the authored fallback sizes.
  layoutGallery(0, 0, true);
  requestAnimationFrame(() => galleryTrack.classList.remove('is-dragging-track'));
  window.addEventListener('resize', () => layoutGallery());
}

document.querySelectorAll('video[autoplay]').forEach((video) => {
  if (prefersReducedMotion) {
    video.pause();
    return;
  }
  video.play().catch(() => {
    // Browsers may delay autoplay until a gesture; the poster remains the fallback.
  });
});

const historyViewport = document.querySelector('.source-history-viewport');
const historyPages = [...document.querySelectorAll('[data-history-page]')];

historyPages.forEach((button, index) => {
  button.addEventListener('click', () => {
    const card = historyViewport?.querySelectorAll('.source-history-card')[index];
    if (!historyViewport || !card) return;
    historyViewport.scrollTo({
      left: Math.max(0, card.offsetLeft - 32),
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  });
});

const categoryVideo = document.querySelector('.category-card-wide video');
if (categoryVideo) {
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    categoryVideo.pause();
  } else {
    const categoryVideoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            categoryVideo.play().catch(() => {});
          } else {
            categoryVideo.pause();
          }
        });
      },
      { threshold: 0.1 },
    );
    categoryVideoObserver.observe(categoryVideo);
  }
}
