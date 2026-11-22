/* ==========================================================================
   INAMIGOS FOUNDATION — EDITORIAL BOOTSTRAP
   ========================================================================== */

import { initEditorialAnimations } from './animations.js';
import { initEditorialInteractions } from './interactions.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('InAmigos Foundation Editorial Platform Initialized');

  // Initialize Lenis Smooth Scrolling if present and motion is allowed
  if (typeof Lenis !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    try {
      const lenis = new Lenis({
        duration: 1.25,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.05
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      if (typeof ScrollTrigger !== 'undefined') {
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => {
          lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
      }
    } catch (e) {
      console.warn('Lenis active fallback to native smooth scroll:', e);
    }
  }

  initEditorialAnimations();
  initEditorialInteractions();
});
