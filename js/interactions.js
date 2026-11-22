/* ==========================================================================
   INAMIGOS FOUNDATION — EDITORIAL INTERACTIONS & MODALS
   Pure UI, Minimal Navigation, Project Modal & Photo Lightbox
   ========================================================================== */

export const INAMIGOS_INITIATIVES = {
  prakriti: {
    num: '01 / INITIATIVE',
    title: 'Project Prakriti',
    stat: '20,000+ Native Trees Planted',
    lead: 'Ecological restoration, urban forestry, and watershed preservation across Bilaspur and rural Chhattisgarh.',
    image: 'assets/images/prakriti.jpg',
    points: [
      'Mass afforestation utilizing drought-resilient native species.',
      'Active community stewardship partnerships with village panchayats.',
      'Seed ball dissemination and public anti-plastic drives.',
      'Long-term tree survival tracking ensuring young saplings achieve canopy maturity.'
    ]
  },
  seva: {
    num: '02 / INITIATIVE',
    title: 'Project Seva',
    stat: '50,000+ Nutritious Meals Distributed',
    lead: 'Humanitarian hunger relief and emergency essential support for marginalized settlements and shelter homes.',
    image: 'assets/images/seva.jpg',
    points: [
      'Daily freshly prepared wholesome meals for urban slums and children.',
      'Emergency dry ration kits and essential hygiene supplies.',
      'Winter blanket distribution camps for homeless populations.',
      'Special festival kitchens bringing dignity and celebration to underprivileged families.'
    ]
  },
  udaan: {
    num: '03 / INITIATIVE',
    title: 'Project Udaan',
    stat: '900+ Girls & Women Empowered',
    lead: 'Fostering digital literacy, economic self-reliance, and health awareness for rural women and girls.',
    image: 'assets/images/udaan.jpg',
    points: [
      'Computer training and smartphone technology proficiency camps.',
      'Financial independence: digital banking, UPI literacy, and artisan trade workshops.',
      'Menstrual hygiene education and legal rights advocacy.',
      'Dedicated mentoring pathways enabling young women to pursue independent livelihoods.'
    ]
  },
  jeev: {
    num: '04 / INITIATIVE',
    title: 'Project Jeev',
    stat: '50+ Animals Fed & Protected Daily',
    lead: 'Compassionate street animal welfare, daily nourishment, and emergency veterinary assistance.',
    image: 'assets/images/jeev.jpg',
    points: [
      'Scheduled daily feeding routes preventing stray animal starvation.',
      'Summer clay water bowl networks placed across high-heat urban pockets.',
      'First-aid care and coordination with veterinary facilities for injured animals.',
      'Community anti-cruelty education fostering peaceful coexistence.'
    ]
  },
  bachpan: {
    num: '05 / INITIATIVE',
    title: 'Project Bachpanshala',
    stat: 'Bridge Schooling & Mentorship',
    lead: 'Bridging the rural educational divide through free learning centers, books, and volunteer tutoring.',
    image: 'assets/images/bachpanshala.jpg',
    points: [
      'Informal education bridge centers for out-of-school and rural children.',
      'Free distribution of school backpacks, notebooks, and learning materials.',
      'One-on-one academic mentoring and creative arts development.',
      'Active family counseling to prevent early school dropouts.'
    ]
  }
};

