All six new sections are looking sharp. Here's a summary of what was added to the About Page — Neon Tech frame:
  ──────
  ### New Sections (top to bottom)

   Section           | GSAP Simulation                                                                         | What it shows
  -------------------|-----------------------------------------------------------------------------------------|---------------------------------------------------------------------------
   Our Story         | gsap.from({ y: 80, opacity: 0, stagger: 0.15 }) — code block on the right showing the   | Origin narrative — "Built from conviction, not convenience." with
                     | exact animation spec                                                                    | founding story
   By The Numbers    | ScrollTrigger.create → countUp() — counter animation reference                          | 4 big stats: 24 team members, 4.2M lines shipped, 99.97% uptime, <50ms
                     |                                                                                         | latency
   How We Build      | gsap.from({ x: -60, opacity: 0, stagger: 0.2 }) — steps fade progressively (opacity 1 → | 4-step process: Discover → Architect → Execute → Evolve
                     | 0.45) to simulate stagger state                                                         |
   What We Stand For | gsap.from({ y: 120, scale: 0.9, scrub: true }) — parallax card reference                | 3 value cards with icons: Velocity, Integrity, Depth
   The Team          | Cards at decreasing opacity (1 → 0.6) simulating stagger entrance mid-scroll            | 4 team members with roles and backgrounds
   CTA               | gsap.from({ y: 40, opacity: 0, power4.out }) — entrance reference                       | "Let's make something that matters." with primary + ghost buttons

  Each section includes a subtle Geist Mono GSAP code annotation showing the exact animation that would trigger on scroll — acting as both a design spec and a visual simulation of the
  motion intent. The decreasing opacity on Process steps and Team cards intuitively conveys the stagger/reveal effect mid-animation.
