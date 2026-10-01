import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skills } from "../data/content";
import { SparkDoodle, StarDoodle, UnderlineSquiggle } from "./Doodles";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const tilts = [-7, 4, -3, 8, -5, 6, -8, 3];

export default function Skills() {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.from(".skill-sticker", {
        y: 40,
        opacity: 0,
        rotate: 12,
        stagger: 0.08,
        duration: 0.55,
        ease: "back.out(1.6)",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="skills" ref={root} className="paper-sheet relative px-4 py-10 md:px-10 md:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex items-end gap-3">
          <div>
            <h2 className="hand text-5xl font-bold text-purple md:text-6xl">Software</h2>
            <UnderlineSquiggle className="h-4 w-32" />
          </div>
          <StarDoodle className="mb-3 h-7 w-7" />
        </div>

        <ul className="flex flex-wrap items-center gap-5 md:gap-7">
          {skills.map((s, i) => (
            <li
              key={s.id}
              className="skill-sticker sticker relative flex h-[88px] w-[88px] flex-col items-center justify-center rounded-2xl md:h-[100px] md:w-[100px]"
              style={{ transform: `rotate(${tilts[i]}deg)` }}
              data-cursor={s.name}
            >
              <span
                className="ui text-3xl font-extrabold tracking-tight"
                style={{ color: s.color }}
              >
                {s.label}
              </span>
              <span className="doodle mt-1 text-sm text-ink-soft">{s.name}</span>
            </li>
          ))}
        </ul>
        <SparkDoodle className="mt-8 h-8 w-8" color="#5c49d4" />
      </div>
    </section>
  );
}
