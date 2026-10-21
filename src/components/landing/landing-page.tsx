"use client";
import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type CSSProperties,
} from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowDown,
  ArrowDownToLine,
  ArrowRight,
  ArrowUpRight,
  Blend,
  Check,
  ChevronDown,
  CloudFog,
  Crosshair,
  Diamond,
  Droplets,
  Film,
  Flame,
  Focus,
  Layers3,
  LockKeyhole,
  Menu,
  MousePointer2,
  Pause,
  Play,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Timer,
  WandSparkles,
  X,
  Zap,
} from "lucide-react";
import { Ambient } from "./ambient";
import { EffectArt, effects, categories, type Effect } from "./effects";
import { Studio } from "./studio";
import { Brand, Button, Eyebrow, Modal, Reveal } from "./ui";

function goTo(id: string) {
  document.getElementById(id)?.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "instant"
      : "smooth",
    block: "start",
  });
}
const workflowSteps = [
  {
    title: "Start with your shot",
    text: "Bring your footage. Keep every original frame, performance, and camera move.",
    icon: Film,
  },
  {
    title: "Show us your vision",
    text: "Choose a reference, describe an effect, and guide it toward your imagination.",
    icon: Focus,
  },
  {
    title: "Shape every detail",
    text: "Define the first spark, the peak, and the fade. Refine each independent layer.",
    icon: SlidersHorizontal,
  },
  {
    title: "Make the impossible",
    text: "Compose your vision. Export the finished scene or take your FX layers further.",
    icon: Layers3,
  },
];
const tools = [
  {
    icon: Focus,
    title: "Reference-guided creation",
    text: "Give your imagination a starting point. Match the reference, stay close, or explore a new direction.",
    tags: "Exact · Close · Original",
  },
  {
    icon: Timer,
    title: "Timing is everything",
    text: "From the first frame to the last ember. Place the onset, peak, and dissipation exactly where you want them.",
    tags: "Start · Peak · Dissipation",
  },
  {
    icon: Crosshair,
    title: "Built to follow your scene",
    text: "A vision for motion-aware effects that track movement, attach to objects, and feel grounded in the shot.",
    tags: "Motion tracking · Object attachment",
    planned: true,
  },
  {
    icon: Blend,
    title: "The art of integration",
    text: "Blend independent layers and shape their opacity. Build depth with dedicated lighting and shadow passes.",
    tags: "Blending · Lighting · Shadows",
  },
  {
    icon: WandSparkles,
    title: "Refine with intention",
    text: "Keep what works. Revisit a layer, correct a frame, and explore a new variation without starting over.",
    tags: "Selective regeneration · Frame correction",
    planned: true,
  },
  {
    icon: ArrowDownToLine,
    title: "Made for your workflow",
    text: "A flexible export vision for compositors: isolated effects, transparent layers, and production-ready sequences.",
    tags: "FX-only · ProRes 4444 · EXR",
    planned: true,
  },
];

