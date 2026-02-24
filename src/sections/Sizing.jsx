import SectionWrapper, { SubSection, Preview } from '../components/SectionWrapper'
import CodeBlock from '../components/CodeBlock'
import TipBox from '../components/TipBox'

export default function Sizing() {
  return (
    <SectionWrapper
      id="sizing"
      badge="Chapter 6"
      title="Sizing — Width & Height"
      description="Control dimensions with w-*, h-*, min/max-w/h-*, and aspect-ratio utilities."
    >
      {/* Width */}
      <SubSection title="Width — w-{size|fraction|full|screen|auto}">
        <CodeBlock code={`<!-- Fixed widths (Tailwind scale) -->
<div className="w-16">64px (4rem)</div>
<div className="w-32">128px (8rem)</div>
<div className="w-64">256px (16rem)</div>

<!-- Percentage fractions -->
<div className="w-1/2">50% of parent</div>
<div className="w-2/3">66.7%</div>
<div className="w-full">100%</div>

<!-- Viewport / content -->
<div className="w-screen">100vw</div>
<div className="w-fit">fit-content</div>
<div className="w-max">max-content</div>

<!-- Arbitrary -->
<div className="w-[327px]">Exactly 327px</div>`} />
        <Preview>
          <div className="space-y-2 bg-slate-100 dark:bg-slate-800 p-4 rounded-xl">
            {[
              {cls:'w-1/4',  label:'w-1/4 — 25%'},
              {cls:'w-1/3',  label:'w-1/3 — 33%'},
              {cls:'w-1/2',  label:'w-1/2 — 50%'},
              {cls:'w-2/3',  label:'w-2/3 — 66%'},
              {cls:'w-3/4',  label:'w-3/4 — 75%'},
              {cls:'w-full', label:'w-full — 100%'},
            ].map(({cls,label}) => (
              <div key={cls} className={`${cls} bg-sky-500 text-white text-xs font-mono font-semibold px-2 py-1.5 rounded whitespace-nowrap`}>
                {label}
              </div>
            ))}
          </div>
        </Preview>
      </SubSection>

      {/* Height */}
      <SubSection title="Height — h-{size|full|screen|dvh}">
        <CodeBlock code={`<div className="h-16">Fixed 64px</div>
<div className="h-screen">Full viewport height</div>
<div className="h-dvh">Dynamic viewport height (mobile safe)</div>
<div className="h-full">100% of parent</div>

<!-- Min/Max constraints -->
<div className="min-h-screen">At least viewport height</div>
<div className="max-h-96 overflow-y-auto">
  Scrollable, max 384px tall
</div>`} />
        <Preview>
          <div className="flex items-end gap-3 h-36 bg-slate-100 dark:bg-slate-800 p-4 rounded-xl">
            {[
              {cls:'h-8',    h:'32px', color:'bg-sky-400'},
              {cls:'h-12',   h:'48px', color:'bg-sky-500'},
              {cls:'h-16',   h:'64px', color:'bg-sky-600'},
              {cls:'h-20',   h:'80px', color:'bg-violet-500'},
              {cls:'h-24',   h:'96px', color:'bg-violet-600'},
              {cls:'h-full', h:'100%', color:'bg-emerald-500'},
            ].map(({cls,h,color}) => (
              <div key={cls} className="flex flex-col items-center gap-1 flex-1">
                <div className={`${cls} ${color} w-full rounded-t-md`}></div>
                <span className="text-[10px] font-mono text-slate-500">{cls}</span>
                <span className="text-[10px] text-slate-400">{h}</span>
              </div>
            ))}
          </div>
        </Preview>
      </SubSection>

      {/* max-width container */}
      <SubSection title="max-w-* — Content Containers">
        <CodeBlock code={`<!-- Standard container sizes -->
<div className="max-w-sm mx-auto">384px max</div>
<div className="max-w-md mx-auto">448px max</div>
<div className="max-w-lg mx-auto">512px max</div>
<div className="max-w-xl mx-auto">576px max</div>
<div className="max-w-2xl mx-auto">672px max</div>
<div className="max-w-4xl mx-auto">896px max</div>
<div className="max-w-7xl mx-auto">1280px max (common app wrapper)</div>

<!-- Prose (great for article content) -->
<article className="max-w-prose mx-auto">
  65ch wide — optimal reading width
</article>`} />
        <Preview>
          <div className="space-y-2 bg-slate-100 dark:bg-slate-800 p-4 rounded-xl overflow-hidden">
            {[
              {cls:'max-w-xs',  label:'max-w-xs — 320px',   color:'bg-rose-400'},
              {cls:'max-w-sm',  label:'max-w-sm — 384px',   color:'bg-orange-400'},
              {cls:'max-w-md',  label:'max-w-md — 448px',   color:'bg-amber-400'},
              {cls:'max-w-lg',  label:'max-w-lg — 512px',   color:'bg-yellow-400'},
              {cls:'max-w-xl',  label:'max-w-xl — 576px',   color:'bg-lime-500'},
              {cls:'max-w-2xl', label:'max-w-2xl — 672px',  color:'bg-emerald-500'},
              {cls:'max-w-4xl', label:'max-w-4xl — 896px',  color:'bg-sky-500'},
            ].map(({cls,label,color}) => (
              <div key={cls} className={`${cls} ${color} text-white text-xs font-mono font-semibold px-2 py-1.5 rounded whitespace-nowrap`}>
                {label}
              </div>
            ))}
          </div>
        </Preview>

        <TipBox type="tip">
          Use <code className="font-mono text-xs bg-slate-100 dark:bg-slate-700 px-1 py-0.5 rounded">max-w-prose</code> for body text — it sets{' '}
          <code className="font-mono text-xs bg-slate-100 dark:bg-slate-700 px-1 py-0.5 rounded">max-width: 65ch</code>,
          the ideal reading column width.
        </TipBox>
      </SubSection>

      {/* Aspect ratio */}
      <SubSection title="aspect-{ratio} — Responsive Ratios">
        <CodeBlock code={`<div className="aspect-square w-32 bg-sky-500">1:1</div>
<div className="aspect-video w-64 bg-violet-500">16:9</div>
<div className="aspect-[4/3] w-48 bg-rose-500">4:3</div>

<!-- Great for thumbnails / cards -->
<img
  className="w-full aspect-video object-cover rounded-xl"
  src="/hero.jpg"
  alt="Hero"
/>`} />
        <Preview>
          <div className="flex flex-wrap gap-4 items-end">
            {[
              {cls:'aspect-square',  label:'1:1',  w:'w-24',  color:'bg-sky-500'},
              {cls:'aspect-video',   label:'16:9', w:'w-36',  color:'bg-violet-500'},
              {cls:'aspect-[4/3]',  label:'4:3',  w:'w-32',  color:'bg-rose-500'},
              {cls:'aspect-[21/9]', label:'21:9', w:'w-48',  color:'bg-emerald-500'},
            ].map(({cls,label,w,color}) => (
              <div key={cls} className={`${cls} ${w} ${color} rounded-xl flex items-center justify-center text-white text-xs font-bold shadow`}>
                {label}
              </div>
            ))}
          </div>
        </Preview>
      </SubSection>
    </SectionWrapper>
  )
}
