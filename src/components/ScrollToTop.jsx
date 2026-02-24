import { useState, useEffect } from 'react'

/**
 * ScrollToTop – floating action button that appears after scrolling 400px.
 * Smoothly returns the user to the top on click.
 */
export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const handleClick = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <button
      onClick={handleClick}
      aria-label="Scroll to top"
      className={`
        fixed bottom-6 right-6 z-40
        w-10 h-10 rounded-full shadow-lg
        bg-white dark:bg-slate-800
        border border-slate-200 dark:border-slate-700
        text-slate-600 dark:text-slate-300
        hover:bg-brand-500 hover:text-white hover:border-brand-500
        hover:shadow-brand-500/30 hover:shadow-xl
        dark:hover:bg-brand-500 dark:hover:text-white dark:hover:border-brand-500
        flex items-center justify-center
        transition-all duration-200
        ${visible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'}
      `}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  )
}
