import SectionWrapper, { SubSection, Preview } from '../components/SectionWrapper'
import CodeBlock from '../components/CodeBlock'
import TipBox from '../components/TipBox'

export default function States() {
  return (
    <SectionWrapper
      id="states"
      badge="Chapter 11"
      title="State Variants"
      description="Tailwind's variant modifiers let you style elements based on interactive states, relation to other elements, and form validation states."
    >
      {/* hover / focus / active */}
      <SubSection title="hover:, focus:, active:, disabled:">
        <CodeBlock code={`<button
  className="
    px-4 py-2 rounded-lg text-white font-semibold
    bg-sky-500
    hover:bg-sky-600        /* hover state */
    focus:outline-none
    focus:ring-2 focus:ring-sky-400 focus:ring-offset-2
    active:scale-95          /* press effect */
    disabled:opacity-50 disabled:cursor-not-allowed
    transition-all
  "
>
  Click me
</button>

<!-- Hover to reveal -->
<div className="group relative">
  <img className="..." />
  <div className="
    absolute inset-0 bg-black/60
    opacity-0 hover:opacity-100
    transition-opacity
    flex items-center justify-center text-white
  ">
    View Details
  </div>
</div>`} />
        <Preview>
          <div className="flex flex-wrap gap-4">
            {/* Basic hover */}
            <button className="px-5 py-2.5 rounded-lg text-white font-semibold bg-sky-500 hover:bg-sky-600 active:scale-95 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 transition-all shadow-sm">
              hover:bg-sky-600
            </button>
            {/* Scale on hover */}
            <button className="px-5 py-2.5 rounded-lg text-white font-semibold bg-violet-500 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 transition-transform shadow-sm">
              hover:scale-105
            </button>
            {/* Shadow on hover */}
            <button className="px-5 py-2.5 rounded-lg font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 hover:shadow-lg hover:border-sky-300 dark:hover:border-sky-600 active:scale-95 focus:outline-none focus:ring-2 focus:ring-slate-300 transition-all">
              hover:shadow-lg
            </button>
            {/* Disabled */}
            <button disabled className="px-5 py-2.5 rounded-lg text-white font-semibold bg-slate-400 opacity-50 cursor-not-allowed">
              disabled
            </button>
          </div>
        </Preview>
      </SubSection>

      {/* group */}
      <SubSection title="group — Parent-Based Hover">
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
          Add <code className="font-mono text-xs bg-slate-100 dark:bg-slate-700 px-1 rounded">group</code> to a parent and use{' '}
          <code className="font-mono text-xs bg-slate-100 dark:bg-slate-700 px-1 rounded">group-hover:</code> on any child to trigger styles when <em>the parent</em> is hovered.
        </p>
        <CodeBlock code={`<div className="group flex items-center gap-4 p-4
                  bg-white border border-slate-200 rounded-xl
                  hover:bg-sky-50 hover:border-sky-200
                  transition-colors cursor-pointer">
  <div className="w-10 h-10 rounded-lg bg-slate-100
                  group-hover:bg-sky-500 transition-colors
                  flex items-center justify-center">
    📁
  </div>
  <div>
    <p className="font-semibold text-slate-800">Documents</p>
    <p className="text-sm text-slate-400 group-hover:text-sky-500 transition-colors">
      12 files
    </p>
  </div>
  <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-sky-500">
    →
  </span>
</div>`} />
        <Preview>
          <div className="space-y-2">
            {[
              {icon:'📁', title:'Documents',  sub:'12 files'},
              {icon:'🖼️', title:'Images',     sub:'48 files'},
              {icon:'🎵', title:'Music',      sub:'156 tracks'},
            ].map(({icon,title,sub}) => (
              <div key={title} className="group flex items-center gap-4 p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-sky-50 dark:hover:bg-sky-950/30 hover:border-sky-200 dark:hover:border-sky-800 transition-all cursor-pointer shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-700 group-hover:bg-sky-500 transition-colors flex items-center justify-center text-lg flex-shrink-0">
                  {icon}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-slate-800 dark:text-slate-100">{title}</p>
                  <p className="text-sm text-slate-400 group-hover:text-sky-500 transition-colors">{sub}</p>
                </div>
                <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-sky-500 font-bold flex-shrink-0">→</span>
              </div>
            ))}
          </div>
        </Preview>
      </SubSection>

      {/* peer */}
      <SubSection title="peer — Sibling-Based State">
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
          Add <code className="font-mono text-xs bg-slate-100 dark:bg-slate-700 px-1 rounded">peer</code> to an input and use{' '}
          <code className="font-mono text-xs bg-slate-100 dark:bg-slate-700 px-1 rounded">peer-checked:</code>,{' '}
          <code className="font-mono text-xs bg-slate-100 dark:bg-slate-700 px-1 rounded">peer-focus:</code>, etc. on later siblings.
        </p>
        <CodeBlock code={`<!-- Floating label input -->
<div className="relative">
  <input
    id="email"
    placeholder=" "
    className="peer block w-full px-4 pt-6 pb-2 rounded-lg border
               border-slate-300 focus:border-sky-500 focus:ring-1
               focus:ring-sky-500 focus:outline-none transition-colors"
  />
  <label
    htmlFor="email"
    className="absolute left-4 top-4 text-slate-400 text-sm
               transition-all
               peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm
               peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-sky-600
               peer-not-placeholder-shown:top-1.5 peer-not-placeholder-shown:text-xs"
  >
    Email address
  </label>
</div>`} />
        <Preview>
          <div className="max-w-sm space-y-4">
            {/* Custom checkbox */}
            <p className="text-xs text-slate-400 font-mono mb-2">peer-checked toggle:</p>
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input type="checkbox" className="peer sr-only" />
              <div className="w-11 h-6 rounded-full bg-slate-200 dark:bg-slate-700 peer-checked:bg-sky-500 transition-colors relative">
                <div className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5"></div>
              </div>
              <span className="text-sm text-slate-600 dark:text-slate-300 peer-checked:text-sky-600 dark:peer-checked:text-sky-400 font-medium transition-colors">
                Enable notifications
              </span>
            </label>
          </div>
        </Preview>
        <TipBox type="note">
          <code className="font-mono text-xs bg-slate-100 dark:bg-slate-700 px-1 py-0.5 rounded">peer</code> only works on
          <strong> following siblings</strong> in HTML order.
          Use named peers (<code className="font-mono text-xs bg-slate-100 dark:bg-slate-700 px-1 py-0.5 rounded">peer/name</code>,{' '}
          <code className="font-mono text-xs bg-slate-100 dark:bg-slate-700 px-1 py-0.5 rounded">peer-checked/name</code>) when managing multiple sibling relationships.
        </TipBox>
      </SubSection>
    </SectionWrapper>
  )
}
