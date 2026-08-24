# GSAP (GreenSock Animation Platform):

Là thư viện sinh ra để xử lý chuyển động (animation). Nó giống như một cỗ máy tính toán thời gian và gia tốc cực kỳ mạnh mẽ.
GSAP có thể làm chuyển động bất kỳ thứ gì mà JavaScript can thiệp được: từ các thẻ HTML thông thường, thuộc tính CSS, ảnh SVG, cho đến các biến số thuần túy.

However, I can absolutely do the next best thing:

Export the About Page design as HTML/CSS/JS code with GSAP animations baked in. This would give you a working, animated page with effects like:

• Hero text — staggered fade-in + upward reveal on load
• "TECHNOLOGY CANVAS" title — scroll-triggered slide-in
• Feature cards — staggered entrance with neon glow pulse
• Neon border effects — glowing/pulsing strokes via GSAP5
• ScrollTrigger — animations fire as sections enter the viewport

# pinned sequential reveal

Implemented the pinned sequential reveal.

- Desktop: the card grid pins at 18% of the viewport.
- Scrolling reveals cards 1–4 sequentially.
- The page unlocks after the fourth card is fully revealed.
- Scrolling upward reverses the timeline.
- Mobile retains individual enter/exit reveals.
- Reduced-motion users aren’t pinned.
- Shared useGsapSectionReveal() remains untouched.
- TypeScript passes.

In GSAP terminology, it’s a:
Pinned, scrubbed ScrollTrigger timeline with sequential reveals

- Pinned: the section remains fixed temporarily.
- Scrubbed: timeline progress follows scroll position.
- Sequential reveal: cards appear one after another.
- Released/unpinned: normal scrolling resumes when the timeline finishes.

### New Sections (top to bottom)

All six new sections are looking sharp. Here's a summary of what was added to the About Page — Neon Tech frame:
──────

| Section                         | GSAP Simulation                                                                         | What it shows                                                          |
| ------------------------------- | --------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Our Story                       | gsap.from({ y: 80, opacity: 0, stagger: 0.15 }) — code block on the right showing the   | Origin narrative — "Built from conviction, not convenience." with      |
| exact animation spec            | founding story                                                                          |
| By The Numbers                  | ScrollTrigger.create → countUp() — counter animation reference                          | 4 big stats: 24 team members, 4.2M lines shipped, 99.97% uptime, <50ms |
|                                 | latency                                                                                 |
| How We Build                    | gsap.from({ x: -60, opacity: 0, stagger: 0.2 }) — steps fade progressively (opacity 1 → | 4-step process: Discover → Architect → Execute → Evolve                |
| 0.45) to simulate stagger state |
| What We Stand For               | gsap.from({ y: 120, scale: 0.9, scrub: true }) — parallax card reference                | 3 value cards with icons: Velocity, Integrity, Depth                   |
| The Team                        | Cards at decreasing opacity (1 → 0.6) simulating stagger entrance mid-scroll            | 4 team members with roles and backgrounds                              |
| CTA                             | gsap.from({ y: 40, opacity: 0, power4.out }) — entrance reference                       | "Let's make something that matters." with primary + ghost buttons      |

Each section includes a subtle Geist Mono GSAP code annotation showing the exact animation that would trigger on scroll — acting as both a design spec and a visual simulation of the
motion intent. The decreasing opacity on Process steps and Team cards intuitively conveys the stagger/reveal effect mid-animation.
