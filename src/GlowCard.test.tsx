import { describe, it, expect, vi } from 'vitest';
import { createRef } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { GlowCard } from './GlowCard';

describe('GlowCard', () => {
  it('renders children inside a glow-card with a hidden glow layer', () => {
    render(<GlowCard>Hello</GlowCard>);
    const card = document.querySelector('.glow-card') as HTMLElement;

    expect(card).toBeInTheDocument();
    expect(card).toHaveStyle({ position: 'relative' });

    const content = card.querySelector('.glow-card__content');
    expect(content).toHaveTextContent('Hello');

    const glow = card.querySelector('[aria-hidden="true"]');
    expect(glow).toBeInTheDocument();
    // The glow layer is painted before the content in document order.
    expect(card.firstElementChild).toBe(glow);
  });

  it('merges a custom className and style and forwards the ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <GlowCard ref={ref} className="custom" style={{ padding: 24 }} color="#7c5cff">
        Hi
      </GlowCard>,
    );
    const card = screen.getByText('Hi').closest('.glow-card') as HTMLElement;

    expect(card.className).toBe('glow-card custom');
    expect(card).toHaveStyle({ padding: '24px' });
    expect(card.style.getPropertyValue('--glow-color')).toBe('#7c5cff');
    expect(ref.current).toBe(card);
  });

  it('passes through arbitrary div attributes and events', () => {
    const onClick = vi.fn();
    render(
      <GlowCard role="button" data-testid="card" onClick={onClick}>
        Click
      </GlowCard>,
    );
    const card = screen.getByTestId('card');

    expect(card).toHaveAttribute('role', 'button');
    fireEvent.click(card);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('falls back to just the base class when no className is given', () => {
    render(<GlowCard>Bare</GlowCard>);
    const card = screen.getByText('Bare').closest('.glow-card') as HTMLElement;
    expect(card.className).toBe('glow-card');
  });
});