function Hero({ onReel }: { onReel: () => void }) {
  const root = useRef<HTMLElement>(null),
    video = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const { scrollYProgress } = useScroll({
    target: root,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  useEffect(() => {
    const el = video.current;
    const section = root.current;
    if (!el || !section) return;
    let visible = true;
    const syncPlayback = () => {
      if (reduced || paused || !visible || document.hidden) el.pause();
      else void el.play().catch(() => {});
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        syncPlayback();
      },
      { threshold: 0.05 },
    );
    observer.observe(section);
    document.addEventListener("visibilitychange", syncPlayback);
    syncPlayback();
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
    };
  }, [reduced, paused]);
  return (
    <section className="hero" ref={root}>
      <motion.div className="hero-visual" style={{ y: reduced ? 0 : y }}>
        <video
          ref={video}
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/media/hero.webp"
          aria-hidden="true"
        >
          <source src="/media/hero-loop.mp4" type="video/mp4" />
        </video>
      </motion.div>
      <div className="hero-shade" />
      <div className="hero-grain" />
      <div className="hero-content container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85 }}
        >
          <a href="#studio" className="launch-pill">
            <span className="pill-spark">
              <Sparkles size={12} />
            </span>
            A new era of artist-led VFX
            <span className="pill-divider" />
            <ArrowUpRight size={13} />
          </a>
          <h1>
            Preserve the shot.
            <br />
            Create the
            <br />
            <span>impossible.</span>
          </h1>
          <p className="hero-description">
            Your footage. Your vision. Extraordinary effects.
            <br />
            AI-powered VFX on independent layers, with you
            <br className="desktop-break" /> in control of every frame.
          </p>
          <div className="hero-actions">
            <Button onClick={() => goTo("studio")} arrow>
              Explore the studio
            </Button>
            <Button onClick={onReel} secondary>
              <span className="play-circle">
                <Play size={10} fill="currentColor" />
              </span>
              Watch the vision
            </Button>
          </div>
          <div className="hero-caption">
            <ShieldCheck size={13} />
            <span>Original footage, always untouched.</span>
            <i />
            <span>Built for artists.</span>
          </div>
        </motion.div>
      </div>
      <motion.div
        className="hero-layer-label"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2 }}
      >
        <span className="target-point" />
        <div>
          <span className="mini-caption">FX LAYER 01</span>
          <strong>
            Inferno portal <Sparkles size={12} />
          </strong>
          <div>
            <span className="green-dot" /> Independent. Editable. Yours.
          </div>
        </div>
      </motion.div>
      <div className="hero-bottom container">
        <a href="#workflow">
          <span className="scroll-mouse">
            <span />
          </span>
          SCROLL TO DISCOVER <ArrowDown size={12} />
        </a>
        <span className="hero-scene-meta">
          THE CROSSING <i>/</i> CONCEPT SCENE 001
        </span>
        <button
          className="ambient-toggle"
          aria-label={paused ? "Play ambient video" : "Pause ambient video"}
          onClick={() => setPaused(!paused)}
        >
          {paused ? <Play size={12} /> : <Pause size={12} />}
          <span>{paused ? "PLAY AMBIENCE" : "PAUSE AMBIENCE"}</span>
        </button>
      </div>
    </section>
  );
}

function Workflow() {
  const [active, setActive] = useState(1);
  return (
    <section className="section workflow-section" id="workflow">
      <div className="container">
        <Reveal className="section-heading centered">
          <Eyebrow>FROM IMAGINATION TO IMPACT</Eyebrow>
          <h2>
            One scene.
            <br />
            <span className="text-muted">Infinite possibilities.</span>
          </h2>
          <p>
            Bring the footage. Direct the effect. Make it unmistakably yours.
          </p>
        </Reveal>
        <Reveal className="workflow-visual">
          <div className="funnel-orbits" aria-hidden="true">
            <svg viewBox="0 0 1000 280" preserveAspectRatio="none">
              <defs>
                <linearGradient id="flowGradient">
                  <stop stopColor="#ff7b37" stopOpacity=".1" />
                  <stop offset=".5" stopColor="#bb93ff" stopOpacity=".7" />
                  <stop offset="1" stopColor="#ff9c53" stopOpacity=".4" />
                </linearGradient>
              </defs>
              {[30, 75, 125, 175, 225, 270].map((n, i) => (
                <path
                  key={n}
                  className={`flow-path path-${i}`}
                  d={`M 0 ${n} C 300 ${n}, 300 140, 500 140 S 700 ${n}, 1000 ${n}`}
                />
              ))}
            </svg>
          </div>
          <div className="funnel-inputs">
            {[
              { icon: Flame, name: "Fire", cls: "orange" },
              { icon: CloudFog, name: "Smoke", cls: "silver" },
              { icon: Zap, name: "Electricity", cls: "blue" },
              { icon: Droplets, name: "Water", cls: "cyan" },
              { icon: Sparkles, name: "Magic", cls: "purple" },
            ].map((item, i) => (
              <span
                className={`funnel-chip chip-${i} ${item.cls}`}
                key={item.name}
              >
                <item.icon size={15} />
                {item.name}
              </span>
            ))}
            <span className="funnel-more">
              Dust · Sparks · Rain · Shadows · Atmosphere
            </span>
          </div>
          <div className="funnel-engine">
            <span className="engine-ring ring-one" />
            <span className="engine-ring ring-two" />
            <div>
              <Flame size={38} fill="currentColor" />
              <span>
                YOUR VISION.
                <br />
                AMPLIFIED.
              </span>
            </div>
          </div>
          <div className="funnel-output">
            <div className="output-image" />
            <div className="output-caption">
              <Layers3 size={13} />
              <span>Your scene. Reimagined.</span>
              <Check size={12} />
            </div>
            <span className="output-floating">
              <LockKeyhole size={10} /> SOURCE PRESERVED
            </span>
          </div>
        </Reveal>
        <div className="workflow-steps">
          {workflowSteps.map((step, i) => (
            <button
              key={step.title}
              className={`workflow-step ${active === i ? "active" : ""}`}
              onClick={() => setActive(i)}
              aria-pressed={active === i}
            >
              <span className="step-top">
                <span>0{i + 1}</span>
                <step.icon size={17} />
              </span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
              <span className="step-progress" />
            </button>
          ))}
        </div>
        <p className="workflow-active" aria-live="polite">
          <span>0{active + 1}</span>
          {workflowSteps[active].text}
        </p>
      </div>
    </section>
  );
}

