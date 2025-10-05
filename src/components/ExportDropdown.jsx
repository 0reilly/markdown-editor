import React, { useState, useRef, useEffect } from 'react'
import { exportAsMarkdown, exportAsHTML, exportAsPDF } from '../utils/exportUtils'

const ExportDropdown = ({ markdown, onClose }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
        onClose?.()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  const handleExport = (type) => {
    const timestamp = new Date().toISOString().slice(0, 10)
    const filename = `markdown-${timestamp}`

    switch (type) {
      case 'markdown':
        exportAsMarkdown(markdown, `${filename}.md`)
        break
      case 'html':
        exportAsHTML(markdown, `${filename}.html`)
        break
      case 'pdf':
        exportAsPDF(markdown, `${filename}.pdf`)
        break
      default:
        break
    }
    
    setIsOpen(false)
    onClose?.()
  }

  const exportOptions = [
    {
      id: 'markdown',
      name: 'Export as Markdown',
      description: 'Download as .md file',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      id: 'html',
      name: 'Export as HTML',
      description: 'Download as styled .html file',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
        </svg>
      )
    },
    {
      id: 'pdf',
      name: 'Export as PDF',
      description: 'Print to PDF file',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    }
  ]

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center px-3 py-2 border border-vercel-gray-300 rounded-md text-sm font-medium text-vercel-gray-700 bg-white hover:bg-vercel-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vercel-blue-500"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Export
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-vercel-lg border border-vercel-gray-200 z-50">
          <div className="p-2">
            <div className="px-3 py-2 border-b border-vercel-gray-100">
              <h3 className="text-sm font-medium text-vercel-gray-900">Export Options</h3>
              <p className="text-xs text-vercel-gray-500 mt-1">Choose your export format</p>
            </div>
            
            <div className="py-1">
              {exportOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleExport(option.id)}
                  className="w-full flex items-center px-3 py-2 text-sm text-vercel-gray-700 hover:bg-vercel-gray-50 rounded-md transition-colors group"
                >
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-md bg-vercel-gray-100 text-vercel-gray-600 group-hover:bg-vercel-blue-100 group-hover:text-vercel-blue-600">
                    {option.icon}
                  </div>
                  <div className="ml-3 text-left">
                    <div className="font-medium text-vercel-gray-900">{option.name}</div>
                    <div className="text-xs text-vercel-gray-500">{option.description}</div>
                  </div>
                </button>
              ))}
            </div>
            
            <div className="px-3 py-2 border-t border-vercel-gray-100">
              <p className="text-xs text-vercel-gray-500">
                Files include today's date in the filename
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ExportDropdown