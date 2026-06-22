import { useState } from 'react';
import { GlowCard, useGlowCard } from 'glow-card-react';

const INSTALL = 'pnpm add glow-card-react';

const PALETTE = [
  { label: 'Iris', hint: 'rgba(124, 92, 255, .55)', color: 'rgba(124, 92, 255, 0.55)' },
  { label: 'Aqua', hint: 'rgba(45, 212, 191, .5)', color: 'rgba(45, 212, 191, 0.5)' },
  { label: 'Sunset', hint: 'rgba(251, 146, 60, .5)', color: 'rgba(251, 146, 60, 0.5)' },
  { label: 'Rose', hint: 'rgba(244, 63, 94, .5)', color: 'rgba(244, 63, 94, 0.5)' },
  { label: 'Sky', hint: 'rgba(56, 189, 248, .5)', color: 'rgba(56, 189, 248, 0.5)' },
  { label: 'Lime', hint: 'rgba(163, 230, 53, .5)', color: 'rgba(163, 230, 53, 0.5)' },
];

const SIZES = [
  { label: 'Tight', sub: 'size={140}', size: 140 },
  { label: 'Default', sub: 'size={280}', size: 280 },
  { label: 'Wide', sub: 'size={460}', size: 460 },
];

const INTENSITIES = [
  { label: 'Subtle', sub: 'intensity={0.4}', intensity: 0.4 },
  { label: 'Balanced', sub: 'intensity={0.7}', intensity: 0.7 },
  { label: 'Bold', sub: 'intensity={1}', intensity: 1 },
];

const COMPONENT_SNIPPET = `import { GlowCard } from 'glow-card-react';

export function Pricing() {
  return (
    <GlowCard color="#7c5cff" className="card">
      <h3>Pro</h3>
      <p>A glow that follows your cursor.</p>
    </GlowCard>
  );
}`;

const HOOK_SNIPPET = `import { useGlowCard } from 'glow-card-react';

export function Tile() {
  const { containerProps, glowProps } = useGlowCard({
    color: '#2dd4bf',
  });

  return (
    <div {...containerProps} className="tile">
      <span {...glowProps} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        Hover me
      </div>
    </div>
  );
}`;

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className="copy-btn"
      aria-label="Copy install command"
      onClick={() => {
        void navigator.clipboard?.writeText(text);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1400);
      }}
    >
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

function CodeBlock({ code, label }: { code: string; label: string }) {
  return (
    <figure className="code">
      <figcaption className="code-label">{label}</figcaption>
      <pre className="code-pre">
        <code>{code}</code>
      </pre>
    </figure>
  );
}

/** Hook-driven tile, mirroring the second usage snippet. */
function HookTile() {
  const { containerProps, glowProps } = useGlowCard({ color: 'rgba(45, 212, 191, 0.55)' });
  return (
    <div {...containerProps} className="tile hook-tile">
      <span {...glowProps} />
      <div className="tile-body">
        <p className="tile-label">Built with the hook</p>
        <p className="tile-sub">Bring your own markup — the glow is headless.</p>
      </div>
    </div>
  );
}

