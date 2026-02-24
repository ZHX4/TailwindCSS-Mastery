/**
 * Sidebar – fixed navigation panel listing all tutorial sections.
 * Accepts a `visited` Set to show per-section completion checkmarks.
 */
const sections = [
  { id: 'introduction',   label: 'Introduction',      icon: '🚀', badge: 'Start' },
  { id: 'typography',     label: 'Typography',        icon: '✏️', badge: '1' },
  { id: 'colors',         label: 'Colors',            icon: '🎨', badge: '2' },
  { id: 'spacing',        label: 'Spacing',           icon: '📐', badge: '3' },
  { id: 'flexbox',        label: 'Flexbox',           icon: '🔲', badge: '4' },
  { id: 'grid',           label: 'CSS Grid',          icon: '⊞',  badge: '5' },
  { id: 'sizing',         label: 'Sizing',            icon: '↔️', badge: '6' },
  { id: 'borders',        label: 'Borders & Rings',   icon: '⬡',  badge: '7' },
  { id: 'shadows',        label: 'Shadows & Filters', icon: '💧', badge: '8' },
  { id: 'responsive',     label: 'Responsive',        icon: '📱', badge: '9' },
  { id: 'dark-mode',      label: 'Dark Mode',         icon: '🌙', badge: '10' },
  { id: 'states',         label: 'State Variants',    icon: '✨', badge: '11' },
  { id: 'transitions',    label: 'Transitions',       icon: '🎬', badge: '12' },
  { id: 'customization',  label: 'Customization',     icon: '🔧', badge: '13' },
]

export default function Sidebar({ active, onSelect, isOpen, onClose, visited = new Set() }) {
  const total      = sections.length
  const visitedCount = sections.filter(s => visited.has(s.id)).length
  const pct        = Math.round((visitedCount / total) * 100)
  const allDone    = visitedCount === total

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <aside className={`
        fixed top-0 left-0 h-full z-30 w-64
        bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800
        flex flex-col shadow-xl
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:shadow-none
      `}>
        {/* Logo / header */}
        <div className="flex items-center justify-between px-4 py-5 border-b border-slate-200 dark:border-slate-800 flex-shrink-0">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="TailwindCSS Mastery" className="w-8 h-8 rounded-lg shadow-sm" />
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white leading-none">TailwindCSS</p>
              <p className="text-xs text-brand-500 font-semibold leading-none mt-0.5">Mastery</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Progress strip */}
        <div className="px-4 pt-3 pb-2 flex-shrink-0">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-600">
              Progress
            </span>
            <span className={`text-[11px] font-bold tabular-nums ${allDone ? 'text-emerald-500' : 'text-brand-500'}`}>
              {allDone ? '🎉 Done!' : `${visitedCount} / ${total}`}
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ease-out ${allDone ? 'bg-emerald-500' : 'bg-gradient-to-r from-brand-500 to-violet-500'}`}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto py-2 px-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-600 px-2 mb-2">
            Chapters
          </p>
          <ul className="space-y-0.5">
            {sections.map(s => {
              const isActive   = active === s.id
              const isVisited  = visited.has(s.id)
              return (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      onSelect(s.id)
                      onClose()
                      document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }}
                    className={`nav-pill ${isActive ? 'active' : ''} relative`}
                  >
                    <span className="text-base leading-none w-5 flex-shrink-0">{s.icon}</span>
                    <span className="flex-1 truncate">{s.label}</span>

                    {/* Visited checkmark or badge */}
                    {isVisited && !isActive
                      ? (
                        <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                      )
                      : (
                        <span className={`text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500'
                        }`}>
                          {s.badge}
                        </span>
                      )
                    }
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-800 flex-shrink-0">
          <p className="text-xs text-slate-400 dark:text-slate-600 text-center">
            Built with React + Vite + Tailwind v3
          </p>
        </div>
      </aside>
    </>
  )
}

export { sections }
