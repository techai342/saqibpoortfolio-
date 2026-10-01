import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { principles } from "../data/content";
import { SparkDoodle, UnderlineSquiggle } from "./Doodles";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export default function Principles() {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.from(".prin-row", {
        x: -30,
        opacity: 0,
        stagger: 0.12,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="principles" ref={root} className="paper-sheet px-4 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-6xl">
        <p className="doodle text-lg text-purple">a few rules I actually keep</p>
        <h2 className="hand text-5xl font-bold text-purple md:text-6xl">Principles</h2>
        <UnderlineSquiggle className="mb-10 h-4 w-36" />

        <ul className="divide-y divide-dashed divide-ink/20">
          {principles.map((p, i) => (
            <li key={p.t} className="prin-row grid gap-2 py-6 md:grid-cols-[0.4fr_1fr] md:items-baseline">
              <p className="doodle text-xl text-purple">0{i + 1}</p>
              <div>
                <h3 className="hand text-3xl font-bold md:text-4xl">{p.t}</h3>
                <p className="mt-1 max-w-xl text-lg text-ink-soft">{p.d}</p>
              </div>
            </li>
          ))}
        </ul>
        <SparkDoodle className="mt-8 h-8 w-8" color="#5c49d4" />
      </div>
    </section>
  );
}
