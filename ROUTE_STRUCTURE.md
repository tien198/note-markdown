# Classified Route Structure

The document library is organized by technical domain. Category segments are
static and document slugs are dynamic within their category.

```text
/
├── /ai-tools
│   └── /agent-skills
├── /software-architecture
│   └── /payload-lexical-architecture
├── /web-animation
│   ├── /gsap-basics
│   ├── /gsap-to-from-examples
│   ├── /gsap-animation-common-gaps
│   └── /gsap-animation-patterns-compositions
├── /infrastructure
│   ├── /nginx
│   ├── /tanstack-start-vercel
│   └── /ssl-on-vps
└── /linux
    ├── /menu-application-mapping
    └── /cli
```

## File Routes

```text
src/routes/
├── __root.tsx
├── index.tsx
├── $slug.tsx                         # Legacy URL redirect
├── ai-tools/
│   ├── index.tsx                     # /ai-tools
│   └── $slug.tsx                     # /ai-tools/$slug
├── software-architecture/
│   ├── index.tsx                     # /software-architecture
│   └── $slug.tsx                     # /software-architecture/$slug
├── web-animation/
│   ├── index.tsx                     # /web-animation
│   └── $slug.tsx                     # /web-animation/$slug
├── infrastructure/
│   ├── index.tsx                     # /infrastructure
│   └── $slug.tsx                     # /infrastructure/$slug
└── linux/
    ├── index.tsx                     # /linux
    └── $slug.tsx                     # /linux/$slug
```

## Classification

| Category                      | Route                    | Documents                                                            |
| ----------------------------- | ------------------------ | -------------------------------------------------------------------- |
| AI Tools                      | `/ai-tools`              | Agent Skills                                                         |
| Software Architecture         | `/software-architecture` | Payload Lexical Architecture and Flow                                |
| Web Animation                 | `/web-animation`         | GSAP Basics; To/From examples; common gaps; patterns and composition |
| Infrastructure and Deployment | `/infrastructure`        | Nginx; TanStack Start and Vercel; SSL on a VPS                       |
| Linux                         | `/linux`                 | Menu application mapping; Linux CLI                                  |

## Legacy Redirects

The original flat `/$slug` route remains as a redirect layer, so old bookmarks
continue to work.

| Previous URL                                 | Classified URL                                        |
| -------------------------------------------- | ----------------------------------------------------- |
| `/agent-skills`                              | `/ai-tools/agent-skills`                              |
| `/ARCHITECTURE_AND_LEXICAL_FLOW`             | `/software-architecture/payload-lexical-architecture` |
| `/nginx`                                     | `/infrastructure/nginx`                               |
| `/GSAP`                                      | `/web-animation/gsap-basics`                          |
| `/gsap-to-from-examples`                     | `/web-animation/gsap-to-from-examples`                |
| `/gsap-animation-thuong-gap`                 | `/web-animation/gsap-animation-common-gaps`           |
| `/gsap-animation-patterns-compositions`      | `/web-animation/gsap-animation-patterns-compositions` |
| `/TanStack Start & Vercel Knowledge Summary` | `/infrastructure/tanstack-start-vercel`               |
| `/tu-lo-ssl-vps`                             | `/infrastructure/ssl-on-vps`                          |
| `/LINUX-MENU-APPICATION-MAPING`              | `/linux/menu-application-mapping`                     |
| `/LINUX-CLI`                                 | `/linux/cli`                                          |

The catalog source of truth is `src/lib/documents.ts`. Add new documents there,
then place the corresponding Markdown source in `public/`.
