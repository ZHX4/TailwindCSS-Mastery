import SectionWrapper, { SubSection, Preview } from '../components/SectionWrapper'
import CodeBlock from '../components/CodeBlock'
import TipBox from '../components/TipBox'

const sizes = [
  { cls: 'text-xs',   label: 'text-xs',   px: '12px' },
  { cls: 'text-sm',   label: 'text-sm',   px: '14px' },
  { cls: 'text-base', label: 'text-base', px: '16px' },
  { cls: 'text-lg',   label: 'text-lg',   px: '18px' },
  { cls: 'text-xl',   label: 'text-xl',   px: '20px' },
  { cls: 'text-2xl',  label: 'text-2xl',  px: '24px' },
  { cls: 'text-3xl',  label: 'text-3xl',  px: '30px' },
  { cls: 'text-4xl',  label: 'text-4xl',  px: '36px' },
  { cls: 'text-5xl',  label: 'text-5xl',  px: '48px' },
]

const weights = [
  { cls: 'font-thin',       label: 'font-thin',       w: '100' },
  { cls: 'font-light',      label: 'font-light',       w: '300' },
  { cls: 'font-normal',     label: 'font-normal',      w: '400' },
  { cls: 'font-medium',     label: 'font-medium',      w: '500' },
  { cls: 'font-semibold',   label: 'font-semibold',    w: '600' },
  { cls: 'font-bold',       label: 'font-bold',        w: '700' },
  { cls: 'font-extrabold',  label: 'font-extrabold',   w: '800' },
  { cls: 'font-black',      label: 'font-black',       w: '900' },
]

