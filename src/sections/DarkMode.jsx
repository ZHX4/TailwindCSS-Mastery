import { useState } from 'react'
import SectionWrapper, { SubSection, Preview } from '../components/SectionWrapper'
import CodeBlock from '../components/CodeBlock'
import TipBox from '../components/TipBox'

export default function DarkMode() {
  const [isDark, setIsDark] = useState(false)

  return (
    <SectionWrapper
      id="dark-mode"
      badge="Chapter 10"
      title="Dark Mode"
      description="Tailwind's dark: variant applies styles only when dark mode is active. Configure 'class' strategy in tailwind.config.js for full programmatic control."
    >
      {/* Configuration */}
      <SubSection title="Configuration — class vs media strategy">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Media strategy (OS-based)</p>
            <CodeBlock language="js" filename="tailwind.config.js" code={`// tailwind.config.js
export default {
  // Uses @media (prefers-color-scheme: dark)
  // Automatically follows OS setting
  darkMode: 'media',
  // ...
}`} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Class strategy (manual toggle)</p>
            <CodeBlock language="js" filename="tailwind.config.js" code={`// tailwind.config.js
export default {
  // Applies dark: when .dark class on <html>
  // Perfect for React toggle switches
  darkMode: 'class',
  // ...
}`} />
          </div>
        </div>
        <TipBox type="best">
          Use <code className="font-mono text-xs bg-slate-100 dark:bg-slate-700 px-1 py-0.5 rounded">darkMode: 'class'</code> for
          most apps — it gives you full programmatic control (store preference in localStorage).
          This project already uses class strategy.
        </TipBox>
      </SubSection>

      {/* Usage */}
      <SubSection title="dark: Variant Usage">
        <CodeBlock code={`<!-- Add dark: prefix to any utility -->
<div className="
  bg-white text-slate-900         <!-- light mode -->
  dark:bg-slate-900 dark:text-white  <!-- dark mode -->
  p-6 rounded-xl
">
  Adapts to dark mode
</div>

<!-- Toggle dark mode in React -->
const [dark, setDark] = useState(false)

useEffect(() => {
  document.documentElement.classList.toggle('dark', dark)
}, [dark])

<button onClick={() => setDark(d => !d)}>
  Toggle Dark Mode
</button>`} />
        <div className="my-4">
          <button
            onClick={() => setIsDark(d => !d)}
            className="px-4 py-2 bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 rounded-lg text-sm font-semibold hover:bg-slate-700 dark:hover:bg-slate-300 transition-colors shadow-sm"
          >
            {isDark ? '☀️ Switch to Light' : '🌙 Switch to Dark'} (Preview only)
          </button>
        </div>
        <Preview>
          <div className={`${isDark ? 'dark' : ''} rounded-xl overflow-hidden`}>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Dashboard</h3>
                <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 font-semibold">● Online</span>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  {label:'Users',   val:'12.4k', color:'sky'},
                  {label:'Revenue', val:'$8.2k', color:'emerald'},
                  {label:'Growth',  val:'+24%',  color:'violet'},
                ].map(({label,val,color}) => (
                  <div key={label} className={`bg-${color}-50 dark:bg-${color}-900/30 border border-${color}-100 dark:border-${color}-800 rounded-lg p-3`}>
                    <p className={`text-xs text-${color}-600 dark:text-${color}-400 font-medium`}>{label}</p>
                    <p className={`text-lg font-bold text-${color}-700 dark:text-${color}-300 mt-0.5`}>{val}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                This card adapts automatically to light/dark mode using <code className="font-mono text-xs bg-slate-100 dark:bg-slate-700 px-1 rounded">dark:</code> variants.
              </p>
            </div>
          </div>
        </Preview>
      </SubSection>

      {/* Toggle implementation */}
      <SubSection title="Real-world Toggle Implementation">
        <CodeBlock language="jsx" filename="ThemeToggle.jsx" code={`import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const [dark, setDark] = useState(
    () => localStorage.getItem('theme') === 'dark'
       || (!('theme' in localStorage)
          && window.matchMedia('(prefers-color-scheme: dark)').matches)
  )

  useEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [dark])

  return (
    <button
      onClick={() => setDark(d => !d)}
      className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800
                 text-slate-600 dark:text-slate-400
                 hover:bg-slate-200 dark:hover:bg-slate-700
                 transition-colors"
      aria-label="Toggle dark mode"
    >
      {dark ? '☀️' : '🌙'}
    </button>
  )
}`} />
      </SubSection>
    </SectionWrapper>
  )
}
