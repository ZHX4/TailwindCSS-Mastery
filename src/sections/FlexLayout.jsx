import SectionWrapper, { SubSection, Preview } from '../components/SectionWrapper'
import CodeBlock from '../components/CodeBlock'
import TipBox from '../components/TipBox'

export default function FlexLayout() {
  return (
    <SectionWrapper
      id="flexbox"
      badge="Chapter 4"
      title="Flexbox Layout"
      description="Tailwind's flexbox utilities map directly to CSS flexbox. Compose layouts with flex, flex-row/col, justify-*, items-*, flex-wrap, and more."
    >
      {/* Basics */}
      <SubSection title="flex, flex-row, flex-col">
        <CodeBlock code={`<!-- Horizontal row (default) -->
<div className="flex flex-row gap-4">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>

<!-- Vertical column -->
<div className="flex flex-col gap-2">
  <div>Top</div>
  <div>Middle</div>
  <div>Bottom</div>
</div>`} />
        <Preview>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-mono text-slate-400 mb-2">flex flex-row gap-4</p>
              <div className="flex flex-row gap-4 p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
                {['1','2','3'].map(n => (
                  <div key={n} className="w-12 h-12 bg-sky-500 text-white font-bold text-lg rounded-lg flex items-center justify-center shadow-sm">{n}</div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-mono text-slate-400 mb-2">flex flex-col gap-2</p>
              <div className="flex flex-col gap-2 p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
                {['Top','Middle','Bottom'].map(t => (
                  <div key={t} className="bg-violet-500 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-sm">{t}</div>
                ))}
              </div>
            </div>
          </div>
        </Preview>
      </SubSection>

      {/* justify-content */}
      <SubSection title="justify-{start|end|center|between|around|evenly}">
        <CodeBlock code={`<div className="flex justify-start gap-2">...</div>
<div className="flex justify-center gap-2">...</div>
<div className="flex justify-end gap-2">...</div>
<div className="flex justify-between">...</div>
<div className="flex justify-around">...</div>
<div className="flex justify-evenly">...</div>`} />
        <Preview>
          <div className="space-y-3">
            {['justify-start','justify-center','justify-end','justify-between','justify-around','justify-evenly'].map(j => (
              <div key={j}>
                <p className="text-xs font-mono text-slate-400 mb-1">{j}</p>
                <div className={`flex ${j} bg-slate-100 dark:bg-slate-800 p-2 rounded-lg`}>
                  {['A','B','C'].map(l => (
                    <div key={l} className="w-10 h-10 bg-emerald-500 text-white font-bold rounded-md flex items-center justify-center">{l}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Preview>
      </SubSection>

      {/* align-items */}
      <SubSection title="items-{start|end|center|baseline|stretch}">
        <CodeBlock code={`<div className="flex items-start h-24">...</div>
<div className="flex items-center h-24">...</div>
<div className="flex items-end h-24">...</div>
<div className="flex items-stretch h-24">...</div>`} />
        <Preview>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {['items-start','items-center','items-end','items-stretch'].map(a => (
              <div key={a}>
                <p className="text-xs font-mono text-slate-400 mb-1 text-center">{a}</p>
                <div className={`flex ${a} h-24 bg-slate-100 dark:bg-slate-800 rounded-lg gap-1 p-1`}>
                  {[12,20,14].map((h,i) => (
                    <div key={i} className="flex-1 bg-rose-500 rounded text-white text-xs font-bold flex items-center justify-center"
                         style={a === 'items-stretch' ? {} : {height: h * 2}} >
                      {i+1}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Preview>
      </SubSection>

      {/* flex-wrap & grow/shrink */}
      <SubSection title="flex-wrap, flex-1, flex-none, flex-grow">
        <CodeBlock code={`<!-- Wrap onto multiple lines -->
<div className="flex flex-wrap gap-3">
  {items.map(i => <div key={i} className="...">Item {i}</div>)}
</div>

<!-- flex-1: grow and shrink equally -->
<div className="flex gap-3">
  <div className="flex-1 bg-sky-100">Equal</div>
  <div className="flex-1 bg-sky-100">Width</div>
  <div className="w-32 bg-slate-200">Fixed</div>
</div>

<!-- flex-none: prevent shrinking -->
<div className="flex gap-3 overflow-hidden">
  <div className="flex-none w-20">Stays 80px</div>
  <div className="flex-1 min-w-0 truncate">Long overflowing text truncated</div>
</div>`} />
        <Preview>
          <div className="space-y-4">
            <div>
              <p className="text-xs font-mono text-slate-400 mb-1">flex flex-wrap gap-2</p>
              <div className="flex flex-wrap gap-2 bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                {['Alpha','Beta','Gamma','Delta','Epsilon','Zeta','Eta','Theta'].map(w => (
                  <div key={w} className="bg-amber-400 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">{w}</div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-mono text-slate-400 mb-1">flex-1 (equal widths) + fixed</p>
              <div className="flex gap-2 bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                <div className="flex-1 bg-sky-200 dark:bg-sky-800 text-sky-800 dark:text-sky-200 text-xs text-center py-2 rounded font-semibold">flex-1</div>
                <div className="flex-1 bg-sky-200 dark:bg-sky-800 text-sky-800 dark:text-sky-200 text-xs text-center py-2 rounded font-semibold">flex-1</div>
                <div className="w-20 bg-slate-300 dark:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs text-center py-2 rounded font-semibold flex-shrink-0">w-20</div>
              </div>
            </div>
          </div>
        </Preview>

        <TipBox type="best">
          The <code className="font-mono text-xs bg-slate-100 dark:bg-slate-700 px-1 py-0.5 rounded">min-w-0</code> trick —
          when you use <code className="font-mono text-xs bg-slate-100 dark:bg-slate-700 px-1 py-0.5 rounded">flex-1</code> alongside <code className="font-mono text-xs bg-slate-100 dark:bg-slate-700 px-1 py-0.5 rounded">truncate</code>,
          add <code className="font-mono text-xs bg-slate-100 dark:bg-slate-700 px-1 py-0.5 rounded">min-w-0</code> to allow text truncation to work correctly.
        </TipBox>
      </SubSection>
    </SectionWrapper>
  )
}
