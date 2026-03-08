import { useState, useEffect, useRef } from "react";

const GOLD = "#B8965A";
const OFF_WHITE = "#f5f0e8";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@300;400;500;600;700;800&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400;1,600&display=swap');

  .ax-root * { margin:0; padding:0; box-sizing:border-box; }

  .ax-root {
    position:relative; width:100%; min-height:100vh;
    overflow:hidden; display:flex; flex-direction:column;
    font-family:'Syne',sans-serif;
  }

  .ax-root::after {
    content:''; position:absolute; inset:0;
    background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
    opacity:0.04; z-index:1; pointer-events:none;
  }

  .ax-video {
    position:absolute; inset:0; width:100%; height:100%;
    object-fit:cover; z-index:0;
  }

  /* NAV */
  .ax-nav {
    position:relative; z-index:10;
    display:flex; align-items:center; justify-content:space-between;
    padding:1.8rem 3.5rem;
    transition:all 0.4s ease;
  }
  .ax-nav.scrolled {
    background:rgba(10,9,7,0.65);
    backdrop-filter:blur(14px);
    border-bottom:1px solid rgba(184,150,90,0.18);
  }
  .ax-logo {
    font-family:'Syne',sans-serif; font-weight:700;
    font-size:1.35rem; letter-spacing:0.08em;
    color:#fff; text-decoration:none; text-transform:uppercase;
  }
  .ax-logo span { color:${GOLD}; }
  .ax-nav-links { display:flex; gap:0.2rem; list-style:none; align-items:center; }
  .ax-nav-link {
    font-family:'Syne',sans-serif; font-size:0.7rem; font-weight:500;
    letter-spacing:0.18em; text-transform:uppercase;
    color:rgba(255,255,255,0.85); text-decoration:none;
    padding:0.42rem 0.9rem; border-radius:4px;
    transition:background 0.25s, color 0.25s;
  }
  .ax-nav-link:hover { background:rgba(255,255,255,0.1); color:#fff; }
  .ax-nav-cta {
    font-family:'Syne',sans-serif; font-size:0.7rem; font-weight:600;
    letter-spacing:0.18em; text-transform:uppercase;
    color:#171717; background:${OFF_WHITE};
    padding:0.58rem 1.35rem; border-radius:2px;
    text-decoration:none; transition:background 0.25s;
  }
  .ax-nav-cta:hover { background:#fff; }

  /* BODY */
  .ax-body {
    position:relative; z-index:10; flex:1;
    display:flex; flex-direction:column;
    align-items:center; justify-content:flex-end;
    padding-bottom:250px; text-align:center;
  }

  /* BADGE */
  .ax-badge-outer {
    display:inline-flex; align-items:center; border-radius:999px;
    background:rgba(255,255,255,0.08);
    backdrop-filter:blur(6px); -webkit-backdrop-filter:blur(6px);
    border:1px solid rgba(255,255,255,0.14);
    padding:4px; margin-bottom:2.2rem;
    opacity:0; animation:axFadeDown 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s forwards;
  }
  .ax-badge-inner {
    display:flex; align-items:center; gap:0.55rem;
    background:rgba(255,255,255,0.9);
    backdrop-filter:blur(10px); -webkit-backdrop-filter:blur(10px);
    border-radius:999px; padding:0.38rem 1.1rem;
    font-family:'Syne',sans-serif; font-size:0.66rem; font-weight:600;
    letter-spacing:0.18em; text-transform:uppercase; color:#1a1a1a;
  }
  .ax-badge-dot { width:6px; height:6px; border-radius:50%; background:${GOLD}; flex-shrink:0; }

  /* FRAME */
  .ax-frame {
    position:relative; padding:2.5rem 3.5rem;
    display:flex; flex-direction:column; align-items:center;
  }
  .ax-corner {
    position:absolute; width:7px; height:7px; background:${GOLD};
    opacity:0; animation:axFadeIn 0.6s ease 1.2s forwards;
  }
  .ax-tl { top:0; left:0; }
  .ax-tr { top:0; right:0; }
  .ax-bl { bottom:0; left:0; }
  .ax-br { bottom:0; right:0; }

  /* HEADLINE */
  .ax-h1 {
    font-family:'Syne',sans-serif; font-weight:300;
    font-size:clamp(2.5rem,5vw,4.6rem); color:#fff;
    line-height:1.08; letter-spacing:-0.02em;
    opacity:0; animation:axFadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.45s forwards;
  }
  .ax-h2 {
    font-family:'Cormorant Garamond',Georgia,serif;
    font-style:italic; font-weight:300;
    font-size:clamp(2.8rem,5.8vw,5.4rem); color:#fff;
    line-height:1.0; letter-spacing:0.01em;
    opacity:0; animation:axFadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.62s forwards;
  }
  .ax-accent { color:${GOLD}; }

  .ax-sub {
    font-family:'Syne',sans-serif; font-size:0.93rem; font-weight:400;
    color:rgba(255,255,255,0.68); max-width:510px;
    line-height:1.8; margin:1.6rem 0 2.4rem;
    opacity:0; animation:axFadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.78s forwards;
  }

  /* BTNS */
  .ax-btns {
    display:flex; gap:1rem; align-items:center;
    opacity:0; animation:axFadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.92s forwards;
  }
  .ax-btn-p {
    font-family:'Syne',sans-serif; font-size:0.72rem; font-weight:600;
    letter-spacing:0.18em; text-transform:uppercase;
    color:#171717; background:${OFF_WHITE};
    padding:0.85rem 1.9rem; border-radius:2px;
    text-decoration:none; border:none; cursor:pointer;
    transition:background 0.25s, transform 0.2s;
    display:flex; align-items:center; gap:0.55rem;
  }
  .ax-btn-p:hover { background:#fff; transform:translateY(-1px); }
  .ax-btn-g {
    font-family:'Syne',sans-serif; font-size:0.72rem; font-weight:500;
    letter-spacing:0.18em; text-transform:uppercase;
    color:rgba(255,255,255,0.8); background:transparent;
    padding:0.85rem 1.6rem; border-radius:2px;
    text-decoration:none; border:1px solid rgba(255,255,255,0.25);
    cursor:pointer; transition:background 0.25s, border-color 0.25s, color 0.25s;
  }
  .ax-btn-g:hover { background:rgba(255,255,255,0.08); border-color:rgba(255,255,255,0.5); color:#fff; }

  /* SCROLL HINT */
  .ax-scroll {
    position:absolute; bottom:5.5rem; left:50%;
    transform:translateX(-50%); z-index:10;
    display:flex; flex-direction:column; align-items:center; gap:0.45rem;
    opacity:0; animation:axFadeIn 1s ease 1.4s forwards;
  }
  .ax-scroll span {
    font-family:'Syne',sans-serif; font-size:0.58rem;
    letter-spacing:0.25em; text-transform:uppercase;
    color:rgba(255,255,255,0.4);
  }
  .ax-scroll-line {
    width:1px; height:38px;
    background:linear-gradient(to bottom, rgba(184,150,90,0.9), transparent);
    animation:axPulse 2s ease-in-out infinite;
  }

  /* STATS */
  .ax-stats {
    position:absolute; bottom:0; left:0; right:0; z-index:10;
    display:flex; justify-content:space-between; align-items:center;
    padding:1.1rem 3.5rem;
    background:rgba(0,0,0,0.38);
    backdrop-filter:blur(10px); -webkit-backdrop-filter:blur(10px);
    border-top:1px solid rgba(184,150,90,0.22);
    opacity:0; animation:axFadeUp 1s ease 1.1s forwards;
  }
  .ax-stat { display:flex; flex-direction:column; align-items:center; gap:0.12rem; }
  .ax-stat-val {
    font-family:'Cormorant Garamond',Georgia,serif;
    font-style:italic; font-size:1.9rem; font-weight:300;
    color:${GOLD}; line-height:1;
  }
  .ax-stat-lbl {
    font-family:'Syne',sans-serif; font-size:0.56rem;
    letter-spacing:0.2em; text-transform:uppercase;
    color:rgba(255,255,255,0.4);
  }
  .ax-sep { width:1px; height:30px; background:rgba(184,150,90,0.22); }

  /* KEYFRAMES */
  @keyframes axFadeDown {
    from { opacity:0; transform:translateY(-14px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes axFadeUp {
    from { opacity:0; transform:translateY(22px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes axFadeIn { to { opacity:1; } }
  @keyframes axPulse {
    0%,100% { opacity:0.3; transform:scaleY(0.5); }
    50%     { opacity:1; transform:scaleY(1); }
  }

  @media(max-width:768px){
    .ax-nav { padding:1.4rem 1.4rem; }
    .ax-nav-links,.ax-nav-cta { display:none; }
    .ax-body { padding-bottom:150px; }
    .ax-stats { padding:0.9rem 1.4rem; flex-wrap:wrap; gap:0.8rem; justify-content:center; }
    .ax-frame { padding:1.5rem 1.2rem; }
    .ax-sep { display:none; }
  }
`;

const STATS = [
  { val: "18+", lbl: "Years Experience" },
  null,
  { val: "40K+", lbl: "Sq. Ft. Delivered" },
  null,
  { val: "16+", lbl: "Projects" },
  null,
  { val: "4", lbl: "Sectors" },
  null,
  { val: "0", lbl: "Ad-Driven Clients" },
];

const NAV_ITEMS = ["About", "Services", "Projects", "Why Us"];

export default function AxiomHero() {
  const [scrolled, setScrolled] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = css;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);

  useEffect(() => {
    const container = rootRef.current;
    if (!container) return;
    const onScroll = () => setScrolled(container.scrollTop > 40);
    container.addEventListener("scroll", onScroll);
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={rootRef}
      className="ax-root"
      style={{ height: "100vh", overflowY: "auto", overflowX: "hidden" }}
    >
      {/* Video */}
      <video
        className="ax-video"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260306_074215_04640ca7-042c-45d6-bb56-58b1e8a42489.mp4"
        autoPlay loop muted playsInline
      />

      {/* Nav */}
      <nav className={`ax-nav${scrolled ? " scrolled" : ""}`}>
        <a href="#" className="ax-logo">Axiom<span>.</span></a>
        <ul className="ax-nav-links">
          {NAV_ITEMS.map(item => (
            <li key={item}><a href="#" className="ax-nav-link">{item}</a></li>
          ))}
        </ul>
        <a href="#" className="ax-nav-cta">Start a Project</a>
      </nav>

      {/* Body */}
      <div className="ax-body">
        <div className="ax-frame">
          {/* Gold corner accents */}
          <div className="ax-corner ax-tl" />
          <div className="ax-corner ax-tr" />
          <div className="ax-corner ax-bl" />
          <div className="ax-corner ax-br" />

          {/* Liquid glass badge */}
          <div className="ax-badge-outer">
            <div className="ax-badge-inner">
              <div className="ax-badge-dot" />
              18+ Years of Crafted Spaces · Mumbai
              <div className="ax-badge-dot" />
            </div>
          </div>

          {/* Headline */}
          <h1 className="ax-h1">Studio that transforms your</h1>
          <h2 className="ax-h2">
            spaces into <span className="ax-accent">stories.</span>
          </h2>

          {/* Subhead */}
          <p className="ax-sub">
            From idea to handover — Axiom Design Studio delivers world-class interiors
            across Residential, Hospitality, Retail and Corporate sectors.
            Built purely on word-of-mouth. Zero ads, all craft.
          </p>

          {/* Buttons */}
          <div className="ax-btns">
            <a href="#" className="ax-btn-p">
              View Our Work
              <svg width="13" height="7" viewBox="0 0 13 7" fill="none">
                <path d="M0 3.5H11M8 1L11 3.5L8 6" stroke="#171717" strokeWidth="1.2"/>
              </svg>
            </a>
            <a href="#" className="ax-btn-g">Get in Touch</a>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="ax-scroll">
        <span>Scroll</span>
        <div className="ax-scroll-line" />
      </div>

      {/* Stats strip */}
      <div className="ax-stats">
        {STATS.map((s, i) =>
          s ? (
            <div className="ax-stat" key={i}>
              <span className="ax-stat-val">{s.val}</span>
              <span className="ax-stat-lbl">{s.lbl}</span>
            </div>
          ) : (
            <div className="ax-sep" key={i} />
          )
        )}
      </div>
    </div>
  );
}
