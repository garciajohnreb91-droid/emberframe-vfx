import type { CSSProperties } from "react";
export const categories = [
  "All effects",
  "Fire",
  "Frost",
  "Smoke",
  "Dust",
  "Explosions",
  "Water",
  "Rain",
  "Lightning",
  "Sparks",
  "Energy",
  "Magic",
  "Shadows",
  "Highlights",
  "Fireworks",
  "Trails",
  "Atmospheric FX",
];
export const effects = [
  {
    name: "Inferno bloom",
    category: "Fire",
    type: "fire",
    color: "#ff7b37",
    description: "Organic flames. Beautifully unpredictable.",
    detail:
      "Shape the ignition, build the heat, and let every ember find its way.",
    tags: ["Volumetric flame", "Ember control", "Heat distortion"],
  },
  {
    name: "Midnight haze",
    category: "Smoke",
    type: "smoke",
    color: "#9daabd",
    description: "Atmosphere you can almost feel.",
    detail:
      "Sculpt drifting volumes, soften the light, and control the final wisp.",
    tags: ["Density control", "Directional drift", "Soft dissipation"],
  },
  {
    name: "Arc storm",
    category: "Lightning",
    type: "electric",
    color: "#72b7ff",
    description: "An electrifying new dimension.",
    detail:
      "Direct every branching arc. Attach energy to motion and light up the scene.",
    tags: ["Branch intensity", "Surface tracking", "Light interaction"],
  },
  {
    name: "Astral weave",
    category: "Magic",
    type: "magic",
    color: "#bf91ff",
    description: "Make the extraordinary tangible.",
    detail:
      "Weave particles into a gesture, a portal, or a completely new kind of magic.",
    tags: ["Particle paths", "Color spectrum", "Energy falloff"],
  },
  {
    name: "Liquid motion",
    category: "Water",
    type: "water",
    color: "#68dbe0",
    description: "Every ripple. Every reflection.",
    detail:
      "Give your shot the weight, movement, and clarity of believable fluid.",
    tags: ["Ripple scale", "Surface tension", "Reflections"],
  },
  {
    name: "Ground zero",
    category: "Explosions",
    type: "explosion",
    color: "#ffb258",
    description: "Impact that leaves an impression.",
    detail:
      "Choreograph the blast, shape the shockwave, and settle the debris on cue.",
    tags: ["Blast radius", "Debris paths", "Shockwave timing"],
  },
  {
    name: "Impact veil",
    category: "Dust",
    type: "smoke",
    color: "#c3a88c",
    description: "Ground every movement.",
    detail:
      "Add weight to a landing with grounded debris and a precisely timed dust burst.",
    tags: ["Ground contact", "Debris scale", "Settle time"],
  },
  {
    name: "Silver rainfall",
    category: "Rain",
    type: "water",
    color: "#85b8d9",
    description: "Weather with a sense of place.",
    detail: "Set the rainfall, angle, and atmosphere around your scene.",
    tags: ["Rain density", "Wind angle", "Wet reflections"],
  },
  {
    name: "Ember drift",
    category: "Sparks",
    type: "fire",
    color: "#ff9b4c",
    description: "A thousand tiny moments of light.",
    detail: "Create sparks that follow movement and fade on your terms.",
    tags: ["Particle scale", "Velocity", "Lifetime"],
  },
  {
    name: "Pulse field",
    category: "Energy",
    type: "electric",
    color: "#8a9aff",
    description: "Give your scene a pulse.",
    detail: "Design a controlled field of luminous energy with a defined peak.",
    tags: ["Wave frequency", "Glow radius", "Pulse timing"],
  },
  {
    name: "Soft eclipse",
    category: "Shadows",
    type: "smoke",
    color: "#8293bb",
    description: "The depth behind the spectacle.",
    detail:
      "Shape an independent shadow pass that grounds your effect in the scene.",
    tags: ["Softness", "Direction", "Shadow opacity"],
  },
  {
    name: "Prism light",
    category: "Highlights",
    type: "magic",
    color: "#d5c3ff",
    description: "Let the light tell the story.",
    detail:
      "Build an adjustable lighting pass around the shape of your effect.",
    tags: ["Bloom", "Color temperature", "Light falloff"],
  },
  {
    name: "Afterglow",
    category: "Fireworks",
    type: "explosion",
    color: "#ff9c9d",
    description: "A celebration in every frame.",
    detail:
      "Compose layered bursts and keep the luminous trails beautifully timed.",
    tags: ["Burst pattern", "Color sequence", "Trail length"],
  },
  {
    name: "Photon ribbon",
    category: "Trails",
    type: "magic",
    color: "#ae91ff",
    description: "Leave a little impossibility behind.",
    detail:
      "Trace motion with elegant light ribbons and expressive particle trails.",
    tags: ["Motion path", "Ribbon width", "Decay"],
  },
  {
    name: "Deep atmosphere",
    category: "Atmospheric FX",
    type: "smoke",
    color: "#a1b9cb",
    description: "A world between the foreground and sky.",
    detail:
      "Create depth with adjustable fog and softly layered atmospheric light.",
    tags: ["Fog depth", "Scattering", "Horizon blend"],
  },
  {
    name: "Absolute zero",
    category: "Frost",
    type: "frost",
    color: "#9cdeff",
    description: "Cold, with extraordinary detail.",
    detail:
      "Guide crystalline growth across a surface, build the frost, and let a soft frozen mist settle around your scene.",
    tags: ["Crystal growth", "Surface frost", "Frozen mist"],
  },
];
export type Effect = (typeof effects)[number];
export function EffectArt({
  type,
  className = "",
  color,
  animate = true,
}: {
  type: string;
  className?: string;
  color?: string;
  animate?: boolean;
}) {
  const positions: Record<string, string> = {
    fire: "0% 0%",
    smoke: "50% 0%",
    electric: "100% 0%",
    magic: "0% 100%",
    water: "50% 100%",
    explosion: "100% 100%",
  };
  return (
    <div
      aria-hidden="true"
      className={`effect-art ${animate ? "animated" : ""} ${type} ${className}`}
      style={
        {
          "--fx-color": color || "#ff8a4b",
          "--fx-position": positions[type] || "0% 0%",
          "--fx-x": (positions[type] || "0% 0%").split(" ")[0],
        } as CSSProperties
      }
    >
      <div className="effect-image" />
      <div className="effect-halo" />
      {type === "frost" && (
        <svg className="frost-crystal" viewBox="0 0 240 240" fill="none">
          {Array.from({ length: 6 }, (_, i) => (
            <g key={i} transform={`rotate(${i * 60} 120 120)`}>
              <path d="M120 120V24M120 45L106 32M120 45L134 32M120 65L95 42M120 65L145 42M120 87L84 55M120 87L156 55M120 107L90 80M120 107L150 80" />
              <path
                className="frost-shard"
                d="M120 25L125 85L120 120L115 85Z"
              />
            </g>
          ))}
        </svg>
      )}
      {Array.from({ length: 8 }, (_, i) => (
        <i key={i} style={{ "--i": i } as CSSProperties} />
      ))}
    </div>
  );
}