export function App() {
  return (
    <div className="page">
      <header className="nav">
        <span className="nav-brand">glow-card-react</span>
        <nav className="nav-links">
          <a className="nav-link" href="https://github.com/kea0811/glow-card-react">
            GitHub
          </a>
          <a className="nav-link" href="https://www.npmjs.com/package/glow-card-react">
            npm
          </a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <p className="hero-eyebrow">React 18 &amp; 19 · zero dependencies</p>
          <h1 className="hero-title">
            A glow that follows
            <br />
            your cursor.
          </h1>
          <p className="hero-tagline">
            Drop a soft, cursor-tracking spotlight onto any card. One component, one hook, and a
            handful of props — no canvas, no runtime dependencies.
          </p>
          <div className="install">
            <code className="install-code">{INSTALL}</code>
            <CopyButton text={INSTALL} />
          </div>
          <p className="hero-hint">Move your cursor across the cards below ↓</p>
        </section>

        <section className="stage" aria-label="Interactive preview">
          <GlowCard color="rgba(124, 92, 255, 0.6)" size={420} className="tile stage-card">
            <div className="tile-body">
              <p className="stage-kicker">Spotlight</p>
              <p className="stage-headline">Hover anywhere on me.</p>
              <p className="stage-sub">
                The glow tracks your pointer in real time and fades out when you leave.
              </p>
            </div>
          </GlowCard>
        </section>

        <section className="section">
          <div className="section-head">
            <h2 className="section-title">A glow for every brand</h2>
            <p className="section-lead">
              Pass any CSS color to <code className="inline-code">color</code>. Every tile below is
              the same component with a different hue.
            </p>
          </div>
          <div className="grid grid-3">
            {PALETTE.map((p) => (
              <GlowCard key={p.label} color={p.color} className="tile">
                <div className="tile-body">
                  <span className="swatch" style={{ background: p.color }} aria-hidden="true" />
                  <p className="tile-label">{p.label}</p>
                  <p className="tile-sub">
                    <code className="inline-code">{p.hint}</code>
                  </p>
                </div>
              </GlowCard>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-head">
            <h2 className="section-title">Dial in the radius</h2>
            <p className="section-lead">
              <code className="inline-code">size</code> sets the glow radius in pixels — from a
              tight highlight to a room-filling wash.
            </p>
          </div>
          <div className="grid grid-3">
            {SIZES.map((s) => (
              <GlowCard key={s.label} color="rgba(56, 189, 248, 0.55)" size={s.size} className="tile">
                <div className="tile-body">
                  <p className="tile-label">{s.label}</p>
                  <p className="tile-sub">
                    <code className="inline-code">{s.sub}</code>
                  </p>
                </div>
              </GlowCard>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-head">
            <h2 className="section-title">Set the intensity</h2>
            <p className="section-lead">
              <code className="inline-code">intensity</code> controls peak opacity, so the glow can
              whisper or shout.
            </p>
          </div>
          <div className="grid grid-3">
            {INTENSITIES.map((i) => (
              <GlowCard
                key={i.label}
                color="rgba(251, 146, 60, 0.6)"
                intensity={i.intensity}
                className="tile"
              >
                <div className="tile-body">
                  <p className="tile-label">{i.label}</p>
                  <p className="tile-sub">
                    <code className="inline-code">{i.sub}</code>
                  </p>
                </div>
              </GlowCard>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-head">
            <h2 className="section-title">Headless when you need it</h2>
            <p className="section-lead">
              Prefer your own markup? <code className="inline-code">useGlowCard</code> hands back
              the props to wire up any element.
            </p>
          </div>
          <div className="grid grid-2">
            <HookTile />
            <GlowCard color="rgba(244, 63, 94, 0.55)" className="tile">
              <div className="tile-body">
                <p className="tile-label">Built with the component</p>
                <p className="tile-sub">
                  <code className="inline-code">&lt;GlowCard&gt;</code> wraps the same hook with a
                  ready-made layer.
                </p>
              </div>
            </GlowCard>
          </div>
        </section>

        <section className="section">
          <div className="section-head">
            <h2 className="section-title">Respects reduced motion</h2>
            <p className="section-lead">
              When a visitor asks the OS to reduce motion, the glow stops chasing the cursor and
              settles into a calm, static highlight. Toggle it in your system settings to see this
              card stop tracking.
            </p>
          </div>
          <div className="grid grid-1">
            <GlowCard color="rgba(163, 230, 53, 0.5)" className="tile rm-card">
              <div className="tile-body">
                <p className="tile-label">prefers-reduced-motion: respected</p>
                <p className="tile-sub">
                  No flag to flip — it is on by default. Opt out with{' '}
                  <code className="inline-code">respectReducedMotion={'{false}'}</code>.
                </p>
              </div>
            </GlowCard>
          </div>
        </section>

        <section className="section usage">
          <div className="section-head">
            <h2 className="section-title">The five-second integration</h2>
            <p className="section-lead">
              Install it, import it, give it a color. That is the whole API surface for the common
              case.
            </p>
          </div>
          <div className="install install--wide">
            <code className="install-code">{INSTALL}</code>
            <CopyButton text={INSTALL} />
          </div>
          <div className="grid grid-2">
            <CodeBlock label="Component" code={COMPONENT_SNIPPET} />
            <CodeBlock label="Hook" code={HOOK_SNIPPET} />
          </div>
        </section>
      </main>

      <footer className="footer">
        <p className="footer-text">
          MIT licensed · built with React 19, ships for React 18 &amp; 19.
        </p>
        <p className="footer-text footer-dim">
          <a className="nav-link" href="https://github.com/kea0811/glow-card-react">
            Source on GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}
