import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const markdowns = [
    { title: '6 Section GSAP', slug: '6-SECTION-GSAP' },
    { title: 'Dot Notation', slug: 'DOT-NOTATION' },
    { title: 'GSAP', slug: 'GSAP' },
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
