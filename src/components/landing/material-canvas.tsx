"use client";

import { useEffect, useRef } from "react";
import { useMotionPreference } from "./use-motion-preference";

export type MaterialKind =
  | "fire"
  | "frost"
  | "explosion"
  | "electric"
  | "magic"
  | "water";
type Painter = (
  ctx: CanvasRenderingContext2D,
  t: number,
  pulse: number,
) => void;
const TAU = Math.PI * 2;
const seed = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

function glow(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  color: string,
  strength = 1,
) {
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
  gradient.addColorStop(0, color);
  gradient.addColorStop(1, "transparent");
  ctx.globalAlpha = strength;
  ctx.fillStyle = gradient;
  ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
  ctx.globalAlpha = 1;
}
function line(
  ctx: CanvasRenderingContext2D,
  points: number[][],
  color: string,
  width = 1,
) {
  ctx.beginPath();
  points.forEach(([x, y], i) => {
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.stroke();
}

const fire: Painter = (ctx, t, pulse) => {
  const energy = 1 + pulse * 0.6;
  glow(ctx, 300, 360, 235, "#e74e16", 0.24 * energy);
  ctx.globalCompositeOperation = "lighter";
  // A bounded set of translucent, curved tongues gives the flame its volume.
  for (let i = 0; i < 20; i++) {
    const x = 180 + seed(i + 87) * 235;
    const phase = t * (1.2 + seed(i) * 0.7) + i * 1.81;
    const height = (45 + seed(i + 10) * 125 + Math.sin(phase) * 30) * energy;
    const base = 329 + Math.sin(i * 2.1) * 17;
    const sway = Math.sin(phase * 1.3) * 24;
    const gradient = ctx.createLinearGradient(x, base, x, base - height);
    gradient.addColorStop(0, "#ffc35b80");
    gradient.addColorStop(0.3, "#fa501c50");
    gradient.addColorStop(1, "#ff330000");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(x - 16, base);
    ctx.bezierCurveTo(
      x - 30,
      base - height * 0.45,
      x + sway + 25,
      base - height * 0.65,
      x + sway,
      base - height,
    );
    ctx.bezierCurveTo(
      x + sway + 5,
      base - height * 0.55,
      x + 27,
      base - height * 0.3,
      x + 16,
      base,
    );
    ctx.closePath();
    ctx.fill();
  }
  line(
    ctx,
    [
      [185, 315],
      [198, 330],
      [235, 324],
      [263, 338],
      [293, 328],
      [322, 335],
      [355, 323],
      [384, 331],
      [414, 310],
    ],
    "#ffbb78",
    1.7,
  );
  for (let i = 0; i < 62; i++) {
    const life = (t * (0.12 + seed(i) * 0.24) + seed(i + 20)) % 1;
    const x = 170 + seed(i + 40) * 260 + Math.sin(t + i) * life * 45;
    const y = 350 - life * (220 + seed(i + 1) * 100) * energy;
    ctx.globalAlpha = Math.sin(life * Math.PI) * 0.85;
    ctx.fillStyle = i % 3 === 0 ? "#ffdaa3" : "#ff6e29";
    ctx.fillRect(x, y, 1 + seed(i + 5) * 2, 2 + seed(i) * 4);
  }
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = "source-over";
};

// Stable fractal branches, computed once, so crystal growth never jumps randomly.
const crystals: { points: number[][]; delay: number; width: number }[] = [];
for (let arm = 0; arm < 8; arm++) {
  const angle = (arm * TAU) / 8 + 0.15;
  const root = [300, 218];
  const length = 109 + seed(arm) * 38;
  const end = [
    root[0] + Math.cos(angle) * length,
    root[1] + Math.sin(angle) * length,
  ];
  crystals.push({ points: [root, end], delay: 0.04 * arm, width: 1.5 });
  for (let j = 1; j < 6; j++) {
    const fraction = j / 7;
    const x = root[0] + (end[0] - root[0]) * fraction,
      y = root[1] + (end[1] - root[1]) * fraction;
    for (const side of [-1, 1]) {
      const branchAngle = angle + side * 0.75,
        branchLength = 39 * (1 - fraction) + 10;
      const bx = x + Math.cos(branchAngle) * branchLength,
        by = y + Math.sin(branchAngle) * branchLength;
      crystals.push({
        points: [
          [x, y],
          [bx, by],
        ],
        delay: fraction * 0.55 + 0.1,
        width: 1,
      });
      crystals.push({
        points: [
          [(x + bx) / 2, (y + by) / 2],
          [
            (x + bx) / 2 + Math.cos(angle) * 14,
            (y + by) / 2 + Math.sin(angle) * 14,
          ],
        ],
        delay: fraction * 0.6 + 0.2,
        width: 0.6,
      });
    }
  }
}
const frost: Painter = (ctx, t, pulse) => {
  glow(ctx, 300, 230, 180, "#5ab8ee", 0.13 + pulse * 0.1);
  const progress = pulse > 0 ? Math.min(1, (1 - pulse) * 5 + 0.08) : 1;
  for (const branch of crystals) {
    const length = Math.min(1, Math.max(0, (progress - branch.delay) * 3));
    const [start, end] = branch.points;
    line(
      ctx,
      [
        start,
        [
          start[0] + (end[0] - start[0]) * length,
          start[1] + (end[1] - start[1]) * length,
        ],
      ],
      "#b4e6ffbd",
      branch.width,
    );
  }
  for (let i = 0; i < 38; i++) {
    const x = 120 + seed(i + 40) * 360,
      y = 65 + ((seed(i) * 300 + t * (4 + seed(i + 2) * 7)) % 300);
    const size = 1 + seed(i + 9) * 1.8;
    ctx.globalAlpha = 0.2 + (Math.sin(t * 0.8 + i) + 1) * 0.22;
    line(
      ctx,
      [
        [x - size, y],
        [x + size, y],
      ],
      "#d5f5ff",
      0.8,
    );
    line(
      ctx,
      [
        [x, y - size],
        [x, y + size],
      ],
      "#d5f5ff",
      0.8,
    );
  }
  ctx.globalAlpha = 1;
};

const explosion: Painter = (ctx, t, pulse) => {
  const phase = pulse > 0 ? Math.min(1, (1 - pulse) * 2.3) : (t * 0.21) % 1;
  const shock = 1 - phase;
  glow(ctx, 300, 225, 135 + phase * 120, "#e98433", 0.15 + shock * 0.22);
  for (let ring = 0; ring < 3; ring++) {
    const radius = 22 + phase * 215 + ring * 17;
    ctx.beginPath();
    ctx.ellipse(300, 225, radius, radius * 0.55, -0.15, 0, TAU);
    ctx.strokeStyle = `rgba(255, ${174 + ring * 20}, ${95 + ring * 35}, ${Math.pow(shock, 2) * (0.55 - ring * 0.13)})`;
    ctx.lineWidth = 1 + shock * 3;
    ctx.stroke();
  }
  for (let i = 0; i < 52; i++) {
    const angle = seed(i) * TAU,
      distance = 30 + phase * (60 + seed(i + 2) * 190);
    const x = 300 + Math.cos(angle) * distance,
      y = 225 + Math.sin(angle) * distance * 0.72 + phase * phase * 30;
    const size = 2 + seed(i + 19) * 6;
    ctx.globalAlpha = shock * 0.9;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(i + phase * 2);
    ctx.fillStyle = i % 4 === 0 ? "#ffd5a0" : "#c67d49";
    ctx.fillRect(-size / 2, -size / 3, size, size * 0.6);
    ctx.restore();
    if (i % 3 === 0)
      line(
        ctx,
        [
          [x, y],
          [x - Math.cos(angle) * 18 * shock, y - Math.sin(angle) * 12 * shock],
        ],
        "#f7a76090",
        0.8,
      );
  }
  ctx.globalAlpha = 1;
};

const electric: Painter = (ctx, t, pulse) => {
  glow(ctx, 300, 225, 190, "#657bfa", 0.14 + pulse * 0.12);
  // Slow arc changes avoid strobing while the paths remain visibly alive.
  for (let arc = 0; arc < 4; arc++) {
    const points: number[][] = [];
    for (let j = 0; j < 16; j++) {
      const progress = j / 15;
      const x = 160 + progress * 280;
      const envelope = Math.sin(progress * Math.PI);
      const y =
        126 +
        arc * 60 +
        Math.sin(j * 2.7 + t * 2 + arc) * 26 * envelope +
        Math.sin(t + arc) * 8;
      points.push([x, y]);
    }
    ctx.globalAlpha = 0.55 + Math.sin(t * 1.4 + arc) * 0.2;
    line(ctx, points, "#647aff30", 11);
    line(ctx, points, "#839bff95", 3.5);
    line(ctx, points, "#e3eaff", 1.1 + pulse);
    const [bx, by] = points[5 + arc];
    line(
      ctx,
      [
        [bx, by],
        [bx + 13, by - 21],
        [bx + 5, by - 30],
        [bx + 25, by - 52],
      ],
      "#c0ceff90",
      0.8,
    );
  }
  ctx.globalAlpha = 1;
};

const magic: Painter = (ctx, t, pulse) => {
  glow(ctx, 300, 225, 175, "#a266ef", 0.17 + pulse * 0.12);
  ctx.save();
  ctx.translate(300, 225);
  for (let orbit = 0; orbit < 3; orbit++) {
    ctx.save();
    ctx.rotate(orbit * 1.05 + t * 0.08);
    ctx.beginPath();
    ctx.ellipse(0, 0, 142 + pulse * 20, 52, 0, 0, TAU);
    ctx.strokeStyle = "#d3a6ff55";
    ctx.lineWidth = 0.7;
    ctx.stroke();
    for (let i = 0; i < 27; i++) {
      const angle = (i / 27) * TAU + t * (0.22 + orbit * 0.09);
      const x = Math.cos(angle) * (142 + pulse * 20),
        y = Math.sin(angle) * 52;
      ctx.globalAlpha = 0.3 + (Math.sin(angle) + 1) * 0.3;
      ctx.fillStyle = i % 4 === 0 ? "#fff2ff" : "#cda0ff";
      ctx.beginPath();
      ctx.arc(x, y, i % 4 === 0 ? 2 : 1, 0, TAU);
      ctx.fill();
    }
    ctx.restore();
  }
  ctx.globalAlpha = 1;
  ctx.restore();
};

const water: Painter = (ctx, t, pulse) => {
  glow(ctx, 300, 250, 180, "#51bfc5", 0.15);
  for (let i = 0; i < 8; i++) {
    const progress =
      (t * 0.12 + i / 8 + (pulse > 0 ? (1 - pulse) * 0.35 : 0)) % 1;
    ctx.beginPath();
    ctx.ellipse(300, 250, 20 + progress * 190, 8 + progress * 85, -0.2, 0, TAU);
    ctx.strokeStyle = `rgba(140, 237, 229, ${Math.sin(progress * Math.PI) * 0.5})`;
    ctx.lineWidth = 1 + (1 - progress) * 1.5;
    ctx.stroke();
  }
  for (let i = 0; i < 20; i++) {
    const phase = (t * 0.17 + seed(i)) % 1;
    const x = 190 + seed(i + 20) * 220,
      y = 290 - Math.sin(phase * Math.PI) * (50 + seed(i + 4) * 130);
    ctx.globalAlpha = Math.sin(phase * Math.PI) * 0.7;
    ctx.fillStyle = "#c7fff8";
    ctx.beginPath();
    ctx.ellipse(x, y, 1.5 + seed(i) * 2, 3 + seed(i) * 3, 0.2, 0, TAU);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
};

const painters: Record<MaterialKind, Painter> = {
  fire,
  frost,
  explosion,
  electric,
  magic,
  water,
};

/** One capped-resolution canvas per visible card. No React updates in the frame loop. */
export function MaterialCanvas({
  kind,
  burst,
  paused,
}: {
  kind: MaterialKind;
  burst: number;
  paused: boolean;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const trigger = useRef(-Infinity);
  const reduced = useMotionPreference();
  useEffect(() => {
    if (burst > 0) trigger.current = performance.now();
  }, [burst]);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !ctx) return;
    let frame = 0,
      visible = false,
      last = 0,
      time = 2.2;
    let width = 0,
      height = 0;
    const staticMode = paused || reduced;
    const draw = (now: number) => {
      if (!width || !height) return;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, width, height);
      ctx.setTransform(width / 600, 0, 0, height / 450, 0, 0);
      const pulse = staticMode
        ? 0
        : Math.max(0, 1 - (now - trigger.current) / 2300);
      painters[kind](ctx, time, pulse);
    };
    const tick = (now: number) => {
      if (!visible || document.hidden || staticMode) {
        frame = 0;
        return;
      }
      if (!last || now - last >= 1000 / 30) {
        if (last) time += Math.min((now - last) / 1000, 0.08);
        last = now;
        draw(now);
      }
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      last = 0;
      if (visible && !document.hidden) {
        draw(performance.now());
        if (!staticMode) frame = requestAnimationFrame(tick);
      }
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.05 },
    );
    observer.observe(canvas);
    const resize = new ResizeObserver(([entry]) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = Math.round(entry.contentRect.width * dpr);
      height = Math.round(entry.contentRect.height * dpr);
      canvas.width = width;
      canvas.height = height;
      if (visible) draw(performance.now());
    });
    resize.observe(canvas);
    document.addEventListener("visibilitychange", sync);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resize.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [kind, paused, reduced]);
  return <canvas ref={ref} className="material-canvas" aria-hidden="true" />;
}
