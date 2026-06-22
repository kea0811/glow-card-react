import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useGlowCard, DEFAULT_COLOR } from './useGlowCard';
import type { UseGlowCardOptions } from './types';

function Harness(props: UseGlowCardOptions) {
  const { containerProps, glowProps, isActive, isStatic } = useGlowCard(props);
  return (
    <div
      data-testid="container"
      data-active={String(isActive)}
      data-static={String(isStatic)}
      {...containerProps}
    >
      <span data-testid="glow" {...glowProps} />
    </div>
  );
}

function NoArgsProbe() {
  const { glowProps } = useGlowCard();
  return <span data-testid="noargs-glow" {...glowProps} />;
}

// jsdom's PointerEvent drops clientX/clientY; a MouseEvent dispatched under the
// `pointermove` type carries the coordinates and React routes it by type name.
function movePointer(el: HTMLElement, clientX: number, clientY: number) {
  fireEvent(el, new MouseEvent('pointermove', { clientX, clientY, bubbles: true }));
}

function setReducedMotion(matches: boolean) {
  vi.spyOn(window, 'matchMedia').mockReturnValue({
    matches,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  } as unknown as MediaQueryList);
}

describe('useGlowCard', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('works when called with no arguments at all', () => {
    render(<NoArgsProbe />);
    expect(screen.getByTestId('noargs-glow')).toHaveAttribute('aria-hidden');
  });

  it('uses sensible defaults and stays invisible until hovered', () => {
    render(<Harness />);
    const container = screen.getByTestId('container');
    const glow = screen.getByTestId('glow');

    expect(container).toHaveStyle({ position: 'relative' });
    expect(container.style.getPropertyValue('--glow-color')).toBe(DEFAULT_COLOR);
    expect(container.style.getPropertyValue('--glow-size')).toBe('280px');
    expect(container.style.getPropertyValue('--glow-fade')).toBe('250ms');
    expect(glow).toHaveAttribute('aria-hidden');
    expect(glow.style.opacity).toBe('0');
    expect(container).toHaveAttribute('data-static', 'false');
    expect(container).toHaveAttribute('data-active', 'false');
  });

  it('honors custom options', () => {
    render(<Harness color="#ff0066" size={400} intensity={0.7} fadeDuration={500} />);
    const container = screen.getByTestId('container');
    expect(container.style.getPropertyValue('--glow-color')).toBe('#ff0066');
    expect(container.style.getPropertyValue('--glow-size')).toBe('400px');
    expect(container.style.getPropertyValue('--glow-fade')).toBe('500ms');
  });

  it('tracks the pointer and fades in on hover, out on leave', () => {
    render(<Harness intensity={0.8} />);
    const container = screen.getByTestId('container');
    const glow = screen.getByTestId('glow');

    fireEvent.pointerEnter(container);
    expect(container).toHaveAttribute('data-active', 'true');
    expect(glow.style.opacity).toBe('0.8');

    movePointer(container, 40, 25);
    expect(container.style.getPropertyValue('--glow-x')).toBe('40px');
    expect(container.style.getPropertyValue('--glow-y')).toBe('25px');

    fireEvent.pointerLeave(container);
    expect(container).toHaveAttribute('data-active', 'false');
    expect(glow.style.opacity).toBe('0');
  });

  it('does nothing when disabled', () => {
    render(<Harness disabled />);
    const container = screen.getByTestId('container');
    const glow = screen.getByTestId('glow');

    expect(glow.style.opacity).toBe('0');
    fireEvent.pointerEnter(container);
    // No listener is attached, so the card stays inactive and invisible.
    expect(container).toHaveAttribute('data-active', 'false');
    expect(glow.style.opacity).toBe('0');
  });

  it('shows a static centered glow under reduced motion', () => {
    setReducedMotion(true);
    render(<Harness intensity={0.6} />);
    const container = screen.getByTestId('container');
    const glow = screen.getByTestId('glow');

    expect(container).toHaveAttribute('data-static', 'true');
    expect(glow.style.opacity).toBe('0.6');
    expect(glow.style.transition).toBe('none');

    // Tracking is disabled, so pointer moves do not set a position.
    movePointer(container, 10, 10);
    expect(container.style.getPropertyValue('--glow-x')).toBe('');
  });

  it('keeps tracking when respectReducedMotion is false', () => {
    setReducedMotion(true);
    render(<Harness respectReducedMotion={false} />);
    const container = screen.getByTestId('container');

    expect(container).toHaveAttribute('data-static', 'false');
    fireEvent.pointerEnter(container);
    expect(container).toHaveAttribute('data-active', 'true');
    movePointer(container, 5, 7);
    expect(container.style.getPropertyValue('--glow-x')).toBe('5px');
  });
});
