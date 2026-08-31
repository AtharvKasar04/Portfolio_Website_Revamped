import { useEffect, useRef } from "react";
import gsap from "gsap";

interface Layer {
  el: HTMLElement;
  xFactor: number;
  yFactor: number;
}

/**
 * Zero-rerender mouse parallax — drives layers directly via gsap.quickSetter.
 * Call registerLayer() in ref callbacks to subscribe elements.
 *
 * @param lerpFactor  0..1 — higher = snappier (default 0.07 ≈ buttery smooth)
 */
export function useMouseParallax(lerpFactor = 0.07) {
  const layers = useRef<Layer[]>([]);
  const raw    = useRef({ x: 0, y: 0 });
  const lerped = useRef({ x: 0, y: 0 });
  const rafId  = useRef(0);
  const active = useRef(true);

  useEffect(() => {
    // Disable on touch / low-power devices
    if (window.innerWidth < 768 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e: MouseEvent) => {
      raw.current.x = (e.clientX / window.innerWidth  - 0.5) * 2; // –1 … 1
      raw.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const tick = () => {
      if (!active.current) return;

      lerped.current.x += (raw.current.x - lerped.current.x) * lerpFactor;
      lerped.current.y += (raw.current.y - lerped.current.y) * lerpFactor;

      layers.current.forEach(({ el, xFactor, yFactor }) => {
        gsap.set(el, {
          x: lerped.current.x * xFactor,
          y: lerped.current.y * yFactor,
          force3D: true,
        });
      });

      rafId.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    rafId.current = requestAnimationFrame(tick);

    return () => {
      active.current = false;
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("mousemove", onMove);
    };
  }, [lerpFactor]);

  /** Register an element as a parallax layer. Call from a ref callback. */
  const registerLayer = (el: HTMLElement | null, xFactor: number, yFactor: number) => {
    if (!el) return;
    // Avoid duplicates
    if (!layers.current.find((l) => l.el === el)) {
      layers.current.push({ el, xFactor, yFactor });
    }
  };

  return { registerLayer };
}
