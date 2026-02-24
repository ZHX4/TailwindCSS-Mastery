import SectionWrapper, { SubSection, Preview } from '../components/SectionWrapper'
import CodeBlock from '../components/CodeBlock'
import TipBox from '../components/TipBox'

const palette = [
  { name: 'slate',  shades: [100,200,300,400,500,600,700,800,900] },
  { name: 'red',    shades: [100,200,300,400,500,600,700,800,900] },
  { name: 'orange', shades: [100,200,300,400,500,600,700,800,900] },
  { name: 'amber',  shades: [100,200,300,400,500,600,700,800,900] },
  { name: 'yellow', shades: [100,200,300,400,500,600,700,800,900] },
  { name: 'lime',   shades: [100,200,300,400,500,600,700,800,900] },
  { name: 'green',  shades: [100,200,300,400,500,600,700,800,900] },
  { name: 'teal',   shades: [100,200,300,400,500,600,700,800,900] },
  { name: 'cyan',   shades: [100,200,300,400,500,600,700,800,900] },
  { name: 'sky',    shades: [100,200,300,400,500,600,700,800,900] },
  { name: 'blue',   shades: [100,200,300,400,500,600,700,800,900] },
  { name: 'indigo', shades: [100,200,300,400,500,600,700,800,900] },
  { name: 'violet', shades: [100,200,300,400,500,600,700,800,900] },
  { name: 'purple', shades: [100,200,300,400,500,600,700,800,900] },
  { name: 'pink',   shades: [100,200,300,400,500,600,700,800,900] },
  { name: 'rose',   shades: [100,200,300,400,500,600,700,800,900] },
]

// Swatch component — uses inline style since dynamic class names won't be picked up by PurgeCSS
function Swatch({ color, shade }) {
  const twClass = `bg-${color}-${shade}`
  return (
    <div
      title={twClass}
      className={`${twClass} h-8 flex-1 rounded cursor-default transition-transform hover:scale-y-125 hover:z-10 relative`}
    />
  )
}

export default function Colors() {
  return (
    <SectionWrapper
      id="colors"
      badge="Chapter 2"
      title="Colors & Backgrounds"
      description="Tailwind ships with a beautiful, hand-crafted default palette. Use text-{color}-{shade}, bg-{color}-{shade}, and border-{color}-{shade} directly in your markup."
    >
      {/* Palette overview */}
      <SubSection title="Default Color Palette">
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
          Each color has shades from <strong>50</strong> (lightest) to <strong>950</strong> (darkest).
          Hover the swatches to see the class name.
        </p>
        <div className="space-y-1.5 overflow-x-auto">
          {palette.map(({ name, shades }) => (
            <div key={name} className="flex items-center gap-2 min-w-max">
              <span className="text-xs w-14 text-right text-slate-500 dark:text-slate-400 font-mono">{name}</span>
              <div className="flex flex-1 gap-0.5">
                {shades.map(s => <Swatch key={s} color={name} shade={s} />)}
              </div>
            </div>
          ))}
        </div>
      </SubSection>

      {/* Text & Background */}
      <SubSection title="Text Color — text-{color}-{shade}">
        <CodeBlock code={`<p className="text-slate-900">Dark slate text</p>
<p className="text-sky-600">Sky blue text</p>
<p className="text-violet-500">Violet text</p>
<p className="text-rose-600">Rose/red text</p>
<p className="text-emerald-700">Emerald green</p>`} />
        <Preview>
          <div className="space-y-1 text-base font-medium">
            <p className="text-slate-900 dark:text-slate-100">text-slate-900 — Dark slate text</p>
            <p className="text-sky-600">text-sky-600 — Sky blue text</p>
            <p className="text-violet-500">text-violet-500 — Violet text</p>
            <p className="text-rose-600">text-rose-600 — Rose/red text</p>
            <p className="text-emerald-700">text-emerald-700 — Emerald green</p>
            <p className="text-amber-500">text-amber-500 — Warm amber</p>
          </div>
        </Preview>
      </SubSection>

      <SubSection title="Background Color — bg-{color}-{shade}">
        <CodeBlock code={`<div className="bg-sky-500 text-white p-4 rounded-xl">  
  Sky background
</div>
<div className="bg-gradient-to-r from-violet-500 to-pink-500 text-white p-4 rounded-xl">
  Gradient background
</div>`} />
        <Preview>
          <div className="space-y-3">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                {bg:'bg-sky-500',     text:'Sky 500'},
                {bg:'bg-violet-600',  text:'Violet 600'},
                {bg:'bg-rose-500',    text:'Rose 500'},
                {bg:'bg-emerald-500', text:'Emerald 500'},
                {bg:'bg-amber-400',   text:'Amber 400'},
                {bg:'bg-pink-500',    text:'Pink 500'},
                {bg:'bg-slate-700',   text:'Slate 700'},
                {bg:'bg-cyan-400',    text:'Cyan 400'},
              ].map(({bg,text}) => (
                <div key={bg} className={`${bg} text-white text-xs font-mono font-medium p-3 rounded-lg text-center shadow-sm`}>
                  {text}
                </div>
              ))}
            </div>
            <div className="bg-gradient-to-r from-violet-500 via-sky-500 to-emerald-500 text-white p-4 rounded-xl text-center font-semibold shadow">
              Gradient: from-violet-500 via-sky-500 to-emerald-500
            </div>
            <div className="bg-gradient-to-br from-pink-500 to-orange-400 text-white p-4 rounded-xl text-center font-semibold shadow">
              gradient-to-br from-pink-500 to-orange-400
            </div>
          </div>
        </Preview>
        <TipBox type="tip">
          Tailwind supports opacity modifiers: <code className="font-mono text-xs bg-slate-100 dark:bg-slate-700 px-1 py-0.5 rounded">bg-sky-500/50</code> gives 50% opacity background.
          Works with text, border, and ring utilities too.
        </TipBox>
      </SubSection>

      {/* Opacity + Gradients */}
      <SubSection title="Opacity Modifiers">
        <CodeBlock code={`<!-- Slash opacity syntax -->
<div className="bg-sky-500/10">10% sky background</div>
<div className="bg-sky-500/25">25% sky background</div>
<div className="bg-sky-500/50">50% sky background</div>
<div className="bg-sky-500/75">75% sky background</div>
<div className="bg-sky-500">100% sky background</div>

<!-- Also works on text -->
<p className="text-slate-900/60">60% opacity text</p>`} />
        <Preview>
          <div className="flex gap-2 flex-wrap">
            {[10,25,50,75,100].map(o => (
              <div key={o} className={`bg-sky-500/${o} border border-sky-300 text-sky-900 text-xs font-mono font-semibold p-3 rounded-lg flex-1 text-center min-w-[80px]`}>
                /{o}
              </div>
            ))}
          </div>
        </Preview>
      </SubSection>
    </SectionWrapper>
  )
}
