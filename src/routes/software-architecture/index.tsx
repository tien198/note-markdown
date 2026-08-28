import { createFileRoute } from '@tanstack/react-router'

import { DocumentCategoryPage } from '../../components/document-category-page'

export const Route = createFileRoute('/software-architecture/')({
  component: () => (
    <DocumentCategoryPage categorySlug="software-architecture" />
  ),
})
