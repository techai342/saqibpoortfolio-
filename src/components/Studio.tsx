import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experience, person, skills } from "../data/content";
import { SparkDoodle, StarDoodle, UnderlineSquiggle } from "./Doodles";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const tilts = [-7, 4, -3, 8, -5, 6];

const contacts = [
  { icon: "✉", label: person.email, href: `mailto:${person.email}` },
  { icon: "✆", label: person.phone, href: person.whatsappUrl },
  { icon: "◎", label: person.instagram, href: person.instagramUrl },
  { icon: "⌖", label: person.location, href: undefined },
];

export default function Studio() {
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
      gsap.from(".exp-item", {
        x: -24,
        opacity: 0,
        stagger: 0.15,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: { trigger: "#experience", start: "top 80%" },
      });
      gsap.from(".mini-contact", {
        y: 18,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        scrollTrigger: { trigger: "#mini-contact", start: "top 85%" },
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={root} className="paper-sheet relative px-4 py-8 md:px-10 md:py-14">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:gap-12 lg:grid-cols-3">
        <div id="skills">
          <div className="mb-8 flex items-end gap-3">
            <div>
              <h2 className="hand text-4xl font-bold text-purple sm:text-5xl md:text-6xl">Software</h2>
              <UnderlineSquiggle className="h-4 w-32" />
            </div>
            <StarDoodle className="mb-3 h-7 w-7" />
          </div>
          <ul className="flex flex-wrap items-center gap-4 md:gap-5">
            {skills.map((s, i) => (
              <li
                key={s.id}
                className="skill-sticker sticker relative flex h-[74px] w-[74px] flex-col items-center justify-center rounded-2xl sm:h-[86px] sm:w-[86px]"
                style={{ transform: `rotate(${tilts[i]}deg)` }}
                data-cursor={s.name}
              >
                <span className="ui text-2xl font-extrabold tracking-tight sm:text-3xl" style={{ color: s.color }}>
                  {s.label}
                </span>
                <span className="doodle mt-0.5 text-[11px] text-ink-soft sm:text-sm">{s.name}</span>
              </li>
            ))}
          </ul>
          <SparkDoodle className="mt-6 h-7 w-7" color="#5c49d4" />
        </div>

        <div id="experience">
          <h2 className="hand text-4xl font-bold text-purple sm:text-5xl md:text-6xl">Experience</h2>
          <UnderlineSquiggle className="mb-8 mt-1 h-4 w-40" />
          <ol className="relative ml-2 border-l-2 border-dashed border-purple/50 pl-8">
            {experience.map((item) => (
              <li key={item.years} className="exp-item relative mb-8 last:mb-0">
                <span className="timeline-dot absolute -left-[41px] top-2" />
                <p className="doodle text-xl text-purple">{item.years}</p>
                <h3 className="hand text-xl font-bold sm:text-2xl">{item.role}</h3>
                <p className="text-ink-soft">{item.company}</p>
                <span className="mt-3 block h-px w-36 border-t border-dotted border-ink/30" />
              </li>
            ))}
          </ol>
        </div>

        <div id="mini-contact">
          <h2 className="hand text-4xl font-bold text-purple sm:text-5xl md:text-6xl">Contact</h2>
          <UnderlineSquiggle className="mb-8 mt-1 h-4 w-32" />
          <ul className="space-y-4">
            {contacts.map((c) => (
              <li key={c.label} className="mini-contact flex items-center gap-3">
                <span className="sticker flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-purple">
                  {c.icon}
                </span>
                {c.href ? (
                  <a href={c.href} className="break-all text-[15px] hover:text-purple" data-cursor="open">
                    {c.label}
                  </a>
                ) : (
                  <span className="text-[15px]">{c.label}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
