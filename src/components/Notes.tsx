import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { journal, testimonials } from "../data/content";
import { HeartDoodle, SmileDoodle, StarDoodle, UnderlineSquiggle } from "./Doodles";
import Tape from "./Tape";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export default function Notes() {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.from(".voice-card", {
        y: 40,
        rotate: -8,
        opacity: 0,
        stagger: 0.12,
        duration: 0.7,
        ease: "back.out(1.4)",
        scrollTrigger: { trigger: ".voice-grid", start: "top 80%" },
      });
      gsap.from(".journal-card", {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.55,
        scrollTrigger: { trigger: ".journal-grid", start: "top 80%" },
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="notes" ref={root} className="paper-sheet px-4 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex items-center gap-3">
          <div>
            <p className="doodle text-lg text-purple">kind words, taped down</p>
            <h2 className="hand text-5xl font-bold text-purple md:text-6xl">Client notes</h2>
            <UnderlineSquiggle className="h-4 w-36" />
          </div>
          <SmileDoodle className="h-10 w-10" />
        </div>

        <div className="voice-grid grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <blockquote
              key={t.name}
              className="voice-card note-card relative p-6"
              style={{ transform: `rotate(${t.rotate}deg)` }}
            >
              <Tape
                className={i === 1 ? "right-8 -top-3" : "left-8 -top-3"}
                rotate={i === 1 ? 12 : -9}
                width={78}
              />
              <HeartDoodle className="mb-3 h-6 w-6" />
              <p className="hand text-2xl leading-snug">“{t.quote}”</p>
              <footer className="mt-4">
                <p className="font-bold">{t.name}</p>
                <p className="doodle text-lg text-purple">{t.role}</p>
              </footer>
            </blockquote>
          ))}
        </div>

        <div className="mt-20">
          <p className="doodle text-lg text-purple">from the sketchbook</p>
          <h3 className="hand text-4xl font-bold text-purple md:text-5xl">Journal</h3>
          <UnderlineSquiggle className="mb-8 h-4 w-28" />
          <div className="journal-grid grid gap-5 md:grid-cols-3">
            {journal.map((j) => (
              <article key={j.title} className="journal-card paper-card relative rounded-2xl p-5" data-cursor="read">
                <p className="doodle text-purple">{j.date}</p>
                <h4 className="hand mt-1 text-2xl font-bold">{j.title}</h4>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{j.body}</p>
                <StarDoodle className="mt-4 h-5 w-5 opacity-50" />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
