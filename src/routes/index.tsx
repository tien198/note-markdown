import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import ReactMarkdown from 'react-markdown'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'

const getMarkdownContent = createServerFn({ method: 'GET' }).handler(
  async () => {
    const filePath = resolve('public/GSAP.MD')
    const content = await readFile(filePath, 'utf-8')
    return content
  },
)

export const Route = createFileRoute('/')({
  loader: () => getMarkdownContent(),
  component: Home,
})

function Home() {
  const markdown = Route.useLoaderData()

  return (
    <div className="p-8">
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
