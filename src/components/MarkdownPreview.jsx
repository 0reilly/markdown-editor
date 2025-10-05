import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const MarkdownPreview = ({ markdown, className = '' }) => {
  return (
    <div className={`${className}`}>
      <div className="bg-white rounded-lg shadow-vercel border border-vercel-gray-200 overflow-hidden h-full">
        <div className="px-4 py-3 border-b border-vercel-gray-200 bg-vercel-gray-50">
          <h3 className="text-sm font-medium text-vercel-gray-700 flex items-center">
            <svg className="w-4 h-4 mr-2 text-vercel-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Preview
          </h3>
        </div>
        <div className="p-6">
          <div className="prose prose-sm max-w-none custom-scrollbar" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                // Custom components for better styling
                h1: ({ children }) => (
                  <h1 className="text-2xl font-bold text-vercel-gray-900 mb-4 mt-6 border-b border-vercel-gray-200 pb-2">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-xl font-semibold text-vercel-gray-900 mb-3 mt-5">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-lg font-medium text-vercel-gray-900 mb-2 mt-4">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="text-vercel-gray-700 mb-4 leading-relaxed">
                    {children}
                  </p>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-vercel-blue-500 bg-vercel-blue-50 pl-4 py-2 my-4 text-vercel-gray-700 italic">
                    {children}
                  </blockquote>
                ),
                code: ({ children, inline }) => {
                  if (inline) {
                    return (
                      <code className="bg-vercel-gray-100 text-vercel-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">
                        {children}
                      </code>
                    )
                  }
                  return (
                    <code className="block bg-vercel-gray-900 text-vercel-gray-100 p-4 rounded-lg my-4 text-sm font-mono overflow-x-auto">
                      {children}
                    </code>
                  )
                },
                pre: ({ children }) => (
                  <pre className="my-4">
                    {children}
                  </pre>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside mb-4 text-vercel-gray-700 space-y-1">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside mb-4 text-vercel-gray-700 space-y-1">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="pl-2">
                    {children}
                  </li>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-vercel-gray-900">
                    {children}
                  </strong>
                ),
                em: ({ children }) => (
                  <em className="italic text-vercel-gray-700">
                    {children}
                  </em>
                ),
                a: ({ children, href }) => (
                  <a 
                    href={href} 
                    className="text-vercel-blue-600 hover:text-vercel-blue-700 underline transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {children}
                  </a>
                ),
                hr: () => (
                  <hr className="my-6 border-vercel-gray-200" />
                ),
                table: ({ children }) => (
                  <div className="overflow-x-auto my-4">
                    <table className="min-w-full divide-y divide-vercel-gray-200 border border-vercel-gray-200 rounded-lg">
                      {children}
                    </table>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead className="bg-vercel-gray-50">
                    {children}
                  </thead>
                ),
                th: ({ children }) => (
                  <th className="px-4 py-2 text-left text-sm font-medium text-vercel-gray-700 border-b border-vercel-gray-200">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="px-4 py-2 text-sm text-vercel-gray-700 border-b border-vercel-gray-200">
                    {children}
                  </td>
                ),
              }}
            >
              {markdown || 'Start writing to see the preview...'}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarkdownPreview