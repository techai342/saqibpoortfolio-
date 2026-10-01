import { FormEvent, useState } from "react";
import { person } from "../data/content";
import {
  ArrowDoodle,
  CircleScribble,
  HeartDoodle,
  SmileDoodle,
  SparkDoodle,
  StarDoodle,
} from "./Doodles";
import Tape from "./Tape";

const items = [
  { label: "Email", value: person.email, href: `mailto:${person.email}`, icon: "✉" },
  { label: "WhatsApp", value: person.phone, href: person.whatsappUrl, icon: "✆" },
  { label: "Website", value: person.websiteShort, href: person.website, icon: "🌐" },
  { label: "Instagram", value: person.instagram, href: person.instagramUrl, icon: "◎" },
  { label: "Location", value: person.location, href: undefined, icon: "⌖" },
];

const socials = [
  { label: "TikTok", href: person.tiktokUrl },
  { label: "Facebook", href: person.facebookUrl },
  { label: "Snapchat", href: person.snapchatUrl },
];

export default function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const message = String(data.get("message") || "");
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${person.email}?subject=${encodeURIComponent("New project enquiry")}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" className="paper-sheet relative px-4 py-20 md:px-10 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-start">
        <div className="relative">
          <CircleScribble className="absolute -left-8 -top-10 hidden h-28 w-28 md:block" />
          <p className="doodle text-xl text-purple">say hello</p>
          <h2 className="hand relative z-10 max-w-lg text-5xl font-bold leading-[1.05] text-ink md:text-6xl">
            Let's create
            <br />
            something{" "}
            <span className="text-purple italic">amazing</span>
            <br />
            together!
          </h2>
          <ArrowDoodle className="my-4 h-12 w-28 rotate-[-8deg]" />
          <p className="max-w-md text-lg text-ink-soft">
            Got a brand, a poster, a campaign, or a wild idea scribbled on a napkin?
            Slide into my inbox — I still love analog conversations.
          </p>

          <ul className="mt-8 space-y-3">
            {items.map((item) => (
              <li key={item.label} className="flex items-center gap-3">
                <span className="sticker flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold text-purple">
                  {item.icon}
                </span>
                {item.href ? (
                  <a href={item.href} className="hover:text-purple" data-cursor="open">
                    <span className="doodle block text-base text-purple">{item.label}</span>
                    <span className="text-[15px]">{item.value}</span>
                  </a>
                ) : (
                  <span>
                    <span className="doodle block text-base text-purple">{item.label}</span>
                    <span className="text-[15px]">{item.value}</span>
                  </span>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-wrap gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="sticker inline-flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-semibold text-purple transition hover:scale-105"
                data-cursor="open"
              >
                <span>↗</span>
                <span>{s.label}</span>
              </a>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-3">
            <SmileDoodle className="h-9 w-9" />
            <StarDoodle className="h-6 w-6" color="#5c49d4" />
            <HeartDoodle className="h-7 w-7" />
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="paper-card relative rotate-1 rounded-md p-6 md:p-8"
          data-cursor="write"
        >
          <Tape className="left-10 -top-3" rotate={-9} width={92} />
          <Tape className="right-8 -top-2" rotate={12} width={70} />
          <p className="hand text-3xl font-bold text-purple">Leave a note</p>
          <p className="doodle mb-6 text-lg text-ink-soft">I'll write back. Promise.</p>

          <label className="mb-5 block">
            <span className="doodle text-lg">Name</span>
            <input name="name" required autoComplete="name" />
          </label>
          <label className="mb-5 block">
            <span className="doodle text-lg">Email</span>
            <input name="email" type="email" required autoComplete="email" />
          </label>
          <label className="mb-6 block">
            <span className="doodle text-lg">Your idea</span>
            <textarea name="message" rows={4} required />
          </label>

          <button type="submit" className="btn-hand text-xl" data-cursor="send">
            Send it {sent ? "✓" : "→"}
          </button>
          {sent && (
            <p className="doodle mt-3 text-lg text-purple">opening your mail app…</p>
          )}
          <SparkDoodle className="absolute bottom-4 right-5 h-6 w-6 opacity-50" />
        </form>
      </div>
    </section>
  );
}
