import { createFileRoute } from '@tanstack/react-router'

import { DocumentCategoryPage } from '../../components/document-category-page'

export const Route = createFileRoute('/linux/')({
  component: () => <DocumentCategoryPage categorySlug="linux" />,
})