function ArtistControl() {
  const [mode, setMode] = useState("Close");
  return (
    <section className="section artist-section" id="control">
      <div className="container">
        <Reveal className="section-heading horizontal">
          <div>
            <Eyebrow>POWERED BY AI. DIRECTED BY YOU.</Eyebrow>
            <h2>
              More possibility.
              <br />
              <span className="text-muted">Never less control.</span>
            </h2>
          </div>
          <p>
            Your taste is the difference.
            <br />
            We’re building the tools to bring it to life.
          </p>
        </Reveal>
        <div className="control-cards">
          <Reveal className="control-story preserve-story">
            <div className="story-art layer-art">
              <div className="floating-slab slab-source">
                <span>
                  ORIGINAL FOOTAGE <LockKeyhole size={9} />
                </span>
              </div>
              <div className="floating-slab slab-fx">
                <span>
                  FX LAYER <Sparkles size={9} />
                </span>
                <EffectArt type="fire" />
              </div>
              <div className="floating-slab slab-atmosphere">
                <span>
                  ATMOSPHERE <Layers3 size={9} />
                </span>
              </div>
              <div className="protected-tag">
                <ShieldCheck size={12} /> Original pixels. Protected.
              </div>
            </div>
            <div className="story-copy">
              <LockKeyhole size={19} />
              <h3>
                Keep the moment.
                <br />
                Build the extraordinary.
              </h3>
              <p>
                The performance, the framing, the feeling. Your original footage
                stays intact while every effect lives on its own editable layer.
              </p>
            </div>
          </Reveal>
          <Reveal className="control-story reference-story" delay={0.08}>
            <div className="story-art reference-art">
              <div className="reference-art-card">
                <EffectArt type="magic" />
                <span>YOUR REFERENCE</span>
              </div>
              <div className="reference-arrow">
                <WandSparkles size={18} />
                <span>GUIDED BY YOU</span>
              </div>
              <div className="reference-art-card result">
                <EffectArt type={mode === "Original" ? "electric" : "magic"} />
                <span>{mode.toUpperCase()} INTERPRETATION</span>
              </div>
              <div className="reference-modes">
                {["Exact", "Close", "Original"].map((m) => (
                  <button
                    key={m}
                    className={m === mode ? "active" : ""}
                    onClick={() => setMode(m)}
                    aria-pressed={m === mode}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
            <div className="story-copy">
              <Focus size={19} />
              <h3>
                Show the AI
                <br />
                what you have in mind.
              </h3>
              <p>
                {mode === "Exact"
                  ? "Aim for your reference’s shape, motion, and character. Exact is a creative target, with every result open to refinement."
                  : mode === "Close"
                    ? "Start with a sample you love. Keep its character, adapt it to the shot, and give your vision room to evolve."
                    : "Use your reference as a spark. Explore a fresh effect with a character entirely its own."}
              </p>
            </div>
          </Reveal>
          <Reveal className="control-story timing-story" delay={0.16}>
            <div className="story-art timing-art">
              <div className="timing-mini-title">
                <Timer size={12} /> Every frame is a decision.
              </div>
              <svg viewBox="0 0 300 100" aria-hidden="true">
                <defs>
                  <linearGradient id="storyCurve" x1="0" y1="0" x2="0" y2="1">
                    <stop stopColor="#c6a1ff" stopOpacity=".35" />
                    <stop offset="1" stopColor="#c6a1ff" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M 0 85 L 45 85 C 60 85 67 15 100 15 L 160 15 C 220 15 225 85 270 85 L 300 85"
                  fill="url(#storyCurve)"
                  stroke="#ad89ed"
                  strokeWidth="2"
                />
                <circle cx="45" cy="85" r="4" fill="#c6a1ff" />
                <circle cx="100" cy="15" r="4" fill="#c6a1ff" />
                <circle cx="270" cy="85" r="4" fill="#c6a1ff" />
              </svg>
              <div className="timing-legend">
                <span>
                  START<b>024</b>
                </span>
                <span>
                  PEAK<b>072</b>
                </span>
                <span>
                  DISSIPATE<b>216</b>
                </span>
              </div>
              <div className="timing-line">
                <span />
              </div>
              <span className="timing-footnote">
                The right effect. At exactly the right moment.
              </span>
            </div>
            <div className="story-copy">
              <SlidersHorizontal size={19} />
              <h3>
                Direct the spark.
                <br />
                Control the last ember.
              </h3>
              <p>
                Set the onset, shape the peak, and choreograph the dissipation.
                Fine-tune the entire life of an effect, one frame at a time.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Library({ onSelect }: { onSelect: (effect: Effect) => void }) {
  const [category, setCategory] = useState("All effects"),
    [search, setSearch] = useState(""),
    [expanded, setExpanded] = useState(false);
  const filtered = effects.filter(
    (e) =>
      (category === "All effects" || e.category === category) &&
      `${e.name} ${e.category}`.toLowerCase().includes(search.toLowerCase()),
  );
  const shown =
    category === "All effects" && !search && !expanded
      ? filtered.slice(0, 6)
      : filtered;
  return (
    <section className="section library-section" id="library">
      <div className="container">
        <Reveal className="section-heading horizontal">
          <div>
            <Eyebrow>THE EFFECTS LIBRARY</Eyebrow>
            <h2>
              A universe of effects.
              <br />
              <span className="text-muted">Ready for your world.</span>
            </h2>
          </div>
          <div className="library-heading-right">
            <p>
              Discover your next signature effect.
              <br />
              Explore, reference, and make it your own.
            </p>
            <span className="small-note">
              CURATED CONCEPT ASSETS / 15 CATEGORIES
            </span>
          </div>
        </Reveal>
        <div className="library-filters">
          <div
            className="category-pills"
            role="group"
            aria-label="Effect categories"
          >
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={category === c ? "active" : ""}
                aria-pressed={category === c}
              >
                {c}
              </button>
            ))}
          </div>
          <label className="library-search">
            <Search size={15} />
            <input
              aria-label="Search effects"
              placeholder="Find an effect"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button aria-label="Clear search" onClick={() => setSearch("")}>
                <X size={13} />
              </button>
            )}
          </label>
        </div>
        <div className="effect-grid">
          {shown.map((effect, i) => (
            <motion.button
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (i % 6) * 0.04 }}
              className="effect-card"
              key={effect.name}
              onClick={() => onSelect(effect)}
              style={{ "--card-accent": effect.color } as CSSProperties}
            >
              <div className="effect-preview">
                <EffectArt type={effect.type} color={effect.color} />
                <span className="effect-category">
                  <span style={{ background: effect.color }} />
                  {effect.category}
                </span>
                <span className="effect-quality">FX / ALPHA</span>
                <span className="effect-hover-play">
                  <ArrowUpRight size={22} />
                </span>
              </div>
              <div className="effect-card-copy">
                <div>
                  <h3>{effect.name}</h3>
                  <p>{effect.description}</p>
                </div>
                <ArrowUpRight size={18} />
              </div>
            </motion.button>
          ))}
        </div>
        {shown.length === 0 && (
          <div className="empty-results">
            <Search size={26} />
            <h3>No effects found</h3>
            <p>Try another name or browse all categories.</p>
            <button
              className="text-button"
              onClick={() => {
                setSearch("");
                setCategory("All effects");
              }}
            >
              Reset filters <ArrowRight size={14} />
            </button>
          </div>
        )}
        {category === "All effects" && !search && (
          <button
            className="library-expand"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Show curated selection" : "Explore all 15 effects"}
            <ChevronDown size={15} className={expanded ? "rotated" : ""} />
          </button>
        )}
      </div>
    </section>
  );
}

