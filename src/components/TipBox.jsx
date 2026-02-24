/**
 * TipBox – callout component for tips, warnings, notes and best practices.
 */
const variants = {
  tip: {
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    border: 'border-emerald-300 dark:border-emerald-700',
    icon: '💡',
    label: 'Tip',
    labelColor: 'text-emerald-700 dark:text-emerald-400',
    textColor: 'text-emerald-900 dark:text-emerald-200',
  },
  warning: {
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    border: 'border-amber-300 dark:border-amber-700',
    icon: '⚠️',
    label: 'Warning',
    labelColor: 'text-amber-700 dark:text-amber-400',
    textColor: 'text-amber-900 dark:text-amber-200',
  },
  note: {
    bg: 'bg-sky-50 dark:bg-sky-950/40',
    border: 'border-sky-300 dark:border-sky-700',
    icon: 'ℹ️',
    label: 'Note',
    labelColor: 'text-sky-700 dark:text-sky-400',
    textColor: 'text-sky-900 dark:text-sky-200',
  },
  best: {
    bg: 'bg-violet-50 dark:bg-violet-950/40',
    border: 'border-violet-300 dark:border-violet-700',
    icon: '⭐',
    label: 'Best Practice',
    labelColor: 'text-violet-700 dark:text-violet-400',
    textColor: 'text-violet-900 dark:text-violet-200',
  },
}

export default function TipBox({ type = 'tip', children }) {
  const v = variants[type] || variants.tip
  return (
    <div className={`my-4 flex gap-3 p-4 rounded-xl border-l-4 ${v.bg} ${v.border}`}>
      <span className="text-lg flex-shrink-0 leading-5 mt-0.5">{v.icon}</span>
      <div>
        <span className={`text-xs font-bold uppercase tracking-wide ${v.labelColor}`}>
          {v.label}
        </span>
        <div className={`mt-1 text-sm leading-relaxed ${v.textColor}`}>{children}</div>
      </div>
    </div>
  )
}
