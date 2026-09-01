export type CategorySlug =
  | 'ai-tools'
  | 'software-architecture'
  | 'web-animation'
  | 'infrastructure'
  | 'linux'

export type CategoryRoute =
  | '/ai-tools'
  | '/software-architecture'
  | '/web-animation'
  | '/infrastructure'
  | '/linux'

export type DocumentRoute =
  | '/ai-tools/$slug'
  | '/software-architecture/$slug'
  | '/web-animation/$slug'
  | '/infrastructure/$slug'
  | '/linux/$slug'

export interface DocumentEntry {
  title: string
  slug: string
  source: string
  summary: string
  legacySlugs?: ReadonlyArray<string>
}

export interface DocumentCategory {
  title: string
  slug: CategorySlug
  route: CategoryRoute
  documentRoute: DocumentRoute
  summary: string
  documents: ReadonlyArray<DocumentEntry>
}

export const documentCategories = [
  {
    title: 'AI Tools',
    slug: 'ai-tools',
    route: '/ai-tools',
    documentRoute: '/ai-tools/$slug',
    summary: 'Agent tooling, reusable skills, and cross-platform conventions.',
    documents: [
      {
        title: 'Agent Skills',
        slug: 'agent-skills',
        source: 'agent-skills',
        summary: 'The SKILL.md standard and its support across coding agents.',
      },
      {
        title: 'Plugin Analyze',
        slug: 'plugin-analyze',
        source: 'plugin-analyze',
        summary:
          'An overview of the Spreadsheets plugin, its skills, tools, and routing.',
      },
    ],
  },
  {
    title: 'Software Architecture',
    slug: 'software-architecture',
    route: '/software-architecture',
    documentRoute: '/software-architecture/$slug',
    summary: 'System structure, data flow, and implementation patterns.',
    documents: [
      {
        title: 'Payload Lexical Architecture and Flow',
        slug: 'payload-lexical-architecture',
        source: 'ARCHITECTURE_AND_LEXICAL_FLOW',
        summary:
          'Architecture and server-to-client flow in Payload richtext-lexical.',
        legacySlugs: ['ARCHITECTURE_AND_LEXICAL_FLOW'],
      },
    ],
  },
  {
    title: 'Web Animation',
    slug: 'web-animation',
    route: '/web-animation',
    documentRoute: '/web-animation/$slug',
    summary: 'GSAP concepts, examples, pitfalls, and composition patterns.',
    documents: [
      {
        title: 'SharpLink Website UI Analysis',
        slug: 'sharplink-ui-analysis',
        source: 'sharplink-ui-analysis',
        summary:
          'A detailed review of SharpLink’s visual system, scroll effects, motion, and responsive behavior.',
      },
      {
        title: 'GSAP Basics',
        slug: 'gsap-basics',
        source: 'GSAP',
        summary:
          'Tweens, timelines, easing, stagger, and ScrollTrigger basics.',
        legacySlugs: ['GSAP'],
      },
      {
        title: 'GSAP To, From, and FromTo Examples',
        slug: 'gsap-to-from-examples',
        source: 'gsap-to-from-examples',
        summary: 'Focused examples for the core GSAP tween methods.',
      },
      {
        title: 'Common GSAP Animation Gaps',
        slug: 'gsap-animation-common-gaps',
        source: 'gsap-animation-thuong-gap',
        summary: 'Common animation issues and the techniques used to fix them.',
        legacySlugs: ['gsap-animation-thuong-gap'],
      },
      {
        title: 'GSAP Animation Patterns and Composition',
        slug: 'gsap-animation-patterns-compositions',
        source: 'gsap-animation-patterns-compositions',
        summary: 'Reusable patterns for composing maintainable animations.',
      },
    ],
  },
  {
    title: 'Infrastructure and Deployment',
    slug: 'infrastructure',
    route: '/infrastructure',
    documentRoute: '/infrastructure/$slug',
    summary: 'Web serving, VPS security, deployment, and hosting operations.',
    documents: [
      {
        title: 'Nginx',
        slug: 'nginx',
        source: 'nginx',
        summary:
          'Web server and reverse-proxy concepts with configuration notes.',
      },
      {
        title: 'TanStack Start and Vercel',
        slug: 'tanstack-start-vercel',
        source: 'TanStack Start & Vercel Knowledge Summary',
        summary:
          'Server functions, Nitro, Vercel deployment, and file bundling.',
        legacySlugs: ['TanStack Start & Vercel Knowledge Summary'],
      },
      {
        title: 'SSL on a VPS',
        slug: 'ssl-on-vps',
        source: 'tu-lo-ssl-vps',
        summary: 'Practical TLS options using Caddy, Nginx, and Cloudflare.',
        legacySlugs: ['tu-lo-ssl-vps'],
      },
    ],
  },
  {
    title: 'Linux',
    slug: 'linux',
    route: '/linux',
    documentRoute: '/linux/$slug',
    summary: 'Command-line references and desktop application configuration.',
    documents: [
      {
        title: 'Linux Menu Application Mapping',
        slug: 'menu-application-mapping',
        source: 'LINUX-MENU-APPICATION-MAPING',
        summary: 'Permissions, ownership, and desktop entry configuration.',
        legacySlugs: ['LINUX-MENU-APPICATION-MAPING'],
      },
      {
        title: 'Linux CLI',
        slug: 'cli',
        source: 'linux-cli',
        summary: 'A compact reference for common Linux command-line tasks.',
        legacySlugs: ['LINUX-CLI'],
      },
    ],
  },
] satisfies ReadonlyArray<DocumentCategory>

export function getCategory(categorySlug: string) {
  return documentCategories.find((category) => category.slug === categorySlug)
}

export function getDocument(categorySlug: string, documentSlug: string) {
  const category = getCategory(categorySlug)
  const document = category?.documents.find(
    (entry) => entry.slug === documentSlug,
  )

  return category && document ? { category, document } : undefined
}

export function getDocumentByLegacySlug(legacySlug: string) {
  const normalizedSlug = legacySlug.toLowerCase()

  for (const category of documentCategories) {
    const document = category.documents.find((entry) =>
      [entry.slug, entry.source, ...(entry.legacySlugs ?? [])].some(
        (candidate) => candidate.toLowerCase() === normalizedSlug,
      ),
    )

    if (document) {
      return { category, document }
    }
  }

  return undefined
}
