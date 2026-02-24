/**
 * KeyboardShortcuts – modal that lists every keyboard shortcut in the app.
 * Opens with the `?` key (registered in App.jsx).
 */
export default function KeyboardShortcuts({ isOpen, onClose }) {
  if (!isOpen) return null

  const groups = [
    {
      title: 'Navigation',
      shortcuts: [
        { keys: ['ctrl', 'K'],    label: 'Open search' },
        { keys: ['↑', '↓'],       label: 'Move through search results' },
        { keys: ['↵'],            label: 'Jump to selected section' },
        { keys: ['Esc'],          label: 'Close any modal' },
      ],
    },
    {
      title: 'Interface',
      shortcuts: [
        { keys: ['?'],            label: 'Show / hide this shortcuts panel' },
        { keys: ['D'],            label: 'Toggle dark mode' },
      ],
    },
    {
      title: 'Browser Defaults',
      shortcuts: [
        { keys: ['Home'],         label: 'Scroll to top of page' },
        { keys: ['End'],          label: 'Scroll to bottom of page' },
        { keys: ['Space'],        label: 'Scroll down one page' },
      ],
    },
  ]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" aria-hidden="true" />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Keyboard shortcuts"
        className="
          relative w-full max-w-md
          bg-white dark:bg-slate-900
          rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700
          overflow-hidden animate-fade-in
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-lg">⌨️</span>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">Keyboard Shortcuts</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200
                       hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Groups */}
        <div className="p-5 space-y-5">
          {groups.map(group => (
            <div key={group.title}>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-600 mb-2">
                {group.title}
              </p>
              <ul className="space-y-1.5">
                {group.shortcuts.map(({ keys, label }) => (
                  <li key={label} className="flex items-center justify-between gap-4">
                    <span className="text-sm text-slate-600 dark:text-slate-400">{label}</span>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      {keys.map((k, i) => (
                        <kbd
                          key={i}
                          className="text-xs font-mono text-slate-700 dark:text-slate-300
                                     bg-slate-100 dark:bg-slate-800
                                     border border-slate-300 dark:border-slate-700
                                     rounded-md px-2 py-1 leading-none shadow-sm"
                        >
                          {k}
                        </kbd>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer hint */}
        <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800 text-center">
          <p className="text-xs text-slate-400 dark:text-slate-600">
            Press <kbd className="font-mono text-xs border border-slate-200 dark:border-slate-700 rounded px-1">?</kbd> or <kbd className="font-mono text-xs border border-slate-200 dark:border-slate-700 rounded px-1">Esc</kbd> to close
          </p>
        </div>
      </div>
    </div>
  )
}
