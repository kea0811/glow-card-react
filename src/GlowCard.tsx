import { forwardRef } from 'react';
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { useGlowCard } from './useGlowCard';
import type { UseGlowCardOptions } from './types';

/**
 * Props for {@link GlowCard}. Combines the glow options with the standard
 * attributes of a `<div>`, so `className`, `style`, `onClick`, `role`, etc.
 * all pass straight through.
 */
export interface GlowCardProps
  extends UseGlowCardOptions,
    Omit<HTMLAttributes<HTMLDivElement>, 'color'> {
  children?: ReactNode;
}

const CONTENT_STYLE: CSSProperties = { position: 'relative', zIndex: 1 };

/**
 * A ready-made card that lights up under the cursor.
 *
 * Renders a relatively-positioned `<div>` with an `aria-hidden` glow layer
 * behind your content. Bring your own padding, background, and border-radius
 * via `className` or `style` — the glow adapts to whatever box you give it.
 *
 * @example
 * ```tsx
 * <GlowCard color="#7c5cff" className="card">
 *   <h3>Spotlight</h3>
 *   <p>Move your cursor across me.</p>
 * </GlowCard>
 * ```
 */
export const GlowCard = forwardRef<HTMLDivElement, GlowCardProps>(function GlowCard(
  {
    color,
    size,
    intensity,
    fadeDuration,
    disabled,
    respectReducedMotion,
    className,
    style,
    children,
    ...rest
  },
  ref,
) {
  const { containerProps, glowProps } = useGlowCard({
    color,
    size,
    intensity,
    fadeDuration,
    disabled,
    respectReducedMotion,
  });

  return (
    <div
      ref={ref}
      className={['glow-card', className].filter(Boolean).join(' ')}
      {...rest}
      {...containerProps}
      style={{ ...containerProps.style, ...style }}
    >
      <span {...glowProps} />
      <div className="glow-card__content" style={CONTENT_STYLE}>
        {children}
      </div>
    </div>
  );
});
