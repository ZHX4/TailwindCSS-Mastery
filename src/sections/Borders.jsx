import SectionWrapper, { SubSection, Preview } from '../components/SectionWrapper'
import CodeBlock from '../components/CodeBlock'
import TipBox from '../components/TipBox'

export default function Borders() {
  return (
    <SectionWrapper
      id="borders"
      badge="Chapter 7"
      title="Borders, Rings & Rounded"
      description="Style element borders with border-*, rounded-*, outline-*, and ring-* (box-shadow rings). These are powerful for focus states and interactive components."
    >
      {/* Border width + color */}
      <SubSection title="Border Width & Color">
        <CodeBlock code={`<!-- Border all sides -->
<div className="border border-slate-300">1px border</div>
<div className="border-2 border-slate-400">2px border</div>
<div className="border-4 border-sky-500">4px border</div>

<!-- Individual sides -->
<div className="border-t-2 border-b-2 border-violet-500">
  Top and bottom only
</div>

<!-- Border color + opacity -->
<div className="border border-sky-500/50">50% opacity border</div>`} />
        <Preview>
          <div className="flex flex-wrap gap-4">
            {[
              {cls:'border border-slate-300 dark:border-slate-600',             label:'border'},
              {cls:'border-2 border-sky-400',                                   label:'border-2 sky'},
              {cls:'border-4 border-violet-500',                                label:'border-4 violet'},
              {cls:'border-4 border-dashed border-emerald-400',                 label:'dashed'},
              {cls:'border-4 border-dotted border-rose-400',                    label:'dotted'},
              {cls:'border-t-4 border-t-sky-500 border-slate-200 dark:border-slate-700', label:'border-t-4'},
            ].map(({cls,label}) => (
              <div key={label} className={`${cls} bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-mono font-semibold px-4 py-3 rounded-lg`}>
                .{label}
              </div>
            ))}
          </div>
        </Preview>
      </SubSection>

      {/* Border radius */}
      <SubSection title="Border Radius — rounded-{size}">
        <CodeBlock code={`<div className="rounded-none">No radius</div>
<div className="rounded-sm">Small (2px)</div>
<div className="rounded">Default (4px)</div>
<div className="rounded-md">Medium (6px)</div>
<div className="rounded-lg">Large (8px)</div>
<div className="rounded-xl">XL (12px)</div>
<div className="rounded-2xl">2XL (16px)</div>
<div className="rounded-3xl">3XL (24px)</div>
<div className="rounded-full">Full circle / pill</div>

<!-- Individual corners -->
<div className="rounded-tl-2xl rounded-br-2xl">Diagonal corners</div>`} />
        <Preview>
          <div className="flex flex-wrap gap-3 items-end">
            {[
              {cls:'rounded-none',   label:'none'},
              {cls:'rounded-sm',     label:'sm'},
              {cls:'rounded',        label:'default'},
              {cls:'rounded-md',     label:'md'},
              {cls:'rounded-lg',     label:'lg'},
              {cls:'rounded-xl',     label:'xl'},
              {cls:'rounded-2xl',    label:'2xl'},
              {cls:'rounded-3xl',    label:'3xl'},
              {cls:'rounded-full',   label:'full'},
            ].map(({cls,label}) => (
              <div key={cls} className={`${cls} w-16 h-16 bg-sky-500 flex items-center justify-center text-white text-[10px] font-bold text-center leading-tight`}>
                {label}
              </div>
            ))}
          </div>
        </Preview>
      </SubSection>

      {/* Ring */}
      <SubSection title="Ring — Focus Rings & Outlines">
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
          The <code className="font-mono text-xs bg-slate-100 dark:bg-slate-700 px-1 rounded">ring-*</code> utilities use{' '}
          <code className="font-mono text-xs bg-slate-100 dark:bg-slate-700 px-1 rounded">box-shadow</code> to create accessible
          focus rings without affecting layout. Perfect for custom form controls and buttons.
        </p>
        <CodeBlock code={`<!-- Focus ring on button -->
<button
  className="px-4 py-2 bg-sky-500 text-white rounded-lg
             focus:outline-none focus:ring-2
             focus:ring-sky-500 focus:ring-offset-2"
>
  Click me
</button>

<!-- Ring sizes -->
<div className="ring-1 ring-slate-300">ring-1</div>
<div className="ring-2 ring-sky-500">ring-2</div>
<div className="ring-4 ring-violet-500 ring-offset-2">ring-4 + offset</div>`} />
        <Preview>
          <div className="flex flex-wrap gap-4 items-center">
            {[
              {ring:'ring-1 ring-slate-400 dark:ring-slate-500',   label:'ring-1'},
              {ring:'ring-2 ring-sky-500',                          label:'ring-2 sky'},
              {ring:'ring-4 ring-violet-500',                       label:'ring-4 violet'},
              {ring:'ring-4 ring-emerald-500 ring-offset-2 ring-offset-white dark:ring-offset-slate-900', label:'ring-4 offset'},
            ].map(({ring,label}) => (
              <div key={label} className={`${ring} bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-mono font-semibold px-4 py-3 rounded-xl`}>
                {label}
              </div>
            ))}
            <button className="px-4 py-2 bg-sky-500 text-white text-sm font-semibold rounded-lg
                               focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2
                               hover:bg-sky-600 transition-colors">
              Focus me ↗
            </button>
          </div>
        </Preview>
        <TipBox type="best">
          Always use <code className="font-mono text-xs bg-slate-100 dark:bg-slate-700 px-1 py-0.5 rounded">focus:ring-2 focus:ring-{'{color}'}</code> on interactive
          elements like buttons and inputs for keyboard accessibility compliance.
        </TipBox>
      </SubSection>

      {/* Divide */}
      <SubSection title="divide-* — Dividers Between Children">
        <CodeBlock code={`<div className="divide-y divide-slate-200">
  <div className="py-3">Row 1</div>
  <div className="py-3">Row 2</div>
  <div className="py-3">Row 3</div>
</div>

<div className="flex divide-x divide-slate-300">
  <div className="px-4">Left</div>
  <div className="px-4">Center</div>
  <div className="px-4">Right</div>
</div>`} />
        <Preview>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              {['Dashboard','Analytics','Settings','Help'].map(t => (
                <div key={t} className="px-4 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  {t}
                </div>
              ))}
            </div>
            <div className="flex divide-x divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              {['Mon','Tue','Wed','Thu','Fri'].map(d => (
                <div key={d} className="flex-1 text-center py-3 text-sm font-medium text-slate-600 dark:text-slate-400">
                  {d}
                </div>
              ))}
            </div>
          </div>
        </Preview>
      </SubSection>
    </SectionWrapper>
  )
}
