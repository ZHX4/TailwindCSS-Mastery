import { useEffect, useRef, useState, useCallback } from 'react'
import Sidebar, { sections } from './components/Sidebar'
import SearchModal from './components/SearchModal'
import ProgressBar from './components/ProgressBar'
import ScrollToTop from './components/ScrollToTop'
import KeyboardShortcuts from './components/KeyboardShortcuts'

// Tutorial sections
import Introduction  from './sections/Introduction'
import Typography    from './sections/Typography'
import Colors        from './sections/Colors'
import Spacing       from './sections/Spacing'
import FlexLayout    from './sections/FlexLayout'
import GridLayout    from './sections/GridLayout'
import Sizing        from './sections/Sizing'
import Borders       from './sections/Borders'
import Shadows       from './sections/Shadows'
import Responsive    from './sections/Responsive'
import DarkMode      from './sections/DarkMode'
import States        from './sections/States'
import Transitions   from './sections/Transitions'
import Customization from './sections/Customization'

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [darkMode, setDarkMode]       = useState(() =>
    typeof window !== 'undefined'
      ? localStorage.getItem('theme') === 'dark'
        || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
      : false
  )
  const [activeSection, setActiveSection]     = useState('introduction')
  const [searchOpen, setSearchOpen]           = useState(false)
  const [shortcutsOpen, setShortcutsOpen]     = useState(false)
  const [visitedSections, setVisitedSections] = useState(() => new Set(['introduction']))
  const mainRef = useRef(null)

  // Sync dark mode class on <html>
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  // Global keyboard shortcuts
  useEffect(() => {
    const handler = e => {
      // Ignore when typing in an input / textarea
      const tag = document.activeElement?.tagName
      const inInput = tag === 'INPUT' || tag === 'TEXTAREA' || document.activeElement?.isContentEditable

      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(o => !o)
        return
      }
      if (e.key === 'Escape') {
        setShortcutsOpen(false)
        setSearchOpen(false)
        return
      }
      if (inInput) return
      if (e.key === '?') {
        e.preventDefault()
        setShortcutsOpen(o => !o)
      }
      if (e.key === 'd' || e.key === 'D') {
        setDarkMode(d => !d)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  // Navigate to a section by id
  const navigateToSection = useCallback(id => {
    setActiveSection(id)
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [])

  // Intersection observer — highlight active nav item + mark visited
  useEffect(() => {
    const targets = sections.map(s => document.getElementById(s.id)).filter(Boolean)
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            setActiveSection(e.target.id)
            setVisitedSections(prev => {
              if (prev.has(e.target.id)) return prev
              const next = new Set(prev)
              next.add(e.target.id)
              return next
            })
          }
        })
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    )
    targets.forEach(t => obs.observe(t))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-display">
      {/* Sidebar */}
      <Sidebar
        active={activeSection}
        onSelect={setActiveSection}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        visited={visitedSections}
      />

      {/* Main content area — offset by sidebar on lg */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Sticky top bar */}
        <header className="sticky top-0 z-10 h-14 flex items-center justify-between px-4 sm:px-6
                           bg-white/80 dark:bg-slate-900/80 backdrop-blur-md
                           border-b border-slate-200 dark:border-slate-800">
          {/* Mobile menu button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-slate-100
                       hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Open menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-400 dark:text-slate-500 hidden sm:block">TailwindCSS Mastery</span>
            <span className="text-slate-300 dark:text-slate-600 hidden sm:block">/</span>
            <span className="font-semibold text-slate-700 dark:text-slate-200 capitalize">
              {sections.find(s => s.id === activeSection)?.label ?? 'Introduction'}
            </span>
          </div>

          {/* Right controls: search + dark mode */}
          <div className="flex items-center gap-1">
          {/* Search button */}
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100
                       hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-sm"
            aria-label="Search (Ctrl+K)"
            title="Search (Ctrl+K)"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <kbd className="hidden sm:block text-xs font-mono bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-1.5 py-0.5">⌘K</kbd>
          </button>

          {/* Keyboard shortcuts button — desktop only */}
          <button
            onClick={() => setShortcutsOpen(true)}
            className="hidden lg:block p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200
                       hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Keyboard shortcuts (?)"
            title="Keyboard shortcuts (?)"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <rect x="2" y="6" width="20" height="13" rx="2" strokeLinejoin="round"/>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M8 14h8"/>
            </svg>
          </button>

          {/* Dark mode toggle */}
          <button
            onClick={() => setDarkMode(d => !d)}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100
                       hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            title={darkMode ? 'Light mode' : 'Dark mode'}
          >
            {darkMode
              ? <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            }
          </button>
          </div>
        </header>

        {/* Hero */}
        <div className="relative overflow-hidden bg-gradient-to-br from-sky-600 via-violet-600 to-purple-700 px-6 py-16 sm:py-20">
          {/* Decorative blobs */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/2 translate-y-1/2 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 w-[600px] h-[300px] bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />

          <div className="relative max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold mb-6 backdrop-blur-sm animate-fade-in">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              TailwindCSS v3 · React + Vite
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight animate-slide-up">
              TailwindCSS Mastery
            </h1>
            <p className="mt-4 text-lg text-sky-100 max-w-xl mx-auto leading-relaxed animate-fade-in">
              A comprehensive, hands-on guide — from basic utilities to advanced customization.
              Each concept includes explanation, live code, rendered output & best practices.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center animate-fade-in">
              {['14 Chapters', 'Live Examples', 'Best Practices', 'Copy-Paste Code'].map(tag => (
                <span key={tag} className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium backdrop-blur-sm">
                  {tag}
                </span>
              ))}
            </div>
            <button
              onClick={() => {
                document.getElementById('introduction')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-white text-sky-700 rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
            >
              Start Learning ↓
            </button>
          </div>
        </div>

        {/* Tutorial content */}
        <main ref={mainRef} className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 pb-24">
          <div className="section-divider" />
          <Introduction />
          <div className="section-divider" />
          <Typography />
          <div className="section-divider" />
          <Colors />
          <div className="section-divider" />
          <Spacing />
          <div className="section-divider" />
          <FlexLayout />
          <div className="section-divider" />
          <GridLayout />
          <div className="section-divider" />
          <Sizing />
          <div className="section-divider" />
          <Borders />
          <div className="section-divider" />
          <Shadows />
          <div className="section-divider" />
          <Responsive />
          <div className="section-divider" />
          <DarkMode />
          <div className="section-divider" />
          <States />
          <div className="section-divider" />
          <Transitions />
          <div className="section-divider" />
          <Customization />
          <div className="section-divider" />

          {/* Footer */}
          <footer className="text-center py-12">
            <div className="inline-flex items-center gap-2 mb-3">
              <img src="/logo.svg" alt="TailwindCSS Mastery" className="w-7 h-7 rounded-lg" />
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200">TailwindCSS Mastery</span>
            </div>
            <p className="text-sm text-slate-400 dark:text-slate-500">
              Built with <span className="text-sky-500">React</span> + <span className="text-violet-500">Vite</span> + <span className="text-teal-500">TailwindCSS v3</span>
            </p>
            <p className="text-xs text-slate-300 dark:text-slate-600 mt-2">
              All examples are live and interactive. Check{' '}
              <code className="font-mono text-sky-600 dark:text-sky-400">tailwind.config.js</code>{' '}
              for custom theme extensions.
            </p>
          </footer>
        </main>
      </div>
      </div>

      {/* Floating utilities */}
      <ProgressBar />
      <ScrollToTop />

      {/* Modals */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigate={navigateToSection}
      />
      <KeyboardShortcuts
        isOpen={shortcutsOpen}
        onClose={() => setShortcutsOpen(false)}
      />
    </>
  )
}
