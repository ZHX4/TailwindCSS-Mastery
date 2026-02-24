import { useState, useEffect, useRef, useCallback } from 'react'
import index from '../data/searchIndex'

/** Highlight matched characters in a string */
function HighlightMatch({ text, query }) {
  if (!query) return <span>{text}</span>
  const lower = text.toLowerCase()
  const q = query.toLowerCase()
  const start = lower.indexOf(q)
  if (start === -1) return <span>{text}</span>
  return (
    <span>
      {text.slice(0, start)}
      <mark className="bg-brand-100 dark:bg-brand-900 text-brand-700 dark:text-brand-300 rounded px-0.5">
        {text.slice(start, start + q.length)}
      </mark>
      {text.slice(start + q.length)}
    </span>
  )
}

/** Score + filter a single entry against the query */
function scoreEntry(entry, q) {
  if (!q) return 1
  const haystack = [
    entry.topic,
    entry.sectionLabel,
    entry.description,
    ...(entry.keywords ?? []),
  ]
    .join(' ')
    .toLowerCase()

  const parts = q
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)

  // All query words must appear somewhere in the haystack
  if (!parts.every(p => haystack.includes(p))) return 0

  // Boost: topic starts with query → highest score
  if (entry.topic.toLowerCase().startsWith(q.toLowerCase())) return 3
  // Boost: topic contains query
  if (entry.topic.toLowerCase().includes(q.toLowerCase())) return 2
  return 1
}

function filterIndex(q) {
  if (!q.trim()) return []
  return index
    .map(e => ({ ...e, _score: scoreEntry(e, q.trim()) }))
    .filter(e => e._score > 0)
    .sort((a, b) => b._score - a._score)
    .slice(0, 20)
}

export default function SearchModal({ isOpen, onClose, onNavigate }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [cursor, setCursor] = useState(-1)
  const inputRef = useRef(null)
  const listRef = useRef(null)

  /* Filter results whenever query changes */
  useEffect(() => {
    setResults(filterIndex(query))
    setCursor(-1)
  }, [query])

  /* Focus input when opened; reset state when closed */
  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setResults([])
      setCursor(-1)
      // tiny delay so the modal is painted before focussing
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [isOpen])

  /* Scroll active result into view */
  useEffect(() => {
    if (cursor < 0 || !listRef.current) return
    const item = listRef.current.children[cursor]
    item?.scrollIntoView({ block: 'nearest' })
  }, [cursor])

  const navigate = useCallback(
    entry => {
      if (!entry) return
      onNavigate(entry.sectionId)
      onClose()
    },
    [onNavigate, onClose]
  )

  const handleKeyDown = useCallback(
    e => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setCursor(c => Math.min(c + 1, results.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setCursor(c => Math.max(c - 1, 0))
      } else if (e.key === 'Enter') {
        if (cursor >= 0) navigate(results[cursor])
        else if (results.length > 0) navigate(results[0])
      }
    },
    [results, cursor, navigate, onClose]
  )

  /* Group results by section for display */
  const grouped = results.reduce((acc, entry) => {
    const key = entry.sectionId
    if (!acc[key]) acc[key] = { label: entry.sectionLabel, icon: entry.icon, entries: [] }
    acc[key].entries.push(entry)
    return acc
  }, {})

  // Flat list for cursor tracking (matches what's actually rendered)
  const flatResults = results

  if (!isOpen) return null

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      {/* Blurred overlay */}
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" aria-hidden="true" />

      {/* Modal panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search documentation"
        className="
          relative w-full max-w-xl
          bg-white dark:bg-slate-900
          rounded-2xl shadow-2xl
          border border-slate-200 dark:border-slate-700
          overflow-hidden
          animate-fade-in
        "
      >
        {/* ── Search input ── */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 dark:border-slate-700">
          {/* Search icon */}
          <svg
            className="w-5 h-5 text-slate-400 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search Tailwind concepts, classes, utilities…"
            className="
              flex-1 bg-transparent outline-none
              text-sm text-slate-900 dark:text-slate-100
              placeholder:text-slate-400 dark:placeholder:text-slate-500
            "
            spellCheck={false}
            autoComplete="off"
          />

          {/* Clear / ESC hint */}
          {query ? (
            <button
              onClick={() => { setQuery(''); inputRef.current?.focus() }}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              aria-label="Clear search"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          ) : (
            <kbd className="hidden sm:block text-xs text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700 rounded px-1.5 py-0.5 font-mono">
              esc
            </kbd>
          )}
        </div>

        {/* ── Results ── */}
        {query && (
          <div className="max-h-[60vh] overflow-y-auto">
            {flatResults.length === 0 ? (
              <p className="py-10 text-center text-sm text-slate-500 dark:text-slate-400">
                No results for <strong>"{query}"</strong>
              </p>
            ) : (
              <ul role="listbox" ref={listRef} className="py-2">
                {flatResults.map((entry, i) => {
                  const isCursor = i === cursor
                  return (
                    <li
                      key={entry.id}
                      role="option"
                      aria-selected={isCursor}
                      onClick={() => navigate(entry)}
                      onMouseMove={() => setCursor(i)}
                      className={`
                        flex items-start gap-3 px-4 py-2.5 cursor-pointer
                        transition-colors duration-75
                        ${isCursor
                          ? 'bg-brand-50 dark:bg-brand-950'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'}
                      `}
                    >
                      {/* Icon */}
                      <span className="text-lg leading-none mt-0.5 select-none">{entry.icon}</span>

                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium leading-snug truncate ${isCursor ? 'text-brand-600 dark:text-brand-400' : 'text-slate-800 dark:text-slate-200'}`}>
                          <HighlightMatch text={entry.topic} query={query} />
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                          <HighlightMatch text={entry.description} query={query} />
                        </p>
                      </div>

                      {/* Section badge */}
                      <span className="flex-shrink-0 text-xs text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full whitespace-nowrap">
                        {entry.sectionLabel}
                      </span>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        )}

        {/* ── Footer hint (only when no query) ── */}
        {!query && (
          <div className="px-4 py-4 text-center">
            <p className="text-sm text-slate-400 dark:text-slate-500">
              Type to search across all Tailwind concepts, classes, and topics
            </p>
            <div className="mt-3 flex flex-wrap gap-2 justify-center">
              {['flex', 'grid', 'dark mode', 'group-hover', 'blur', '@apply', 'aspect ratio'].map(hint => (
                <button
                  key={hint}
                  onClick={() => setQuery(hint)}
                  className="text-xs text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950 hover:bg-brand-100 dark:hover:bg-brand-900 border border-brand-100 dark:border-brand-800 rounded-full px-3 py-1 transition-colors"
                >
                  {hint}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Footer nav shortcuts hint ── */}
        {flatResults.length > 1 && (
          <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-4 text-xs text-slate-400 dark:text-slate-500">
            <span><kbd className="font-mono border border-slate-200 dark:border-slate-700 rounded px-1">↑↓</kbd> navigate</span>
            <span><kbd className="font-mono border border-slate-200 dark:border-slate-700 rounded px-1">↵</kbd> go</span>
            <span><kbd className="font-mono border border-slate-200 dark:border-slate-700 rounded px-1">esc</kbd> close</span>
            <span className="ml-auto">{flatResults.length} result{flatResults.length !== 1 ? 's' : ''}</span>
          </div>
        )}
      </div>
    </div>
  )
}
