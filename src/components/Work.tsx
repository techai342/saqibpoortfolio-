import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { works } from "../data/content";
import { ArrowDoodle, CrownDoodle, Paperclip, StarDoodle, TornEdge } from "./Doodles";
import Tape from "./Tape";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const tilts = [-3.2, 2.4, -1.4, 3.1, -2.2];
const numbers = ["#faf6ee", "#b6e35a", "#faf6ee", "#ff6b5b", "#faf6ee"];
const tapeRot = [-12, 16, -8, 20, -14];

export default function Work() {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState<(typeof works)[number] | null>(null);

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".poster-card").forEach((card, i) => {
        const fromX = i % 2 === 0 ? -50 : 50;
        gsap.from(card, {
          x: fromX,
          y: 40,
          opacity: 0,
          rotate: tilts[i] * 3,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 85%" },
        });
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <section id="work" ref={root} className="relative">
      <TornEdge fill="#f3eee4" className="relative z-10" />
      <div className="purple-sheet -mt-8 px-4 pb-24 pt-16 md:-mt-12 md:px-10 md:pb-32 md:pt-20">
        <div className="mx-auto max-w-6xl">
          <div className="relative mb-12 flex items-center justify-center gap-3 text-center">
            <StarDoodle className="h-8 w-8" color="#faf6ee" />
            <h2 className="hand text-4xl font-bold text-paper sm:text-5xl md:text-7xl">Selected Work</h2>
            <CrownDoodle className="h-9 w-11" />
            <Paperclip className="absolute -right-2 -top-6 hidden h-12 w-8 rotate-12 md:block" />
          </div>

          <div className="grid grid-cols-1 gap-8 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 md:gap-8 lg:grid-cols-5">
            {works.map((w, i) => (
              <button
                key={w.id}
                type="button"
                className="group text-left"
                onClick={() => setActive(w)}
                data-cursor="VIEW"
                aria-label={`View project ${w.title}`}
              >
                <span
                  className="work-number mb-2 block text-center"
                  style={{ color: numbers[i], WebkitTextStroke: "2px #1a1814" }}
                >
                  {w.id.replace("0", "")}
                </span>
                <article
                  className="poster-card relative overflow-hidden"
                  style={{ transform: `rotate(${tilts[i]}deg)` }}
                >
                  <Tape
                    className="left-1/2 top-[-10px] -translate-x-1/2"
                    rotate={tapeRot[i]}
                    width={78}
                  />
                  <div className="overflow-hidden bg-paper-2">
                    <img
                      src={w.image}
                      alt={`${w.title} — ${w.category}`}
                      className="aspect-[3/4] w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="pointer-events-none absolute inset-0 hidden items-end justify-center bg-gradient-to-t from-ink/50 to-transparent pb-8 group-hover:flex">
                    <span className="hand text-2xl text-paper">view project</span>
                  </div>
                </article>
                <p className="mt-3 text-center font-hand text-lg text-paper">{w.category}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
      <TornEdge fill="#5c49d4" flip className="relative -mt-px" />

      {active && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-title"
          onClick={() => setActive(null)}
        >
          <div
            className="paper-card relative max-h-[90vh] w-full max-w-3xl overflow-auto rounded-md p-4 md:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <Tape className="left-8 -top-3" rotate={-8} width={90} />
            <button
              className="absolute right-3 top-3 hand text-2xl"
              onClick={() => setActive(null)}
              aria-label="Close project"
            >
              ✕
            </button>
            <img
              src={active.image}
              alt={active.title}
              className="max-h-[58vh] w-full object-contain"
            />
            <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="doodle text-purple">{active.id} — {active.category}</p>
                <h3 id="project-title" className="hand text-3xl font-bold">
                  {active.title}
                </h3>
                <p className="mt-1 max-w-lg text-ink-soft">{active.desc}</p>
              </div>
              <ArrowDoodle className="h-10 w-24" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
