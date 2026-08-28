import { Link } from '@tanstack/react-router'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'

import type { CategoryRoute } from '../lib/documents'

interface MarkdownDocumentData {
  category: {
    title: string
    route: CategoryRoute
  }
  document: {
    title: string
    slug: string
  }
  content: string
}

export function MarkdownDocumentPage({ data }: { data: MarkdownDocumentData }) {
  return (
    <main className="document-page">
      <nav className="document-nav" aria-label="Breadcrumb">
        <Link to="/">Notes</Link>
        <span aria-hidden="true">/</span>
        <Link to={data.category.route}>{data.category.title}</Link>
        <span aria-hidden="true">/</span>
        <span>{data.document.title}</span>
      </nav>

      <article className="markdown-body document-content">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            a: ({ node: _node, href, ...props }) => {
              const isExternal = href?.startsWith('http')

              return (
                <a
                  href={href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noreferrer' : undefined}
                  {...props}
                />
              )
            },
            code: ({ node: _node, className, children, ...props }) => {
              const isBlock =
                className?.includes('language-') ||
                String(children).includes('\n')

              return (
                <code
                  className={
                    isBlock
                      ? className
                      : 'rounded-md bg-slate-800 px-1.5 py-0.5 font-mono text-[0.875em] text-sky-300'
                  }
                  {...props}
                >
                  {children}
                </code>
              )
            },
          }}
        >
          {data.content}
        </ReactMarkdown>
      </article>
    </main>
  )
}
