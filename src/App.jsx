import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Aperture,
  Camera,
  Code2,
  Mail,
  Github,
  Instagram,
  ArrowUpRight,
} from "lucide-react";

/**
 * PORTFOLIO — sample draft
 * A single-person portfolio spanning astrophotography, photography, and tech apps.
 *
 * DESIGN CONCEPT
 * The three practices are tied together by one idea: exposure metadata.
 * Photos carry EXIF (ISO, aperture, exposure time); astro shots carry
 * acquisition data (optics, integration time); apps carry their own
 * "metadata" (stack, role, platform). Every gallery card reveals this
 * data on hover in a monospace "readout" style, so the structural device
 * is drawn from the subject rather than decorating it.
 *
 * Replace the placeholder gradient "plates" in CATEGORIES with real
 * background-image URLs (or <img> tags) when you have actual work to show.
 * Replace NAME, TAGLINE, and the contact links with your own.
 *
 * DEPLOYMENT — <head> tags for index.html
 * This component sets document.title at runtime, but for social previews
 * and search results, add these to the <head> of your index.html:
 *
 *   <title>CuriouStream — night sky, streets, and side projects</title>
 *   <meta name="description" content="CuriouStream is N. Kato's collection
 *     of astrophotography, photography, and small apps built after hours
 *     alongside a career teaching ESL." />
 *   <link rel="canonical" href="https://curioustream.uz/" />
 *   <meta property="og:title" content="CuriouStream" />
 *   <meta property="og:description" content="Astrophotography, photography,
 *     and side-project apps — built after hours by an ESL teacher." />
 *   <meta property="og:url" content="https://curioustream.uz/" />
 *   <meta property="og:type" content="website" />
 *   <meta name="twitter:card" content="summary_large_image" />
 *
 * og:image / twitter:image are omitted here since there's no real photo
 * yet — add one (1200x630px) once you have a signature shot to lead with.
 */

const BRAND = "CuriouStream";
const DOMAIN = "curioustream.uz";
const NAME = "Javokhir";
const TAGLINE =
  "ESL teacher — night sky, streets, and side projects on the side";

