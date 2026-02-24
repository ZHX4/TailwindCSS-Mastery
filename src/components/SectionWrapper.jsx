/**
 * SectionWrapper – consistent layout shell for each tutorial section.
 */
export default function SectionWrapper({ id, badge, title, description, children }) {
  return (
    <section id={id} className="scroll-mt-16 py-10">
      {/* Section header */}
      <div className="mb-8">
        {badge && (
          <span className="inline-block mb-3 text-xs font-semibold uppercase tracking-widest
                           px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-900/40
                           text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
            {badge}
          </span>
        )}
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          {title}
        </h2>
        {description && (
          <p className="mt-2 text-base text-slate-500 dark:text-slate-400 max-w-3xl leading-relaxed">
            {description}
          </p>
        )}
        <div className="mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-sky-500 to-violet-500" />
      </div>

      {children}
    </section>
  )
}

/**
 * SubSection – a topic card within a section.
 */
export function SubSection({ title, children }) {
  return (
    <div className="mb-10 rounded-2xl border border-slate-200 dark:border-slate-700
                    bg-white dark:bg-slate-800/60 shadow-sm overflow-hidden">
      <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">{title}</h3>
      </div>
      <div className="p-6">{children}</div>
    </div>
  )
}

/**
 * Preview – rendered-output box.
 */
export function Preview({ children, className = '' }) {
  return (
    <div className={`my-4 p-6 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700
                     bg-slate-50 dark:bg-slate-900/50 ${className}`}>
      <div className="text-xs text-slate-400 dark:text-slate-600 font-mono mb-3 uppercase tracking-wide">
        ▶ rendered output
      </div>
      {children}
    </div>
  )
}
