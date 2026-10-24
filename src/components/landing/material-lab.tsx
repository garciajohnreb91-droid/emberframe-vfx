"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useMotionPreference } from "./use-motion-preference";
import {
  ArrowUpRight,
  Flame,
  Pause,
  Play,
  RotateCcw,
  Snowflake,
  Sparkles,
  Waves,
  Zap,
  Orbit,
} from "lucide-react";
import { Eyebrow, Reveal } from "./ui";
import { MaterialCanvas, type MaterialKind } from "./material-canvas";
import { effects, type Effect } from "./effects";

const studies = [
  {
    kind: "fire",
    name: "Beautiful destruction.",
    label: "Combustion",
    action: "Ignite",
    caption: "Glowing seams. Rising embers. A slow, beautiful burn.",
    color: "#ff8745",
    icon: Flame,
    effect: "Inferno bloom",
    number: "01",
    spec: "HEAT / 1,280°",
    state: "IGNITION",
  },
  {
    kind: "frost",
    name: "Cold. With feeling.",
    label: "Cryogenesis",
    action: "Freeze",
    caption: "Watch crystalline veins take over the surface.",
    color: "#9cdeff",
    icon: Snowflake,
    effect: "Absolute zero",
    number: "02",
    spec: "TEMP / −196°",
    state: "CRYSTALLIZING",
  },
  {
    kind: "explosion",
    name: "Make an impact.",
    label: "Shockwave",
    action: "Detonate",
    caption: "One moment of pressure. A thousand possibilities.",
    color: "#ffc479",
    icon: Orbit,
    effect: "Ground zero",
    number: "03",
    spec: "FORCE / 8.4 kN",
    state: "DETONATION",
  },
  {
    kind: "electric",
    name: "Break the circuit.",
    label: "High voltage",
    action: "Energize",
    caption: "Branching arcs that find their own way through.",
    color: "#8faaff",
    icon: Zap,
    effect: "Arc storm",
    number: "04",
    spec: "CHARGE / 90 kV",
    state: "CHARGING",
  },
  {
    kind: "magic",
    name: "Bend the ordinary.",
    label: "Astral field",
    action: "Conjure",
    caption: "Orbiting light. Impossible geometry. Pure wonder.",
    color: "#d4a4ff",
    icon: Sparkles,
    effect: "Astral weave",
    number: "05",
    spec: "FIELD / ∞",
    state: "CONJURING",
  },
  {
    kind: "water",
    name: "Find your flow.",
    label: "Liquid dynamics",
    action: "Ripple",
    caption: "A fluid surface that carries every little movement.",
    color: "#7ce6df",
    icon: Waves,
    effect: "Liquid motion",
    number: "06",
    spec: "FLOW / 24 fps",
    state: "PROPAGATING",
  },
] satisfies {
  kind: MaterialKind;
  name: string;
  label: string;
  action: string;
  caption: string;
  color: string;
  icon: typeof Flame;
  effect: string;
  number: string;
  spec: string;
  state: string;
}[];