export default function Typography() {
  return (
    <SectionWrapper
      id="typography"
      badge="Chapter 1"
      title="Typography"
      description="Control font size, weight, line height, letter spacing, alignment, and decoration using Tailwind's text utilities."
    >
      {/* Font Size */}
      <SubSection title="Font Size — text-{size}">
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
          Tailwind ships with a type scale from <code className="font-mono text-sky-600 dark:text-sky-400">text-xs</code> to <code className="font-mono text-sky-600 dark:text-sky-400">text-9xl</code>.
        </p>
        <CodeBlock code={`<p className="text-xs">Tiny text (12px)</p>
<p className="text-base">Base text (16px)</p>
<p className="text-2xl">Large heading (24px)</p>
<p className="text-5xl">Display (48px)</p>`} />
        <Preview>
          <div className="space-y-1 overflow-hidden">
            {sizes.map(s => (
              <div key={s.cls} className="flex items-baseline gap-4">
                <span className={`${s.cls} text-slate-800 dark:text-slate-100 font-medium leading-tight`}>
                  The quick brown fox
                </span>
                <span className="text-xs text-slate-400 font-mono flex-shrink-0">{s.label} · {s.px}</span>
              </div>
            ))}
          </div>
        </Preview>
      </SubSection>

      {/* Font Weight */}
      <SubSection title="Font Weight — font-{weight}">
        <CodeBlock code={`<p className="font-thin">Thin — 100</p>
<p className="font-normal">Normal — 400</p>
<p className="font-semibold">Semibold — 600</p>
<p className="font-black">Black — 900</p>`} />
        <Preview>
          <div className="space-y-1">
            {weights.map(w => (
              <div key={w.cls} className="flex items-center gap-4">
                <span className={`${w.cls} text-lg text-slate-800 dark:text-slate-100 w-56`}>
                  TailwindCSS
                </span>
                <span className="text-xs text-slate-400 font-mono">{w.label} · {w.w}</span>
              </div>
            ))}
          </div>
        </Preview>
      </SubSection>

      {/* Line Height & Letter Spacing */}
      <SubSection title="Line Height & Letter Spacing">
        <CodeBlock code={`<!-- Line height -->
<p className="leading-none">leading-none (1)</p>
<p className="leading-tight">leading-tight (1.25)</p>
<p className="leading-normal">leading-normal (1.5)</p>
<p className="leading-loose">leading-loose (2)</p>

<!-- Letter spacing -->
<p className="tracking-tighter">tracking-tighter (-0.05em)</p>
<p className="tracking-normal">tracking-normal (0)</p>
<p className="tracking-widest">tracking-widest (0.1em)</p>`} />
        <Preview>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <p className="text-xs text-slate-400 uppercase font-semibold tracking-wide mb-2">Line Height</p>
              {['leading-none', 'leading-tight', 'leading-snug', 'leading-normal', 'leading-relaxed', 'leading-loose'].map(l => (
                <p key={l} className={`${l} text-sm text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 p-2 rounded`}>
                  <span className="text-xs text-slate-400 font-mono block">{l}</span>
                  The five boxing wizards jumped quickly over the lazy dog.
                </p>
              ))}
            </div>
            <div className="space-y-3">
              <p className="text-xs text-slate-400 uppercase font-semibold tracking-wide mb-2">Letter Spacing</p>
              {[
                { cls: 'tracking-tighter', val: '-0.05em' },
                { cls: 'tracking-tight',   val: '-0.025em' },
                { cls: 'tracking-normal',  val: '0' },
                { cls: 'tracking-wide',    val: '0.025em' },
                { cls: 'tracking-wider',   val: '0.05em' },
                { cls: 'tracking-widest',  val: '0.1em' },
              ].map(t => (
                <p key={t.cls} className={`${t.cls} text-sm font-semibold uppercase text-slate-700 dark:text-slate-300`}>
                  {t.cls}
                  <span className="text-xs font-normal text-slate-400 normal-case ml-2 font-mono">{t.val}</span>
                </p>
              ))}
            </div>
          </div>
        </Preview>
      </SubSection>

      {/* Text Alignment & Decoration */}
      <SubSection title="Alignment & Decoration">
        <CodeBlock code={`<p className="text-left">Left aligned</p>
<p className="text-center">Center aligned</p>
<p className="text-right">Right aligned</p>

<p className="underline">Underlined text</p>
<p className="line-through">Strikethrough</p>
<p className="italic">Italic text</p>
<p className="uppercase">uppercase text</p>
<p className="capitalize">capitalized text</p>`} />
        <Preview>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              {['text-left','text-center','text-right'].map(a => (
                <p key={a} className={`${a} text-sm p-2 bg-slate-100 dark:bg-slate-800 rounded text-slate-700 dark:text-slate-300`}>
                  <span className="font-mono text-sky-600 dark:text-sky-400">.{a}</span> — sample text
                </p>
              ))}
            </div>
            <div className="space-y-2">
              {[
                {cls:'underline',         text:'Underlined text'},
                {cls:'line-through',      text:'Strikethrough text'},
                {cls:'italic',            text:'Italic text'},
                {cls:'uppercase font-semibold', text:'uppercase'},
                {cls:'capitalize',        text:'capitalized words'},
                {cls:'truncate w-40',     text:'Truncated long text that overflows'},
              ].map(({cls,text}) => (
                <p key={cls} className={`${cls} text-sm text-slate-700 dark:text-slate-300`}>{text}</p>
              ))}
            </div>
          </div>
        </Preview>
        <TipBox type="tip">
          Use <code className="font-mono text-xs bg-slate-100 dark:bg-slate-700 px-1 py-0.5 rounded">truncate</code> to
          clip overflowing text with an ellipsis — it combines{' '}
          <code className="font-mono text-xs bg-slate-100 dark:bg-slate-700 px-1 py-0.5 rounded">overflow-hidden</code>,{' '}
          <code className="font-mono text-xs bg-slate-100 dark:bg-slate-700 px-1 py-0.5 rounded">whitespace-nowrap</code>, and{' '}
          <code className="font-mono text-xs bg-slate-100 dark:bg-slate-700 px-1 py-0.5 rounded">text-ellipsis</code> in one class.
        </TipBox>
      </SubSection>
    </SectionWrapper>
  )
}
