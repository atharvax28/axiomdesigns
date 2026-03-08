import { useState, useEffect, useRef } from "react";

const GOLD = "#B8965A";
const OFF_WHITE = "#f5f0e8";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400;1,600&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --gold: ${GOLD};
    --off-white: ${OFF_WHITE};
    --syne: 'Syne', sans-serif;
    --cormorant: 'Cormorant Garamond', Georgia, serif;
  }

  body { overflow-x: hidden; }

  .hero-wrapper {
    position: relative;
    width: 100vw;
    min-height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    font-family: var(--syne);
  }

  /* ── video bg ── */
  .hero-video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
  }

  /* subtle grain overlay for luxury texture */
  .hero-wrapper::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
    opacity: 0.04;
    z-index: 1;
    pointer-events: none;
  }

  /* ── nav ── */
  .nav {
    position: relative;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2rem 3.5rem;
    transition: all 0.4s ease;
  }

  .nav-logo {
    font-family: var(--syne);
    font-weight: 700;
    font-size: 1.35rem;
    letter-spacing: 0.08em;
    color: #fff;
    text-decoration: none;
    text-transform: uppercase;
  }

  .nav-logo span {
    color: var(--gold);
  }

  .nav-links {
    display: flex;
    gap: 0.25rem;
    list-style: none;
    align-items: center;
  }

  .nav-link {
    font-family: var(--syne);
    font-size: 0.72rem;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.85);
    text-decoration: none;
    padding: 0.45rem 0.9rem;
    border-radius: 4px;
    transition: background-color 0.25s ease, color 0.25s ease;
  }

  .nav-link:hover {
    background: rgba(255,255,255,0.1);
    color: #fff;
  }

  .nav-cta {
    font-family: var(--syne);
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #171717;
    background: var(--off-white);
    padding: 0.6rem 1.4rem;
    border-radius: 2px;
    text-decoration: none;
    transition: background 0.25s ease;
  }

  .nav-cta:hover { background: #fff; }

  /* ── hero body ── */
  .hero-body {
    position: relative;
    z-index: 10;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 250px;
    text-align: center;
  }

  /* ── badge ── */
  .badge-outer {
    display: inline-flex;
    align-items: center;
    border-radius: 999px;
    background: rgba(255,255,255,0.08);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    border: 1px solid rgba(255,255,255,0.14);
    padding: 4px;
    margin-bottom: 2.5rem;
    opacity: 0;
    animation: fadeSlideDown 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s forwards;
  }

  .badge-inner {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    background: rgba(255,255,255,0.9);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-radius: 999px;
    padding: 0.4rem 1.1rem;
    font-family: var(--syne);
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #1a1a1a;
  }

  .badge-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--gold);
    flex-shrink: 0;
  }

  /* ── headline ── */
  .headline-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
    margin-bottom: 1.8rem;
  }

  .headline-line1 {
    font-family: var(--syne);
    font-weight: 300;
    font-size: clamp(2.8rem, 5.5vw, 5rem);
    color: #fff;
    line-height: 1.08;
    letter-spacing: -0.02em;
    opacity: 0;
    animation: fadeSlideUp 1s cubic-bezier(0.16,1,0.3,1) 0.45s forwards;
  }

  .headline-line2 {
    font-family: var(--cormorant);
    font-style: italic;
    font-weight: 300;
    font-size: clamp(3.2rem, 6.5vw, 6rem);
    color: #fff;
    line-height: 1.0;
    letter-spacing: 0.01em;
    opacity: 0;
    animation: fadeSlideUp 1s cubic-bezier(0.16,1,0.3,1) 0.6s forwards;
  }

  .headline-accent {
    color: var(--gold);
    font-style: italic;
  }

  /* ── subhead ── */
  .subhead {
    font-family: var(--syne);
    font-size: 0.95rem;
    font-weight: 400;
    color: rgba(255,255,255,0.7);
    max-width: 520px;
    line-height: 1.75;
    margin-bottom: 2.5rem;
    opacity: 0;
    animation: fadeSlideUp 1s cubic-bezier(0.16,1,0.3,1) 0.75s forwards;
  }

  /* ── buttons ── */
  .btn-row {
    display: flex;
    gap: 1rem;
    align-items: center;
    opacity: 0;
    animation: fadeSlideUp 1s cubic-bezier(0.16,1,0.3,1) 0.9s forwards;
  }

  .btn-primary-hero {
    font-family: var(--syne);
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #171717;
    background: ${OFF_WHITE};
    padding: 0.9rem 2rem;
    border-radius: 2px;
    text-decoration: none;
    border: none;
    cursor: pointer;
    transition: background 0.25s ease, transform 0.2s ease;
    display: flex; align-items: center; gap: 0.6rem;
  }
  .btn-primary-hero:hover { background: #fff; transform: translateY(-1px); }

  .btn-ghost-hero {
    font-family: var(--syne);
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.8);
    background: transparent;
    padding: 0.9rem 1.6rem;
    border-radius: 2px;
    text-decoration: none;
    border: 1px solid rgba(255,255,255,0.25);
    cursor: pointer;
    transition: background 0.25s ease, border-color 0.25s, color 0.25s;
    display: flex; align-items: center; gap: 0.6rem;
  }
  .btn-ghost-hero:hover {
    background: rgba(255,255,255,0.08);
    border-color: rgba(255,255,255,0.5);
    color: #fff;
  }

  /* ── corner accents ── */
  .content-frame {
    position: relative;
    padding: 2.5rem 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .corner {
    position: absolute;
    width: 7px;
    height: 7px;
    background: var(--gold);
    opacity: 0;
    animation: fadeIn 0.6s ease 1.2s forwards;
  }
  .corner-tl { top: 0; left: 0; }
  .corner-tr { top: 0; right: 0; }
  .corner-bl { bottom: 0; left: 0; }
  .corner-br { bottom: 0; right: 0; }

  /* ── scroll indicator ── */
  .scroll-hint {
    position: absolute;
    bottom: 2.5rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    opacity: 0;
    animation: fadeIn 1s ease 1.4s forwards;
  }

  .scroll-hint span {
    font-family: var(--syne);
    font-size: 0.6rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.45);
  }

  .scroll-line {
    width: 1px;
    height: 40px;
    background: linear-gradient(to bottom, rgba(184,150,90,0.8), transparent);
    animation: scrollPulse 2s ease-in-out infinite;
  }

  /* ── stats strip at bottom ── */
  .stats-strip {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.2rem 3.5rem;
    background: rgba(0,0,0,0.35);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border-top: 1px solid rgba(184,150,90,0.2);
    opacity: 0;
    animation: fadeSlideUp 1s ease 1.1s forwards;
  }

  .stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.15rem;
  }

  .stat-val {
    font-family: var(--cormorant);
    font-size: 1.8rem;
    font-weight: 300;
    color: var(--gold);
    line-height: 1;
    font-style: italic;
  }

  .stat-lbl {
    font-family: var(--syne);
    font-size: 0.58rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.45);
  }

  .stat-sep {
    width: 1px;
    height: 32px;
    background: rgba(184,150,90,0.25);
  }

  /* ── keyframes ── */
  @keyframes fadeSlideDown {
    from { opacity: 0; transform: translateY(-16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    to { opacity: 1; }
  }
  @keyframes scrollPulse {
    0%, 100% { opacity: 0.3; transform: scaleY(0.6); }
    50%       { opacity: 1;   transform: scaleY(1); }
  }

  /* ── responsive ── */
  @media (max-width: 768px) {
    .nav { padding: 1.5rem 1.5rem; }
    .nav-links { display: none; }
    .hero-body { padding-bottom: 160px; }
    .stats-strip { padding: 1rem 1.5rem; gap: 0; }
    .stat-val { font-size: 1.3rem; }
    .content-frame { padding: 1.5rem 1.2rem; }
  }
`;

export default function AxiomHero() {
  const videoRef = useRef(null);
  const [navScrolled, setNavScrolled] = useState(false);

  useEffect(() => {
    const styleEl = document.createElement("style");
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
    return () => document.head.removeChild(styleEl);
  }, []);

  useEffect(() => {
    const handleScroll = () => setNavScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = ["About", "Services", "Projects", "Why Us"];

  return (
    <section className="hero-wrapper">
      {/* ── Background Video ── */}
      <video
        ref={videoRef}
        className="hero-video"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260306_074215_04640ca7-042c-45d6-bb56-58b1e8a42489.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* ── Nav ── */}
      <nav
        className="nav"
        style={
          navScrolled
            ? {
                background: "rgba(10,9,7,0.6)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                borderBottom: "1px solid rgba(184,150,90,0.15)",
              }
            : {}
        }
      >
        <a href="#" className="nav-logo">
          Axiom<span>.</span>
        </a>
        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item}>
              <a href={`#${item.toLowerCase().replace(" ", "-")}`} className="nav-link">
                {item}
              </a>
            </li>
          ))}
        </ul>
        <a href="#contact" className="nav-cta">
          Start a Project
        </a>
      </nav>

      {/* ── Hero Body ── */}
      <div className="hero-body">
        <div className="content-frame">
          {/* Golden corner accents */}
          <div className="corner corner-tl" />
          <div className="corner corner-tr" />
          <div className="corner corner-bl" />
          <div className="corner corner-br" />

          {/* Liquid glass badge */}
          <div className="badge-outer">
            <div className="badge-inner">
              <div className="badge-dot" />
              18+ Years of Crafted Spaces · Mumbai
              <div className="badge-dot" />
            </div>
          </div>

          {/* Headline */}
          <div className="headline-wrap">
            <h1 className="headline-line1">Studio that transforms your</h1>
            <h2 className="headline-line2">
              spaces into <span className="headline-accent">stories.</span>
            </h2>
          </div>

          {/* Subhead */}
          <p className="subhead">
            From idea to handover — Axiom Design Studio delivers world-class
            interiors across Residential, Hospitality, Retail and Corporate sectors.
            Built purely on word-of-mouth. Zero ads, all craft.
          </p>

          {/* CTA Buttons */}
          <div className="btn-row">
            <a href="#projects" className="btn-primary-hero">
              View Our Work
              <svg width="14" height="7" viewBox="0 0 14 7" fill="none">
                <path d="M0 3.5H12M9 1L12 3.5L9 6" stroke="#171717" strokeWidth="1.2"/>
              </svg>
            </a>
            <a href="#contact" className="btn-ghost-hero">
              Start a Project
            </a>
          </div>
        </div>
      </div>

      {/* ── Scroll hint ── */}
      <div className="scroll-hint">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>

      {/* ── Stats strip ── */}
      <div className="stats-strip">
        {[
          { val: "18+", lbl: "Years Experience" },
          null,
          { val: "40K+", lbl: "Sq. Ft. Delivered" },
          null,
          { val: "16+", lbl: "Portfolio Projects" },
          null,
          { val: "4", lbl: "Sectors Served" },
          null,
          { val: "0", lbl: "Ad-Driven Clients" },
        ].map((item, i) =>
          item ? (
            <div className="stat-item" key={i}>
              <span className="stat-val">{item.val}</span>
              <span className="stat-lbl">{item.lbl}</span>
            </div>
          ) : (
            <div className="stat-sep" key={i} />
          )
        )}
      </div>
    </section>
  );
}