function Elements({ onSelect }: { onSelect: (effect: Effect) => void }) {
  const [active, setActive] = useState(0);
  const effect = effects[active];
  const icons = [Flame, CloudFog, Zap, Sparkles, Droplets, Focus, Layers3];
  return (
    <section className="section elements-section" id="elements">
      <div className="container">
        <Reveal className="section-heading centered">
          <Eyebrow>ENTER A DIFFERENT ELEMENT</Eyebrow>
          <h2>Feel the possibilities.</h2>
          <p>Different worlds. One creative language. Yours.</p>
        </Reveal>
        <div
          className="element-nav"
          role="tablist"
          aria-label="Effect families"
        >
          {effects.slice(0, 7).map((e, i) => {
            const Icon = icons[i];
            return (
              <button
                role="tab"
                aria-selected={active === i}
                tabIndex={active === i ? 0 : -1}
                aria-controls="element-panel"
                id={`element-tab-${i}`}
                key={e.category}
                onClick={() => setActive(i)}
                onKeyDown={(event) => {
                  const next =
                    event.key === "ArrowRight"
                      ? (i + 1) % 7
                      : event.key === "ArrowLeft"
                        ? (i + 6) % 7
                        : event.key === "Home"
                          ? 0
                          : event.key === "End"
                            ? 6
                            : -1;
                  if (next === -1) return;
                  event.preventDefault();
                  setActive(next);
                  document.getElementById(`element-tab-${next}`)?.focus();
                }}
                style={{ "--element-color": e.color } as CSSProperties}
                className={active === i ? "active" : ""}
              >
                <Icon size={17} />
                {e.category}
              </button>
            );
          })}
        </div>
        <div
          className={`element-world world-${effect.type}`}
          id="element-panel"
          role="tabpanel"
          aria-labelledby={`element-tab-${active}`}
          style={{ "--element-color": effect.color } as CSSProperties}
        >
          <AnimatePresence mode="wait">
            <motion.div
              className="element-world-inner"
              key={effect.category}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className="element-art">
                <EffectArt type={effect.type} color={effect.color} />
                <span className="element-coordinate">
                  EF / {String(active + 1).padStart(2, "0")}
                  <br />
                  ELEMENT STUDY
                </span>
                <span className="element-cross cross-one">+</span>
                <span className="element-cross cross-two">+</span>
              </div>
              <div className="element-copy">
                <span className="element-number">
                  0{active + 1} / {effect.category.toUpperCase()}
                </span>
                <h3>{effect.description}</h3>
                <p>{effect.detail}</p>
                <div className="element-tags">
                  {effect.tags.map((tag) => (
                    <span key={tag}>
                      <Check size={12} />
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  className="element-button"
                  onClick={() => onSelect(effect)}
                >
                  Explore {effect.category.toLowerCase()}{" "}
                  <ArrowUpRight size={16} />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Showcase({ onSelect }: { onSelect: (effect: Effect) => void }) {
  const scenes = [
    {
      title: "Make every move electric.",
      category: "ACTION / LIGHTNING",
      effect: effects[2],
      position: "0% 50%",
      credit: "01 / THE LAST STRIKE",
    },
    {
      title: "Let imagination take form.",
      category: "FANTASY / MAGIC",
      effect: effects[3],
      position: "50% 50%",
      credit: "02 / THE AWAKENING",
    },
    {
      title: "Give the moment impact.",
      category: "SCI-FI / EXPLOSION",
      effect: effects[5],
      position: "100% 50%",
      credit: "03 / AFTER THE SILENCE",
    },
  ];
  return (
    <section className="section showcase-section" id="showcase">
      <div className="container">
        <Reveal className="section-heading horizontal">
          <div>
            <Eyebrow>THE SCENE IS ONLY THE BEGINNING</Eyebrow>
            <h2>Dream in effects.</h2>
          </div>
          <p>
            For the shots that stay with you.
            <br />A few visions of what comes next.
          </p>
        </Reveal>
        <div className="showcase-grid">
          {scenes.map((scene, i) => (
            <Reveal delay={i * 0.08} key={scene.title}>
              <button
                className="scene-card"
                onClick={() => onSelect(scene.effect)}
              >
                <div
                  className="scene-card-image"
                  style={{ backgroundPosition: scene.position }}
                />
                <span className="scene-card-credit">{scene.credit}</span>
                <div className="scene-card-copy">
                  <span>{scene.category}</span>
                  <h3>{scene.title}</h3>
                  <div>
                    Explore the effect <ArrowUpRight size={17} />
                  </div>
                </div>
                <span className="scene-card-play">
                  <Play size={15} fill="currentColor" />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
        <p className="showcase-note">
          Illustrative concept scenes. A glimpse of the creative direction.
        </p>
      </div>
    </section>
  );
}

export function LandingPage() {
  const [menu, setMenu] = useState(false),
    [reel, setReel] = useState(false),
    [selectedEffect, setSelectedEffect] = useState<Effect | null>(null);
  const [studioEffect, setStudioEffect] = useState<Effect | undefined>(),
    [studioKey, setStudioKey] = useState(0);
  const [about, setAbout] = useState<string | null>(null);
  const closeReel = useCallback(() => setReel(false), []),
    closeEffect = useCallback(() => setSelectedEffect(null), []),
    closeAbout = useCallback(() => setAbout(null), []);
  function openEffectInStudio(effect: Effect) {
    setStudioEffect(effect);
    setStudioKey((k) => k + 1);
    setSelectedEffect(null);
    setTimeout(() => goTo("studio"), 100);
  }
  return (
    <MotionConfig reducedMotion="user">
      <div className="site-shell">
        <Ambient />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <header className="header">
          <div className="nav-inner container">
            <Brand />
            <nav className="desktop-nav" aria-label="Main navigation">
              <a href="#workflow">The vision</a>
              <a href="#studio">
                Studio <span>PREVIEW</span>
              </a>
              <a href="#library">FX library</a>
              <a href="#showcase">Showcase</a>
            </nav>
            <div className="nav-actions">
              <button className="nav-cta" onClick={() => goTo("studio")}>
                Enter the studio <ArrowUpRight size={14} />
              </button>
              <button
                className="mobile-menu-button icon-button"
                aria-label={menu ? "Close menu" : "Open menu"}
                aria-expanded={menu}
                onClick={() => setMenu(!menu)}
              >
                {menu ? <X size={23} /> : <Menu size={23} />}
              </button>
            </div>
          </div>
          <AnimatePresence>
            {menu && (
              <motion.nav
                className="mobile-nav"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                aria-label="Mobile navigation"
              >
                {[
                  ["The vision", "workflow"],
                  ["Studio preview", "studio"],
                  ["FX library", "library"],
                  ["Showcase", "showcase"],
                ].map(([label, target]) => (
                  <a
                    key={target}
                    href={`#${target}`}
                    onClick={() => setMenu(false)}
                  >
                    {label}
                    <ArrowUpRight size={16} />
                  </a>
                ))}
              </motion.nav>
            )}
          </AnimatePresence>
        </header>
        <main id="main">
          <Hero onReel={() => setReel(true)} />
          <div className="audience-strip">
            <div className="container">
              <span>
                FOR THE PEOPLE
                <br />
                <b>WHO MAKE US FEEL.</b>
              </span>
              <div>
                <Film size={17} />
                Filmmakers
              </div>
              <div>
                <MousePointer2 size={17} />
                Artists & animators
              </div>
              <div>
                <Play size={17} />
                Creators
              </div>
              <div>
                <Diamond size={17} />
                Creative studios
              </div>
            </div>
          </div>
          <Workflow />
          <section className="section studio-section" id="studio">
            <div className="container">
              <Reveal className="section-heading horizontal">
                <div>
                  <Eyebrow>MEET YOUR NEW CREATIVE SPACE</Eyebrow>
                  <h2>
                    Big-screen possibility.
                    <br />
                    <span className="text-muted">Frame-by-frame control.</span>
                  </h2>
                </div>
                <div>
                  <p>
                    A powerful canvas. A beautifully simple workflow.
                    <br />
                    Go ahead—play with the layers.
                  </p>
                  <span className="interactive-hint">
                    <span /> LIVE INTERACTIVE PREVIEW
                  </span>
                </div>
              </Reveal>
              <Reveal>
                <Studio key={studioKey} initialEffect={studioEffect} />
              </Reveal>
              <div className="studio-under">
                <span>
                  <LockKeyhole size={13} /> Non-destructive by design
                </span>
                <span>
                  <Layers3 size={13} /> Independent effect layers
                </span>
                <span>
                  <Timer size={13} /> Artist-defined timing
                </span>
                <span>
                  <Focus size={13} /> Reference-guided results
                </span>
              </div>
            </div>
          </section>
          <ArtistControl />
          <Library onSelect={setSelectedEffect} />
          <Elements onSelect={setSelectedEffect} />
          <section className="section tools-section" id="tools">
            <div className="container">
              <Reveal className="section-heading centered">
                <Eyebrow>THE DETAILS MAKE THE DIFFERENCE</Eyebrow>
                <h2>
                  Serious tools.
                  <br />
                  <span className="text-muted">For extraordinary ideas.</span>
                </h2>
                <p>A creative toolkit built around the way artists think.</p>
              </Reveal>
              <div className="tools-grid">
                {tools.map((tool, i) => (
                  <Reveal
                    className="tool-card"
                    delay={(i % 3) * 0.06}
                    key={tool.title}
                  >
                    <div className="tool-icon">
                      <tool.icon size={22} />
                    </div>
                    {tool.planned && (
                      <span className="planned-badge">PRODUCT VISION</span>
                    )}
                    <h3>{tool.title}</h3>
                    <p>{tool.text}</p>
                    <div className="tool-tags">{tool.tags}</div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
          <Showcase onSelect={setSelectedEffect} />
          <section className="final-cta">
            <div className="cta-aurora" />
            <div className="cta-orbit orbit-one" />
            <div className="cta-orbit orbit-two" />
            <div className="container">
              <Reveal>
                <span className="final-mark">
                  <Flame size={30} fill="currentColor" />
                </span>
                <Eyebrow>BUILT FOR ARTISTS. ACCELERATED BY AI.</Eyebrow>
                <h2>
                  Your next scene.
                  <br />
                  <span>Beyond imagination.</span>
                </h2>
                <p>
                  Keep the shot. Break the boundaries.
                  <br />
                  Discover a new way to create the impossible.
                </p>
                <div className="cta-buttons">
                  <Button onClick={() => goTo("studio")} arrow>
                    Step inside the studio
                  </Button>
                  <Button secondary onClick={() => goTo("library")}>
                    Explore the FX library <ArrowRight size={15} />
                  </Button>
                </div>
                <span className="final-note">
                  A first look at the future of artist-led VFX.
                </span>
              </Reveal>
            </div>
          </section>
        </main>
        <footer className="footer">
          <div className="container">
            <div className="footer-main">
              <div>
                <Brand />
                <p>
                  Extraordinary effects.
                  <br />
                  Uncompromised vision.
                </p>
              </div>
              <div className="footer-link-group">
                <span>EXPLORE</span>
                <a href="#studio">Studio preview</a>
                <a href="#library">Effects library</a>
                <a href="#showcase">Showcase</a>
              </div>
              <div className="footer-link-group">
                <span>THE PRODUCT</span>
                <a href="#workflow">Our vision</a>
                <a href="#control">Artist control</a>
                <a href="#tools">The toolkit</a>
              </div>
              <div className="footer-statement">
                <span className="green-dot" />
                <span>THE NEXT FRAME IS YOURS.</span>
                <p>
                  Made for the beautifully
                  <br />
                  impossible things.
                </p>
              </div>
            </div>
            <div className="footer-bottom">
              <span>© 2026 Emberframe. A product concept.</span>
              <div>
                <button onClick={() => setAbout("About this prototype")}>
                  About the prototype
                </button>
                <button onClick={() => setAbout("Your privacy")}>
                  Privacy
                </button>
                <a href="#">Back to top ↑</a>
              </div>
            </div>
          </div>
        </footer>
        <AnimatePresence>
          {reel && (
            <Modal
              title="The Emberframe vision · concept film"
              onClose={closeReel}
              wide
            >
              <video
                className="reel-video"
                src="/media/hero-loop.mp4"
                poster="/media/hero.webp"
                autoPlay
                controls
                playsInline
                loop
              />
              <div className="reel-caption">
                <div>
                  <Eyebrow>THE CROSSING / CONCEPT SCENE 001</Eyebrow>
                  <h3>Preserve the shot. Create the impossible.</h3>
                </div>
                <p>
                  Illustrative artwork and motion study.
                  <br />
                  Explore the interactive studio to see the layer workflow.
                </p>
              </div>
            </Modal>
          )}
          {selectedEffect && (
            <Modal
              title={`${selectedEffect.category} / effect study`}
              onClose={closeEffect}
            >
              <div className="effect-modal-art">
                <EffectArt
                  type={selectedEffect.type}
                  color={selectedEffect.color}
                />
                <span className="effect-category">
                  {selectedEffect.category}
                </span>
              </div>
              <div className="effect-modal-copy">
                <h3>{selectedEffect.name}</h3>
                <p>{selectedEffect.detail}</p>
                <div className="element-tags">
                  {selectedEffect.tags.map((t) => (
                    <span key={t}>
                      <Check size={12} />
                      {t}
                    </span>
                  ))}
                </div>
                <Button
                  onClick={() => openEffectInStudio(selectedEffect)}
                  arrow
                  className="full-width"
                >
                  Open sample in studio
                </Button>
                <p className="modal-footnote">
                  Starts a fresh sample composition with this effect.
                  Illustrative asset; generation is simulated.
                </p>
              </div>
            </Modal>
          )}
          {about && (
            <Modal title={about} onClose={closeAbout}>
              <div className="help-content">
                <h3>
                  {about === "Your privacy"
                    ? "Your footage stays with you."
                    : "A first look at Emberframe."}
                </h3>
                <p>
                  {about === "Your privacy"
                    ? "This front-end prototype processes imported video locally in your browser. It does not upload your footage, store accounts, or send your scene settings to an AI service. Closing or refreshing the page clears your editing session. You can download your settings before leaving."
                    : "Emberframe is a concept for artist-guided, non-destructive visual effects. This prototype explores the visual identity and editing workflow with generated concept artwork, sample overlays, and interactive controls. AI generation, tracking, and production video exports are planned, not connected."}
                </p>
                <Button onClick={closeAbout}>
                  Got it <Check size={15} />
                </Button>
              </div>
            </Modal>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
