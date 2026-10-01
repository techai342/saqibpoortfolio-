import { navLinks, person } from "../data/content";
import { HeartDoodle, Paperclip, SmileDoodle, StarDoodle, TornEdge } from "./Doodles";

export default function Footer() {
  return (
    <footer className="relative">
      <TornEdge fill="#f3eee4" className="relative z-10" />
      <div className="purple-sheet -mt-8 px-4 pb-10 pt-16 md:-mt-12 md:px-10 md:pt-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="hand text-4xl font-bold text-paper md:text-5xl">Thanks for visiting!</p>
            <div className="mt-3 flex items-center gap-3">
              <HeartDoodle className="h-7 w-7" color="#ff6b5b" />
              <StarDoodle className="h-6 w-6" color="#faf6ee" />
              <SmileDoodle className="h-8 w-8" color="#faf6ee" />
              <Paperclip className="h-10 w-6 rotate-12" />
            </div>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="hand text-2xl text-paper hover:underline">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <p className="mx-auto mt-10 max-w-6xl doodle text-lg text-lavender">
          © {new Date().getFullYear()} {person.name} — handmade in {person.location.split(",")[0]}.
        </p>
      </div>
    </footer>
  );
}
