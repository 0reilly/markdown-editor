import React from 'react'

const Toolbar = ({ onInsertText }) => {
  const formattingOptions = [
    {
      name: 'Heading 1',
      icon: 'H1',
      action: () => onInsertText('\n# Heading 1\n'),
      shortcut: '# + Space'
    },
    {
      name: 'Heading 2',
      icon: 'H2',
      action: () => onInsertText('\n## Heading 2\n'),
      shortcut: '## + Space'
    },
    {
      name: 'Bold',
      icon: 'B',
      action: () => onInsertText('**bold text**'),
      shortcut: 'Ctrl+B'
    },
    {
      name: 'Italic',
      icon: 'I',
      action: () => onInsertText('*italic text*'),
      shortcut: 'Ctrl+I'
    },
    {
      name: 'Link',
      icon: '🔗',
      action: () => onInsertText('[link text](https://example.com)'),
      shortcut: 'Ctrl+K'
    },
    {
      name: 'Code',
      icon: '</>',
      action: () => onInsertText('`inline code`'),
      shortcut: '`'
    },
    {
      name: 'Code Block',
      icon: '```',
      action: () => onInsertText('\n\n```javascript\n// code here\n```\n'),
      shortcut: '``` + Enter'
    },
    {
      name: 'Quote',
      icon: '❝',
      action: () => onInsertText('\n> Quote text\n'),
      shortcut: '> + Space'
    },
    {
      name: 'List',
      icon: '•',
      action: () => onInsertText('\n- List item\n'),
      shortcut: '- + Space'
    },
    {
      name: 'Numbered List',
      icon: '1.',
      action: () => onInsertText('\n1. First item\n'),
      shortcut: '1. + Space'
    },
    {
      name: 'Checklist',
      icon: '☐',
      action: () => onInsertText('\n- [ ] Task\n'),
      shortcut: '- [ ]'
    },
    {
      name: 'Table',
      icon: '📊',
      action: () => onInsertText('\n| Header 1 | Header 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |\n'),
      shortcut: '|'
    }
  ]

  return (
    <div className="mb-6">
      <div className="bg-white rounded-lg shadow-vercel border border-vercel-gray-200 p-4">
        <div className="flex flex-wrap gap-2">
          {formattingOptions.map((option, index) => (
            <button
              key={index}
              onClick={option.action}
              className="inline-flex items-center px-3 py-2 border border-vercel-gray-300 rounded-md text-sm font-medium text-vercel-gray-700 bg-white hover:bg-vercel-gray-50 hover:border-vercel-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vercel-blue-500 transition-colors"
              title={`${option.name} (${option.shortcut})`}
            >
              <span className="font-semibold mr-2">{option.icon}</span>
              <span className="hidden sm:inline">{option.name}</span>
            </button>
          ))}
        </div>
        
        <div className="mt-3 pt-3 border-t border-vercel-gray-200">
          <div className="flex flex-wrap gap-4 text-xs text-vercel-gray-500">
            <div className="flex items-center">
              <span className="font-medium mr-1">Quick Tips:</span>
              <span>Use # for headings, * for italic, ** for bold</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium mr-1">Tables:</span>
              <span>Use | for columns, --- for headers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Toolbar