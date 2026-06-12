"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const navItems = ["Services", "Projects", "Process", "Contact"];

export default function NovaLanding() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      gsap.set(".hero-title", {
        transformOrigin: "14% 50%",
        force3D: true,
      });
      gsap.set(".story-reveal", {
        y: "72vh",
        force3D: true,
      });

      mm.add("(min-width: 1024px)", () => {
        const heroTl = gsap.timeline({
          scrollTrigger: {
            trigger: ".hero-pin",
            start: "top top",
            end: "+=380%",
            scrub: 1.45,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        heroTl
          .to(
            ".hero-title",
            {
              scale: 72,
              xPercent: 14,
              yPercent: 0,
              letterSpacing: "-0.06em",
              duration: 1,
              ease: "none",
            },
            0,
          )
          .to(
            ".story-reveal",
            {
              y: 0,
              duration: 0.58,
              ease: "none",
            },
            0.18,
          );
      });

      mm.add("(max-width: 1023px)", () => {
        const heroTl = gsap.timeline({
          scrollTrigger: {
            trigger: ".hero-pin",
            start: "top top",
            end: "+=300%",
            scrub: 1.3,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        heroTl
          .to(
            ".hero-title",
            {
              scale: 38,
              xPercent: 12,
              yPercent: 2,
              letterSpacing: "-0.045em",
              duration: 1,
              ease: "none",
            },
            0,
          )
          .to(
            ".story-reveal",
            {
              y: 0,
              duration: 0.6,
              ease: "none",
            },
            0.16,
          );
      });

      window.requestAnimationFrame(() => ScrollTrigger.refresh());
    }, rootRef);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <main ref={rootRef} className="nova-shell">
      <Header />
      <HeroSection />
    </main>
  );
}

function Header() {
  return (
    <header className="site-header">
      <a href="#top" className="brand-mark" aria-label="Nova Renessans home">
        <span className="brand-icon" aria-hidden="true" />
        <span className="leading-none">
          <span className="block text-[18px] font-black tracking-[-0.04em] md:text-[24px]">NOVA</span>
          <span className="block text-[10px] font-extrabold uppercase tracking-[0.34em] text-nova-green md:text-xs">
            Renessans
          </span>
        </span>
      </a>

      <nav className="hidden items-center gap-8 xl:flex" aria-label="Main navigation">
        {navItems.map((item) => (
          <a href="#story" className="header-link" key={item}>
            {item}
          </a>
        ))}
      </nav>

      <a className="primary-button" href="mailto:novarenessans@gmail.com">
        Get in Touch
      </a>
    </header>
  );
}

function HeroSection() {
  return (
    <section id="top" className="hero-pin" aria-label="Nova Renessans hero section">
      <div className="hero-inner">
        <div className="w-full">
          <h1 className="hero-title">Nova</h1>
        </div>
      </div>

      <StoryPanel />
    </section>
  );
}

function StoryPanel() {
  return (
    <div id="story" className="hero-story-panel" aria-label="Nova Renessans story section">
      <div className="story-wrap">
        <div className="story-reveal">
          <h2 className="story-title">From idea to working product</h2>
        </div>
      </div>
    </div>
  );
}
