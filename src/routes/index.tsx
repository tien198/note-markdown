import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const markdowns = [
    {
      title: 'ARCHITECTURE_AND_LEXICAL_FLOW',
      slug: 'ARCHITECTURE_AND_LEXICAL_FLOW',
    },
    { title: 'Nginx', slug: 'nginx' },
    { title: 'GSAP', slug: 'GSAP' },
    {
      title: 'TanStack Start & Vercel',
      slug: 'TanStack Start & Vercel Knowledge Summary',
    },
    { title: 'Linux Menu Application Mapping', slug: 'LINUX-MENU-APPICATION-MAPING' },
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
