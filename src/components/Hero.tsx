import { useEffect, useRef } from "react";
import gsap from "gsap";
import { portraitSrc, person } from "../data/content";
import {
  ArrowDoodle,
  CircleScribble,
  PaperPlane,
  SparkDoodle,
  StarDoodle,
} from "./Doodles";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const letters = "PORTFOLIO".split("");

export default function Hero({ play }: { play: boolean }) {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = root.current;
    if (!el || !play) return;

    const ctx = gsap.context(() => {
      if (!reduced) {
        gsap.fromTo(
          ".hero-letter",
          { y: 120, opacity: 0, rotate: -10, scale: 0.7 },
          {
            y: 0,
            opacity: 1,
            rotate: 0,
            scale: 1,
            stagger: 0.055,
            duration: 0.85,
            ease: "back.out(1.6)",
            delay: 0.05,
          }
        );
        gsap.fromTo(
          ".hero-portrait",
          { y: 140, opacity: 0, scale: 0.86 },
          { y: 0, opacity: 1, scale: 1, duration: 1.15, ease: "expo.out", delay: 0.28 }
        );
        gsap.fromTo(
          ".hero-blob",
          { scale: 0.45, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1, ease: "back.out(1.5)", delay: 0.18 }
        );
        gsap.fromTo(
          ".hero-deco",
          { opacity: 0, scale: 0.3, rotate: -20 },
          { opacity: 1, scale: 1, rotate: 0, stagger: 0.07, duration: 0.55, delay: 0.45, ease: "back.out(2)" }
        );
        gsap.fromTo(
          ".hero-role",
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.55, delay: 0.85 }
        );
      }

      const mm = gsap.matchMedia();
      mm.add("(pointer: fine) and (min-width: 768px)", () => {
        const move = (e: MouseEvent) => {
          const r = el.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          gsap.to(".hero-portrait", { x: x * 18, y: y * 12, duration: 0.7, ease: "power2.out" });
          gsap.to(".hero-blob", { x: x * 10, y: y * 8, duration: 0.9, ease: "power2.out" });
          gsap.to(".hero-title", { x: x * -8, y: y * -4, duration: 0.8, ease: "power2.out" });
          gsap.to(".hero-deco", { x: x * 14, y: y * 10, duration: 1, ease: "power2.out" });
        };
        el.addEventListener("mousemove", move);
        return () => el.removeEventListener("mousemove", move);
      });
    }, root);

    return () => ctx.revert();
  }, [reduced, play]);

  return (
    <section
      ref={root}
      id="top"
      className="paper-sheet relative overflow-hidden px-3 pb-8 pt-20 sm:px-6 md:px-10 md:pb-12 md:pt-24"
    >
      <div className="hero-deco pointer-events-none absolute left-2 top-[4.6rem] sm:left-6 md:left-12 md:top-24">
        <CircleScribble className="h-20 w-20 sm:h-28 sm:w-28 md:h-36 md:w-36" />
        <p className="doodle absolute inset-0 flex flex-col items-center justify-center text-center text-[13px] leading-4 text-ink-soft sm:text-base sm:leading-5 md:text-xl md:leading-6">
          <span>ideas</span>
          <span className="text-purple">create</span>
          <span>inspire</span>
        </p>
      </div>

      <PaperPlane className="hero-deco pointer-events-none absolute right-3 top-[4.8rem] h-10 w-10 rotate-12 sm:right-8 sm:h-14 sm:w-14 md:right-16 md:top-28 md:h-24 md:w-24" />
      <StarDoodle className="hero-deco pointer-events-none absolute left-[22%] top-28 hidden h-8 w-8 md:block" />
      <StarDoodle className="hero-deco pointer-events-none absolute right-[18%] top-36 hidden h-8 w-8 md:block" />
      <SparkDoodle
        className="hero-deco pointer-events-none absolute bottom-16 left-[6%] hidden h-9 w-9 md:block"
        color="#5c49d4"
      />
      <StarDoodle className="hero-deco pointer-events-none absolute bottom-16 right-[6%] h-7 w-7 md:h-9 md:w-9" color="#5c49d4" />
      <ArrowDoodle className="hero-deco pointer-events-none absolute bottom-8 left-[36%] hidden h-12 w-24 rotate-12 md:block" />

      <div className="relative mx-auto flex min-h-[calc(100svh-5.5rem)] w-full max-w-[1400px] flex-col items-center justify-center">
        <div className="relative flex h-[58vw] min-h-[340px] w-full items-center justify-center sm:h-[62vw] sm:min-h-[420px] md:h-[560px] lg:h-[640px] xl:h-[700px]">
          <h1 className="hero-title title-3d relative z-10 whitespace-nowrap text-center text-[12.4vw] leading-[0.78] sm:text-[12vw] md:text-[11vw] lg:text-[10.2vw] xl:text-[9.4rem]">
            <span className="ghost" aria-hidden="true">
              PORTFOLIO
            </span>
            {letters.map((ch, i) => (
              <span key={i} className="hero-letter relative">
                {ch}
              </span>
            ))}
          </h1>

          <div className="hero-blob absolute left-1/2 top-[46%] z-[11] h-[58vw] w-[58vw] max-h-[460px] max-w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-[48%_52%_44%_56%/54%_44%_56%_46%] bg-purple/40 sm:h-[46vw] sm:w-[46vw] md:h-[400px] md:w-[400px] lg:h-[460px] lg:w-[460px]" />

          <div className="hero-portrait cutout-wrap absolute left-1/2 top-[52%] z-20 w-[78vw] max-w-[420px] -translate-x-1/2 -translate-y-1/2 sm:w-[58vw] sm:max-w-[460px] md:w-[400px] lg:w-[480px] xl:w-[520px]">
            <img
              src={portraitSrc}
              alt={`${person.name}, ${person.shortRole}`}
              className="h-auto w-full select-none object-contain"
              draggable={false}
              fetchPriority="high"
              width={600}
              height={600}
            />
          </div>
        </div>

        <div className="hero-role relative z-30 mt-1 flex flex-col items-center gap-3 sm:mt-2">
          <span className="brush-label text-[10px] sm:text-xs md:text-sm">{person.role}</span>
          <p className="doodle text-base text-ink-soft sm:text-lg md:text-xl">
            {person.name} · {person.brand}
          </p>
        </div>
        <a
          href="#about"
          className="hero-role doodle mt-5 text-base text-purple sm:mt-7 md:text-lg"
          data-cursor="down"
        >
          scroll a little ↓
        </a>
      </div>
    </section>
  );
}
