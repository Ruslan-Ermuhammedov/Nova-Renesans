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
    let lastScrollY = window.scrollY;
    let revealHeaderTimeout: number | null = null;

    const updateHeaderTheme = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;
      const heroLightStart = window.innerHeight * 0.48;
      const heroLightEnd = window.innerHeight * (window.innerWidth >= 1024 ? 3.65 : 2.82);
      const darkNavSection = document.querySelector<HTMLElement>("[data-dark-nav='true']");
      const isDarkSectionActive = darkNavSection ? darkNavSection.getBoundingClientRect().top <= window.innerHeight * 0.72 : false;
      document.body.classList.toggle("is-scrolled", currentScrollY > 0);
      document.body.classList.toggle("is-hero-zooming", currentScrollY > 0 && currentScrollY < heroLightStart);
      document.body.classList.toggle("is-dark-section", isDarkSectionActive);
      document.body.classList.toggle(
        "is-light-section",
        !isDarkSectionActive && currentScrollY > heroLightStart && currentScrollY < heroLightEnd,
      );

      if (!prefersReduced) {
        if (revealHeaderTimeout) window.clearTimeout(revealHeaderTimeout);

        if (currentScrollY < 24 || scrollDelta < -4) {
          document.body.classList.remove("is-header-hidden");
        } else if (scrollDelta > 4) {
          document.body.classList.add("is-header-hidden");
        }

        revealHeaderTimeout = window.setTimeout(() => {
          document.body.classList.remove("is-header-hidden");
        }, 2000);
      }

      lastScrollY = currentScrollY;
    };

    updateHeaderTheme();
    window.addEventListener("scroll", updateHeaderTheme, { passive: true });

    if (prefersReduced) {
      return () => {
        if (revealHeaderTimeout) window.clearTimeout(revealHeaderTimeout);
        window.removeEventListener("scroll", updateHeaderTheme);
        document.body.classList.remove(
          "is-scrolled",
          "is-light-section",
          "is-hero-zooming",
          "is-dark-section",
          "is-header-hidden",
        );
      };
    }

    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      gsap.set(".hero-title", {
        transformOrigin: "49% 50%",
        force3D: true,
      });
      gsap.set(".story-reveal", {
        y: "72vh",
        force3D: true,
      });

      mm.add("(min-width: 1024px)", () => {
        const isCompactDesktop = window.innerWidth < 1920 || window.innerHeight < 900;

        const heroTl = gsap.timeline({
          scrollTrigger: {
            trigger: ".hero-pin",
            start: "top top",
            end: isCompactDesktop ? "+=360%" : "+=440%",
            scrub: 1.45,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              document.body.classList.toggle("is-hero-zooming", self.progress > 0.001 && self.progress < 0.92);
            },
          },
        });

        heroTl
          .to(
            ".hero-title",
            {
              scale: 136,
              xPercent: -1.5,
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
              duration: 0.5,
              ease: "none",
            },
            isCompactDesktop ? 0.28 : 0.46,
          )
          .to(
            {},
            {
              duration: 0.28,
              ease: "none",
            },
          );
      });

      mm.add("(max-width: 1023px)", () => {
        const heroTl = gsap.timeline({
          scrollTrigger: {
            trigger: ".hero-pin",
            start: "top top",
            end: "+=360%",
            scrub: 1.3,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              document.body.classList.toggle("is-hero-zooming", self.progress > 0.001 && self.progress < 0.92);
            },
          },
        });

        heroTl
          .to(
            ".hero-title",
            {
              scale: 78,
              xPercent: -2,
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
              duration: 0.52,
              ease: "none",
            },
            0.46,
          )
          .to(
            {},
            {
              duration: 0.28,
              ease: "none",
            },
          );
      });

      window.requestAnimationFrame(() => ScrollTrigger.refresh());
    }, rootRef);

    return () => {
      if (revealHeaderTimeout) window.clearTimeout(revealHeaderTimeout);
      window.removeEventListener("scroll", updateHeaderTheme);
      document.body.classList.remove("is-scrolled", "is-light-section", "is-hero-zooming", "is-dark-section", "is-header-hidden");
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
        <span className="brand-icon" aria-hidden="true">
          <img className="brand-logo brand-logo-white" src="/brand/nova_n_logo_white.svg" alt="" />
          <img className="brand-logo brand-logo-dark" src="/brand/nova_n_logo_clean.svg" alt="" />
        </span>
        <span className="leading-none">
          <span className="block text-[18px] font-medium tracking-[-0.02em] md:text-[24px]">NOVA</span>
          <span className="block text-[10px] font-normal uppercase tracking-[0.34em] text-white/70 md:text-xs">
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
