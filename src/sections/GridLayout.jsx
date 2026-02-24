import SectionWrapper, { SubSection, Preview } from '../components/SectionWrapper'
import CodeBlock from '../components/CodeBlock'
import TipBox from '../components/TipBox'

export default function GridLayout() {
  return (
    <SectionWrapper
      id="grid"
      badge="Chapter 5"
      title="CSS Grid Layout"
      description="Tailwind's grid utilities let you build two-dimensional layouts with grid-cols-*, grid-rows-*, col-span-*, and auto-placement."
    >
      {/* Basic grid */}
      <SubSection title="grid-cols-{n} and gap-*">
        <CodeBlock code={`<div className="grid grid-cols-3 gap-4">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
  <div>6</div>
</div>`} />
        <Preview>
          <div className="space-y-4">
            {[2,3,4].map(cols => (
              <div key={cols}>
                <p className="text-xs font-mono text-slate-400 mb-2">grid-cols-{cols} gap-3</p>
                <div className={`grid grid-cols-${cols} gap-3`}>
                  {Array.from({length: cols * 2}, (_,i) => (
                    <div key={i} className="bg-violet-100 dark:bg-violet-900/40 border border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-300 text-sm font-semibold text-center py-3 rounded-lg">
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Preview>
      </SubSection>

      {/* col-span */}
      <SubSection title="col-span-{n} — Spanning Multiple Columns">
        <CodeBlock code={`<div className="grid grid-cols-4 gap-4">
  <div className="col-span-2">Spans 2</div>
  <div>1</div>
  <div>1</div>
  <div className="col-span-4">Full width</div>
  <div className="col-span-3">Spans 3</div>
  <div>1</div>
</div>`} />
        <Preview>
          <div className="grid grid-cols-4 gap-3">
            <div className="col-span-2 bg-sky-400 text-white text-xs font-bold text-center py-4 rounded-lg">col-span-2</div>
            <div className="bg-sky-200 dark:bg-sky-900 text-sky-800 dark:text-sky-200 text-xs font-bold text-center py-4 rounded-lg">1</div>
            <div className="bg-sky-200 dark:bg-sky-900 text-sky-800 dark:text-sky-200 text-xs font-bold text-center py-4 rounded-lg">1</div>
            <div className="col-span-4 bg-sky-600 text-white text-xs font-bold text-center py-4 rounded-lg">col-span-4 (full width)</div>
            <div className="col-span-3 bg-sky-500 text-white text-xs font-bold text-center py-4 rounded-lg">col-span-3</div>
            <div className="bg-sky-200 dark:bg-sky-900 text-sky-800 dark:text-sky-200 text-xs font-bold text-center py-4 rounded-lg">1</div>
          </div>
        </Preview>
      </SubSection>

      {/* Auto-fit / responsive grid */}
      <SubSection title="Responsive Auto-fit Grid">
        <CodeBlock code={`<!-- Auto-fit with minmax via arbitrary values -->
<div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4">
  {cards.map(card => (
    <div key={card.id} className="...">
      {card.title}
    </div>
  ))}
</div>

<!-- Or use responsive breakpoint prefixes -->
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  ...
</div>`} />
        <Preview>
          <div>
            <p className="text-xs font-mono text-slate-400 mb-2">grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {['Dashboard','Analytics','Reports','Settings'].map((t,i) => (
                <div key={t} className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl p-4 shadow-sm">
                  <div className={`w-8 h-8 rounded-lg mb-3 ${['bg-sky-500','bg-violet-500','bg-emerald-500','bg-amber-500'][i]}`}></div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{t}</p>
                  <p className="text-xs text-slate-400 mt-1">Card {i+1}</p>
                </div>
              ))}
            </div>
          </div>
        </Preview>
      </SubSection>

      {/* grid-rows */}
      <SubSection title="grid-rows & place-items">
        <CodeBlock code={`<!-- Grid rows -->
<div className="grid grid-rows-3 grid-flow-col gap-4">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>

<!-- Center everything -->
<div className="grid place-items-center h-48">
  <div>Perfectly Centered</div>
</div>`} />
        <Preview>
          <div className="grid place-items-center h-40 bg-gradient-to-br from-violet-100 to-sky-100 dark:from-violet-900/30 dark:to-sky-900/30 rounded-xl border-2 border-dashed border-violet-300 dark:border-violet-700">
            <div className="bg-violet-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg text-sm">
              🎯 place-items-center — Perfectly Centered
            </div>
          </div>
        </Preview>
        <TipBox type="best">
          <code className="font-mono text-xs bg-slate-100 dark:bg-slate-700 px-1 py-0.5 rounded">grid place-items-center h-screen</code> is
          the simplest full-page centering technique in Tailwind — no flexbox needed.
        </TipBox>
      </SubSection>
    </SectionWrapper>
  )
}
