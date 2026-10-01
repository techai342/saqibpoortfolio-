import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { portraitSrc, person } from "../data/content";
import { CircleScribble, SparkDoodle, StarDoodle } from "./Doodles";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

type Props = {
  onReveal: () => void;
  onComplete: () => void;
};

const STRIPS = 7;
const NAME = "SAQIB".split("");

export default function Loader({ onReveal, onComplete }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) {
      onReveal();
      onComplete();
      return;
    }

    const ctx = gsap.context(() => {
      const counter = { v: 0 };
      gsap.to(counter, {
        v: 100,
        duration: 3.35,
        ease: "power1.inOut",
        onUpdate: () => setPct(Math.round(counter.v)),
      });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".ld-mark",
        { scaleX: 0 },
        { scaleX: 1, duration: 0.55, ease: "power2.inOut" }
      )
        .fromTo(
          ".ld-word",
          { y: 40, opacity: 0, rotate: -8, filter: "blur(8px)" },
          {
            y: 0,
            opacity: 1,
            rotate: 0,
            filter: "blur(0px)",
            stagger: 0.16,
            duration: 0.55,
            ease: "back.out(1.7)",
          },
          "-=0.15"
        )
        .fromTo(
          ".ld-circle path",
          { strokeDasharray: 480, strokeDashoffset: 480 },
          { strokeDashoffset: 0, duration: 1.05, ease: "power2.inOut" },
          "-=0.85"
        )
        .fromTo(
          ".ld-star",
          { scale: 0, rotate: 70, opacity: 0 },
          { scale: 1, rotate: 0, opacity: 1, stagger: 0.08, duration: 0.42, ease: "back.out(2.2)" },
          "-=0.7"
        )
        .fromTo(
          ".ld-scrap",
          { y: 80, rotate: 18, opacity: 0 },
          { y: 0, rotate: 8, opacity: 1, stagger: 0.07, duration: 0.55, ease: "back.out(1.5)" },
          "-=0.45"
        )
        .fromTo(
          ".ld-letter",
          { y: 90, opacity: 0, rotateX: 80, scale: 0.6 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            scale: 1,
            stagger: 0.07,
            duration: 0.58,
            ease: "back.out(1.8)",
          },
          "-=0.2"
        )
        .fromTo(
          ".ld-shot",
          { y: 70, rotate: -14, opacity: 0, scale: 0.8 },
          { y: 0, rotate: -6, opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.6)" },
          "-=0.35"
        )
        .fromTo(
          ".ld-sub",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.4 },
          "-=0.25"
        )
        .to(".ld-stage", { opacity: 0, y: -24, duration: 0.32, ease: "power2.in" }, "+=0.28")
        .set(root.current, { backgroundImage: "none", backgroundColor: "transparent" })
        .add(() => onReveal())
        .to(
          ".ld-strip",
          {
            yPercent: -112,
            duration: 1.05,
            stagger: { each: 0.08, from: "center" },
            ease: "power4.inOut",
            onComplete,
          }
        );
    }, root);

    return () => ctx.revert();
  }, [onComplete, onReveal, reduced]);

  if (reduced) return null;

  return (
    <div
      ref={root}
      className="loader-screen fixed inset-0 z-[90] overflow-hidden"
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      <div className="ld-stage relative z-10 flex h-full flex-col items-center justify-center px-4">
        <span className="ld-mark mb-6 h-[3px] w-16 origin-left bg-purple" />

        <div className="relative">
          <CircleScribble className="ld-circle pointer-events-none absolute -inset-8 h-[210px] w-[210px] md:-inset-12 md:h-[270px] md:w-[270px]" />
          <div className="relative z-10 flex flex-col items-center px-8 py-10 leading-none">
            <span className="ld-word doodle text-4xl text-ink md:text-5xl">ideas</span>
            <span className="ld-word hand my-1 -rotate-2 text-5xl text-purple md:text-7xl">create</span>
            <span className="ld-word doodle text-4xl text-ink md:text-5xl">inspire</span>
          </div>
          <StarDoodle className="ld-star absolute -left-5 -top-3 h-8 w-8" />
          <SparkDoodle className="ld-star absolute -right-3 top-2 h-7 w-7" color="#5c49d4" />
          <StarDoodle className="ld-star absolute -bottom-1 right-5 h-6 w-6" color="#5c49d4" />
        </div>

        <div className="mt-8 flex items-end gap-1 md:gap-2" style={{ perspective: 600 }}>
          {NAME.map((ch) => (
            <span
              key={ch}
              className="ld-letter title-3d text-[12vw] leading-none md:text-7xl"
            >
              {ch}
            </span>
          ))}
        </div>

        <div className="ld-shot relative mt-5 w-[92px] rotate-[-6deg] overflow-hidden rounded-md border-2 border-ink bg-paper p-1 shadow-[6px_8px_0_#5c49d4] md:w-[110px]">
          <img src={portraitSrc} alt="" className="aspect-square w-full object-cover object-top" />
        </div>
        <p className="ld-sub doodle mt-4 text-xl text-ink-soft md:text-2xl">
          {person.name} — {person.shortRole.toLowerCase()}
        </p>
        <p className="ld-sub doodle mt-5 text-lg text-ink-soft">
          assembling the scrapbook — {pct}%
        </p>
      </div>

      <div className="ld-scrap pointer-events-none absolute left-[8%] top-[14%] h-16 w-12 rotate-[-12deg] bg-purple/80 md:h-24 md:w-16" />
      <div className="ld-scrap pointer-events-none absolute right-[10%] top-[18%] h-10 w-20 rotate-[8deg] bg-[#ead7a0]/80 md:h-14 md:w-28" />
      <div className="ld-scrap pointer-events-none absolute bottom-[16%] left-[12%] h-8 w-24 rotate-[-6deg] bg-ink/80 md:h-10 md:w-32" />
      <div className="ld-scrap pointer-events-none absolute bottom-[20%] right-[14%] h-14 w-14 rotate-[14deg] bg-lavender md:h-20 md:w-20" />

      <div className="pointer-events-none absolute inset-0 z-[8] flex">
        {Array.from({ length: STRIPS }).map((_, i) => (
          <div
            key={i}
            className="ld-strip relative h-full flex-1"
            style={{
              backgroundColor: i % 2 === 0 ? "#f3eee4" : "#ebe4d4",
              backgroundImage: "var(--paper-img)",
              backgroundSize: "420px",
              backgroundBlendMode: "multiply",
            }}
          >
            <span className="absolute bottom-0 left-0 right-0 h-8 origin-bottom bg-inherit jagged" />
          </div>
        ))}
      </div>
    </div>
  );
}