export function initEditorialInteractions() {
  // 01. Sticky Nav & Adaptive Brightness over Charcoal
  const nav = document.querySelector('.site-nav');
  const darkSections = document.querySelectorAll('.theme-dark, .theme-near-black');

  function updateNavTheme() {
    if (!nav) return;
    const scrollY = window.scrollY || window.pageYOffset;
    if (scrollY > 30) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    // Check if fixed navigation bar's bottom edge intersects any charcoal/dark section
    // A section must both have its top above the nav bottom AND its bottom below the nav bottom
    const navBottom = nav.offsetHeight || 65;
    let isOverDark = false;

    darkSections.forEach(section => {
      const rect = section.getBoundingClientRect();
      // The nav bottom edge sits at `navBottom` px from viewport top.
      // The section intersects the nav only if top <= navBottom AND bottom > navBottom.
      if (rect.top <= navBottom && rect.bottom > navBottom) {
        isOverDark = true;
      }
    });

    if (isOverDark) {
      nav.classList.add('scrolled-dark');
    } else {
      nav.classList.remove('scrolled-dark');
    }
  }

  window.addEventListener('scroll', updateNavTheme, { passive: true });
  window.addEventListener('resize', updateNavTheme, { passive: true });
  updateNavTheme();

  // 02. Mobile Fullscreen Navigation
  const mobileToggle = document.querySelector('.nav-mobile-btn');
  const mobileDrawer = document.querySelector('.mobile-fullscreen-nav');
  const mobileLinks = document.querySelectorAll('.mobile-links-stack a');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('active');
      if (isOpen) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', closeMobileNav);
    });

    function openMobileNav() {
      mobileDrawer.classList.add('active');
      mobileToggle.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeMobileNav() {
      mobileDrawer.classList.remove('active');
      mobileToggle.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  // 03. Project Details Modal
  const modalBackdrop = document.getElementById('editorial-project-modal');
  const modalNum = document.getElementById('modal-init-num');
  const modalTitle = document.getElementById('modal-init-title');
  const modalStat = document.getElementById('modal-init-stat');
  const modalLead = document.getElementById('modal-init-lead');
  const modalImg = document.getElementById('modal-init-img');
  const modalPoints = document.getElementById('modal-init-points');
  const modalClose = document.getElementById('modal-init-close');

  document.querySelectorAll('.trigger-project-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const key = btn.getAttribute('data-project');
      const data = INAMIGOS_INITIATIVES[key];
      if (!data) return;

      modalNum.innerText = data.num;
      modalTitle.innerText = data.title;
      modalStat.innerText = data.stat;
      modalLead.innerText = data.lead;
      modalImg.src = data.image;
      modalImg.alt = data.title;

      modalPoints.innerHTML = '';
      data.points.forEach(pt => {
        const li = document.createElement('li');
        li.style.cssText = 'font-family: var(--font-serif); font-size: 1rem; line-height: 1.5; color: var(--c-muted-light); margin-bottom: 0.65rem; list-style: square; margin-left: 1.25rem;';
        li.innerText = pt;
        modalPoints.appendChild(li);
      });

      modalBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modalBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // 04. Photo Gallery Lightbox
  const lightboxModal = document.getElementById('editorial-lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img-el');
  const lightboxCaption = document.getElementById('lightbox-caption-el');
  const lightboxClose = document.getElementById('lightbox-close-trigger');

  document.querySelectorAll('.gallery-cell').forEach(cell => {
    cell.addEventListener('click', () => {
      const img = cell.querySelector('img');
      const caption = cell.querySelector('.cell-caption');
      if (img && lightboxImg) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || 'InAmigos Fieldwork';
        if (caption) {
          lightboxCaption.innerText = caption.innerText;
        }
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // Backdrop click & Escape key listener
  [modalBackdrop, lightboxModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      [modalBackdrop, lightboxModal].forEach(modal => {
        if (modal && modal.classList.contains('active')) {
          modal.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    }
  });

  // 05. Structured Volunteer Inquiry Dispatcher
  const form = document.getElementById('closing-inquiry-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('input-name').value.trim();
      const email = document.getElementById('input-email').value.trim();
      const role = document.getElementById('input-role').value;
      const note = document.getElementById('input-note').value.trim();

      const subject = encodeURIComponent(`InAmigos Inquiry: ${name} [${role}]`);
      const body = encodeURIComponent(
        `Dear InAmigos Foundation Team,\n\n` +
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Engagement Focus: ${role}\n\n` +
        `Message:\n${note}\n\n` +
        `Sent via InAmigos Editorial Platform`
      );

      window.location.href = `mailto:support@inamigosfoundation.org.in?subject=${subject}&body=${body}`;

      const feedback = document.getElementById('form-response-msg');
      if (feedback) {
        feedback.style.display = 'block';
        feedback.innerText = 'Thank you. Your email client is ready to dispatch your inquiry to the foundation.';
      }
    });
  }
}
