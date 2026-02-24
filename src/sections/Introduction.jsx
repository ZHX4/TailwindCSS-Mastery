import SectionWrapper, { SubSection, Preview } from '../components/SectionWrapper'
import CodeBlock from '../components/CodeBlock'
import TipBox from '../components/TipBox'

export default function Introduction() {
  return (
    <SectionWrapper
      id="introduction"
      badge="Getting Started"
      title="Introduction to TailwindCSS"
      description="Tailwind is a utility-first CSS framework. Instead of writing custom CSS, you compose small, single-purpose utility classes directly in your HTML/JSX."
    >
      <SubSection title="What is Utility-First CSS?">
        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4">
          Traditional CSS requires you to write class names first, then style them. Tailwind flips
          this — <strong className="text-slate-800 dark:text-slate-100">the class IS the style</strong>.
          Each class applies exactly one CSS property.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-semibold text-red-600 uppercase tracking-wide mb-2">❌ Traditional CSS</p>
            <CodeBlock language="css" filename="styles.css" code={`/* styles.css */
.card {
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}

.card-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
}`} />
          </div>
          <div>
            <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-2">✅ Tailwind CSS</p>
            <CodeBlock language="jsx" filename="Card.jsx" code={`// No separate CSS file needed!
function Card() {
  return (
    <div className="bg-white rounded-lg
                    p-6 shadow-md">
      <h2 className="text-xl font-bold
                     text-slate-800">
        Title
      </h2>
    </div>
  )
}`} />
          </div>
        </div>

        <TipBox type="note">
          Tailwind generates only the CSS classes you actually use — your final bundle is tiny
          thanks to its built-in tree-shaking via content scanning.
        </TipBox>
      </SubSection>

      <SubSection title="Core Concepts at a Glance">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: '🎨', title: 'Design Tokens', desc: 'Spacing, colors, type scale, and more are pre-wired as utilities.' },
            { icon: '📱', title: 'Responsive', desc: 'Add sm:, md:, lg:, xl:, 2xl: prefixes to any utility.' },
            { icon: '🌙', title: 'Dark Mode', desc: 'dark: prefix targets dark-mode variants automatically.' },
            { icon: '✨', title: 'States', desc: 'hover:, focus:, active:, disabled: — state-driven styles in one place.' },
            { icon: '⚡', title: 'JIT Engine', desc: 'Arbitrary values like w-[327px] generated on demand.' },
            { icon: '🔧', title: 'Customizable', desc: 'Extend the design system in tailwind.config.js.' },
          ].map((item) => (
            <div key={item.title}
                 className="flex gap-3 p-4 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100
                            dark:from-slate-800 dark:to-slate-800/50 border border-slate-200 dark:border-slate-700">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{item.title}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <TipBox type="best">
          Install the <strong>Tailwind CSS IntelliSense</strong> VS Code extension for autocomplete,
          class sorting hints, and live CSS previews.
        </TipBox>
      </SubSection>

      <SubSection title="Class Naming Pattern">
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
          Tailwind classes follow a simple pattern that you&apos;ll memorize quickly:
        </p>
        <Preview>
          <div className="flex flex-wrap gap-3 text-center text-xs font-mono">
            {[
              { parts: ['[variant]', ':', '[property]', '-', '[value]'], ex: 'hover:bg-blue-500' },
              { parts: ['[breakpoint]', ':', '[property]', '-', '[value]'], ex: 'md:text-xl' },
              { parts: ['[state]', ':', '[dark]', ':', '[property]', '-', '[value]'], ex: 'dark:hover:text-white' },
            ].map((row, i) => (
              <div key={i} className="flex-1 min-w-0 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="flex flex-wrap justify-center gap-0.5 mb-2">
                  {row.parts.map((p, j) => (
                    <span key={j} className={`px-1.5 py-0.5 rounded text-[10px] ${p === ':' || p === '-' ? 'text-slate-400' : 'bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800'}`}>{p}</span>
                  ))}
                </div>
                <p className="text-emerald-600 dark:text-emerald-400 font-semibold">{row.ex}</p>
              </div>
            ))}
          </div>
        </Preview>
      </SubSection>
    </SectionWrapper>
  )
}
