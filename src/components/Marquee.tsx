import { marqueeWords } from "../data/content";
import { StarDoodle } from "./Doodles";

export default function Marquee() {
  const row = [...marqueeWords, ...marqueeWords];
  return (
    <div className="paper-sheet relative overflow-hidden border-y-2 border-ink/10 py-4 md:py-5" aria-hidden="true">
      <div className="marquee-track gap-8 pr-8">
        {row.map((w, i) => (
          <span key={`${w}-${i}`} className="flex items-center gap-8">
            <span className="hand text-3xl text-purple md:text-4xl">{w}</span>
            <StarDoodle className="h-5 w-5" color="#1a1814" />
          </span>
        ))}
      </div>
    </div>
  );
}
