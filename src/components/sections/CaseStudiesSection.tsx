"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Sparkle } from "lucide-react";
import cardImage1 from "@/assets/cardImage1.png";
import cardImage2 from "@/assets/cardImage2.png";
import cardImage3 from "@/assets/cardImage3.png";
import cardImage4 from "@/assets/cardImage4.png";

const caseStudies = [
  {
    tag: "MANUFACTURING",
    title: "System Modernization for a Global Manufacture",
    description: "Modernized legacy systems, improving speed, stability, and efficiency across global operations.",
    image: cardImage1,
    imageClass: "right-[1%] top-[2%] w-[30%] md:w-[29%]",
  },
  {
    tag: "FINANCE",
    title: "Cloud Migration for a Healthcare Ecosystem",
    description: "Migrated core data to cloud, enhancing speed, security, and accessibility across systems.",
    image: cardImage2,
    imageClass: "right-[1%] top-[2%] w-[30%] md:w-[29%]",
  },
  {
    tag: "FINANCE",
    title: "Automation Framework for Enterprise Operations",
    description: "Developed a system that automated workflows, reduced errors, and improved efficiency.",
    image: cardImage3,
    imageClass: "right-[1%] top-[2%] w-[31%] md:w-[30%]",
  },
  {
    tag: "SAAS",
    title: "Data Intelligence Suite for SaaS Growth",
    description: "Created a platform that unified analytics, improved insights, and optimized decisions across business.",
    image: cardImage4,
    imageClass: "right-[1%] top-[2%] w-[30%] md:w-[29%]",
  },
];