const CATEGORIES = [
  {
    id: "astro",
    label: "Astrophotography",
    icon: Aperture,
    fields: ["Object", "Exposure", "Optics", "Location"],
    blurb:
      "Deep-sky and wide-field work, stacked from home and from dark-sky sites.",
    items: [
      {
        title: "Andromeda Galaxy",
        gradient:
          "linear-gradient(160deg,#141a3d 0%,#2a2f6b 45%,#4a3a7a 75%,#141a3d 100%)",
        data: {
          Object: "M31",
          Exposure: "4h 12m",
          Optics: "130mm APO refractor",
          Location: "Cherry Springs, PA",
        },
      },
      {
        title: "Orion Nebula",
        gradient:
          "linear-gradient(160deg,#1a1230 0%,#4a1f4f 40%,#7a3350 70%,#1a1230 100%)",
        data: {
          Object: "M42",
          Exposure: "2h 40m",
          Optics: '8" Newtonian',
          Location: "Atacama Desert, CL",
        },
      },
      {
        title: "Milky Way over the Ridge",
        gradient:
          "linear-gradient(180deg,#0c1024 0%,#1c2450 55%,#3a2e4a 80%,#151022 100%)",
        data: {
          Object: "Galactic core panorama",
          Exposure: "45s × 18",
          Optics: "14mm f/1.8",
          Location: "Alabama Hills, CA",
        },
      },
      {
        title: "Lunar Terminator",
        gradient: "linear-gradient(160deg,#1b1b28 0%,#3d3d4f 50%,#61616f 100%)",
        data: {
          Object: "Copernicus crater",
          Exposure: "1/125s",
          Optics: '9.25" SCT',
          Location: "Backyard observatory",
        },
      },
      {
        title: "Perseid Meteor",
        gradient:
          "linear-gradient(160deg,#0e1330 0%,#242a5e 45%,#3d3a70 75%,#12102a 100%)",
        data: {
          Object: "Single frame, radiant peak",
          Exposure: "20s",
          Optics: "24mm f/1.4",
          Location: "Cherry Springs, PA",
        },
      },
      {
        title: "Rosette Nebula",
        gradient:
          "linear-gradient(160deg,#170f28 0%,#552244 45%,#7a3a2e 75%,#170f28 100%)",
        data: {
          Object: "NGC 2237",
          Exposure: "6h 30m",
          Optics: "80mm APO refractor",
          Location: "Remote hosted rig",
        },
      },
    ],
  },
  {
    id: "photo",
    label: "Photography",
    icon: Camera,
    fields: ["Location", "Camera", "Lens", "Aperture"],
    blurb: "Street, landscape, and portrait frames shot on the way through.",
    items: [
      {
        title: "Fog, Green Mountains",
        gradient: "linear-gradient(160deg,#3a3a34 0%,#6b6a5c 50%,#a6a08a 100%)",
        data: {
          Location: "Vermont",
          Camera: "35mm film",
          Lens: "85mm",
          Aperture: "f/2",
        },
      },
      {
        title: "Night Market",
        gradient:
          "linear-gradient(160deg,#241a12 0%,#6b3a1e 45%,#a35a24 80%,#241a12 100%)",
        data: {
          Location: "Chiang Mai, TH",
          Camera: "Mirrorless",
          Lens: "35mm",
          Aperture: "f/1.8",
        },
      },
      {
        title: "Portrait, Window Light",
        gradient: "linear-gradient(160deg,#2e2620 0%,#5c4a3a 50%,#8a715a 100%)",
        data: {
          Location: "Studio",
          Camera: "Mirrorless",
          Lens: "50mm",
          Aperture: "f/1.4",
        },
      },
      {
        title: "Low Tide",
        gradient: "linear-gradient(180deg,#2a3438 0%,#4e6268 55%,#8a9a94 100%)",
        data: {
          Location: "Normandy coast, FR",
          Camera: "Mirrorless",
          Lens: "24mm",
          Aperture: "f/8",
        },
      },
      {
        title: "Commuters",
        gradient: "linear-gradient(160deg,#1c1c22 0%,#3e3e4a 50%,#6a6a76 100%)",
        data: {
          Location: "Tokyo Station, JP",
          Camera: "Rangefinder",
          Lens: "35mm",
          Aperture: "f/2.8",
        },
      },
      {
        title: "Harvest",
        gradient: "linear-gradient(160deg,#332616 0%,#6e5324 50%,#a4832e 100%)",
        data: {
          Location: "Family farm",
          Camera: "35mm film",
          Lens: "50mm",
          Aperture: "f/2.5",
        },
      },
    ],
  },
  {
    id: "tech",
    label: "Tech apps",
    icon: Code2,
    fields: ["Stack", "Role", "Platform", "Year"],
    blurb: "Small tools, mostly built to scratch my own itch.",
    items: [
      {
        title: "Waypoint — trip planner",
        gradient: "linear-gradient(160deg,#0e2a2e 0%,#1c5e5f 55%,#2e8a86 100%)",
        data: {
          Stack: "React Native, Node",
          Role: "Solo dev",
          Platform: "iOS / Android",
          Year: "2025",
        },
      },
      {
        title: "Ledger — finance tracker",
        gradient: "linear-gradient(160deg,#101a2e 0%,#1e3a5f 55%,#2e5c8a 100%)",
        data: {
          Stack: "Swift, CoreData",
          Role: "Design + dev",
          Platform: "iOS",
          Year: "2024",
        },
      },
      {
        title: "Cadence — habit tracker",
        gradient: "linear-gradient(160deg,#161226 0%,#3a2a5c 55%,#5c3e8a 100%)",
        data: {
          Stack: "React, Supabase",
          Role: "Frontend",
          Platform: "Web",
          Year: "2025",
        },
      },
      {
        title: "Field Notes — this site",
        gradient: "linear-gradient(160deg,#221515 0%,#5c2e2a 55%,#8a4a3e 100%)",
        data: {
          Stack: "Next.js",
          Role: "Solo dev",
          Platform: "Web",
          Year: "2026",
        },
      },
      {
        title: "Aperture — EXIF organizer",
        gradient: "linear-gradient(160deg,#1a1c12 0%,#4a4e26 55%,#7a8038 100%)",
        data: {
          Stack: "Electron, Rust",
          Role: "Solo dev",
          Platform: "Desktop",
          Year: "2023",
        },
      },
      {
        title: "Nightlog — session logger",
        gradient: "linear-gradient(160deg,#0c0f24 0%,#1e2a5c 55%,#32448a 100%)",
        data: {
          Stack: "SwiftUI",
          Role: "Solo dev",
          Platform: "iOS",
          Year: "2024",
        },
      },
    ],
  },
];

