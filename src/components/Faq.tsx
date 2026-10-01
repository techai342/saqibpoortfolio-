import { useState } from "react";
import { faqs } from "../data/content";
import { UnderlineSquiggle } from "./Doodles";

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="paper-sheet px-4 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-3xl">
        <p className="doodle text-lg text-purple">the practical stuff</p>
        <h2 className="hand text-5xl font-bold text-purple md:text-6xl">FAQ</h2>
        <UnderlineSquiggle className="mb-8 h-4 w-24" />

        <div className="paper-card rounded-2xl px-2 py-1 md:px-4">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="faq-item">
                <button
                  className="flex w-full items-center justify-between gap-4 px-3 py-5 text-left"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  data-cursor="open"
                >
                  <span className="hand text-2xl font-bold md:text-3xl">{f.q}</span>
                  <span className="hand text-3xl text-purple">{isOpen ? "–" : "+"}</span>
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-3 pb-5 text-[16px] leading-relaxed text-ink-soft">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
