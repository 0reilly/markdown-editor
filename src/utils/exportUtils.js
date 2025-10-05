// Export utilities for markdown editor

export const exportAsMarkdown = (markdown, filename = 'document.md') => {
  const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export const exportAsHTML = (markdown, filename = 'document.html') => {
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${filename.replace('.html', '')}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      color: #1f2937;
    }
    h1 { 
      font-size: 2.25rem; 
      font-weight: 700; 
      margin-bottom: 1rem;
      border-bottom: 2px solid #e5e7eb;
      padding-bottom: 0.5rem;
    }
    h2 { 
      font-size: 1.875rem; 
      font-weight: 600; 
      margin-top: 2rem;
      margin-bottom: 0.75rem;
    }
    h3 { 
      font-size: 1.5rem; 
      font-weight: 600; 
      margin-top: 1.5rem;
      margin-bottom: 0.5rem;
    }
    p { 
      margin-bottom: 1rem;
    }
    code {
      background-color: #f3f4f6;
      padding: 0.125rem 0.25rem;
      border-radius: 0.25rem;
      font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
      font-size: 0.875rem;
    }
    pre {
      background-color: #1f2937;
      color: #f9fafb;
      padding: 1rem;
      border-radius: 0.5rem;
      overflow-x: auto;
      margin: 1rem 0;
    }
    pre code {
      background: none;
      padding: 0;
      color: inherit;
    }
    blockquote {
      border-left: 4px solid #3b82f6;
      background-color: #eff6ff;
      padding: 1rem 1.5rem;
      margin: 1rem 0;
      font-style: italic;
    }
    ul, ol {
      margin: 1rem 0;
      padding-left: 2rem;
    }
    li {
      margin-bottom: 0.25rem;
    }
    table {
      border-collapse: collapse;
      width: 100%;
      margin: 1rem 0;
    }
    th, td {
      border: 1px solid #d1d5db;
      padding: 0.5rem 0.75rem;
      text-align: left;
    }
    th {
      background-color: #f9fafb;
      font-weight: 600;
    }
    a {
      color: #3b82f6;
      text-decoration: underline;
    }
    hr {
      border: none;
      border-top: 2px solid #e5e7eb;
      margin: 2rem 0;
    }
  </style>
</head>
<body>
  <div id="content">
    ${markdown}
  </div>
  <footer style="margin-top: 3rem; padding-top: 1rem; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 0.875rem;">
    Exported from Markdown Editor on ${new Date().toLocaleDateString()}
  </footer>
</body>
</html>`

  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export const exportAsPDF = (markdown, filename = 'document.pdf') => {
  // Create a temporary iframe for printing
  const iframe = document.createElement('iframe')
  iframe.style.position = 'fixed'
  iframe.style.right = '0'
  iframe.style.bottom = '0'
  iframe.style.width = '0'
  iframe.style.height = '0'
  iframe.style.border = 'none'
  
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${filename.replace('.pdf', '')}</title>
  <style>
    @media print {
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        line-height: 1.4;
        color: #000;
        font-size: 12pt;
        margin: 1in;
      }
      h1 { 
        font-size: 18pt; 
        font-weight: 700; 
        margin-bottom: 0.5in;
        border-bottom: 1pt solid #ccc;
        padding-bottom: 0.1in;
      }
      h2 { 
        font-size: 14pt; 
        font-weight: 600; 
        margin-top: 0.3in;
        margin-bottom: 0.2in;
      }
      h3 { 
        font-size: 12pt; 
        font-weight: 600; 
        margin-top: 0.2in;
        margin-bottom: 0.1in;
      }
      p { 
        margin-bottom: 0.1in;
      }
      code {
        background-color: #f5f5f5;
        padding: 1pt 2pt;
        border-radius: 2pt;
        font-family: 'SFMono-Regular', Consolas, monospace;
        font-size: 10pt;
      }
      pre {
        background-color: #f5f5f5;
        padding: 6pt;
        border-radius: 4pt;
        overflow-x: auto;
        margin: 6pt 0;
        page-break-inside: avoid;
      }
      blockquote {
        border-left: 2pt solid #3b82f6;
        background-color: #f8fafc;
        padding: 6pt 12pt;
        margin: 6pt 0;
        font-style: italic;
      }
      ul, ol {
        margin: 6pt 0;
        padding-left: 0.3in;
      }
      table {
        border-collapse: collapse;
        width: 100%;
        margin: 6pt 0;
        page-break-inside: avoid;
      }
      th, td {
        border: 1pt solid #ccc;
        padding: 4pt 6pt;
        text-align: left;
      }
      th {
        background-color: #f9f9f9;
        font-weight: 600;
      }
      hr {
        border: none;
        border-top: 1pt solid #ccc;
        margin: 0.2in 0;
      }
      footer {
        margin-top: 0.3in;
        padding-top: 6pt;
        border-top: 1pt solid #ccc;
        color: #666;
        font-size: 10pt;
      }
    }
  </style>
</head>
<body>
  <div id="content">
    ${markdown}
  </div>
  <footer>
    Exported from Markdown Editor on ${new Date().toLocaleDateString()}
  </footer>
</body>
</html>`

  document.body.appendChild(iframe)
  
  iframe.onload = () => {
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document
    iframeDoc.open()
    iframeDoc.write(htmlContent)
    iframeDoc.close()
    
    // Wait for content to render then print
    setTimeout(() => {
      iframe.contentWindow.focus()
      iframe.contentWindow.print()
      
      // Clean up after printing
      setTimeout(() => {
        document.body.removeChild(iframe)
      }, 1000)
    }, 500)
  }
}