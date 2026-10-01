import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experience } from "../data/content";
import { UnderlineSquiggle } from "./Doodles";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.from(".exp-item", {
        x: -24,
        opacity: 0,
        stagger: 0.15,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="experience" ref={root} className="paper-sheet relative px-4 py-10 md:px-10 md:py-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="hand text-5xl font-bold text-purple md:text-6xl">Experience</h2>
        <UnderlineSquiggle className="mb-10 mt-1 h-4 w-40" />

        <ol className="relative ml-2 border-l-2 border-dashed border-purple/50 pl-8 md:ml-6">
          {experience.map((item) => (
            <li key={item.years} className="exp-item relative mb-10 last:mb-0">
              <span className="timeline-dot absolute -left-[41px] top-2" />
              <p className="doodle text-xl text-purple">{item.years}</p>
              <h3 className="hand text-2xl font-bold md:text-3xl">{item.role}</h3>
              <p className="text-ink-soft">{item.company}</p>
              <span className="mt-3 block h-px w-40 border-t border-dotted border-ink/30" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
