import { useState } from 'react'
import SectionWrapper, { SubSection, Preview } from '../components/SectionWrapper'
import CodeBlock from '../components/CodeBlock'
import TipBox from '../components/TipBox'

export default function Transitions() {
  const [expanded, setExpanded] = useState(false)
  const [rotated, setRotated] = useState(false)

  return (
    <SectionWrapper
      id="transitions"
      badge="Chapter 12"
      title="Transitions & Animations"
      description="Tailwind ships with transition-*, duration-*, ease-*, delay-*, and a set of keyframe animations like animate-spin, animate-bounce, animate-pulse, and animate-ping."
    >
      {/* Transitions */}
      <SubSection title="transition-* — Smooth State Changes">
        <CodeBlock code={`<!-- Transition all properties -->
<button className="bg-sky-500 hover:bg-sky-600
                   transition-all duration-200">
  Smooth
</button>

<!-- Select what to transition -->
<div className="transition-colors duration-300 ease-in-out">...</div>
<div className="transition-transform duration-500 ease-out">...</div>
<div className="transition-opacity duration-200">...</div>

<!-- Duration values -->
<!-- duration-75, 100, 150, 200, 300, 500, 700, 1000 -->

<!-- Easing values -->
<!-- ease-linear, ease-in, ease-out, ease-in-out -->`} />
        <Preview>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              {cls:'transition-colors duration-300 bg-slate-200 hover:bg-sky-500 text-slate-700 hover:text-white',     label:'colors 300ms'},
              {cls:'transition-transform duration-300 hover:scale-110 bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-700',  label:'scale 300ms'},
              {cls:'transition-shadow duration-300 shadow-sm hover:shadow-xl bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600',        label:'shadow 300ms'},
              {cls:'transition-all duration-500 ease-in-out bg-emerald-100 dark:bg-emerald-900/40 hover:bg-emerald-500 hover:text-white hover:scale-105 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700', label:'all 500ms'},
              {cls:'transition-all duration-150 ease-in bg-amber-100 dark:bg-amber-900/40 hover:bg-amber-500 hover:text-white text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-700', label:'ease-in 150ms'},
              {cls:'transition-all duration-700 ease-out bg-rose-100 dark:bg-rose-900/40 hover:bg-rose-500 hover:text-white text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-700', label:'ease-out 700ms'},
            ].map(({cls,label}) => (
              <div key={label} className={`${cls} text-xs font-semibold text-center px-3 py-4 rounded-xl cursor-default`}>
                {label}
              </div>
            ))}
          </div>
        </Preview>
      </SubSection>

      {/* Transform */}
      <SubSection title="Transform Utilities — translate, rotate, scale, skew">
        <CodeBlock code={`<div className="hover:translate-x-2">Slide right</div>
<div className="hover:-translate-y-1">Lift up</div>
<div className="hover:scale-110">Scale up</div>
<div className="hover:scale-x-125">Stretch horizontal</div>
<div className="hover:rotate-12">Rotate 12°</div>
<div className="hover:-rotate-6">Rotate -6°</div>
<div className="hover:skew-x-3">Skew</div>

<!-- Combine transforms -->
<button className="hover:-translate-y-1 hover:scale-105 hover:shadow-lg transition-all">
  Lift and scale
</button>`} />
        <Preview>
          <div className="flex flex-wrap gap-4 items-center p-4">
            {[
              {cls:'hover:translate-x-3',    label:'→ translate-x'},
              {cls:'hover:-translate-y-3',   label:'↑ translate-y'},
              {cls:'hover:scale-125',         label:'⊕ scale'},
              {cls:'hover:rotate-12',         label:'↻ rotate-12'},
              {cls:'hover:-rotate-6',         label:'↺ -rotate-6'},
              {cls:'hover:skew-x-6',          label:'⊘ skew-x'},
            ].map(({cls,label}) => (
              <div key={label} className={`${cls} transition-transform duration-300 bg-gradient-to-br from-sky-100 to-violet-100 dark:from-sky-900/30 dark:to-violet-900/30 border border-sky-200 dark:border-sky-800 text-slate-700 dark:text-slate-200 text-xs font-mono font-semibold px-3 py-3 rounded-xl cursor-default`}>
                {label}
              </div>
            ))}
          </div>
          <div className="mt-4">
            <button
              onClick={() => setExpanded(e => !e)}
              className="px-5 py-2.5 bg-sky-500 text-white rounded-lg font-semibold text-sm hover:-translate-y-1 hover:scale-105 hover:shadow-xl hover:shadow-sky-500/30 active:scale-95 transition-all duration-200"
            >
              Hover for lift + scale ✨
            </button>
          </div>
        </Preview>
      </SubSection>

      {/* Built-in animations */}
      <SubSection title="Built-in Animations — animate-*">
        <CodeBlock code={`<div className="animate-spin">Loading spinner</div>
<div className="animate-bounce">Bouncing arrow</div>
<div className="animate-pulse">Skeleton loader</div>
<div className="animate-ping">Notification dot</div>

<!-- Pause animation on hover -->
<div className="animate-spin hover:animate-none">...</div>

<!-- Combined with custom keyframes (in tailwind.config.js) -->
<div className="animate-fade-in">Fade in on mount</div>`} />
        <Preview>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Spin */}
            <div className="flex flex-col items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <div className="w-10 h-10 rounded-full border-4 border-sky-200 border-t-sky-500 animate-spin"></div>
              <p className="text-xs font-mono text-slate-500">animate-spin</p>
            </div>
            {/* Bounce */}
            <div className="flex flex-col items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <div className="w-4 h-6 bg-violet-500 rounded animate-bounce"></div>
              <p className="text-xs font-mono text-slate-500">animate-bounce</p>
            </div>
            {/* Pulse */}
            <div className="flex flex-col items-center justify-center gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <div className="w-full space-y-2">
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-3/4"></div>
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-1/2"></div>
              </div>
              <p className="text-xs font-mono text-slate-500">animate-pulse</p>
            </div>
            {/* Ping */}
            <div className="flex flex-col items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <div className="relative w-10 h-10">
                <div className="w-4 h-4 bg-emerald-500 rounded-full absolute top-3 left-3"></div>
                <div className="w-4 h-4 bg-emerald-400 rounded-full absolute top-3 left-3 animate-ping opacity-75"></div>
              </div>
              <p className="text-xs font-mono text-slate-500">animate-ping</p>
            </div>
          </div>
        </Preview>

        <TipBox type="tip">
          Use <code className="font-mono text-xs bg-slate-100 dark:bg-slate-700 px-1 py-0.5 rounded">animate-pulse</code> for skeleton loading states instead of spinner icons —
          it gives users a better sense of content layout while data loads.
        </TipBox>
      </SubSection>

      {/* Custom keyframes */}
      <SubSection title="Custom Animations via tailwind.config.js">
        <CodeBlock language="js" filename="tailwind.config.js" code={`// tailwind.config.js
export default {
  theme: {
    extend: {
      animation: {
        'fade-in':   'fadeIn 0.5s ease-out',
        'slide-up':  'slideUp 0.4s ease-out',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)',    opacity: '1' },
        },
      },
    },
  },
}`} />
        <Preview>
          <div
            key={rotated}
            className="flex flex-wrap gap-4 animate-fade-in"
          >
            {['animate-fade-in','animate-slide-up'].map(cls => (
              <div key={cls} className={`${cls} bg-gradient-to-r from-sky-500 to-violet-500 text-white text-xs font-mono font-semibold px-4 py-3 rounded-xl shadow-md`}>
                .{cls}
              </div>
            ))}
            <button onClick={() => setRotated(r => !r)} className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-3 py-2 rounded-lg font-semibold hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
              ↺ Replay
            </button>
          </div>
        </Preview>
      </SubSection>
    </SectionWrapper>
  )
}
