import { useEffect, useRef } from "react";
import { useIsTouch } from "../hooks/usePrefersReducedMotion";

export default function CustomCursor() {
  const touch = useIsTouch();
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (touch) return;
    const d = dot.current;
    const r = ring.current;
    const l = label.current;
    if (!d || !r || !l) return;

    let x = 0;
    let y = 0;
    let rx = 0;
    let ry = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      d.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const loop = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      r.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    const onOver = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest("[data-cursor]");
      if (t) {
        r.classList.add("is-hover");
        l.textContent = t.getAttribute("data-cursor") || "view";
      }
    };
    const onOut = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest("[data-cursor]");
      if (t) {
        r.classList.remove("is-hover");
        l.textContent = "";
      }
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(raf);
    };
  }, [touch]);

  if (touch) return null;

  return (
    <>
      <div ref={dot} className="cursor-dot hidden md:block" />
      <div ref={ring} className="cursor-ring hidden md:block">
        <span ref={label} className="leading-none" />
      </div>
    </>
  );
}
