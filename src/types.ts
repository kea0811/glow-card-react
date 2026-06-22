import type { CSSProperties, PointerEventHandler } from 'react';

/**
 * Options that control the cursor-tracking glow.
 *
 * Every field is optional — sensible defaults are applied so `useGlowCard()`
 * and `<GlowCard />` work with zero configuration.
 */
export interface UseGlowCardOptions {
  /**
   * Glow color. Any CSS color works — `hsl`, `rgb`, `var(--token)`, etc.
   * @default 'rgba(120, 160, 255, 0.55)'
   */
  color?: string;
  /**
   * Radius of the radial glow, in pixels.
   * @default 280
   */
  size?: number;
  /**
   * Peak glow opacity while the pointer is over the card (`0`–`1`).
   * @default 1
   */
  intensity?: number;
  /**
   * Fade in/out duration, in milliseconds.
   * @default 250
   */
  fadeDuration?: number;
  /**
   * Disable the effect entirely. The glow layer renders but stays invisible
   * and no pointer listeners are attached.
   * @default false
   */
  disabled?: boolean;
  /**
   * When `true`, honor `prefers-reduced-motion: reduce` by showing a static,
   * centered glow with no cursor tracking and no fade.
   * @default true
   */
  respectReducedMotion?: boolean;
}

/**
 * Props to spread onto the card container element.
 */
export interface GlowContainerProps {
  style: CSSProperties;
  onPointerMove?: PointerEventHandler<HTMLElement>;
  onPointerEnter?: PointerEventHandler<HTMLElement>;
  onPointerLeave?: PointerEventHandler<HTMLElement>;
}

/**
 * Props to spread onto the `aria-hidden` glow layer placed behind your content.
 */
export interface GlowLayerProps {
  'aria-hidden': true;
  style: CSSProperties;
}

/**
 * Return value of {@link useGlowCard}.
 */
export interface UseGlowCardResult {
  /** Spread onto the card container element. */
  containerProps: GlowContainerProps;
  /** Spread onto an `aria-hidden` element rendered behind your content. */
  glowProps: GlowLayerProps;
  /** `true` while the pointer is hovering the card. */
  isActive: boolean;
  /** `true` when reduced motion is honored (static glow, no tracking). */
  isStatic: boolean;
}
