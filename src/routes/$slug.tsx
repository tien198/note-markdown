import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import ReactMarkdown from 'react-markdown'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'

const getMarkdownContent = createServerFn({ method: 'GET' })
  .validator((slug: unknown) => slug as string)
  .handler(async ({ data: slug }) => {
    // Basic protection against directory traversal
    if (slug.includes('/') || slug.includes('..')) {
      throw new Error('Invalid slug')
    }
    
    // Attempt to read the exact slug + .MD or .md
    try {
      const filePath = resolve(`public/${slug}.MD`)
      const content = await readFile(filePath, 'utf-8')
      return content
    } catch (e) {
      // If .MD fails, maybe try .md or just rethrow
      try {
        const filePath = resolve(`public/${slug}.md`)
        return await readFile(filePath, 'utf-8')
      } catch (e2) {
        throw new Error('Markdown file not found')
      }
    }
  })

export const Route = createFileRoute('/$slug')({
  loader: ({ params }) => getMarkdownContent({ data: params.slug }),
  component: MarkdownPage,
})

function MarkdownPage() {
  const markdown = Route.useLoaderData()

  return (
    <div className="markdown-body p-8">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          a: ({ node, ...props }) => (
            <a
              className="text-blue-500 hover:underline"
              target="_blank"
              {...props}
            />
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  )
}
