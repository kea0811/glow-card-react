---
name: glow-card-react
description: Use when adding a cursor-tracking "spotlight" glow that follows the pointer across a card or tile in a React app — a tiny, dependency-free hook + component. React 18 or 19; ships ESM + CJS + types.
---

# glow-card-react

A cursor-tracking glow for React cards. As the pointer moves over an element, a soft radial spotlight follows it; it fades out on leave and respects `prefers-reduced-motion`. Reach for it when a user wants that "the card lights up under my mouse" landing-page effect without pulling in an animation framework. Works with React 18 and 19, has zero runtime dependencies, and writes pointer position to CSS custom properties so it never re-renders on mouse move.

## When to reach for this

User says:
- "make this card glow / light up where my cursor is"
- "add a spotlight / mouse-tracking hover effect to these tiles"
- "I want that pointer-following gradient like on <landing page>"

User does NOT mean this when they ask for:
- ❌ An animated **gradient border** that flows around an element (different effect — use a gradient-border library).
- ❌ A full **3D tilt / parallax** card that rotates toward the cursor (use a tilt library).
- ❌ A static box-shadow glow that doesn't track the pointer (plain CSS `box-shadow` is enough).

## Install

```bash
pnpm add glow-card-react
```

`react` and `react-dom` (>= 18) are peer dependencies.

## Most common pattern (95% of cases)

```tsx
import { GlowCard } from 'glow-card-react';

<GlowCard color="#7c5cff" className="card">
  <h3>Pro</h3>
  <p>A glow that follows your cursor.</p>
</GlowCard>;
```

`<GlowCard>` is a `<div>` underneath — style it with `className`/`style` (padding, background, `border-radius`). Children render above the glow automatically.

Headless variant when you need your own markup:

```tsx
import { useGlowCard } from 'glow-card-react';

const { containerProps, glowProps } = useGlowCard({ color: '#2dd4bf' });

<div {...containerProps} className="tile">
  <span {...glowProps} />
  <div style={{ position: 'relative', zIndex: 1 }}>Hover me</div>
</div>;
```

## API

Exports: `GlowCard` (component), `useGlowCard` (hook), `usePrefersReducedMotion` (hook), plus TypeScript types.

| Option                 | Type      | Default                    | What it does                                          |
| ---------------------- | --------- | -------------------------- | ---------------------------------------------------- |
| `color`                | `string`  | `'rgba(120,160,255,0.55)'` | Glow color (any CSS color).                          |
| `size`                 | `number`  | `280`                      | Glow radius in px.                                   |
| `intensity`            | `number`  | `1`                        | Peak opacity while hovering (0–1).                  |
| `fadeDuration`         | `number`  | `250`                      | Fade in/out in ms.                                  |
| `disabled`             | `boolean` | `false`                    | Turn it off (no listeners, invisible glow).         |
| `respectReducedMotion` | `boolean` | `true`                     | Static centered glow under `prefers-reduced-motion`. |

`useGlowCard` returns `{ containerProps, glowProps, isActive, isStatic }`.

## Gotchas worth knowing

1. The glow layer is positioned `absolute; inset: 0`. Your card content must stack above it — `GlowCard` handles this for you, but with the bare hook you need `position: relative; zIndex: 1` on your content wrapper.
2. The glow inherits the container's `border-radius` (background is clipped to rounded corners), so give the card its radius and the glow follows — no extra config.
3. Pointer position lives in the `--glow-x` / `--glow-y` CSS custom properties, updated imperatively on the DOM node. Don't expect React state to change as the cursor moves; only hover enter/leave flips `isActive`.

## Links

- npm / install: https://www.npmjs.com/package/glow-card-react
- demo / landing: https://glow-card-react.vercel.app
- repo: https://github.com/kea0811/glow-card-react
