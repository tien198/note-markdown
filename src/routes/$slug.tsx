import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'

const getMarkdownContent = createServerFn({ method: 'GET' })
  .validator((slug: unknown) => slug as string)
  .handler(async ({ data: slug }) => {
    if (slug.includes('/') || slug.includes('..')) {
      throw new Error('Invalid slug')
    }

    // Vite will bundle these files, making them available in Vercel Serverless Functions
    const markdownFiles = import.meta.glob('/public/*.{md,MD}', {
      query: '?raw',
      import: 'default',
    })

    const matchingKey = Object.keys(markdownFiles).find((key) =>
      key.toLowerCase().endsWith(`/${slug.toLowerCase()}.md`),
    )

    if (matchingKey) {
      const content = await markdownFiles[matchingKey]()
      return content
    }

    throw new Error('Markdown file not found')
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
          code: ({ node: _node, className, children, ...props }) => {
            const isBlock =
              className?.includes('language-') ||
              String(children).includes('\n')

            return (
              <code
                className={
                  // isBlock
                  // ? `${className ?? ''} block overflow-x-auto font-mono text-sm leading-6`
                  // :
                  'rounded-md bg-slate-800 px-1.5 py-0.5 font-mono text-[0.875em] text-sky-300'
                }
                {...props}
              >
                {children}
              </code>
            )
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  )
}
