import { createFileRoute, notFound, redirect } from '@tanstack/react-router'

import { getDocumentByLegacySlug } from '../lib/documents'

export const Route = createFileRoute('/$slug')({
  beforeLoad: ({ params }) => {
    const result = getDocumentByLegacySlug(params.slug)

    if (!result) {
      throw notFound()
    }

    throw redirect({
      to: result.category.documentRoute,
      params: { slug: result.document.slug },
      replace: true,
    })
  },
})
