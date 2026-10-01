import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { stats } from "../data/content";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const tilts = [-6, 4, -3, 7];

export default function Stats() {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.from(".stat-stamp", {
        scale: 0.5,
        opacity: 0,
        rotate: -20,
        stagger: 0.12,
        duration: 0.6,
        ease: "back.out(1.8)",
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={root} className="paper-sheet px-4 py-10 md:px-10 md:py-14">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-5 md:grid-cols-4 md:gap-8">
        {stats.map((s, i) => (
          <article
            key={s.l}
            className="stat-stamp stamp flex aspect-square flex-col items-center justify-center rounded-full p-4 text-center"
            style={{ transform: `rotate(${tilts[i]}deg)` }}
          >
            <p className="hand text-4xl font-bold leading-none text-purple md:text-5xl">{s.n}</p>
            <p className="doodle mt-1 text-lg text-ink">{s.l}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
