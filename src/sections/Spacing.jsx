import SectionWrapper, { SubSection, Preview } from '../components/SectionWrapper'
import CodeBlock from '../components/CodeBlock'
import TipBox from '../components/TipBox'

const spacingScale = [0, 0.5, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24]

export default function Spacing() {
  return (
    <SectionWrapper
      id="spacing"
      badge="Chapter 3"
      title="Spacing — Padding & Margin"
      description="Tailwind's spacing scale covers p-*, m-*, space-x-*, space-y-*, and gap-*. All based on a 4px (0.25rem) unit."
    >
      {/* Spacing scale */}
      <SubSection title="The Spacing Scale">
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
          The default spacing scale increments by 4px. Each unit = 4px (e.g., <code className="font-mono text-xs bg-slate-100 dark:bg-slate-700 px-1 rounded">p-4</code> = 16px).
        </p>
        <Preview>
          <div className="space-y-2 overflow-x-auto">
            {spacingScale.map(n => (
              <div key={n} className="flex items-center gap-3">
                <span className="text-xs font-mono text-slate-400 w-16 flex-shrink-0 text-right">
                  p-{n}
                </span>
                <div className={`bg-sky-100 dark:bg-sky-900/50 border border-sky-300 dark:border-sky-700 rounded inline-flex`}
                     style={{padding: `${n * 0.25}rem`}}>
                  <div className="bg-sky-500 rounded-sm w-4 h-4 flex-shrink-0"></div>
                </div>
                <span className="text-xs text-slate-400">{n * 4}px / {n * 0.25}rem</span>
              </div>
            ))}
          </div>
        </Preview>
      </SubSection>

      {/* Padding */}
      <SubSection title="Padding — p-*, px-*, py-*, pt-*, pr-*, pb-*, pl-*">
        <CodeBlock code={`<!-- All sides -->
<div className="p-4">Padding all 4 sides (16px)</div>

<!-- Horizontal / Vertical -->
<div className="px-8 py-4">Horizontal 32px, Vertical 16px</div>

<!-- Individual sides -->
<div className="pt-2 pr-4 pb-6 pl-8">
  Top:8px Right:16px Bottom:24px Left:32px
</div>

<!-- Shorthand: same as px + py -->
<div className="p-4">equivalent: px-4 py-4</div>`} />
        <Preview>
          <div className="flex flex-wrap gap-4">
            {[
              {cls:'p-2',         label:'p-2'},
              {cls:'p-4',         label:'p-4'},
              {cls:'p-8',         label:'p-8'},
              {cls:'px-8 py-2',   label:'px-8 py-2'},
              {cls:'pt-8 pb-2 px-4', label:'pt-8 pb-2'},
            ].map(({cls,label}) => (
              <div key={cls} className={`${cls} bg-sky-100 dark:bg-sky-900/50 border-2 border-dashed border-sky-400 rounded-lg inline-block`}>
                <div className="bg-sky-500 text-white text-xs font-mono font-semibold px-3 py-2 rounded whitespace-nowrap">
                  .{label}
                </div>
              </div>
            ))}
          </div>
        </Preview>
      </SubSection>

      {/* Margin */}
      <SubSection title="Margin — m-*, mx-*, my-*, auto">
        <CodeBlock code={`<!-- Center a block with auto margin -->
<div className="mx-auto max-w-md">Centered</div>

<!-- Margin top / bottom -->
<div className="mt-8 mb-4">Vertical margin</div>

<!-- Negative margin -->
<div className="-mt-4">Negative top margin</div>

<!-- Space between children (replaces manual margins) -->
<div className="flex flex-col space-y-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>`} />
        <Preview>
          <div className="space-y-6">
            {/* mx-auto */}
            <div>
              <p className="text-xs text-slate-400 font-mono mb-2">mx-auto max-w-xs</p>
              <div className="bg-slate-200 dark:bg-slate-700 rounded-lg p-1">
                <div className="mx-auto max-w-xs bg-violet-500 text-white text-center text-sm font-semibold p-3 rounded">
                  Centered with mx-auto
                </div>
              </div>
            </div>
            {/* space-y */}
            <div>
              <p className="text-xs text-slate-400 font-mono mb-2">flex flex-col space-y-2</p>
              <div className="flex flex-col space-y-2">
                {['Item 1','Item 2','Item 3'].map(t => (
                  <div key={t} className="bg-emerald-100 dark:bg-emerald-900/40 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300 text-sm px-3 py-2 rounded-lg">
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Preview>
        <TipBox type="best">
          Prefer <code className="font-mono text-xs bg-slate-100 dark:bg-slate-700 px-1 py-0.5 rounded">space-y-*</code> /{' '}
          <code className="font-mono text-xs bg-slate-100 dark:bg-slate-700 px-1 py-0.5 rounded">space-x-*</code> over adding margin
          to individual children — it keeps your components context-independent.
        </TipBox>
      </SubSection>

      {/* Gap */}
      <SubSection title="Gap — gap-*, gap-x-*, gap-y-*">
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
          Use <code className="font-mono text-xs bg-slate-100 dark:bg-slate-700 px-1 rounded">gap-*</code> with flex and grid layouts instead of margins for consistent spacing.
        </p>
        <CodeBlock code={`<div className="flex gap-4">
  <div>Box 1</div>
  <div>Box 2</div>
  <div>Box 3</div>
</div>

<div className="grid grid-cols-3 gap-x-6 gap-y-4">
  {items.map(i => <div key={i}>{i}</div>)}
</div>`} />
        <Preview>
          <div className="space-y-4">
            {[2,4,6,8].map(g => (
              <div key={g}>
                <p className="text-xs font-mono text-slate-400 mb-1.5">gap-{g}</p>
                <div className="flex flex-wrap" style={{gap: `${g * 4}px`}}>
                  {['One','Two','Three','Four'].map(l => (
                    <div key={l} className="bg-rose-100 dark:bg-rose-900/40 border border-rose-300 dark:border-rose-700 text-rose-700 dark:text-rose-300 text-xs font-semibold px-3 py-2 rounded-lg">
                      {l}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Preview>
      </SubSection>
    </SectionWrapper>
  )
}
