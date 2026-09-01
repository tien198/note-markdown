# SharpLink Website UI Analysis

**Website:** [https://www.sharplink.com/](https://www.sharplink.com/)  
**Reviewed:** 1 September 2026  
**Review surface:** Live site in Brave through the ChatGPT browser extension  
**Primary desktop observation:** 1502 × 877 CSS px, page height approximately 8721 px  
**Mobile observation:** 375 × 667 CSS px

## Executive assessment

SharpLink presents itself as an institutional Ethereum company rather than a conventional crypto startup. The interface combines an editorial grid, restrained typography, metallic 3D imagery, financial-data motifs, and carefully choreographed scroll transitions. Its strongest design decision is the contrast between a permanent pale blue/ivory atmospheric background and dark media layers that expand, contract, pin, and fade during scrolling.

The result is distinctive, technically credible, and relevant to the promise of “Ethereum with an Edge.” It feels more like a premium capital-markets brand than a trading app. The main tradeoff is that the site asks visitors to process a great deal of motion before they reach straightforward company information. Some intermediate text states are intentionally low-opacity, and the combined video, canvas, Lottie, WebGPU, and scroll-pinning stack creates accessibility and performance risk.

---

## 1. Color schema

### Core palette

The following tokens were present in the rendered CSS:

| Role | Color | Observed use |
|---|---:|---|
| Black | `#000000` | Dark CTA band, deep gradient endpoints, text, icons |
| Off-white | `#F3F3F3` | Primary text over dark media and footer |
| Warm page base | `#F7F7F5` | Body background and neutral light sections |
| Brand blue | `#0E76FF` | Accent pins, arrow CTA, small interaction markers |
| Primary gray | `#676767` | Secondary text on light surfaces |
| Secondary gray | `#A9A9A9` | Quiet labels and subordinate information |
| Pale blue | `#C4D5E7` | Top portion of the fixed radial background |
| Warm ivory | `#FDFBF7` | Middle portion of the fixed radial background |

The site also defines full opacity scales for black, off-white, and gray. That system is used extensively in translucent controls, muted copy, dotted rules, overlays, and scroll-reveal states.

### Dominant background formula

The persistent light field is an exact CSS radial gradient:

```css
radial-gradient(
  100% 130% at 50% -30%,
  rgb(196, 213, 231) 45%,
  rgb(253, 251, 247) 85%,
  rgb(247, 247, 245)
)
```

This creates a cool, luminous top and a warmer paper-like lower area. It avoids both clinical pure white and the saturated neon gradients common in crypto branding.

### Color behavior and hierarchy

- The palette is deliberately narrow: black, warm white, steel gray, pale blue, and one high-chroma blue accent.
- The bright blue is used sparingly, so a blue arrow or square marker immediately reads as interactive or active.
- Dark sections use off-white rather than pure white, reducing glare and preserving the metallic, cinematic tone.
- Translucent button surfaces use black or off-white at low opacity over a `20px` backdrop blur. This creates a light glass-panel effect without drifting into decorative “glassmorphism.”
- Fine dotted rules and low-opacity strokes make the layout feel like a technical drawing, ledger, or engineering schematic.

### Evaluation

The palette is highly coherent and brand-appropriate. The cold blue and chrome imagery communicate Ethereum and technology; black and warm ivory communicate institutional seriousness. The main risk is contrast during transitional animation states: several text blocks and divider lines temporarily sit around 40% opacity over moving gradients. These states look elegant but should be tested against WCAG contrast thresholds at every scroll position, not only at their final state.

---

## 2. Background gradient changes while scrolling

### How the effect is constructed

The perceived “changing gradient” is not a single background color being continuously interpolated. It is a layered composition:

1. A fixed, viewport-sized pale blue-to-ivory radial gradient remains behind almost the entire page.
2. Dark photographic/video sections are placed over it.
3. Transparent dark-gradient PNG layers (`gradient-dark-transparent.png`) are scaled, translated, and sometimes vertically flipped.
4. Pinned sections and a dynamic `clip-path` reveal or hide the dark layers as the user scrolls.
5. The fixed header switches between light and dark themes to preserve contrast.

This approach produces more depth than changing `body.background-color`, because the pale background remains spatially stable while the foreground media appears to open and close over it.

### Scroll sequence observed on desktop

#### At the top (`scrollY ≈ 0`)

- A full-viewport, dark navy hero covers the light gradient.
- The hero includes a WebM video plus an AVIF overlay (`heroOverlay_homepage.avif`).
- White/off-white typography, Nasdaq proof, and blue CTA accents sit over the dark field.
- The next “Pioneering Productivity” scene is already fixed behind the hero, ready to be revealed.

#### Early transition (`scrollY ≈ 520`)

- The hero becomes a centered window instead of a full-screen layer.
- Its measured scale was approximately `0.928`, and its opacity was approximately `0.52`.
- The light radial gradient becomes visible around all four sides.
- The header changes from its dark-surface theme to its light-surface theme.
- The effect reads as a cinematic frame receding into an institutional presentation canvas.

#### Mid transition (`scrollY ≈ 1040`)

- The dark gradient/media band contracts to roughly `509px` in width at the center.
- The productivity chart and numbered benefits become increasingly visible.
- Text and side content rise from partial opacity toward full opacity.

#### Hero exit (`scrollY ≈ 1660`)

- The hero/media layer moves upward and exits.
- The productivity content completes its reveal.
- The next propositions section enters while the light radial background continues to remain fixed.

#### Propositions sweep (`scrollY ≈ 2480`)

- A bottom-oriented dark gradient image is flipped and scaled to about `1.40×`.
- It sweeps upward behind the editorial rows, changing the text treatment from black to off-white.
- The transition feels like ink or a deep blue shadow moving across a technical document.

#### Black CTA band (`scrollY ≈ 3580`)

- The page enters an explicit solid-black section: “Ethereum for Everyone, Engineered to Compound.”
- A faint translucent inner panel, outline artwork, and white text keep the section from feeling like a flat black rectangle.
- The header switches back to the dark-surface treatment.

#### Opportunity section (`scrollY ≈ 4460–5260`)

- Another top-oriented transparent dark-gradient image leads into the section.
- The content becomes pinned and individual text rows reveal as the page scrolls.
- By the midpoint, the dark layer has receded and the pale blue/ivory field dominates again, paired with black body text and a chrome illustration.

#### News and FAQ (`scrollY ≈ 6640`)

- The interface settles into its quietest state: black typography, image cards, fine rules, and the fixed pale background.
- This reduction in motion gives the informational sections a more conventional reading rhythm.

#### Footer (`scrollY ≈ 7840`)

- The footer shifts from pale blue at the top to deep navy/black below.
- A large metallic Three.js wordmark rises from the bottom, reinforcing the final dark transition.
- The upper header remains dark text while it is still positioned over the pale portion of the gradient.

### Evaluation

The background system is the visual signature of the site. It connects sections without relying on repeated rectangular blocks, and it turns the page into a continuous spatial sequence. The effect is sophisticated but complex: if scroll scripting fails, pinned elements, hidden opacity states, or theme-switched text could become unusable. A carefully designed static fallback is important.

---

## 3. UI effects and interaction design

### Scroll-linked effects

- **Masked hero collapse:** `.animated-mask` uses a dynamically changing inset `clip-path` while the wrapped hero scales and fades.
- **Pinned storytelling:** Four `.pin-spacer` elements were observed. Major scenes remain fixed while the document scroll advances their internal state.
- **Parallax gradient images:** Dark transparent PNGs translate and scale above the fixed radial field; bottom variants are flipped vertically.
- **Theme-aware header:** The fixed navigation alternates between light and dark surface styles according to the content beneath it.
- **Text reveals:** Headings, rows, and opportunity copy transition through translate and opacity states. Some rows remain muted until they become the active scroll step.
- **Persistent media:** A hero video, opportunity video, chart canvas, Lottie canvas, and WebGL canvas create continuous motion without page-to-page navigation.

### Hover and button effects

Desktop navigation labels are duplicated inside an overflow-hidden control. On hover:

- Both label copies translate vertically by about `34px`.
- The transition runs for `0.5s` with `cubic-bezier(0.785, 0.135, 0.15, 0.86)`.
- The translucent button background increases from approximately 10% black to 18% black.
- Background color changes use a faster `0.25s` transition.
- Arrow buttons use paired left/right icons and slide the active icon across the control.

The interaction feels engineered and responsive without using large scale or glow effects.

### Surface effects

- Navigation items and news cards use `backdrop-filter: blur(20px)`.
- The latest-news card uses a translucent charcoal surface around `rgba(38, 38, 41, 0.45–0.62)`.
- Dotted SVG rules, small square “pins,” and outlined diagrams establish a reusable technical-grid language.
- Metallic WebM/AVIF/WebP imagery is paired with wireframe overlays and dashed vectors.

### Responsive behavior

At the observed 375 × 667 mobile viewport:

- The full desktop navigation collapses to the logo plus a compact “Menu” control.
- The headline wraps cleanly into two lines.
- The two main CTAs stack vertically and remain visible in the hero.
- The Ethereum/chrome object is centered beneath the CTAs.
- Nasdaq proof and the core company statement remain readable within the first screen.

The mobile composition is strong and preserves the narrative rather than merely stacking desktop columns. The first screen is nevertheless dense; shorter devices may crowd the object, Nasdaq mark, and paragraph.

### UI-effect risks

- No CSS `prefers-reduced-motion` media rule was found in the loaded stylesheets. JavaScript-level handling was not confirmed.
- Multiple pinned layers can make keyboard and assistive-technology reading order diverge from the visual order.
- Low-opacity transitional copy may be difficult to read for low-vision users.
- Video, Lottie, chart canvas, and WebGPU animation can compete for GPU/CPU time, particularly on mobile or battery-constrained devices.

---

## 4. Technology used

### Verified from the live rendered page

| Technology | Evidence observed |
|---|---|
| **Nuxt** | Hashed `/_nuxt/` JavaScript and CSS assets; `data-nuxt-img` attributes |
| **Vue / Vue Router** | Large number of Vue scoped `data-v-*` attributes; `router-link-active` classes |
| **Storyblok CMS** | Assets served from `a.storyblok.com`; `.storyblok-content` markup |
| **Lenis smooth scrolling** | `lenis` class on the root HTML element |
| **Three.js r179 with WebGPU** | Footer canvas declares `data-engine="three.js r179 webgpu"` |
| **dotLottie** | Canvas inside `.dotlottie.lottie-player` |
| **Vercel image optimization** | Images routed through `/_vercel/image?...` |
| **Google Tag Manager** | Loaded GTM script with container ID |
| **Custom/self-hosted fonts** | Archivo and Archivo Narrow served as WOFF2/WOFF with `font-display: swap` |
| **Modern media formats** | WebM video, AVIF/WebP raster assets, SVG logos and diagrams |

### Strong implementation inference

**GSAP ScrollTrigger is very likely.** The DOM contains auto-generated `.pin-spacer` wrappers, while pinned elements receive continuous transform/opacity values during scroll. Those are characteristic ScrollTrigger signals. The library was bundled rather than exposed as a global, so its exact version could not be verified from the rendered runtime.

### Canvas usage

Three canvases were observed:

1. A productivity chart canvas (`419 × 227` in the desktop observation).
2. A dotLottie illustration canvas (`586 × 745`).
3. The footer logo canvas (`1502 × 481`) powered by Three.js r179/WebGPU.

The exact charting library behind the first canvas was not exposed, so it should be treated as custom/unknown rather than assumed to be Chart.js.

### Architectural reading

The stack is well suited to a highly art-directed corporate site: Nuxt/Vue provides component rendering and routing; Storyblok gives editors structured content; Vercel optimizes media; Lenis and likely ScrollTrigger coordinate the narrative; Lottie and Three.js provide richer animation. The cost is a relatively large and interdependent front-end motion system. Progressive enhancement and defensive fallbacks are therefore important.

---

## 5. Aesthetic relevance

### Why the aesthetic fits SharpLink

The visual system successfully connects three ideas:

1. **Ethereum infrastructure:** blue atmosphere, geometric objects, node-like dotted connectors, and animated technical diagrams.
2. **Institutional finance:** Nasdaq proof, rigid column grids, narrow uppercase labels, precise dividers, and restrained color.
3. **Productive capital:** moving charts, stacked forms, metallic structures, and language about compounding and operations.

This is more relevant than a generic crypto aesthetic. There are no neon token coins, purple glows, or speculative trading charts. The chrome and technical drawing language suggests custody, systems, infrastructure, and capital machinery.

### Strong aesthetic choices

- **Distinctive restraint:** The single bright blue accent is more memorable because it is rare.
- **Editorial credibility:** Archivo plus Archivo Narrow creates a modern financial-publishing tone.
- **Consistent metaphor:** Stacking, layers, gradients, masks, and engineered objects reinforce “The Stack for Stacking Ethereum.”
- **Premium motion:** Scroll effects reveal relationships between content instead of adding disconnected decoration.
- **Clear proof signals:** Nasdaq branding and institutional copy are integrated into the visual hierarchy.
- **Responsive continuity:** Mobile preserves the same hierarchy and material language.

### Aesthetic weaknesses and tradeoffs

- **Motion can overshadow proposition:** The first two sections are visually impressive, but the visitor may remember the animation more clearly than the investment rationale.
- **Small interface typography:** Navigation and eyebrow labels use approximately `13px` narrow uppercase text with letter spacing. This looks precise but can feel undersized.
- **Intermediate low contrast:** Text intentionally fades to 40% opacity in scroll sequences, which is visually refined but potentially hard to read.
- **Visual density:** Grid lines, chrome imagery, cards, charts, and overlapping pinned scenes occasionally compete for attention.
- **Corporate/experimental tension:** The site looks highly innovative, but some investor audiences may prefer faster access to holdings, metrics, governance, and risk information.

### Overall relevance judgment

The aesthetic is highly relevant and differentiated. It makes SharpLink feel like an institutional technology platform built around Ethereum, not simply a company holding a crypto asset. The best next refinement would be to preserve the same visual identity while making the key investment thesis and current proof points easier to scan before or alongside the first major motion sequence.

---

## 6. Recommended improvements

### Priority 1 — Motion accessibility

- Add an explicit `prefers-reduced-motion: reduce` mode.
- Replace scrubbed pinning with normal document flow in that mode.
- Display static poster frames for video/Lottie/Three.js scenes.
- Ensure text is never left translated or partially transparent when motion is disabled or fails.

### Priority 2 — Contrast and type validation

- Test every scroll state, especially 40% opacity copy, against its live background.
- Increase small navigation/eyebrow text where possible or provide more generous spacing.
- Confirm translucent buttons keep sufficient contrast over every video frame.

### Priority 3 — Performance resilience

- Delay Three.js/WebGPU initialization until the footer approaches the viewport.
- Pause off-screen video, Lottie, and canvas rendering.
- Use simplified mobile animation or static imagery on low-power devices.
- Provide a non-WebGPU fallback for the footer wordmark.

### Priority 4 — Message clarity

- Surface one or two concrete proof metrics earlier in the experience.
- Keep the two primary hero CTAs, but reinforce their difference with a short descriptive cue if analytics shows hesitation.
- Consider a compact “why SharpLink” summary before the longest pinned sequence for visitors who scan rather than explore.

## Final verdict

SharpLink’s site is a strong example of a modern, art-directed institutional crypto interface. Its palette, gradient architecture, technical-grid language, and metallic motion system are unusually cohesive. The experience is most successful when the light field, dark masked media, and content hierarchy work together. Its primary opportunities are not visual redesign but resilience: reduced-motion support, contrast verification, GPU-conscious behavior, and faster access to the core investment proof.
