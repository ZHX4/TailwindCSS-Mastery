import SectionWrapper, { SubSection, Preview } from '../components/SectionWrapper'
import CodeBlock from '../components/CodeBlock'
import TipBox from '../components/TipBox'

export default function Shadows() {
  return (
    <SectionWrapper
      id="shadows"
      badge="Chapter 8"
      title="Shadows, Opacity & Filters"
      description="Tailwind provides box-shadow, drop-shadow (filter), opacity, blur, backdrop-blur, and more for polished depth and glassy effects."
    >
      {/* Box shadow */}
      <SubSection title="Box Shadow — shadow-{size}">
        <CodeBlock code={`<div className="shadow-sm">Subtle shadow</div>
<div className="shadow">Default shadow</div>
<div className="shadow-md">Medium shadow</div>
<div className="shadow-lg">Large shadow</div>
<div className="shadow-xl">XL shadow</div>
<div className="shadow-2xl">2XL shadow</div>
<div className="shadow-inner">Inner shadow</div>
<div className="shadow-none">No shadow</div>

<!-- Colored shadow -->
<div className="shadow-lg shadow-sky-500/50">Blue glow</div>`} />
        <Preview>
          <div className="flex flex-wrap gap-5 p-4">
            {[
              {cls:'shadow-sm', label:'sm'},
              {cls:'shadow',    label:'default'},
              {cls:'shadow-md', label:'md'},
              {cls:'shadow-lg', label:'lg'},
              {cls:'shadow-xl', label:'xl'},
              {cls:'shadow-2xl',label:'2xl'},
              {cls:'shadow-inner bg-slate-100 dark:bg-slate-700', label:'inner'},
              {cls:'shadow-lg shadow-sky-500/50', label:'sky glow'},
              {cls:'shadow-lg shadow-violet-500/50', label:'violet glow'},
            ].map(({cls,label}) => (
              <div key={label} className={`${cls} bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-mono font-semibold w-24 h-16 flex items-center justify-center rounded-xl`}>
                {label}
              </div>
            ))}
          </div>
        </Preview>
      </SubSection>

      {/* Opacity */}
      <SubSection title="Opacity — opacity-{0..100}">
        <CodeBlock code={`<div className="opacity-100">100% (fully visible)</div>
<div className="opacity-75">75% opacity</div>
<div className="opacity-50">50% opacity</div>
<div className="opacity-25">25% opacity</div>
<div className="opacity-0">0% (invisible)</div>

<!-- Disable interaction with opacity -->
<button disabled className="opacity-50 cursor-not-allowed">
  Disabled button
</button>`} />
        <Preview>
          <div className="flex gap-3 items-center">
            {[100,75,50,25,10].map(o => (
              <div key={o} className={`opacity-${o} bg-sky-500 text-white text-xs font-bold w-14 h-14 rounded-xl flex items-center justify-center`}>
                {o}%
              </div>
            ))}
          </div>
        </Preview>
      </SubSection>

      {/* Blur / backdrop */}
      <SubSection title="Blur & Backdrop Blur">
        <CodeBlock code={`<!-- Element blur (filter) -->
<img className="blur-sm" src="..." alt="" />
<img className="blur" src="..." alt="" />
<img className="blur-lg" src="..." alt="" />

<!-- Backdrop blur (glassmorphism) -->
<div className="backdrop-blur-sm bg-white/30 ...">
  Frosted glass
</div>
<div className="backdrop-blur-md bg-white/20 border border-white/30 ...">
  Glassmorphism card
</div>`} />
        <Preview>
          <div className="relative h-48 rounded-xl overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-sky-500 to-emerald-400">
              <div className="absolute top-3 left-5 w-20 h-20 bg-white/20 rounded-full"></div>
              <div className="absolute bottom-3 right-8 w-32 h-32 bg-white/10 rounded-full"></div>
              <div className="absolute top-10 right-16 w-10 h-10 bg-white/30 rounded-full"></div>
            </div>
            {/* Glassmorphism cards */}
            <div className="absolute inset-0 flex items-center justify-center gap-4 p-6">
              {[
                {blur:'backdrop-blur-sm',  label:'blur-sm',  opacity:'bg-white/20'},
                {blur:'backdrop-blur-md',  label:'blur-md',  opacity:'bg-white/30'},
                {blur:'backdrop-blur-xl',  label:'blur-xl',  opacity:'bg-white/40'},
              ].map(({blur,label,opacity}) => (
                <div key={label} className={`${blur} ${opacity} border border-white/40 text-white text-xs font-bold px-4 py-3 rounded-xl flex-1 text-center shadow-lg`}>
                  {label}
                </div>
              ))}
            </div>
          </div>
        </Preview>
        <TipBox type="tip">
          For glassmorphism UIs, combine{' '}
          <code className="font-mono text-xs bg-slate-100 dark:bg-slate-700 px-1 py-0.5 rounded">backdrop-blur-md</code>{' '}
          +{' '}
          <code className="font-mono text-xs bg-slate-100 dark:bg-slate-700 px-1 py-0.5 rounded">bg-white/20</code>{' '}
          +{' '}
          <code className="font-mono text-xs bg-slate-100 dark:bg-slate-700 px-1 py-0.5 rounded">border border-white/30</code>.
          You need a colorful background behind the element for the blur to be visible.
        </TipBox>
      </SubSection>
    </SectionWrapper>
  )
}