function Starfield({ reduceMotion }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let stars = [];

    function resize() {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width * devicePixelRatio;
      canvas.height = height * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
      const count = Math.floor((width * height) / 4200);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.1 + 0.25,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.015 + 0.004,
      }));
    }

    function draw(t) {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      for (const s of stars) {
        const twinkle = reduceMotion
          ? 0.75
          : 0.55 + 0.45 * Math.sin(t * s.speed + s.phase);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(237,234,224,${twinkle.toFixed(3)})`;
        ctx.fill();
      }
      if (!reduceMotion) raf = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    draw(0);
    return () => {
      window.removeEventListener("resize", resize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduceMotion]);

  return <canvas ref={ref} className="starfield" aria-hidden="true" />;
}

function ExposureCard({ item, fields }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      className="card"
      style={{ background: item.gradient }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      tabIndex={0}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
    >
      <div className="card-grain" aria-hidden="true" />
      <div className="card-title">{item.title}</div>
      <div className={"card-meta" + (hover ? " card-meta--open" : "")}>
        {fields.map((f) => (
          <div className="meta-row" key={f}>
            <span className="meta-label">{f}</span>
            <span className="meta-value">{item.data[f]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DialNav({ categories, active, onSelect }) {
  return (
    <div className="dial" role="tablist" aria-label="Portfolio categories">
      {categories.map((c) => {
        const Icon = c.icon;
        const isActive = c.id === active;
        return (
          <button
            key={c.id}
            role="tab"
            aria-selected={isActive}
            className={"dial-item" + (isActive ? " dial-item--active" : "")}
            onClick={() => onSelect(c.id)}
          >
            <Icon size={16} strokeWidth={1.75} className="dial-icon" />
            <span>{c.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState(CATEGORIES[0].id);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    document.title = "CuriouStream — night sky, streets, and side projects";
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = (e) => setReduceMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const current = useMemo(
    () => CATEGORIES.find((c) => c.id === active),
    [active],
  );
  const totalFrames = useMemo(
    () => CATEGORIES.reduce((n, c) => n + c.items.length, 0),
    [],
  );

  return (
    <div className="page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400;1,6..72,500&family=IBM+Plex+Sans:wght@400;500&family=IBM+Plex+Mono:wght@400;500&display=swap');

        .page {
          --bg: #0b0d1a;
          --bg-alt: #10132a;
          --surface: #171b33;
          --text: #ede9dd;
          --text-muted: #8a8fa8;
          --gold: #d9b26a;
          --cyan: #6fe0d0;
          --line: rgba(237,233,221,0.12);
          background: var(--bg);
          color: var(--text);
          font-family: 'IBM Plex Sans', sans-serif;
          min-height: 100vh;
          line-height: 1.5;
        }
        .page * { box-sizing: border-box; }
        .display { font-family: 'Newsreader', serif; }
        .mono { font-family: 'IBM Plex Mono', monospace; letter-spacing: 0.02em; }

        .nav {
          display: flex; align-items: center; justify-content: space-between;
          padding: 28px 6vw; position: relative; z-index: 3;
        }
        .nav-name { font-size: 15px; letter-spacing: 0.08em; }
        .brand { display: flex; align-items: baseline; gap: 10px; }
        .brand-word-wrap { position: relative; display: inline-block; width: fit-content; }
        .brand-word {
          font-family: 'Newsreader', serif; font-style: italic; font-weight: 500;
          font-size: 20px;
        }
        .brand-underline {
          position: absolute; left: 0; bottom: -4px; height: 1.5px; width: 100%;
          background: linear-gradient(90deg, var(--gold), var(--cyan));
          transform-origin: left; animation: streak 1.1s cubic-bezier(.3,.8,.3,1) both;
          animation-delay: 0.2s;
        }
        @media (prefers-reduced-motion: reduce) { .brand-underline { animation: none; } }
        @keyframes streak { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        .brand-domain { font-size: 11px; color: var(--text-muted); }
        .nav-links { display: flex; gap: 28px; }
        .nav-links a { color: var(--text-muted); text-decoration: none; font-size: 14px; transition: color 0.2s; }
        .nav-links a:hover, .nav-links a:focus-visible { color: var(--text); }

        .hero {
          position: relative; min-height: 78vh; display: flex; flex-direction: column;
          justify-content: flex-end; padding: 0 6vw 64px; overflow: hidden;
        }
        .starfield { position: absolute; inset: 0; width: 100%; height: 100%; }
        .hero-inner { position: relative; z-index: 2; max-width: 760px; }
        .hero-eyebrow {
          font-size: 12px; text-transform: uppercase; letter-spacing: 0.16em;
          color: var(--gold); margin-bottom: 18px;
        }
        .hero h1 {
          font-family: 'Newsreader', serif; font-weight: 500; font-style: italic;
          font-size: clamp(38px, 6vw, 68px); line-height: 1.05; margin: 0 0 20px;
        }
        .hero p { color: var(--text-muted); font-size: 17px; max-width: 540px; margin: 0 0 28px; }
        .hero-stat { display: flex; gap: 22px; font-size: 12px; color: var(--text-muted); }
        .hero-stat span.mono { color: var(--text); }

        .section { padding: 90px 6vw; position: relative; z-index: 2; }
        .section-head { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 36px; flex-wrap: wrap; gap: 16px; }
        .section-head h2 { font-family: 'Newsreader', serif; font-weight: 500; font-size: 30px; margin: 0; }
        .section-head p { color: var(--text-muted); font-size: 14px; max-width: 380px; margin: 6px 0 0; }

        .dial {
          display: flex; gap: 4px; padding: 4px; border: 1px solid var(--line);
          border-radius: 999px; width: fit-content; margin-bottom: 44px;
          background-image: repeating-linear-gradient(90deg, var(--line) 0 1px, transparent 1px 14px);
          background-position: center top; background-repeat: no-repeat; background-size: 100% 1px;
        }
        .dial-item {
          display: flex; align-items: center; gap: 8px; padding: 10px 18px;
          border-radius: 999px; border: none; background: transparent; color: var(--text-muted);
          font-family: 'IBM Plex Sans', sans-serif; font-size: 13px; cursor: pointer;
          transition: background 0.25s, color 0.25s;
        }
        .dial-item:hover { color: var(--text); }
        .dial-item--active { background: var(--surface); color: var(--gold); }
        .dial-icon { transition: transform 0.4s ease; }
        .dial-item--active .dial-icon { transform: rotate(45deg); }

        .grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 18px;
        }
        .card {
          position: relative; aspect-ratio: 4 / 5; border-radius: 6px; overflow: hidden;
          padding: 16px; display: flex; align-items: flex-end; border: 1px solid var(--line);
          cursor: default; outline: none;
        }
        .card:focus-visible { border-color: var(--gold); }
        .card-grain {
          position: absolute; inset: 0;
          background-image:
            radial-gradient(circle at 12% 18%, rgba(255,255,255,0.5) 0.5px, transparent 1px),
            radial-gradient(circle at 68% 32%, rgba(255,255,255,0.35) 0.6px, transparent 1px),
            radial-gradient(circle at 38% 62%, rgba(255,255,255,0.4) 0.5px, transparent 1px),
            radial-gradient(circle at 82% 78%, rgba(255,255,255,0.3) 0.6px, transparent 1px),
            radial-gradient(circle at 24% 84%, rgba(255,255,255,0.4) 0.5px, transparent 1px);
          background-size: 140px 140px; opacity: 0.8;
        }
        .card-title {
          position: relative; z-index: 1; font-family: 'Newsreader', serif; font-style: italic;
          font-size: 18px; color: #fff; text-shadow: 0 1px 8px rgba(0,0,0,0.4);
        }
        .card-meta {
          position: absolute; left: 0; right: 0; bottom: 0; z-index: 2;
          background: rgba(11,13,26,0.88); padding: 14px 16px;
          transform: translateY(100%); transition: transform 0.3s ease;
        }
        .card-meta--open { transform: translateY(0); }
        .meta-row { display: flex; justify-content: space-between; gap: 10px; font-size: 11.5px; padding: 3px 0; }
        .meta-label { font-family: 'IBM Plex Mono', monospace; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; }
        .meta-value { font-family: 'IBM Plex Mono', monospace; color: var(--cyan); text-align: right; }

        .about { display: grid; grid-template-columns: 1fr 1.4fr; gap: 48px; align-items: start; }
        .about h2 { font-family: 'Newsreader', serif; font-style: italic; font-size: 26px; margin: 0 0 20px; }
        .about p { color: var(--text-muted); font-size: 15px; margin: 0 0 14px; max-width: 46ch; }

        .contact { text-align: center; padding-bottom: 60px; }
        .contact h2 { font-family: 'Newsreader', serif; font-style: italic; font-size: clamp(30px, 5vw, 46px); margin: 0 0 20px; }
        .contact-links { display: flex; gap: 28px; justify-content: center; flex-wrap: wrap; }
        .contact-links a {
          display: flex; align-items: center; gap: 6px; color: var(--text); text-decoration: none;
          font-size: 14px; border-bottom: 1px solid var(--line); padding-bottom: 3px; transition: border-color 0.2s, color 0.2s;
        }
        .contact-links a:hover { color: var(--gold); border-color: var(--gold); }

        .footer { display: flex; justify-content: space-between; padding: 24px 6vw 40px; color: var(--text-muted); font-size: 12px; border-top: 1px solid var(--line); }

        @media (max-width: 720px) {
          .about { grid-template-columns: 1fr; }
          .section { padding: 64px 6vw; }
        }
      `}</style>

      <nav className="nav">
        <div className="brand">
          <span className="brand-word-wrap">
            <span className="brand-word">{BRAND}</span>
            <span className="brand-underline" aria-hidden="true" />
          </span>
          <span className="brand-domain mono">{DOMAIN}</span>
        </div>
        <div className="nav-links">
          <a href="#work">After hours</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <header className="hero">
        <Starfield reduceMotion={reduceMotion} />
        <div className="hero-inner">
          <div className="hero-eyebrow mono">{TAGLINE}</div>
          <h1>
            I teach English for a living. Everything below is what I do after
            class.
          </h1>
          <p>
            By day I teach ESL. Evenings and weekends go to whatever's pointed a
            lens, or a laptop, at something worth paying attention to: galaxies,
            city streets, and small apps built to organize the other two.
          </p>
          <div className="hero-stat">
            <span>
              <span className="mono">{totalFrames}</span> frames
            </span>
            <span>·</span>
            <span>
              Updated <span className="mono">Jan 2026</span>
            </span>
          </div>
        </div>
      </header>

      <section className="section" id="work">
        <div className="section-head">
          <div>
            <h2>After hours</h2>
            <p>{current.blurb}</p>
          </div>
        </div>
        <DialNav categories={CATEGORIES} active={active} onSelect={setActive} />
        <div className="grid">
          {current.items.map((item) => (
            <ExposureCard
              key={item.title}
              item={item}
              fields={current.fields}
            />
          ))}
        </div>
      </section>

      <section className="section about" id="about">
        <h2>About</h2>
        <div>
          <p>
            I teach English to young learners, mostly conversation and exam
            prep, and have for the better part of a decade. It's close reading,
            a lot of listening, and a fair amount of patience — most of which
            turns out to transfer well to a lens.
          </p>
          <p>
            The camera came first, as a way to get away from a screen after a
            day of lesson planning. The lens followed once I ran out of things
            to photograph during daylight. The apps came last, mostly to keep
            the other two organized.
          </p>
          <p>
            This site is a record of the second kind of hour — not the classroom
            kind, the ones after.
          </p>
        </div>
      </section>

      <section className="section contact" id="contact">
        <h2>Say hello, or send coordinates.</h2>
        <div className="contact-links">
          <a href="mailto:fracta7@gmail.com">
            <Mail size={16} strokeWidth={1.75} />
            fracta7@gmail.com
          </a>
          <a href="https://github.com/fracta7">
            <Github size={16} strokeWidth={1.75} />
            github
          </a>
          <a href="https://instagram.com/javokhir_mat">
            <Instagram size={16} strokeWidth={1.75} />
            instagram
          </a>
        </div>
      </section>

      <footer className="footer">
        <span>
          &copy; {new Date().getFullYear()} {BRAND} — {NAME}
        </span>
        <span className="mono">{DOMAIN}</span>
      </footer>
    </div>
  );
}
