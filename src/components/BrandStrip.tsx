import { brands } from "../data/content";

export default function BrandStrip() {
  const row = [...brands, ...brands];
  return (
    <section className="paper-sheet overflow-hidden px-4 py-10 md:px-10" aria-label="Collaborations">
      <p className="mx-auto mb-6 max-w-6xl doodle text-xl text-purple">stamped on projects for</p>
      <div className="marquee-track gap-6 pr-6">
        {row.map((b, i) => (
          <span
            key={`${b}-${i}`}
            className="stamp inline-flex items-center rounded-md px-5 py-2 text-sm"
            style={{ transform: `rotate(${i % 2 === 0 ? -3 : 3}deg)` }}
          >
            {b}
          </span>
        ))}
      </div>
    </section>
  );
}
