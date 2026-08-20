// hero.js
(function () {
  const logo = document.querySelector('.logo');
  const navLinks = Array.from(document.querySelectorAll('.nav-menu a'));
  const eyebrow = document.querySelector('.eyebrow');
  const headline = document.querySelector('.headline');
  const lead = document.querySelector('.lead');
  const cta = document.querySelector('.cta');

  const track = document.querySelector('.carousel-track');
  let slides = Array.from(document.querySelectorAll('.slide'));
  const slideCount = slides.length;

  const TRANSITION_MS = 1000;
  const DISPLAY_MS = 1000;
  const EASING = 'cubic-bezier(.22,.9,.26,1)';

  function applyHeroEntrance() {
    if (!logo) return;

    requestAnimationFrame(() => {
      logo.style.transition = 'opacity 420ms ease, transform 420ms cubic-bezier(.2,.9,.2,1)';
      logo.style.opacity = '1';
      logo.style.transform = 'translateY(0) scale(1)';

      navLinks.forEach((link, index) => {
        link.style.transition = `opacity 420ms ease ${index * 80 + 80}ms, transform 420ms cubic-bezier(.2,.9,.2,1) ${index * 80 + 80}ms`;
        link.style.opacity = '1';
        link.style.transform = 'translateY(0)';
      });
    });

    setTimeout(() => {
      if (eyebrow) {
        eyebrow.style.transition = 'opacity 340ms ease, transform 380ms cubic-bezier(.2,.9,.2,1)';
        eyebrow.style.opacity = '1';
        eyebrow.style.transform = 'translateY(0)';
      }
    }, 240);

    setTimeout(() => {
      if (headline) {
        headline.style.transition = 'opacity 420ms ease, transform 420ms cubic-bezier(.2,.9,.2,1)';
        headline.style.opacity = '1';
        headline.style.transform = 'translateY(0)';
      }
    }, 420);

    setTimeout(() => {
      if (lead) {
        lead.style.transition = 'opacity 380ms ease, transform 380ms cubic-bezier(.2,.9,.2,1)';
        lead.style.opacity = '1';
        lead.style.transform = 'translateY(0)';
      }
    }, 620);

    setTimeout(() => {
      if (cta) {
        cta.style.transition = 'opacity 420ms ease, transform 420ms cubic-bezier(.2,.9,.2,1)';
        cta.style.opacity = '1';
        cta.style.transform = 'translateY(0)';
      }
    }, 820);
  }

  function initHeroCarousel() {
    if (!track || !slides.length) return;

    const firstClone = slides[0].cloneNode(true);
    firstClone.classList.add('slide--clone');
    track.appendChild(firstClone);
    slides = Array.from(track.querySelectorAll('.slide'));

    track.style.transition = 'none';
    track.style.transform = 'translateX(100%)';

    requestAnimationFrame(() => {
      setTimeout(() => {
        track.style.transition = `transform ${TRANSITION_MS}ms ${EASING}`;
        track.style.transform = 'translateX(0)';
        track.addEventListener('transitionend', onInitialReveal, { once: true });
      }, 1200);
    });
  }

  function onInitialReveal() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    startAutoplay();
  }

  let heroIndex = 0;
  let autoplayTimer = null;

  function stopAutoplay() {
    if (autoplayTimer) {
      clearTimeout(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setTimeout(nextHeroSlide, DISPLAY_MS);
  }

  function nextHeroSlide() {
    if (!track) return;

    heroIndex += 1;
    track.style.transition = `transform ${TRANSITION_MS}ms ${EASING}`;
    track.style.transform = `translateX(${-heroIndex * 100}%)`;

    track.addEventListener('transitionend', () => {
      if (heroIndex >= slideCount) {
        track.style.transition = 'none';
        track.style.transform = 'translateX(0)';
        heroIndex = 0;
        requestAnimationFrame(() => {
          setTimeout(() => startAutoplay(), 300);
        });
      } else {
        startAutoplay();
      }
    }, { once: true });
  }

  function attachCTAHover() {
    const btn = document.getElementById('ctaExplore');
    if (!btn) return;

    btn.addEventListener('mousemove', (event) => {
      const rect = btn.getBoundingClientRect();
      const dx = (event.clientX - (rect.left + rect.width / 2)) / rect.width;
      btn.style.transform = `translateX(${dx * 6}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translateX(0)';
    });
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    if (logo) {
      logo.style.opacity = '1';
      logo.style.transform = 'translateY(0) scale(1)';
    }
    navLinks.forEach((link) => {
      link.style.opacity = '1';
      link.style.transform = 'translateY(0)';
    });
    if (eyebrow) eyebrow.style.opacity = '1';
    if (headline) headline.style.opacity = '1';
    if (lead) lead.style.opacity = '1';
    if (cta) cta.style.opacity = '1';
    if (track) {
      track.style.transition = 'none';
      track.style.transform = 'translateX(0)';
    }
  } else {
    window.addEventListener('load', () => {
      applyHeroEntrance();
      initHeroCarousel();
      attachCTAHover();
    });
  }

  function syncResponsiveLayout() {
    const hero = document.querySelector('.hero');
    const heroRight = document.querySelector('.hero-right');
    const carousel = document.querySelector('.carousel');

    if (!hero || !heroRight || !carousel) return;

    if (window.innerWidth <= 640) {
      hero.style.gridTemplateColumns = '1fr';
      hero.style.padding = '20px';
      hero.style.alignItems = 'start';
      heroRight.style.width = '100%';
      heroRight.style.maxWidth = '100%';
      heroRight.style.marginLeft = '0';
      heroRight.style.order = '1';
      heroRight.style.marginTop = '0';
      carousel.style.width = '100%';
      carousel.style.maxWidth = '100%';
      carousel.style.height = '320px';
      return;
    }

    if (window.innerWidth <= 1000) {
      hero.style.gridTemplateColumns = '1fr';
      hero.style.padding = '36px';
      hero.style.alignItems = 'start';
      heroRight.style.width = '100%';
      heroRight.style.maxWidth = '100%';
      heroRight.style.marginLeft = '0';
      heroRight.style.order = '1';
      heroRight.style.marginTop = '0';
      carousel.style.width = '100%';
      carousel.style.maxWidth = '100%';
      carousel.style.height = '420px';
      return;
    }

    hero.style.gridTemplateColumns = '1fr 1fr';
    hero.style.padding = '48px 56px 40px';
    hero.style.alignItems = 'center';
    heroRight.style.width = '100%';
    heroRight.style.maxWidth = '470px';
    heroRight.style.marginLeft = 'auto';
    heroRight.style.order = '';
    heroRight.style.marginTop = '0';
    carousel.style.width = '100%';
    carousel.style.maxWidth = '470px';
    carousel.style.height = '520px';
  }

  syncResponsiveLayout();
  window.addEventListener('resize', syncResponsiveLayout);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAutoplay();
    } else if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      startAutoplay();
    }
  });
})();

const WHATSAPP_NUMBER = '850244716';

(function () {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navToggle.classList.toggle('is-open');
      navMenu.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('is-open');
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const catalog = document.querySelector('.catalog-section');
  if (!catalog) return;

  const eyebrow = catalog.querySelector('.catalog-eyebrow');
  const title = catalog.querySelector('.catalog-title');
  const lead = catalog.querySelector('.catalog-lead');
  const cards = Array.from(catalog.querySelectorAll('.product-card'));

  function revealHeader() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      eyebrow.style.opacity = '1';
      eyebrow.style.transform = 'translateY(0)';
      title.style.opacity = '1';
      title.style.transform = 'translateY(0)';
      lead.style.opacity = '1';
      lead.style.transform = 'translateY(0)';
      return;
    }

    eyebrow.style.transition = 'opacity 420ms ease, transform 420ms cubic-bezier(.2,.9,.2,1)';
    title.style.transition = 'opacity 500ms ease, transform 500ms cubic-bezier(.2,.9,.2,1)';
    lead.style.transition = 'opacity 500ms ease 100ms, transform 500ms cubic-bezier(.2,.9,.2,1) 100ms';

    eyebrow.style.opacity = '1';
    eyebrow.style.transform = 'translateY(0)';

    setTimeout(() => {
      title.style.opacity = '1';
      title.style.transform = 'translateY(0)';
    }, 90);

    setTimeout(() => {
      lead.style.opacity = '1';
      lead.style.transform = 'translateY(0)';
    }, 180);
  }

  function revealCards() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      cards.forEach((card) => card.classList.add('in-view'));
      return;
    }

    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('in-view');
      }, 120 + index * 80);
    });
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      revealHeader();
      revealCards();
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.15 });

  observer.observe(catalog);

  function setDescriptionState(card, expanded) {
    const toggle = card.querySelector('.toggle-desc');
    const extra = card.querySelector('.product-extra');

    if (!toggle || !extra) return;

    const isExpanded = Boolean(expanded);

    extra.classList.toggle('expanded', isExpanded);
    extra.setAttribute('aria-hidden', String(!isExpanded));
    card.classList.toggle('is-expanded', isExpanded);
    toggle.setAttribute('aria-expanded', String(isExpanded));
    toggle.setAttribute('aria-hidden', 'false');
    toggle.textContent = isExpanded ? 'Ver menos' : 'Ver descrição';
    toggle.style.display = 'inline-flex';
  }

  cards.forEach((card) => setDescriptionState(card, false));

  catalog.addEventListener('click', (event) => {
    const toggle = event.target.closest('.toggle-desc');
    if (!toggle) return;

    const card = toggle.closest('.product-card');
    if (!card) return;

    const nextState = !card.classList.contains('is-expanded');
    setDescriptionState(card, nextState);
  });

  const buyButtons = Array.from(catalog.querySelectorAll('.buy-btn'));
  buyButtons.forEach((button) => {
    const card = button.closest('.product-card');
    const productName = button.dataset.product || '';
    const priceNode = card ? card.querySelector('.price') : null;
    const priceText = (priceNode ? priceNode.textContent.trim() : '').replace(/\s+/g, ' ');

    if (WHATSAPP_NUMBER) {
      const message = `Olá Sweet World! Gostaria de encomendar: ${productName} — ${priceText || 'preço a confirmar'}.`;
      const encoded = encodeURIComponent(message);
      button.setAttribute('href', `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`);
      button.setAttribute('target', '_blank');
      button.setAttribute('rel', 'noopener noreferrer');
    } else {
      button.setAttribute('href', '#');
      button.setAttribute('title', 'Defina o número oficial do WhatsApp da Sweet World em hero.js');
    }
  });
})();

(function () {
  const aboutSection = document.querySelector('.about-section');
  if (!aboutSection) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      aboutSection.classList.add('is-visible');
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.18 });

  observer.observe(aboutSection);
})();

(function () {
  const contactSection = document.querySelector('.contact-section');
  if (!contactSection) return;

  const contactObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      contactSection.classList.add('is-visible');
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.18 });

  contactObserver.observe(contactSection);

  const whatsAppButton = contactSection.querySelector('[data-whatsapp="true"]');
  if (!whatsAppButton) return;

  if (WHATSAPP_NUMBER) {
    const msg = 'Olá Sweet World! Gostaria de fazer um pedido.';
    const encoded = encodeURIComponent(msg);
    whatsAppButton.setAttribute('href', `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`);
    whatsAppButton.setAttribute('target', '_blank');
    whatsAppButton.setAttribute('rel', 'noopener noreferrer');
  } else {
    whatsAppButton.setAttribute('href', '#');
    whatsAppButton.setAttribute('title', 'Defina o número oficial do WhatsApp da Sweet World em hero.js');
  }
})();
