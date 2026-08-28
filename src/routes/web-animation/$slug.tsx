import { createFileRoute, notFound } from '@tanstack/react-router'

import { MarkdownDocumentPage } from '../../components/markdown-document-page'
import { getDocument } from '../../lib/documents'
import { loadMarkdownDocument } from '../../lib/markdown'

export const Route = createFileRoute('/web-animation/$slug')({
  loader: ({ params }) => {
    if (!getDocument('web-animation', params.slug)) {
      throw notFound()
    }

    return loadMarkdownDocument({
      data: { categorySlug: 'web-animation', slug: params.slug },
    })
  },
  component: DocumentRoute,
})

function DocumentRoute() {
  return <MarkdownDocumentPage data={Route.useLoaderData()} />
}
