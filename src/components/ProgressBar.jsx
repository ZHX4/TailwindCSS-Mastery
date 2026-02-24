import { useState, useEffect } from 'react'

/**
 * ProgressBar – thin gradient bar pinned to the very bottom of the sticky header.
 * Fills from left to right as the user scrolls through the page.
 */
export default function ProgressBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const scrolled = window.scrollY
      const total    = document.documentElement.scrollHeight - window.innerHeight
      setProgress(total > 0 ? Math.min(100, (scrolled / total) * 100) : 0)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
      className="fixed top-14 left-0 right-0 z-10 h-0.5
                 bg-slate-200/40 dark:bg-slate-800/40"
    >
      <div
        className="h-full bg-gradient-to-r from-sky-500 via-violet-500 to-purple-500
                   transition-[width] duration-75 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
