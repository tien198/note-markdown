import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const markdowns = [
    {
      title: 'Agent Skills',
      slug: 'agent-skills',
    },
    {
      title: 'ARCHITECTURE_AND_LEXICAL_FLOW',
      slug: 'ARCHITECTURE_AND_LEXICAL_FLOW',
    },
    { title: 'Nginx', slug: 'nginx' },
    { title: 'GSAP', slug: 'GSAP' },
    { title: 'GSAP Example', slug: 'gsap-to-from-examples' },
    { title: 'GSAP Animation: Thường Gap', slug: 'gsap-animation-thuong-gap' },
    {
      title: 'GSAP Animation Pattern / Composition',
      slug: 'gsap-animation-patterns-compositions',
    },
    {
      title: 'TanStack Start & Vercel',
      slug: 'TanStack Start & Vercel Knowledge Summary',
    },
    {
      title: 'Tự lo SSL VPS',
      slug: 'tu-lo-ssl-vps',
    },
    {
      title: 'Linux Menu Application Mapping',
      slug: 'LINUX-MENU-APPICATION-MAPING',
    },
    {
      title: 'Linux CLI',
      slug: 'LINUX-CLI',
    },
  ]

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-blue-600 text-3xl font-bold mb-6">
        Markdown Documents
      </h1>
      <ul className="space-y-4">
        {markdowns.map((md) => (
          <li key={md.slug}>
            <Link
              to="/$slug"
              params={{ slug: md.slug }}
              className="block p-4 border rounded-lg transition-colors shadow-sm"
            >
              <h2 className="text-xl font-semibold text-blue-600">
                {md.title}
              </h2>
              <p className="text-gray-500 mt-1">
                Read the {md.title} documentation &rarr;
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
