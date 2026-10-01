import { useEffect, useState } from "react";
import { navLinks } from "../data/content";
import { StarDoodle } from "./Doodles";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 md:px-8">
      <nav
        className={`nav-chip mx-auto flex max-w-5xl items-center justify-between rounded-[22px] px-4 py-2.5 transition-transform duration-300 ${
          scrolled ? "translate-y-0" : "md:translate-y-1"
        }`}
        aria-label="Primary"
      >
        <a href="#top" className="flex items-center gap-2" data-cursor="home">
          <StarDoodle className="h-5 w-5" color="#5c49d4" />
          <span className="hand text-xl font-bold text-purple">Kashif</span>
        </a>

        <ul className="hidden items-center gap-4 lg:flex xl:gap-6">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                data-cursor={l.label}
                className="ui text-[13px] font-semibold uppercase tracking-[0.16em] text-ink-soft hover:text-purple"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a href="#contact" className="btn-hand hidden text-base lg:inline-flex" data-cursor="hello">
          Let's talk
        </a>

        <button
          className="ui relative h-10 w-10 lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`absolute left-2 right-2 h-[2.5px] bg-ink transition-all ${
              open ? "top-1/2 rotate-45" : "top-3"
            }`}
          />
          <span
            className={`absolute left-2 right-2 top-1/2 h-[2.5px] bg-ink transition-all ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute left-2 right-2 h-[2.5px] bg-ink transition-all ${
              open ? "top-1/2 -rotate-45" : "top-7"
            }`}
          />
        </button>
      </nav>

      {open && (
        <div className="mobile-menu mt-3 rounded-3xl p-6 lg:hidden">
          <ul className="flex flex-col gap-4">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="hand text-3xl text-ink"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#contact" className="btn-hand mt-2" onClick={() => setOpen(false)}>
                Let's talk
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
