import { person } from "../data/content";

export default function Available() {
  return (
    <a
      href="#contact"
      className="available-pill floaty fixed bottom-5 right-5 z-40 hidden items-center gap-2 rounded-full border-2 border-ink bg-paper px-4 py-2 md:flex"
      data-cursor="hi"
    >
      <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
      <span className="hand text-lg font-bold">open for work</span>
      <span className="doodle hidden text-purple lg:inline">{person.firstName}</span>
    </a>
  );
}
