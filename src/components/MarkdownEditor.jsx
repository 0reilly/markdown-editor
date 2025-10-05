import React, { useRef, useEffect } from 'react'

const MarkdownEditor = ({ markdown, onChange, className = '' }) => {
  const textareaRef = useRef(null)

  useEffect(() => {
    // Auto-resize textarea
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = textarea.scrollHeight + 'px'
    }
  }, [markdown])

  const handleChange = (e) => {
    onChange(e.target.value)
  }

  const handleKeyDown = (e) => {
    // Tab key support
    if (e.key === 'Tab') {
      e.preventDefault()
      const start = e.target.selectionStart
      const end = e.target.selectionEnd
      const newValue = markdown.substring(0, start) + '  ' + markdown.substring(end)
      onChange(newValue)
      
      // Set cursor position after the inserted tab
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 2
      }, 0)
    }
  }

  return (
    <div className={`${className}`}>
      <div className="bg-white rounded-lg shadow-vercel border border-vercel-gray-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-vercel-gray-200 bg-vercel-gray-50">
          <h3 className="text-sm font-medium text-vercel-gray-700 flex items-center">
            <svg className="w-4 h-4 mr-2 text-vercel-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Editor
          </h3>
        </div>
        <div className="p-4">
          <textarea
            ref={textareaRef}
            value={markdown}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Start writing your markdown here..."
            className="w-full min-h-[500px] resize-none border-0 focus:ring-0 text-vercel-gray-900 placeholder-vercel-gray-400 font-mono text-sm leading-relaxed custom-scrollbar"
            style={{ 
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'
            }}
          />
        </div>
        <div className="px-4 py-3 border-t border-vercel-gray-200 bg-vercel-gray-50">
          <div className="flex justify-between items-center text-xs text-vercel-gray-500">
            <span>Markdown syntax supported</span>
            <span>{markdown.length} characters</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarkdownEditor