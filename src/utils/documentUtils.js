// Document management utilities

const STORAGE_KEY = 'markdown-editor-documents'

export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

export const getDefaultDocument = () => ({
  id: generateId(),
  title: 'Untitled Document',
  content: '# Welcome to Your Markdown Editor\n\nStart writing your markdown here...',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
})

export const loadDocuments = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const documents = JSON.parse(stored)
      // Ensure we have at least one document
      if (documents.length === 0) {
        return [getDefaultDocument()]
      }
      return documents
    }
  } catch (error) {
    console.error('Error loading documents:', error)
  }
  
  // Return default document if nothing is stored
  return [getDefaultDocument()]
}

export const saveDocuments = (documents) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(documents))
  } catch (error) {
    console.error('Error saving documents:', error)
  }
}

export const createDocument = (documents) => {
  const newDoc = getDefaultDocument()
  const updatedDocs = [...documents, newDoc]
  saveDocuments(updatedDocs)
  return { documents: updatedDocs, newDocId: newDoc.id }
}

export const updateDocument = (documents, documentId, updates) => {
  const updatedDocs = documents.map(doc => 
    doc.id === documentId 
      ? { ...doc, ...updates, updatedAt: new Date().toISOString() }
      : doc
  )
  saveDocuments(updatedDocs)
  return updatedDocs
}

export const deleteDocument = (documents, documentId) => {
  if (documents.length <= 1) {
    // Don't allow deleting the last document
    return documents
  }
  
  const updatedDocs = documents.filter(doc => doc.id !== documentId)
  saveDocuments(updatedDocs)
  return updatedDocs
}

export const duplicateDocument = (documents, documentId) => {
  const originalDoc = documents.find(doc => doc.id === documentId)
  if (!originalDoc) return documents
  
  const duplicatedDoc = {
    ...originalDoc,
    id: generateId(),
    title: `${originalDoc.title} (Copy)`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  
  const updatedDocs = [...documents, duplicatedDoc]
  saveDocuments(updatedDocs)
  return { documents: updatedDocs, newDocId: duplicatedDoc.id }
}