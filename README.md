# glow-card-react

> A cursor-tracking glow that follows the pointer across your cards. Tiny, dependency-free, and built for React 18 & 19.

![tests](https://img.shields.io/badge/tests-passing-brightgreen.svg)
![coverage](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)
![license](https://img.shields.io/badge/license-MIT-blue.svg)

**🌐 [Live demo →](https://glow-card-react.vercel.app)**

A soft radial spotlight that tracks the cursor as it moves over a card — the effect you've seen on landing pages, now in two lines of React. Ships a headless `useGlowCard` hook and a drop-in `<GlowCard>` component, respects `prefers-reduced-motion`, and adds zero runtime dependencies.

## For AI coding agents

Drop [`SKILL.md`](./SKILL.md) into your AI editor / Claude Code workspace and it learns how to use this library — when to reach for it, the install + canonical pattern, the public API, and the gotchas that are easy to miss.

## Install

```bash
pnpm add glow-card-react
```

> _Bleeding edge or before the first npm release: `pnpm add github:kea0811/glow-card-react`._

```bash
# npm / yarn equivalents
npm install glow-card-react
yarn add glow-card-react
```

`react` and `react-dom` are peer dependencies — any version `>= 18` works.

## Quick start

```tsx
import { GlowCard } from 'glow-card-react';

export function Pricing() {
  return (
    <GlowCard color="#7c5cff" className="card">
      <h3>Pro</h3>
      <p>Everything in Free, plus a glow that follows your cursor.</p>
    </GlowCard>
  );
}
```

`<GlowCard>` renders a relatively-positioned `<div>` with an `aria-hidden` glow layer behind your content. Bring your own padding, background, and `border-radius` via `className` or `style` — the glow adapts to whatever box you give it (it even inherits your rounded corners).

## The headless hook

Want your own markup? `useGlowCard` hands back the props to wire up any element. The component is just a thin wrapper around it.

```tsx
import { useGlowCard } from 'glow-card-react';

export function Tile() {
  const { containerProps, glowProps } = useGlowCard({ color: '#2dd4bf' });

  return (
    <div {...containerProps} className="tile">
      <span {...glowProps} />
      <div style={{ position: 'relative', zIndex: 1 }}>Hover me</div>
    </div>
  );
}
```

The pointer position is written straight to the `--glow-x` / `--glow-y` CSS custom properties on the DOM node, so the glow follows the cursor **without** re-rendering React on every mouse move.

## API

### `<GlowCard>`

Accepts every [glow option](#options) plus all standard `<div>` attributes (`className`, `style`, `onClick`, `role`, `ref`, …). Children render above the glow.

### `useGlowCard(options?)`

```ts
const { containerProps, glowProps, isActive, isStatic } = useGlowCard(options);
```

| Returns          | Type                | Description                                                       |
| ---------------- | ------------------- | ---------------------------------------------------------------- |
| `containerProps` | object              | Spread onto the card element (sets `style` + pointer handlers).   |
| `glowProps`      | object              | Spread onto an `aria-hidden` element rendered behind your content. |
| `isActive`       | `boolean`           | `true` while the pointer is over the card.                        |
| `isStatic`       | `boolean`           | `true` when reduced motion is honored (static glow, no tracking). |

### Options

| Option                 | Type      | Default                        | Description                                                              |
| ---------------------- | --------- | ------------------------------ | ------------------------------------------------------------------------ |
| `color`                | `string`  | `'rgba(120,160,255,0.55)'`     | Glow color. Any CSS color — `hsl`, `rgb`, `var(--token)`, etc.           |
| `size`                 | `number`  | `280`                          | Radius of the radial glow, in pixels.                                    |
| `intensity`            | `number`  | `1`                            | Peak glow opacity while hovering (`0`–`1`).                              |
| `fadeDuration`         | `number`  | `250`                          | Fade in/out duration, in milliseconds.                                   |
| `disabled`             | `boolean` | `false`                        | Turn the effect off (no listeners, invisible glow).                      |
| `respectReducedMotion` | `boolean` | `true`                         | Honor `prefers-reduced-motion` with a static, centered glow.             |

You can also override the look in plain CSS — the hook exposes `--glow-color`, `--glow-size`, and `--glow-fade` on the container.

## Accessibility

The glow layer is `aria-hidden`, so it never reaches the accessibility tree. When a visitor enables **reduce motion** at the OS level, the cursor tracking switches off automatically and the glow settles into a calm, static highlight — no configuration required. Opt out with `respectReducedMotion={false}`.

## Examples

```tsx
// A wide, subtle glow
<GlowCard color="rgba(56,189,248,0.5)" size={460} intensity={0.5} />

// Snappier fade
<GlowCard color="#fb923c" fadeDuration={120} />

// Headless, reading the hover state
function Card() {
  const { containerProps, glowProps, isActive } = useGlowCard();
  return (
    <div {...containerProps}>
      <span {...glowProps} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        {isActive ? 'Lit ✨' : 'Hover me'}
      </div>
    </div>
  );
}
```

## SSR

The hook is server-safe. It reads `matchMedia` only inside an effect and falls back gracefully when `window` is unavailable, so it renders fine under Next.js, Remix, and friends.

## Contributing

Issues and PRs are welcome.

```bash
pnpm install        # install workspace deps
pnpm test           # run the suite
pnpm test:coverage  # 100% across statements, branches, functions, lines
pnpm build          # emit ESM + CJS + types
pnpm demo:dev       # run the demo locally
```

## License

[MIT](./LICENSE) © 2026 kea0811
