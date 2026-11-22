/* ==========================================================================
   INAMIGOS FOUNDATION — EDITORIAL MOTION SYSTEM (GSAP & SCROLLTRIGGER)
   Farm Africa Reference Benchmark: Clip-Path Reveals, Differential Parallax,
   and Adaptive Section Color Transitions
   ========================================================================== */

export function initEditorialAnimations() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.editorial-line').forEach(el => el.classList.add('is-revealed'));
    return;
  }

  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    document.querySelectorAll('.editorial-line').forEach(el => el.classList.add('is-revealed'));
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // 01. Hero Entrance Choreography
  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1.1 } });

  // Set initial states
  gsap.set('.hero-giant-title .editorial-line', { y: '105%' });
  gsap.set('.hero-img-primary', { clipPath: 'inset(15% 0 0 0)', scale: 1.08, opacity: 0 });
  gsap.set('.hero-img-secondary', { y: 40, opacity: 0 });
  gsap.set('.hero-statement-wrap, .hero-actions-line', { opacity: 0, y: 30 });

  heroTl
    .to('.hero-giant-title .editorial-line', {
      y: '0%',
      stagger: 0.15,
      duration: 1.2,
      ease: 'power4.out'
    }, 0.2)
    .to('.hero-img-primary', {
      clipPath: 'inset(0% 0 0 0)',
      scale: 1,
      opacity: 1,
      duration: 1.4,
      ease: 'power3.inOut'
    }, 0.3)
    .to('.hero-img-secondary', {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: 'power3.out'
    }, 0.6)
    .to('.hero-statement-wrap, .hero-actions-line', {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      duration: 0.9,
      ease: 'power3.out'
    }, 0.8);

  // 02. Scroll-Driven Hero Parallax
  gsap.to('.hero-img-primary img', {
    yPercent: 12,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero-canvas',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.2
    }
  });

  gsap.to('.hero-img-secondary', {
    yPercent: -25,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero-canvas',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.4
    }
  });

  gsap.to('.hero-watermark', {
    xPercent: -15,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero-canvas',
      start: 'top top',
      end: 'bottom top',
      scrub: 2
    }
  });

  // 03. About Section Revealer
  gsap.from('.about-big-quote', {
    y: 50,
    opacity: 0,
    duration: 1.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.about-canvas',
      start: 'top 75%'
    }
  });

  gsap.from('.about-primary-frame', {
    clipPath: 'inset(10% 0 0 0)',
    scale: 0.96,
    opacity: 0,
    duration: 1.3,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.about-canvas',
      start: 'top 70%'
    }
  });

  gsap.to('.about-secondary-frame', {
    yPercent: -20,
    ease: 'none',
    scrollTrigger: {
      trigger: '.about-canvas',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1.2
    }
  });

  // 04. Project Stories in Charcoal Section
  document.querySelectorAll('.project-story-unit').forEach(story => {
    gsap.from(story.querySelectorAll('.project-heading, .project-stat-line, .project-text-paragraph'), {
      y: 40,
      opacity: 0,
      stagger: 0.12,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: story,
        start: 'top 78%'
      }
    });

    const primaryImg = story.querySelector('.media-primary, .media-wide-frame, .media-portrait-frame');
    if (primaryImg) {
      gsap.from(primaryImg, {
        clipPath: 'inset(12% 0 0 0)',
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: story,
          start: 'top 75%'
        }
      });
    }

    const overlapImg = story.querySelector('.media-overlap');
    if (overlapImg) {
      gsap.to(overlapImg, {
        yPercent: -22,
        ease: 'none',
        scrollTrigger: {
          trigger: story,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2
        }
      });
    }
  });

  // 05. Impact Figures: Scroll-Reactive Counter — fires only when 45% of section is visible
  const impactSection = document.querySelector('#impact');
  const impactCounters = document.querySelectorAll('.impact-giant-num[data-target]');
  let countersHaveFired = false;

  function runCounters() {
    if (countersHaveFired) return;
    countersHaveFired = true;

    impactCounters.forEach(counter => {
      const targetVal = parseInt(counter.getAttribute('data-target'), 10);
      let currentVal = 0;
      const duration = 2000; // ms
      const startTime = performance.now();

      function tick(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out cubic for natural deceleration
        const eased = 1 - Math.pow(1 - progress, 3);
        currentVal = Math.round(eased * targetVal);
        counter.textContent = currentVal.toLocaleString() + '+';
        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          counter.textContent = targetVal.toLocaleString() + '+';
        }
      }
      requestAnimationFrame(tick);
    });
  }

  if (impactSection && impactCounters.length) {
    ScrollTrigger.create({
      trigger: impactSection,
      // Fire when 45% of the section body has scrolled into view from the bottom
      start: 'top 55%',
      once: true,
      onEnter: runCounters
    });
  }

  // 06. Photo Stories Gallery Parallax
  document.querySelectorAll('.gallery-cell').forEach((cell, i) => {
    const speed = (i % 2 === 0) ? -8 : 12;
    gsap.to(cell.querySelector('img'), {
      yPercent: speed,
      ease: 'none',
      scrollTrigger: {
        trigger: cell,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2
      }
    });
  });

  // 07. Adaptive Navigation Contrast Based on Active Section
  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: () => {
      // Keep ScrollTrigger and nav in lockstep on smooth scroll
      window.dispatchEvent(new Event('scroll'));
    }
  });

  // 08. Closing Canvas: Cinematic Scroll-Driven Reveal (intro only — mirrors Scene.mp4)
  // The section wipes upward into view as the user scrolls into it.
  // All content inside remains static; only the wrapper is animated.
  const closingCanvas = document.querySelector('.closing-canvas');
  if (closingCanvas) {
    // Ensure the section's overflow is clipped so the wipe doesn't bleed
    closingCanvas.style.overflow = 'hidden';

    gsap.set(closingCanvas, { clipPath: 'inset(100% 0 0% 0)' });

    gsap.to(closingCanvas, {
      clipPath: 'inset(0% 0 0% 0)',
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: closingCanvas,
        start: 'top 92%',   // start wipe as soon as section edge enters viewport
        end: 'top 15%',     // fully revealed when top of section is near screen top
        scrub: 1.4          // smooth, scrubbed — tied to scroll progress
      }
    });
  }

  // 09. Closing Statement: Typewriter once the section is revealed
  const closingTitle = document.querySelector('.closing-title');
  let closingTitleStarted = false;

  // Keep the headline hidden until the typewriter starts so the wipe never
  // reveals the finished sentence before it is typed.
  if (closingTitle) {
    closingTitle.style.visibility = 'hidden';
  }

  function startClosingTitleTypewriter() {
    if (closingTitleStarted || !closingTitle) return;
    closingTitleStarted = true;

    const fullText = closingTitle.textContent.trim();
    // Reserve the title's height so the copy below doesn't jump while typing.
    const titleHeight = closingTitle.offsetHeight;
    closingTitle.style.minHeight = `${titleHeight}px`;
    closingTitle.classList.add('is-typing');
    closingTitle.textContent = '';
    closingTitle.style.visibility = 'visible';

    const caret = document.createElement('span');
    caret.className = 'typewriter-caret';
    caret.setAttribute('aria-hidden', 'true');
    closingTitle.appendChild(caret);

    const TYPE_DELAY = 40; // ms per character
    let charIndex = 0;

    function typeNextCharacter() {
      if (charIndex < fullText.length) {
        closingTitle.insertBefore(
          document.createTextNode(fullText.charAt(charIndex)),
          caret
        );
        charIndex += 1;
        window.setTimeout(typeNextCharacter, TYPE_DELAY);
        return;
      }

      // Release the reserved height so the title reflows on resize.
      closingTitle.style.minHeight = '';
    }

    typeNextCharacter();
  }

  if (closingCanvas && closingTitle) {
    function queueClosingTitleTypewriter() {
      // Wait for webfonts so the measured title height is accurate.
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(startClosingTitleTypewriter);
      } else {
        startClosingTitleTypewriter();
      }
    }

    ScrollTrigger.create({
      trigger: closingCanvas,
      start: 'top 15%',
      once: true,
      onEnter: queueClosingTitleTypewriter
    });

    // Fallback for very tall viewports where the section top may never reach
    // 15% of the screen: type once the page bottom comes into view.
    const closingFooter = document.querySelector('.editorial-footer');
    if (closingFooter) {
      ScrollTrigger.create({
        trigger: closingFooter,
        start: 'bottom bottom',
        once: true,
        onEnter: queueClosingTitleTypewriter
      });
    }
  }
}
