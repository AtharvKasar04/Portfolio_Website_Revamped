import { useEffect, useRef, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Applies GSAP ScrollTrigger scrub parallax to a ref.
 * @param yAmount - pixels to travel (negative = element drifts UP as you scroll past; positive = drifts DOWN)
 * @param scrub  - scrub smoothing factor (1 = perfect sync, 2 = slight lag)
 * @param triggerRef - optional separate trigger element (defaults to the ref itself)
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(
  yAmount: number = -40,
  scrub: number = 1.5,
  triggerRef?: RefObject<HTMLElement | null>
): RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    // Disable parallax on small screens for performance & UX
    if (window.innerWidth < 768) return;

    const el = ref.current;
    if (!el) return;

    const trigger = (triggerRef?.current ?? el) as HTMLElement;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: 0 },
        {
          y: yAmount,
          ease: "none",
          scrollTrigger: {
            trigger,
            start: "top bottom",
            end: "bottom top",
            scrub,
            invalidateOnRefresh: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [yAmount, scrub]);

  return ref as RefObject<T>;
}
