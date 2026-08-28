import { createFileRoute, notFound } from '@tanstack/react-router'

import { MarkdownDocumentPage } from '../../components/markdown-document-page'
import { getDocument } from '../../lib/documents'
import { loadMarkdownDocument } from '../../lib/markdown'

export const Route = createFileRoute('/software-architecture/$slug')({
  loader: ({ params }) => {
    if (!getDocument('software-architecture', params.slug)) {
      throw notFound()
    }

    return loadMarkdownDocument({
      data: { categorySlug: 'software-architecture', slug: params.slug },
    })
  },
  component: DocumentRoute,
})

function DocumentRoute() {
  return <MarkdownDocumentPage data={Route.useLoaderData()} />
}
