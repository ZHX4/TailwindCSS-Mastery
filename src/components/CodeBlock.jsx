/**
 * CodeBlock – displays syntax-highlighted code in a styled terminal-like box.
 * Supports an optional filename label, copy-to-clipboard, and line numbers.
 */
import { useState } from 'react'

export default function CodeBlock({ code, language = 'jsx', filename, lineNumbers = true }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  // Single-pass tokenizer — finds all matches first, then renders in one pass.
  // This avoids the cascading-replacement bug where span class names (e.g. text-purple-400)
  // get matched by later regexes (e.g. the numbers rule matching "400").
  const highlight = (src) => {
    // Token definitions in priority order (first match wins for overlapping regions)
    const TOKEN_RULES = [
      { re: /\/\/[^\n]*|\/\*[\s\S]*?\*\//g,                                         cls: 'text-slate-500 italic' }, // comments
      { re: /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`/g,               cls: 'text-emerald-300'      }, // strings
      { re: /\b(?:import|export|default|from|const|let|var|function|return|if|else|for|while|class|extends|new|typeof|null|undefined|true|false)\b/g,
                                                                                      cls: 'text-purple-400'       }, // keywords
      { re: /<\/?[A-Za-z][\w.]*/g,                                                   cls: 'text-sky-400'          }, // JSX/HTML tags
      { re: /(?<=\s)([\w-]+)(?==)/g,                                                 cls: 'text-amber-300'        }, // attributes
      { re: /\b\d+\.?\d*\b/g,                                                        cls: 'text-orange-300'       }, // numbers
    ]

    // Collect all non-overlapping matches with their token class, in source order
    const matches = []
    for (const { re, cls } of TOKEN_RULES) {
      re.lastIndex = 0
      let m
      while ((m = re.exec(src)) !== null) {
        const start = m.index
        const end   = start + m[0].length
        // Skip if this range overlaps an already-claimed match
        if (matches.some(ex => start < ex.end && end > ex.start)) continue
        matches.push({ start, end, cls, text: m[0] })
      }
    }
    matches.sort((a, b) => a.start - b.start)

    // Build final HTML: escape plain segments, wrap token segments in spans
    const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    let result = ''
    let cursor = 0
    for (const { start, end, cls, text } of matches) {
      if (cursor < start) result += esc(src.slice(cursor, start))
      result += `<span class="${cls}">${esc(text)}</span>`
      cursor = end
    }
    if (cursor < src.length) result += esc(src.slice(cursor))
    return result
  }

  return (
    <div className="rounded-xl overflow-hidden border border-slate-700 bg-slate-900 my-4 shadow-lg group">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
          <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
          {filename && (
            <span className="ml-2 text-xs text-slate-400 font-mono">{filename}</span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500 uppercase tracking-wide">{language}</span>
          <button
            onClick={handleCopy}
            className={`
              text-xs px-2.5 py-1 rounded-md border transition-all duration-150
              ${copied
                ? 'bg-emerald-600 border-emerald-500 text-white'
                : 'bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white border-slate-600'}
            `}
          >
            {copied
              ? <span className="flex items-center gap-1">✓ Copied!</span>
              : <span className="flex items-center gap-1.5">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                  </svg>
                  Copy
                </span>
            }
          </button>
        </div>
      </div>

      {/* Code content */}
      <div className="overflow-x-auto">
        <pre className="py-4 text-sm leading-relaxed font-mono text-slate-200 min-w-0">
          <code className="block">
            {highlight(code.trim()).split('\n').map((lineHtml, i) => (
              <span
                key={i}
                className="code-line hover:bg-white/[0.03] transition-colors duration-75"
              >
                {lineNumbers && (
                  <span className="line-number" aria-hidden="true">
                    {i + 1}
                  </span>
                )}
                <span
                  className="code-line-content"
                  dangerouslySetInnerHTML={{ __html: lineHtml || '\u00a0' }}
                />
              </span>
            ))}
          </code>
        </pre>
      </div>
    </div>
  )
}
