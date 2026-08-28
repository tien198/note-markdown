import { Link } from '@tanstack/react-router'

import { getCategory } from '../lib/documents'
import type { CategorySlug } from '../lib/documents'

export function DocumentCategoryPage({
  categorySlug,
}: {
  categorySlug: CategorySlug
}) {
  const category = getCategory(categorySlug)

  if (!category) {
    return null
  }

  return (
    <main className="library-page">
      <Link className="back-link" to="/">
        All notes
      </Link>

      <header className="category-header">
        <p className="section-label">Category</p>
        <h1>{category.title}</h1>
        <p>{category.summary}</p>
        <span className="document-count">
          {category.documents.length}{' '}
          {category.documents.length === 1 ? 'document' : 'documents'}
        </span>
      </header>

      <ul className="document-list">
        {category.documents.map((document) => (
          <li key={document.slug}>
            <Link
              className="document-card"
              to={category.documentRoute}
              params={{ slug: document.slug }}
            >
              <h2>{document.title}</h2>
              <p>{document.summary}</p>
              <span>Read document</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
