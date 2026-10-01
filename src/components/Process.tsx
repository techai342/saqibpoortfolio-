import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { process } from "../data/content";
import { ArrowDoodle, StarDoodle, TornEdge, UnderlineSquiggle } from "./Doodles";
import Tape from "./Tape";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const tilts = [-2.2, 1.8, -1.4, 2.6];

export default function Process() {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.from(".step-card", {
        y: 50,
        opacity: 0,
        stagger: 0.12,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="process" ref={root} className="relative">
      <TornEdge fill="#f3eee4" className="relative z-10" />
      <div className="purple-sheet -mt-8 px-4 pb-20 pt-16 md:-mt-12 md:px-10 md:pb-28 md:pt-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="doodle text-xl text-lavender">how the work happens</p>
              <h2 className="hand text-5xl font-bold text-paper md:text-7xl">The process</h2>
              <UnderlineSquiggle className="h-4 w-40" color="#faf6ee" />
            </div>
            <StarDoodle className="h-9 w-9" color="#faf6ee" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p, i) => (
              <article
                key={p.n}
                className="step-card note-card relative rounded-md p-5"
                style={{ transform: `rotate(${tilts[i]}deg)` }}
                data-cursor={p.title}
              >
                <Tape
                  className={i % 2 === 0 ? "left-6 -top-3" : "right-7 -top-3"}
                  rotate={i % 2 === 0 ? -10 : 12}
                  width={70}
                />
                <p className="work-number text-purple" style={{ WebkitTextStroke: "2px #1a1814" }}>
                  {p.n}
                </p>
                <h3 className="hand mt-1 text-3xl font-bold">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{p.desc}</p>
                {i < process.length - 1 && (
                  <ArrowDoodle className="absolute -right-8 top-10 hidden h-8 w-16 lg:block" color="#faf6ee" />
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
      <TornEdge fill="#5c49d4" flip />
    </section>
  );
}
