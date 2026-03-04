"use client";

import { useEffect, useRef } from "react";

export function useConfetti() {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;

    const t = setTimeout(() => {
      import("canvas-confetti").then(({ default: confetti }) => {
        const duration = 2500;
        const end = Date.now() + duration;
        const frame = () => {
          confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ["#2d5a27", "#7cb87c", "#f5f5e8", "#fbbf24"],
          });
          confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ["#2d5a27", "#7cb87c", "#f5f5e8", "#fbbf24"],
          });
          if (Date.now() < end) requestAnimationFrame(frame);
        };
        frame();
      });
    }, 400);

    return () => clearTimeout(t);
  }, []);
}
