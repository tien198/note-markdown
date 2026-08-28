import { createServerFn } from '@tanstack/react-start'

import { getDocument } from './documents'

interface DocumentRequest {
  categorySlug: string
  slug: string
}

function validateDocumentRequest(input: unknown): DocumentRequest {
  if (
    !input ||
    typeof input !== 'object' ||
    !('categorySlug' in input) ||
    !('slug' in input) ||
    typeof input.categorySlug !== 'string' ||
    typeof input.slug !== 'string'
  ) {
    throw new Error('Invalid document request')
  }

  return {
    categorySlug: input.categorySlug,
    slug: input.slug,
  }
}

export const loadMarkdownDocument = createServerFn({ method: 'GET' })
  .validator(validateDocumentRequest)
  .handler(async ({ data }) => {
    const result = getDocument(data.categorySlug, data.slug)

    if (!result) {
      throw new Error('Markdown document not found')
    }

    const markdownFiles = import.meta.glob<string>('/public/*.{md,MD}', {
      query: '?raw',
      import: 'default',
    })
    const sourcePath = `/public/${result.document.source}.md`
    const loadMarkdown = Object.entries(markdownFiles).find(
      ([path]) => path === sourcePath,
    )?.[1]

    if (!loadMarkdown) {
      throw new Error(`Markdown source not found: ${result.document.source}`)
    }

    return {
      category: {
        title: result.category.title,
        route: result.category.route,
      },
      document: {
        title: result.document.title,
        slug: result.document.slug,
      },
      content: await loadMarkdown(),
    }
  })
