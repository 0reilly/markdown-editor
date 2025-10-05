import React, { useState } from 'react'

const DocumentsSidebar = ({ 
  documents, 
  currentDocumentId, 
  onDocumentSelect, 
  onDocumentCreate, 
  onDocumentDelete, 
  onDocumentDuplicate,
  onDocumentRename,
  isOpen,
  onClose 
}) => {
  const [renamingDocId, setRenamingDocId] = useState(null)
  const [newTitle, setNewTitle] = useState('')

  const handleRenameStart = (doc) => {
    setRenamingDocId(doc.id)
    setNewTitle(doc.title)
  }

  const handleRenameSave = (docId) => {
    if (newTitle.trim()) {
      onDocumentRename(docId, newTitle.trim())
    }
    setRenamingDocId(null)
    setNewTitle('')
  }

  const handleRenameCancel = () => {
    setRenamingDocId(null)
    setNewTitle('')
  }

  const handleKeyDown = (e, docId) => {
    if (e.key === 'Enter') {
      handleRenameSave(docId)
    } else if (e.key === 'Escape') {
      handleRenameCancel()
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-80 bg-white border-r border-vercel-gray-200
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-vercel-gray-200">
            <div>
              <h2 className="text-lg font-semibold text-vercel-gray-900">Documents</h2>
              <p className="text-sm text-vercel-gray-500">{documents.length} document{documents.length !== 1 ? 's' : ''}</p>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-2 text-vercel-gray-500 hover:text-vercel-gray-700"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* New Document Button */}
          <div className="p-4 border-b border-vercel-gray-200">
            <button
              onClick={onDocumentCreate}
              className="w-full flex items-center justify-center px-4 py-2 border border-vercel-gray-300 rounded-md text-sm font-medium text-vercel-gray-700 bg-white hover:bg-vercel-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vercel-blue-500"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Document
            </button>
          </div>

          {/* Documents List */}
          <div className="flex-1 overflow-y-auto">
            {documents.length === 0 ? (
              <div className="p-4 text-center text-vercel-gray-500">
                <p>No documents yet</p>
                <button
                  onClick={onDocumentCreate}
                  className="mt-2 text-vercel-blue-600 hover:text-vercel-blue-700"
                >
                  Create your first document
                </button>
              </div>
            ) : (
              <div className="p-2">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className={`
                      group relative p-3 rounded-lg mb-1 cursor-pointer
                      ${currentDocumentId === doc.id 
                        ? 'bg-vercel-blue-50 border border-vercel-blue-200' 
                        : 'hover:bg-vercel-gray-50'
                      }
                    `}
                    onClick={() => onDocumentSelect(doc.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        {renamingDocId === doc.id ? (
                          <input
                            type="text"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, doc.id)}
                            onBlur={() => handleRenameSave(doc.id)}
                            className="w-full px-2 py-1 text-sm border border-vercel-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-vercel-blue-500"
                            autoFocus
                          />
                        ) : (
                          <>
                            <h3 className="text-sm font-medium text-vercel-gray-900 truncate">
                              {doc.title}
                            </h3>
                            <p className="text-xs text-vercel-gray-500 mt-1">
                              Updated {formatDate(doc.updatedAt)}
                            </p>
                          </>
                        )}
                      </div>

                      {/* Document Actions */}
                      {currentDocumentId === doc.id && renamingDocId !== doc.id && (
                        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleRenameStart(doc)
                            }}
                            className="p-1 text-vercel-gray-400 hover:text-vercel-gray-600"
                            title="Rename"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              onDocumentDuplicate(doc.id)
                            }}
                            className="p-1 text-vercel-gray-400 hover:text-vercel-gray-600"
                            title="Duplicate"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </button>
                          {documents.length > 1 && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                onDocumentDelete(doc.id)
                              }}
                              className="p-1 text-vercel-gray-400 hover:text-red-600"
                              title="Delete"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-vercel-gray-200">
            <p className="text-xs text-vercel-gray-500 text-center">
              Documents auto-save as you type
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default DocumentsSidebar