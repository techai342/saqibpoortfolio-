import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "../data/content";
import { SparkDoodle, StarDoodle, UnderlineSquiggle } from "./Doodles";
import Tape from "./Tape";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const tilts = [-2.4, 1.8, -1.2, 2.6, -3, 1.4];

const icons: Record<string, string> = {
  star: "✦",
  poster: "▣",
  spark: "✶",
  box: "▢",
  layout: "⧉",
  play: "▷",
};

export default function Services() {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.from(".svc-card", {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.65,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="services" ref={root} className="paper-sheet relative px-4 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex items-center gap-3">
          <div>
            <p className="doodle text-lg text-purple">what I make</p>
            <h2 className="hand text-5xl font-bold text-purple md:text-6xl">Services</h2>
            <UnderlineSquiggle className="h-4 w-32" />
          </div>
          <StarDoodle className="h-8 w-8" color="#5c49d4" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <article
              key={s.title}
              className="svc-card paper-card relative rounded-2xl p-6"
              style={{ transform: `rotate(${tilts[i]}deg)` }}
              data-cursor="yes"
            >
              <Tape
                className={i % 2 === 0 ? "left-6 -top-3" : "right-8 -top-3"}
                rotate={i % 2 === 0 ? -8 : 12}
                width={72}
              />
              <span className="hand text-3xl text-purple">{icons[s.icon]}</span>
              <h3 className="hand mt-3 text-2xl font-bold">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{s.desc}</p>
              <SparkDoodle className="absolute bottom-4 right-4 h-5 w-5 opacity-40" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
