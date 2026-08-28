import { createFileRoute, Link } from '@tanstack/react-router'

import { documentCategories } from '../lib/documents'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const documentCount = documentCategories.reduce(
    (total, category) => total + category.documents.length,
    0,
  )

  return (
    <main className="library-page">
      <header className="library-header">
        <p className="section-label">Knowledge base</p>
        <h1>Notes</h1>
        <p>
          {documentCount} documents organized into {documentCategories.length}{' '}
          categories.
        </p>
      </header>

      <ul className="category-grid">
        {documentCategories.map((category) => (
          <li key={category.slug}>
            <Link className="category-card" to={category.route}>
              <div>
                <span className="document-count">
                  {category.documents.length}{' '}
                  {category.documents.length === 1 ? 'document' : 'documents'}
                </span>
                <h2>{category.title}</h2>
                <p>{category.summary}</p>
              </div>
              <span>View category</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
