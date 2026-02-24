import SectionWrapper, { SubSection, Preview } from '../components/SectionWrapper'
import CodeBlock from '../components/CodeBlock'
import TipBox from '../components/TipBox'

export default function Customization() {
  return (
    <SectionWrapper
      id="customization"
      badge="Chapter 13"
      title="Customization & Arbitrary Values"
      description="Extend the design system in tailwind.config.js or escape the scale with bracket notation for pixel-perfect one-offs."
    >
      {/* Extend config */}
      <SubSection title="Extending the Design System">
        <CodeBlock language="js" filename="tailwind.config.js" code={`// tailwind.config.js
export default {
  theme: {
    extend: {
      // Custom color palette
      colors: {
        brand: {
          50:  '#f0f9ff',
          500: '#0ea5e9',
          900: '#0c4a6e',
        },
      },

      // Custom fonts
      fontFamily: {
        display: ['"Inter"', 'sans-serif'],
        mono:    ['"Fira Code"', 'monospace'],
      },

      // Custom spacing
      spacing: {
        '4.5': '1.125rem',   // 18px — fills gap between 4 and 5
        '128': '32rem',
      },

      // Custom breakpoints
      screens: {
        'xs': '480px',
        '3xl': '1920px',
      },

      // Custom border radius
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
    },
  },
}`} />
        <Preview>
          <div className="space-y-4">
            <div>
              <p className="text-xs font-mono text-slate-400 mb-2">Custom brand colors (defined in this project):</p>
              <div className="flex gap-2">
                {[50,100,200,300,400,500,600,700,800,900].map(s => (
                  <div key={s} className="flex-1 rounded-lg overflow-hidden">
                    <div className={`bg-brand-${s} h-8`}></div>
                    <p className="text-[9px] text-center text-slate-400 mt-0.5">{s}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="font-display text-sm font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-lg">
                font-display → Inter
              </span>
              <span className="font-mono text-sm text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-lg">
                font-mono → Fira Code
              </span>
            </div>
          </div>
        </Preview>
      </SubSection>

      {/* Arbitrary values */}
      <SubSection title="Arbitrary Values — [value] Bracket Notation">
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
          When you need a value that doesn&apos;t exist in Tailwind&apos;s scale, use bracket notation.
          The JIT engine generates that class on demand — no custom CSS needed.
        </p>
        <CodeBlock code={`<!-- Arbitrary size -->
<div className="w-[327px] h-[42px]">Exact dimensions</div>

<!-- Arbitrary color -->
<div className="bg-[#1da1f2] text-[#ffffff]">Twitter blue</div>
<div className="text-[rgb(147,51,234)]">RGB color</div>

<!-- Arbitrary spacing -->
<div className="mt-[23px] px-[13px]">Odd spacing</div>

<!-- Arbitrary grid -->
<div className="grid-cols-[1fr_2fr_1fr]">Custom columns</div>

<!-- Arbitrary cubic-bezier -->
<div className="transition ease-[cubic-bezier(0.4,0,0.2,1)]">...</div>

<!-- CSS variables -->
<div className="bg-[var(--brand-color)]">CSS variable</div>

<!-- Arbitrary selector (rare) -->
<div className="[&:nth-child(3)]:bg-sky-100">Third child</div>
<div className="[&>span]:text-sky-500">Direct span children</div>`} />
        <Preview>
          <div className="flex flex-wrap gap-3">
            <div className="w-[200px] h-[60px] bg-[#1da1f2] rounded-xl flex items-center justify-center text-white text-xs font-bold shadow-md">
              w-[200px] h-[60px] bg-[#1da1f2]
            </div>
            <div className="px-[20px] py-[11px] bg-[#7c3aed] text-white text-xs font-bold rounded-[20px] shadow">
              px-[20px] py-[11px] rounded-[20px]
            </div>
            <div className="text-[22px] font-bold leading-[1.1] text-[#0f172a] dark:text-white">
              text-[22px] leading-[1.1]
            </div>
          </div>
        </Preview>
        <TipBox type="warning">
          Arbitrary values are powerful but should be used sparingly. If you find yourself using the same value repeatedly,
          add it to <code className="font-mono text-xs bg-slate-100 dark:bg-slate-700 px-1 py-0.5 rounded">tailwind.config.js</code> instead
          to keep your design system consistent.
        </TipBox>
      </SubSection>

      {/* @apply */}
      <SubSection title="@apply — Composing Utilities in CSS">
        <CodeBlock language="css" filename="index.css" code={`/* Use @apply to create component classes */
@layer components {
  .btn {
    @apply inline-flex items-center justify-center px-4 py-2 rounded-lg
           font-semibold text-sm transition-all duration-200
           focus:outline-none focus:ring-2 focus:ring-offset-2;
  }

  .btn-primary {
    @apply btn bg-sky-500 text-white hover:bg-sky-600
           focus:ring-sky-500 active:scale-95 shadow-sm;
  }

  .btn-ghost {
    @apply btn bg-transparent text-slate-600 hover:bg-slate-100
           focus:ring-slate-300 dark:text-slate-400 dark:hover:bg-slate-800;
  }

  .card {
    @apply bg-white dark:bg-slate-800 rounded-2xl border
           border-slate-200 dark:border-slate-700 shadow-sm p-6;
  }
}`} />
        <Preview>
          <div className="flex flex-wrap gap-3 items-center">
            <button className="inline-flex items-center justify-center px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-sky-500 text-white hover:bg-sky-600 focus:ring-sky-500 active:scale-95 shadow-sm">
              .btn-primary
            </button>
            <button className="inline-flex items-center justify-center px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-transparent text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:ring-slate-300 border border-slate-200 dark:border-slate-700">
              .btn-ghost
            </button>
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-4 text-sm text-slate-700 dark:text-slate-300 font-medium">
              .card component
            </div>
          </div>
        </Preview>
        <TipBox type="best">
          Prefer Tailwind utilities in JSX over <code className="font-mono text-xs bg-slate-100 dark:bg-slate-700 px-1 py-0.5 rounded">@apply</code> in most cases.
          Use <code className="font-mono text-xs bg-slate-100 dark:bg-slate-700 px-1 py-0.5 rounded">@apply</code> only for true foundational components (buttons, inputs)
          that are used hundreds of times across the codebase.
        </TipBox>
      </SubSection>

      {/* Plugins */}
      <SubSection title="Official Plugins">
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { name:'@tailwindcss/typography', desc:'Adds prose class for beautiful article/blog text styling with sensible defaults.', example:'<article className="prose lg:prose-xl dark:prose-invert">' },
            { name:'@tailwindcss/forms',      desc:'Resets form element styles to make them easy to override with utilities.', example:'<input type="text" className="rounded-lg border-slate-300">' },
            { name:'@tailwindcss/aspect-ratio', desc:'Provides aspect-ratio utilities (now built-in in Tailwind v3.4+).', example:'<div className="aspect-video">' },
            { name:'@tailwindcss/container-queries', desc:'Style elements based on their container size instead of viewport.', example:'<div className="@container"><p className="@lg:text-xl">' },
          ].map(({name,desc,example}) => (
            <div key={name} className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 overflow-hidden shadow-sm">
              <div className="px-4 py-2.5 bg-slate-800 dark:bg-slate-900">
                <p className="text-xs font-mono text-emerald-400">{name}</p>
              </div>
              <div className="p-4">
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-2">{desc}</p>
                <code className="text-[10px] font-mono text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/30 px-2 py-1 rounded block">{example}</code>
              </div>
            </div>
          ))}
        </div>
      </SubSection>
    </SectionWrapper>
  )
}
