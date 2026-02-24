import SectionWrapper, { SubSection, Preview } from '../components/SectionWrapper'
import CodeBlock from '../components/CodeBlock'
import TipBox from '../components/TipBox'

const breakpoints = [
  { prefix: 'sm',  min: '640px',   desc: 'Small screens (tablet portrait)' },
  { prefix: 'md',  min: '768px',   desc: 'Medium screens (tablet landscape)' },
  { prefix: 'lg',  min: '1024px',  desc: 'Large screens (desktop)' },
  { prefix: 'xl',  min: '1280px',  desc: 'XL screens (large desktop)' },
  { prefix: '2xl', min: '1536px',  desc: '2XL screens (ultra-wide)' },
]

export default function Responsive() {
  return (
    <SectionWrapper
      id="responsive"
      badge="Chapter 9"
      title="Responsive Design"
      description="Tailwind uses a mobile-first breakpoint system. Apply any utility at a specific screen size by prefixing it with the breakpoint name (e.g., md:text-xl)."
    >
      {/* Breakpoints */}
      <SubSection title="Breakpoint Reference">
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
          Tailwind is <strong>mobile-first</strong> — unprefixed utilities apply to all screen sizes, and breakpoint prefixes apply <em>at that size and above</em>.
        </p>
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700">
                <th className="text-left px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Prefix</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Min-width</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">CSS</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Use case</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              <tr className="bg-white dark:bg-slate-900">
                <td className="px-4 py-3 font-mono text-slate-500 dark:text-slate-400">(none)</td>
                <td className="px-4 py-3 font-mono text-slate-600 dark:text-slate-300">0px</td>
                <td className="px-4 py-3 font-mono text-xs text-slate-500">—</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">All screens / mobile baseline</td>
              </tr>
              {breakpoints.map(bp => (
                <tr key={bp.prefix} className="bg-white dark:bg-slate-900">
                  <td className="px-4 py-3 font-mono font-semibold text-sky-600 dark:text-sky-400">{bp.prefix}:</td>
                  <td className="px-4 py-3 font-mono text-slate-600 dark:text-slate-300">{bp.min}</td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-500">@media (min-width: {bp.min})</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{bp.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SubSection>

      {/* Basic usage */}
      <SubSection title="How Responsive Prefixes Work">
        <CodeBlock code={`<!-- Mobile-first: start with mobile, layer up -->
<div className="
  text-sm          <!-- all screens -->
  md:text-base     <!-- md (768px) and up -->
  lg:text-lg       <!-- lg (1024px) and up -->
">
  Responsive text
</div>

<!-- Grid: 1 col → 2 col → 4 col -->
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  ...
</div>

<!-- Show/hide elements -->
<div className="block md:hidden">Mobile only</div>
<div className="hidden md:block">Desktop only</div>

<!-- Stack → side-by-side at md -->
<div className="flex flex-col md:flex-row gap-4">
  <aside className="md:w-64">Sidebar</aside>
  <main className="flex-1">Content</main>
</div>`} />
        <Preview>
          <div>
            <p className="text-xs text-slate-500 mb-3 italic">Resize the browser window to see the layout change:</p>
            <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-3 overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {['Home','About','Projects','Contact'].map((item, i) => (
                  <div key={item} className={`p-4 rounded-lg text-white text-sm font-semibold text-center ${
                    ['bg-sky-500','bg-violet-500','bg-emerald-500','bg-rose-500'][i]
                  }`}>
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-3 flex flex-col sm:flex-row gap-3">
                <div className="sm:w-48 bg-amber-100 dark:bg-amber-900/40 border border-amber-200 dark:border-amber-800 rounded-lg p-3 text-xs font-semibold text-amber-700 dark:text-amber-300">
                  Sidebar (sm: w-48)
                </div>
                <div className="flex-1 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg p-3 text-xs font-semibold text-slate-600 dark:text-slate-300">
                  Main content (flex-1)
                </div>
              </div>
            </div>
          </div>
        </Preview>
        <TipBox type="best">
          Always design mobile-first — start with the smallest layout, then progressively enhance for larger screens.
          This results in leaner CSS than desktop-first approaches.
        </TipBox>
      </SubSection>

      {/* Container */}
      <SubSection title="container — Responsive Centering Wrapper">
        <CodeBlock code={`<!-- The container utility sets max-width per breakpoint -->
<div className="container mx-auto px-4">
  <!-- Content constrained to breakpoint max-width, centered -->
</div>

<!-- In tailwind.config.js — enable center + padding by default -->
// theme: {
//   container: {
//     center: true,
//     padding: '1rem',
//   }
// }`} />
        <Preview>
          <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-2 overflow-hidden text-xs font-mono text-slate-500 dark:text-slate-400">
            <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-2 text-center">
              <span className="text-slate-400">viewport</span>
              <div className="mt-2 mx-auto max-w-md border-2 border-sky-400 rounded p-2 text-center bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-300">
                container mx-auto (max-width: breakpoint)
              </div>
            </div>
          </div>
        </Preview>
      </SubSection>
    </SectionWrapper>
  )
}
