# Markdown Editor

A modern markdown note editor with Tailwind CSS inspired by Vercel's design system.

## Features

- ✨ **Real-time preview** with syntax highlighting
- 🎨 **Beautiful UI** inspired by Vercel's design
- 📝 **Easy formatting** with intuitive toolbar
- 💾 **Auto-resize** textarea
- ⌨️ **Keyboard shortcuts** support
- 📱 **Responsive design** for all devices
- 🔄 **Split view** and editor-only modes

## Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Markdown** - Markdown rendering
- **Remark GFM** - GitHub Flavored Markdown support

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   cd markdown-editor
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Usage

### Editor Features

- **Split View**: Toggle between split editor/preview and editor-only modes
- **Toolbar**: Quick access to common markdown formatting
- **Auto-resize**: Textarea automatically grows with content
- **Tab Support**: Press Tab to insert 2 spaces

### Markdown Support

The editor supports all standard markdown syntax plus GitHub Flavored Markdown:

- Headers (`#`, `##`, `###`)
- **Bold** and *italic* text
- `Inline code` and code blocks
- Lists (bullet and numbered)
- [Links](https://example.com)
- Blockquotes
- Tables
- Task lists
- Horizontal rules

### Keyboard Shortcuts

- `# + Space` - Heading 1
- `## + Space` - Heading 2
- `**text**` - Bold
- `*text*` - Italic
- `[text](url)` - Link
- `> + Space` - Blockquote
- `- + Space` - Bullet list
- `1. + Space` - Numbered list
- `Tab` - Insert 2 spaces

## Project Structure

```
markdown-editor/
├── src/
│   ├── components/
│   │   ├── MarkdownEditor.jsx
│   │   ├── MarkdownPreview.jsx
│   │   └── Toolbar.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## Customization

### Colors

The app uses a Vercel-inspired color palette defined in `tailwind.config.js`. You can customize:

- Primary colors in the `vercel` theme
- Font families and sizes
- Component shadows and borders

### Components

Each component is modular and can be easily customized:

- `MarkdownEditor` - Textarea with auto-resize
- `MarkdownPreview` - Markdown rendering with custom styles
- `Toolbar` - Formatting buttons and quick actions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for personal or commercial purposes.

---

Built with ❤️ by SWEET CLI Agent