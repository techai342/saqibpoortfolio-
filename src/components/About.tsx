import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { about, person, portraitSrc } from "../data/content";
import { ArrowDoodle, Lanyard, SmileDoodle, StarDoodle, UnderlineSquiggle } from "./Doodles";
import Tape from "./Tape";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.from(".about-card", {
        y: 60,
        rotate: -8,
        opacity: 0,
        duration: 0.9,
        ease: "back.out(1.4)",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
      gsap.from(".about-copy > *", {
        y: 24,
        opacity: 0,
        stagger: 0.12,
        duration: 0.6,
        scrollTrigger: { trigger: ".about-copy", start: "top 80%" },
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="about" ref={root} className="paper-sheet relative overflow-hidden px-4 py-14 md:px-10 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[0.9fr_1.2fr] md:gap-16">
        <div className="relative mx-auto w-[240px] md:w-[280px]">
          <Lanyard className="absolute -top-28 left-1/2 h-32 w-16 -translate-x-1/2" />
          <div className="about-card id-card relative rotate-[-6deg] rounded-[22px] p-3">
            <Tape className="left-[-10px] top-6" rotate={-28} width={70} />
            <Tape className="right-[-8px] top-3" rotate={18} width={64} />
            <div className="overflow-hidden rounded-[16px] bg-[#d9d2f0]">
              <img
                src={portraitSrc}
                alt={`${person.name} portrait`}
                className="h-64 w-full object-contain object-bottom md:h-72"
              />
            </div>
            <p className="hand mt-3 text-center text-xl font-bold leading-tight sm:text-2xl">{person.name}</p>
            <p className="ui mb-1 text-center text-[11px] uppercase tracking-[0.2em] text-muted">
              {person.shortRole}
            </p>
            <div className="absolute -left-3 bottom-10 h-8 w-10 rotate-[-20deg] bg-[#d9d3c4] opacity-80 shadow" />
          </div>
          <SmileDoodle className="absolute -right-6 bottom-4 h-10 w-10" />
        </div>

        <div className="about-copy relative">
          <p className="doodle text-lg text-purple">a little intro</p>
          <h2 className="hand text-5xl font-bold text-purple md:text-6xl">{about.heading}</h2>
          <UnderlineSquiggle className="mb-6 mt-1 h-4 w-36" />
          <p className="max-w-xl text-lg leading-relaxed text-ink-soft md:text-xl">{about.bio}</p>
          <p className="highlight-stroke mt-6 max-w-lg font-hand text-2xl leading-snug text-ink md:text-3xl">
            {about.highlight}
          </p>
          <ArrowDoodle className="mt-4 h-10 w-24 -rotate-6" />
          <StarDoodle className="absolute -right-2 top-8 hidden h-8 w-8 md:block" />
        </div>
      </div>
    </section>
  );
}
