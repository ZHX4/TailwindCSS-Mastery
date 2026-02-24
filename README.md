# TailwindCSS Mastery

<p align="center">
  <img src="public/logo.svg" alt="TailwindCSS Mastery Logo" width="80" height="80" />
</p>

<p align="center">
  <strong>A comprehensive, interactive TailwindCSS tutorial built with React + Vite.</strong><br/>
  14 chapters · Live preview · Dark mode · Search · Keyboard shortcuts
</p>

<p align="center">
  <a href="https://tailwindcss-mastery-zhx4.vercel.app">🌐 Live Demo</a> ·
  <a href="#chapters">📚 Chapters</a> ·
  <a href="#features">✨ Features</a> ·
  <a href="#getting-started">🚀 Getting Started</a>
</p>

---

## ✨ Features

| Feature | Details |
|---|---|
| **14 Chapters** | Full coverage from basics to advanced customization |
| **Live Previews** | Every concept rendered inline next to its code |
| **Syntax Highlighting** | Custom single-pass tokenizer with line numbers |
| **Search** | `Ctrl/Cmd+K` command-palette — instant fuzzy search across all 63+ topics |
| **Dark Mode** | Class-strategy toggle with `localStorage` persistence (`D` shortcut) |
| **Reading Progress** | Gradient progress bar tracks scroll position |
| **Section Tracking** | Sidebar marks visited chapters with ✓ and shows % completion |
| **Keyboard Shortcuts** | `?` to view all shortcuts, `Esc` to close any modal |
| **Scroll-to-Top** | FAB appears after 400 px, whisks you back |
| **Responsive** | Mobile sidebar, tablet + desktop layouts |

---

## 📚 Chapters

1. 🚀 Introduction — Utility-first concepts & class naming
2. ✏️ Typography — size, weight, leading, tracking, decoration
3. 🎨 Colors — Palette, text/bg, gradients, opacity modifier
4. 📐 Spacing — Padding, margin, space-\*, gap-\*
5. 🔲 Flexbox — flex, justify-\*, items-\*, flex-wrap, flex-1
6. ⊞ CSS Grid — grid-cols, col-span, auto-fit, place-items
7. ↔️ Sizing — w-\*, h-\*, max-w-\*, aspect-ratio
8. ⬡ Borders & Rings — border, rounded, ring, divide
9. 💧 Shadows & Filters — shadow, blur, backdrop-blur / glassomorphism
10. 📱 Responsive — sm/md/lg/xl/2xl breakpoints, mobile-first
11. 🌙 Dark Mode — class strategy, dark: variant, toggle implementation
12. ✨ State Variants — hover, focus, group-hover, peer-checked
13. 🎬 Transitions — transition, transform, animate-spin/pulse, custom keyframes
14. 🔧 Customization — theme.extend, arbitrary values, @apply, plugins

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18
- npm ≥ 9

### Install & Run

```bash
git clone https://github.com/ZHX4/TailwindCSS-Mastery.git
cd TailwindCSS-Mastery
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build      # outputs to dist/
npm run preview    # preview the production build locally
```

---

## 🛠 Tech Stack

- **[React 18](https://react.dev/)** — UI components & hooks
- **[Vite 5](https://vitejs.dev/)** — Lightning-fast dev server & build
- **[TailwindCSS 3](https://tailwindcss.com/)** — Utility-first styling
- **[PostCSS + Autoprefixer](https://postcss.org/)** — CSS pipeline

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|---|---|
| `Ctrl / Cmd + K` | Open search |
| `D` | Toggle dark mode |
| `?` | Show keyboard shortcuts |
| `Esc` | Close any open modal |
| `↑ ↓` | Navigate search results |
| `↵` | Jump to selected section |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── CodeBlock.jsx         # Syntax-highlighted code with line numbers
│   ├── KeyboardShortcuts.jsx # Shortcuts modal
│   ├── ProgressBar.jsx       # Reading progress bar
│   ├── ScrollToTop.jsx       # Floating back-to-top button
│   ├── SearchModal.jsx       # Command-palette search
│   ├── SectionWrapper.jsx    # Consistent section layout shell
│   ├── Sidebar.jsx           # Fixed nav with visit tracking
│   └── TipBox.jsx            # tip / warning / note / best callouts
├── data/
│   └── searchIndex.js        # 63-entry search index
├── sections/                 # 14 tutorial section components
│   ├── Introduction.jsx
│   ├── Typography.jsx
│   ├── Colors.jsx
│   └── ...
├── App.jsx                   # Root layout, state, keyboard handling
├── index.css                 # Tailwind directives + component layer
└── main.jsx
public/
├── favicon.svg
└── logo.svg
```

---

## 📄 License

MIT — free to use, modify, and distribute.
