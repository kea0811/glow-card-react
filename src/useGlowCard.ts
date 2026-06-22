import { useCallback, useState } from 'react';
import type { CSSProperties, PointerEvent as ReactPointerEvent } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';
import type { UseGlowCardOptions, UseGlowCardResult } from './types';

export const DEFAULT_COLOR = 'rgba(120, 160, 255, 0.55)';
export const DEFAULT_SIZE = 280;
export const DEFAULT_INTENSITY = 1;
export const DEFAULT_FADE_DURATION = 250;

/**
 * Headless cursor-tracking glow.
 *
 * Spread `containerProps` onto your card element and render an element with
 * `glowProps` behind your content. Pointer position is written to the
 * `--glow-x` / `--glow-y` custom properties directly on the DOM node, so the
 * glow follows the cursor without triggering a React re-render on every move.
 *
 * @example
 * ```tsx
 * const { containerProps, glowProps } = useGlowCard({ color: '#7c5cff' });
 * return (
 *   <div {...containerProps} className="card">
 *     <span {...glowProps} />
 *     <div style={{ position: 'relative', zIndex: 1 }}>Hover me</div>
 *   </div>
 * );
 * ```
 */
export function useGlowCard(options: UseGlowCardOptions = {}): UseGlowCardResult {
  const {
    color = DEFAULT_COLOR,
    size = DEFAULT_SIZE,
    intensity = DEFAULT_INTENSITY,
    fadeDuration = DEFAULT_FADE_DURATION,
    disabled = false,
    respectReducedMotion = true,
  } = options;

  const prefersReducedMotion = usePrefersReducedMotion();
  const isStatic = respectReducedMotion && prefersReducedMotion;
  const isInteractive = !disabled && !isStatic;

  const [isActive, setIsActive] = useState(false);

  const handlePointerMove = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--glow-x', `${event.clientX - rect.left}px`);
    el.style.setProperty('--glow-y', `${event.clientY - rect.top}px`);
  }, []);

  const handlePointerEnter = useCallback(() => setIsActive(true), []);
  const handlePointerLeave = useCallback(() => setIsActive(false), []);

  const containerStyle: CSSProperties = {
    position: 'relative',
    // Exposed as custom properties so consumers can also override them in CSS.
    ['--glow-color' as string]: color,
    ['--glow-size' as string]: `${size}px`,
    ['--glow-fade' as string]: `${fadeDuration}ms`,
  };

  let glowOpacity: number;
  if (disabled) {
    glowOpacity = 0;
  } else if (isStatic) {
    glowOpacity = intensity;
  } else {
    glowOpacity = isActive ? intensity : 0;
  }

  const glowStyle: CSSProperties = {
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    pointerEvents: 'none',
    opacity: glowOpacity,
    background:
      'radial-gradient(circle var(--glow-size, 280px) at var(--glow-x, 50%) var(--glow-y, 50%), var(--glow-color, rgba(120,160,255,0.55)), transparent 65%)',
    transition: isStatic ? 'none' : 'opacity var(--glow-fade, 250ms) ease',
  };

  const containerProps: UseGlowCardResult['containerProps'] = isInteractive
    ? {
        style: containerStyle,
        onPointerMove: handlePointerMove,
        onPointerEnter: handlePointerEnter,
        onPointerLeave: handlePointerLeave,
      }
    : { style: containerStyle };

  return {
    containerProps,
    glowProps: { 'aria-hidden': true, style: glowStyle },
    isActive,
    isStatic,
  };
}
