import { useCallback, useState } from "react";
import About from "./components/About";
import Available from "./components/Available";
import BrandStrip from "./components/BrandStrip";
import Contact from "./components/Contact";
import CustomCursor from "./components/CustomCursor";
import Faq from "./components/Faq";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Loader from "./components/Loader";
import Marquee from "./components/Marquee";
import Navbar from "./components/Navbar";
import Notes from "./components/Notes";
import Principles from "./components/Principles";
import Process from "./components/Process";
import Services from "./components/Services";
import Stats from "./components/Stats";
import Studio from "./components/Studio";
import Work from "./components/Work";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [play, setPlay] = useState(false);
  const onReveal = useCallback(() => setPlay(true), []);
  const onLoaded = useCallback(() => setLoading(false), []);

  return (
    <>
      <a href="#about" className="skip-link">
        Skip to content
      </a>
      {loading && <Loader onReveal={onReveal} onComplete={onLoaded} />}
      <div className="grain" aria-hidden="true" />
      <CustomCursor />
      <Navbar />
      <Available />
      <main>
        <Hero play={play} />
        <Marquee />
        <About />
        <Stats />
        <Studio />
        <BrandStrip />
        <Work />
        <Process />
        <Services />
        <Principles />
        <Notes />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