function MaterialCard({
  study,
  paused,
  onSelect,
}: {
  study: (typeof studies)[number];
  paused: boolean;
  onSelect: (effect: Effect) => void;
}) {
  const [burst, setBurst] = useState(0);
  const [active, setActive] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduced = useMotionPreference();
  const Icon = study.icon;
  useEffect(
    () => () => {
      if (timeout.current) clearTimeout(timeout.current);
    },
    [],
  );

  function replay() {
    if (paused || reduced) return;
    setBurst((value) => value + 1);
    setActive(true);
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setActive(false), 2300);
  }

  return (
    <article
      className={`material-card material-${study.kind} ${active && !paused && !reduced ? "is-active" : ""}`}
      style={{ "--material-color": study.color } as CSSProperties}
    >
      <button
        className="material-stage"
        aria-label={`${study.action} ${study.label.toLowerCase()} effect`}
        aria-disabled={paused || !!reduced}
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") replay();
        }}
        onFocus={replay}
        onClick={replay}
      >
        <span className="material-grid" />
        <span className="material-backlight" />
        <span className="material-spec">
          <Icon size={13} /> {study.label}
          <span>{study.number}</span>
        </span>
        <span className="material-object" aria-hidden="true">
          <span className="material-object-border" />
          <span className="material-object-lines" />
          <span className="material-monogram">
            e<span>f</span>
          </span>
          <span className="material-object-id">EMBR / {study.number}</span>
          <span className="material-char" />
        </span>
        {study.kind === "explosion" && (
          <span
            className="material-object material-fragment"
            aria-hidden="true"
          >
            <span className="material-object-border" />
            <span className="material-monogram">
              e<span>f</span>
            </span>
          </span>
        )}
        <MaterialCanvas kind={study.kind} burst={burst} paused={paused} />
        <span className="material-stage-bottom">
          <span>{study.spec}</span>
          <span className="material-replay">
            <RotateCcw size={11} />{" "}
            {paused || reduced ? "STILL STUDY" : study.action.toUpperCase()}
          </span>
        </span>
      </button>
      <div className="material-copy">
        <div className="material-copy-top">
          <span>STUDY {study.number}</span>
          <span className="material-state">
            <i />{" "}
            {active && !paused && !reduced
              ? study.state
              : "INDEPENDENT FX LAYER"}
          </span>
        </div>
        <h3>{study.name}</h3>
        <p>{study.caption}</p>
        <button
          className="material-open"
          onClick={() => {
            const effect = effects.find((item) => item.name === study.effect);
            if (effect) onSelect(effect);
          }}
          aria-label={`Explore ${study.label.toLowerCase()} in studio`}
        >
          Explore effect <ArrowUpRight size={14} />
        </button>
      </div>
    </article>
  );
}

export function MaterialLab({
  onSelect,
}: {
  onSelect: (effect: Effect) => void;
}) {
  const [paused, setPaused] = useState(false);
  const reduced = useMotionPreference();
  return (
    <section
      className={`section material-lab ${paused || reduced ? "is-paused" : ""}`}
      id="material-studies"
      aria-labelledby="material-title"
    >
      <div className="container">
        <Reveal className="section-heading horizontal material-heading">
          <div>
            <Eyebrow>THE MATERIAL STUDIES / VOL. 01</Eyebrow>
            <h2 id="material-title">
              Don’t just see the effect.
              <br />
              <span className="material-heading-accent">
                Feel what it can do.
              </span>
            </h2>
          </div>
          <div className="material-heading-aside">
            <p>
              Heat. Pressure. A little impossibility.
              <br />
              Six interactive studies in beautiful transformation.
            </p>
            <div className="material-controls">
              <span className="material-instruction">
                {reduced
                  ? "STILL STUDIES · REDUCED MOTION"
                  : "HOVER OR TAP TO TRANSFORM"}
              </span>
              <button
                onClick={() => setPaused(!paused)}
                disabled={!!reduced}
                aria-pressed={paused || !!reduced}
                aria-label={
                  paused
                    ? "Resume material animations"
                    : "Pause material animations"
                }
              >
                {paused || reduced ? <Play size={13} /> : <Pause size={13} />}{" "}
                {paused || reduced ? "Paused" : "Pause motion"}
              </button>
            </div>
          </div>
        </Reveal>
        <div className="material-cards">
          {studies.map((study) => (
            <MaterialCard
              key={study.kind}
              study={study}
              paused={paused}
              onSelect={onSelect}
            />
          ))}
        </div>
        <div className="material-footnote">
          <span>
            <i /> REAL-TIME MOTION STUDIES
          </span>
          <p>
            Illustrative effects. Every layer independent. Your original,
            preserved.
          </p>
          <a href="#studio">
            Take creative control <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </section>
  );
}
