# InAmigos Foundation — Editorial Awareness Platform
## Complete Visual Redesign & Motion Design System

> **Art Direction & Frontend Architecture:** An immersive, editorial, photography-driven digital experience for **InAmigos Foundation**, benchmarked against **Farm Africa** (*The Web Kitchen, 2024–2025 Webby Nominee*) and styled with **Geist by Vercel** and **Maghfirea**.

---

## 01. Complete Removal of Previous Generic Language

As strictly instructed, all artificial and generic NGO template elements have been eliminated:
- **Zero Emojis:** All decorative emojis removed across the entire site.
- **Zero Pill Badges & Status Dots:** No rounded capsule labels, status tags, or pulsing dots.
- **Zero Floating Decorative Blobs:** No arbitrary circles or morphing shapes behind content.
- **Zero Generic Rounded Cards:** The "card collection" pattern has been replaced with a full-viewport canvas where photography, typography, and negative space interact.
- **Single Navigation System:** The duplicate announcements, floating status overlays, and oversized banner bars are gone; a single, minimal, adaptive navigation bar anchors the experience.

---

## 02. Typography System

* **Main Titles & Large Display:** **Geist by Vercel** (`assets/fonts/Geist-Variable.woff2`)
  * Hero headlines, section titles, project headings, and giant numerical statements.
* **All Remaining Content:** **Maghfirea** (`assets/fonts/Maghfirea.otf`)
  * Navigation links, body narratives, editorial captions, buttons, and footer.

```css
@font-face {
  font-family: 'Geist';
  src: url('../assets/fonts/Geist-Variable.woff2') format('woff2');
}

@font-face {
  font-family: 'Maghfirea';
  src: url('../assets/fonts/Maghfirea.otf') format('opentype');
}
```

---

## 03. Palette & Atmosphere

* **Warm Beige (`#EAE4D8` / `#F2EEE6`):** Applied to the hero, about narrative, and impact sections.
* **Deep Charcoal (`#242522` / `#171816`):** Applied to two major storytelling chapters:
  1. **Initiatives Showcase:** 6 distinct editorial project compositions.
  2. **Fieldwork Gallery & Get Involved:** Full-width photographic mosaic.
* **Adaptive Navigation:** Dynamically transitions between warm beige and deep charcoal based on active viewport intersection.

---

## 04. Section Compositions & Depth Levels

1. **Hero Canvas (3 Depth Levels):**
   * *Level 1 (Background):* Low-opacity editorial watermark statement (`INAMIGOS · 2020`).
   * *Level 2 (Midground):* Oversized Geist headline (`Uniting Minds. Creating Change.`) and primary vertical photograph (`assets/images/prakriti.jpg`).
   * *Level 3 (Foreground):* Overlapping horizontal photograph (`assets/images/seva.jpg`) with independent parallax and editorial caption in Maghfirea.
2. **About InAmigos:**
   * Large asymmetrical quote paired with authentic photography collage (`assets/images/unity.jpg` and `assets/images/top5best.jpg`).
3. **Project Showcase (Charcoal Chapter 01):**
   * *Project Prakriti:* Dual-image environmental composition (`assets/images/prakriti.jpg` and `assets/images/supply.jpg`).
   * *Project Seva:* Wide-frame humanitarian meal distribution (`assets/images/seva.jpg`).
   * *Project Udaan:* Portrait-oriented digital literacy feature (`assets/images/udaan.jpg`).
   * *Project Jeev & Bachpanshala:* Editorial split grid with authentic animal welfare and education fieldwork.
4. **Social Impact (Warm Beige Canvas):**
   * Giant Geist typography (`20,000+`, `50,000+`, `900+`, `50+`) animated with ScrollTrigger on entrance, paired with concise Maghfirea descriptions.
5. **Photo Stories (Charcoal Chapter 02):**
   * Asymmetrical magazine mosaic with landscape, portrait, and square spans. Includes interactive fullscreen lightbox.
6. **Closing Statement & Minimal Footer:**
   * High-contrast charcoal statement *"Change begins when we come together."* with verified direct contact lines and inquiry dispatch.

---

## 05. Verification & QA Screenshots

* `screenshots/01_hero_desktop.png` — Hero composition at 1440x900
* `screenshots/02_about_desktop.png` — About editorial layout
* `screenshots/03_project_showcase.png` — Charcoal chapter 01 (Initiatives)
* `screenshots/04_impact_section.png` — Warm beige impact canvas with giant numbers
* `screenshots/05_gallery_mosaic.png` — Charcoal chapter 02 (Fieldwork archive)
* `screenshots/06_get_involved.png` — Closing statement and contact block
* `screenshots/07_hero_mobile.png` — Mobile hero viewport at 390x844
* `screenshots/08_projects_mobile.png` — Mobile project layout

---

## 06. How to Run Locally

```bash
python -m http.server 8080
```
Open `http://localhost:8080/` in any modern browser.