export default function CaseStudiesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let revealObserver: IntersectionObserver | null = null;

    const ctx = gsap.context(() => {
      gsap.set(headerRef.current, { autoAlpha: 0, y: 34, filter: "blur(10px)" });
      gsap.set(".case-studies-heading-line", { width: 0 });
      gsap.set(".case-studies-heading-dot", { autoAlpha: 0, scale: 0.6, transformOrigin: "50% 50%" });
      gsap.set(cardRefs.current, {
        autoAlpha: 0,
        y: 54,
        scale: 0.97,
        filter: "blur(12px)",
        transformOrigin: "50% 75%",
      });
      gsap.set(".case-study-tag", { autoAlpha: 0, y: 16 });
      gsap.set(".case-study-content", { autoAlpha: 0, y: 30 });
      gsap.set(".case-study-image", { autoAlpha: 0, scale: 0.94, filter: "blur(10px)" });

      const tl = gsap
        .timeline({
          paused: true,
          defaults: {
            ease: "power3.out",
          },
        })
        .to(headerRef.current, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.9 })
        .to(".case-studies-heading-line", { width: "100%", duration: 0.82, ease: "power2.inOut" }, 0.16)
        .to(".case-studies-heading-dot", { autoAlpha: 1, scale: 1, duration: 0.36 }, 0.74)
        .to(
          cardRefs.current,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.86,
            stagger: 0.11,
          },
          0.32,
        )
        .to(".case-study-tag", { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.08 }, 0.5)
        .to(
          ".case-study-image",
          {
            autoAlpha: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.78,
            stagger: 0.08,
            clearProps: "transform",
          },
          0.56,
        )
        .to(".case-study-content", { autoAlpha: 1, y: 0, duration: 0.68, stagger: 0.08 }, 0.68);

      revealObserver = new IntersectionObserver(
        ([entry]) => {
          if (!entry || entry.intersectionRatio < 0.12) return;

          tl.play();
          revealObserver?.disconnect();
          revealObserver = null;
        },
        {
          rootMargin: "0px 0px -8% 0px",
          threshold: [0, 0.12],
        },
      );

      revealObserver.observe(gridRef.current ?? sectionRef.current!);
    }, sectionRef);

    return () => {
      revealObserver?.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="case-studies"
      data-dark-nav="true"
      className="relative overflow-hidden bg-black py-20 text-white md:py-24 lg:py-28"
    >
      <div className="section-container">
        <div ref={headerRef} className="relative z-20 w-full max-w-[520px]">
          <div className="inline-block">
            <h2 className="text-[clamp(3.35rem,4.55vw,4.7rem)] font-normal leading-[0.9] tracking-[-0.065em] text-white">
              Real Results
            </h2>
            <div className="mt-1 flex w-full items-center">
              <div className="case-studies-heading-line h-px bg-white/70" />
            </div>
            <div className="mt-4 flex items-center justify-between gap-5">
              <p className="text-sm uppercase tracking-[0.14em] text-white/58">CASE STUDIES</p>
              <span className="case-studies-heading-dot h-3.5 w-3.5 shrink-0 bg-[#3478ff]" aria-hidden="true" />
            </div>
          </div>
        </div>

        <div ref={gridRef} className="mt-16 grid gap-5 md:grid-cols-2 lg:mt-20 lg:gap-6 min-[1721px]:gap-7">
          {caseStudies.map((study, index) => (
            <CaseStudyCard
              key={study.title}
              study={study}
              index={index}
              refCallback={(node) => {
                cardRefs.current[index] = node;
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseStudyCard({
  study,
  index,
  refCallback,
}: {
  study: (typeof caseStudies)[number];
  index: number;
  refCallback: (node: HTMLElement | null) => void;
}) {
  return (
    <article
      ref={refCallback}
      className="group relative isolate min-h-[335px] overflow-hidden bg-[#071D46]/40 px-7 py-7 shadow-[0_0_30px_rgba(29,88,210,0.10),inset_0_1px_0_rgba(255,255,255,0.035)] transition duration-500 hover:bg-[#082B67]/50 hover:shadow-[0_0_34px_rgba(42,104,230,0.20),inset_0_1px_0_rgba(255,255,255,0.045)] md:min-h-[390px] md:px-8 md:py-8 lg:min-h-[430px] min-[1721px]:min-h-[480px] min-[1721px]:px-10 min-[1721px]:py-9"
    >
      <span
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[92%] translate-y-full bg-[linear-gradient(to_top,rgba(43,112,242,0.36)_0%,rgba(29,88,210,0.24)_34%,rgba(18,62,150,0.13)_70%,transparent_100%)] opacity-0 transition duration-700 ease-out group-hover:translate-y-0 group-hover:opacity-100"
        aria-hidden="true"
      />
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-[#0d388353]" aria-hidden="true" />
      <span
        className="pointer-events-none absolute bottom-0 left-0 h-[58%] w-[2px] bg-[linear-gradient(to_top,#0d388353,rgba(13,56,131,0.18),transparent)]"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute bottom-0 right-0 h-[58%] w-[2px] bg-[linear-gradient(to_top,#0d388353,rgba(13,56,131,0.18),transparent)]"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(38,94,196,0.10)_0%,rgba(8,24,58,0.08)_58%,rgba(4,10,22,0.06)_100%)]"
        aria-hidden="true"
      />

      <span className="case-study-tag relative z-10 inline-flex h-8 min-w-[92px] items-center justify-center bg-[#12356f]/72 px-4 text-[10px] font-medium uppercase tracking-[0.06em] text-white/74 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
        {study.tag}
      </span>

      <img
        src={study.image.src}
        alt=""
        className={`case-study-image pointer-events-none absolute z-[1] select-none object-contain mix-blend-screen transition duration-700 ease-out group-hover:rotate-[20deg] group-hover:scale-[2.15] ${study.imageClass}`}
      />

      <div className="case-study-content relative z-10 mt-[170px] grid gap-6 md:mt-[185px] lg:mt-[205px] lg:grid-cols-[1fr_auto] lg:items-end min-[1721px]:mt-[235px]">
        <div>
          <h3 className="max-w-[470px] text-[clamp(1.75rem,2.08vw,2.35rem)] font-normal leading-[0.98] tracking-[-0.07em] text-[#e8eef8]">
            {study.title}
          </h3>
          <p className="mt-6 max-w-[500px] text-[0.98rem] font-medium leading-[1.4] tracking-[-0.03em] text-[rgba(225,235,255,0.56)] md:text-[1.04rem]">
            {study.description}
          </p>
        </div>

        <a
          href="#projects"
          className="inline-flex h-[36px] w-[110px] items-center justify-center gap-2 bg-white text-[10px] font-black uppercase tracking-[0.04em] text-[#05090F] transition duration-300 hover:bg-[#ff4b00] hover:text-white"
        >
          <Sparkle className="h-3.5 w-3.5" fill="currentColor" strokeWidth={2.3} />
          Explore
        </a>
      </div>

      <span className="sr-only">Case study {index + 1}</span>
    </article>
  );
}
