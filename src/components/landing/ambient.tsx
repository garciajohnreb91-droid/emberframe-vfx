"use client";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
export function Ambient() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced || !window.matchMedia("(pointer: fine)").matches) return;
    const el = canvas.current,
      ctx = el?.getContext("2d");
    if (!el || !ctx) return;
    let w = innerWidth,
      h = innerHeight,
      frame = 0,
      last = 0;
    const pointer = { x: -500, y: -500 };
    const sparks: {
      x: number;
      y: number;
      life: number;
      vx: number;
      vy: number;
    }[] = [];
    function resize() {
      w = innerWidth;
      h = innerHeight;
      el!.width = w;
      el!.height = h;
    }
    function move(e: PointerEvent) {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      if (sparks.length < 18)
        sparks.push({
          x: e.clientX,
          y: e.clientY,
          life: 1,
          vx: (Math.random() - 0.5) * 0.5,
          vy: -0.4 - Math.random() * 0.5,
        });
    }
    function draw(time: number) {
      frame = requestAnimationFrame(draw);
      if (time - last < 32 || document.hidden) return;
      last = time;
      ctx!.clearRect(0, 0, w, h);
      const glow = ctx!.createRadialGradient(
        pointer.x,
        pointer.y,
        0,
        pointer.x,
        pointer.y,
        160,
      );
      glow.addColorStop(0, "rgba(139,108,255,.045)");
      glow.addColorStop(1, "transparent");
      ctx!.fillStyle = glow;
      ctx!.fillRect(pointer.x - 160, pointer.y - 160, 320, 320);
      for (let i = sparks.length - 1; i >= 0; i--) {
        const p = sparks[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.04;
        if (p.life <= 0) {
          sparks.splice(i, 1);
          continue;
        }
        ctx!.fillStyle = `rgba(255,168,92,${p.life * 0.4})`;
        ctx!.fillRect(p.x, p.y, 1.5, 1.5);
      }
    }
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", move);
    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
    };
  }, [reduced]);
  return <canvas className="cursor-canvas" ref={canvas} aria-hidden="true" />;
}
