"use client";

import { useLayoutEffect, useRef, type MutableRefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Circle,
  Cloud,
  Hexagon,
  Layers3,
  Orbit,
  Sparkle,
  Sun,
  Zap,
  type LucideIcon,
} from "lucide-react";

const stats = [
  {
    value: "199+",
    number: 199,
    label: "Trusted enterprise clients served worldwide",
  },
  {
    value: "500+",
    number: 500,
    label: "Digital innovation strategy projects delivered",
  },
  {
    value: "15+",
    number: 15,
    label: "Years of experience in software engineering",
  },
];

const brandRows = [
  [
    { name: "Polymath", Icon: Circle, filled: true },
    { name: "Boltshift", Icon: Zap, filled: true },
    { name: "Lightbox", customIcon: "cube" },
    { name: "FeatherDev", Icon: Layers3 },
    { name: "Spherule", Icon: Orbit },
    { name: "GlobalBank", Icon: Hexagon, filled: true },
  ],
  [
    { name: "Nietzsche", Icon: Sun },
    { name: "Epicurious", Icon: Layers3 },
    { name: "CloudWatch", Icon: Cloud, filled: true },
    { name: "Acme Corp", Icon: Sparkle, filled: true },
    { name: "Polymath", Icon: Circle, filled: true },
    { name: "Lightbox", customIcon: "cube" },
  ],
] satisfies BrandLogo[][];

type BrandLogo = {
  name: string;
  Icon?: LucideIcon;
  customIcon?: "cube";
  filled?: boolean;
};

export default function ImpactStatsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const backgroundRef = useRef<HTMLImageElement | null>(null);
  const introRef = useRef<HTMLDivElement | null>(null);
  const trustedRef = useRef<HTMLDivElement | null>(null);
  const statRefs = useRef<Array<HTMLElement | null>>([]);
  const numberRefs = useRef<Array<HTMLParagraphElement | null>>([]);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.set([introRef.current, trustedRef.current], { autoAlpha: 0, y: 28 });
      gsap.set(statRefs.current, { autoAlpha: 0, y: 34 });
      gsap.set(".impact-stat-line", { scaleX: 0, transformOrigin: "left center" });
      gsap.set(".impact-stat-dot", { autoAlpha: 0, scale: 0.55, transformOrigin: "50% 50%" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 62%",
          once: true,
        },
        defaults: {
          ease: "power3.out",
        },
      });

      tl.to(introRef.current, { autoAlpha: 1, y: 0, duration: 0.9 })
        .to(
          statRefs.current,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.13,
          },
          0.18,
        )
        .to(
          ".impact-stat-line",
          {
            scaleX: 1,
            duration: 0.85,
            stagger: 0.12,
          },
          0.46,
        )
        .to(
          ".impact-stat-dot",
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.45,
            stagger: 0.12,
          },
          0.62,
        )
        .to(trustedRef.current, { autoAlpha: 1, y: 0, duration: 0.7 }, 0.82);

      stats.forEach((stat, index) => {
        const target = numberRefs.current[index];
        if (!target) return;

        const counter = { value: 0 };
        tl.to(
          counter,
          {
            value: stat.number,
            duration: 1.35,
            ease: "power2.out",
            onUpdate: () => {
              target.textContent = `${Math.round(counter.value)}+`;
            },
          },
          0.25 + index * 0.1,
        );
      });

      if (backgroundRef.current) {
        gsap.fromTo(
          backgroundRef.current,
          { y: -34, scale: 1.012 },
          {
            y: -12,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.4,
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-dark-nav="true"
      className="relative z-40 -mt-[76vh] min-h-[920px] overflow-hidden bg-[#030304] px-5 pb-10 pt-[210px] text-white md:min-h-[940px] md:px-10 md:pt-[220px] lg:min-h-[960px] lg:px-16 lg:pt-[235px] min-[1900px]:min-h-[1060px] min-[1900px]:pt-[315px]"
    >
      <div className="pointer-events-none absolute inset-0">
        <img
          ref={backgroundRef}
          className="absolute left-0 top-[-24px] h-auto w-full max-w-none object-contain object-top min-[1900px]:top-[-54px]"
          src="/brand/BacroundSection2.png"
          alt=""
        />
        <div className="absolute inset-x-0 top-[50%] h-px bg-white/[0.025]" />
      </div>

      <div className="relative mx-auto grid max-w-[1600px] gap-14 lg:grid-cols-[0.92fr_1.35fr] lg:gap-24 min-[1900px]:max-w-[1740px] min-[1900px]:grid-cols-[0.84fr_1.42fr] min-[1900px]:gap-40">
        <div ref={introRef} className="max-w-[610px] pt-0 min-[1900px]:max-w-[660px]">
          <h2 className="text-balance text-[clamp(2rem,2.85vw,3.55rem)] font-medium leading-[1.05] tracking-[-0.052em] min-[1900px]:text-[4.08rem]">
            A tech partner helping to transform, innovate, and achieve real results.
          </h2>
          <p className="mt-7 max-w-[560px] text-[clamp(0.95rem,0.92vw,1.08rem)] font-medium leading-7 text-white/43 min-[1900px]:max-w-[620px] min-[1900px]:text-lg min-[1900px]:leading-7">
            With a presence in key regions worldwide, we bring local insights to global projects,
            ensuring every solution is tailored to client needs and requirements.
          </p>

          <a
            href="#story"
            className="mt-12 inline-flex h-12 items-center gap-4 border border-white bg-white px-5 text-[12px] font-black uppercase tracking-[0.12em] text-[#070708] transition duration-300 hover:border-nova-orange hover:bg-nova-orange hover:text-white"
          >
            <span aria-hidden="true" className="relative h-4 w-4">
              <span className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-current" />
              <span className="absolute left-0 top-1/2 h-1 w-full -translate-y-1/2 bg-current" />
            </span>
            Read About Nova
          </a>
        </div>

        <div className="grid gap-x-16 gap-y-20 lg:grid-cols-2 lg:pt-1 min-[1900px]:gap-x-[4.5rem] min-[1900px]:gap-y-20">
          <StatCard
            stat={stats[0]}
            index={0}
            className="lg:col-span-2 lg:max-w-[455px]"
            numberRefs={numberRefs}
            statRefs={statRefs}
          />
          <StatCard stat={stats[1]} index={1} numberRefs={numberRefs} statRefs={statRefs} />
          <StatCard stat={stats[2]} index={2} numberRefs={numberRefs} statRefs={statRefs} />
        </div>
      </div>

      <div ref={trustedRef} className="relative mx-auto mt-20 flex max-w-[1600px] justify-center text-center md:mt-24 min-[1900px]:mt-24 min-[1900px]:max-w-[1740px]">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-white/56 md:text-sm">
          [ Trusted by leading global brands ]
        </p>
      </div>

      <BrandCarousel />
    </section>
  );
}

function StatCard({
  stat,
  index,
  numberRefs,
  statRefs,
  className = "",
}: {
  stat: {
    value: string;
    number: number;
    label: string;
  };
  index: number;
  numberRefs: MutableRefObject<Array<HTMLParagraphElement | null>>;
  statRefs: MutableRefObject<Array<HTMLElement | null>>;
  className?: string;
}) {
  return (
    <article
      ref={(node) => {
        statRefs.current[index] = node;
      }}
      className={`relative pb-5 ${className}`}
    >
      <div className="flex items-end justify-between gap-6">
        <p
          ref={(node) => {
            numberRefs.current[index] = node;
          }}
          className="text-[clamp(4rem,5.8vw,6.9rem)] font-semibold leading-[0.84] tracking-[-0.075em] text-white min-[1900px]:text-[7.35rem]"
        >
          {stat.value}
        </p>
        <span className="impact-stat-dot mb-2.5 h-3 w-3 shrink-0 bg-nova-orange" aria-hidden="true" />
      </div>
      <p className="mt-6 max-w-[350px] text-[clamp(0.92rem,0.9vw,1.02rem)] font-semibold leading-6 text-white/50 min-[1900px]:max-w-[380px] min-[1900px]:text-[1.05rem] min-[1900px]:leading-6">
        {stat.label}
      </p>
      <span className="impact-stat-line absolute bottom-0 left-0 h-px w-full bg-white/[0.13]" aria-hidden="true" />
    </article>
  );
}

function BrandCarousel() {
  return (
    <div className="brand-carousel relative left-1/2 mt-16 w-screen -translate-x-1/2 overflow-hidden py-1 min-[1900px]:mt-[4.5rem]">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[24vw] bg-gradient-to-r from-[#030304] via-[#030304]/94 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[24vw] bg-gradient-to-l from-[#030304] via-[#030304]/94 to-transparent" />

      <CarouselRow logos={brandRows[0]} direction="right" />
      <CarouselRow logos={brandRows[1]} direction="left" className="mt-4 pl-20 md:pl-32" />
    </div>
  );
}

function CarouselRow({
  logos,
  direction,
  className = "",
}: {
  logos: BrandLogo[];
  direction: "left" | "right";
  className?: string;
}) {
  const repeatedLogos = [...logos, ...logos, ...logos];

  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className={`brand-carousel-track flex w-max gap-4 ${
          direction === "right" ? "brand-carousel-track-right" : "brand-carousel-track-left"
        }`}
      >
        {repeatedLogos.map((logo, index) => (
          <LogoPill key={`${logo.name}-${index}`} logo={logo} />
        ))}
      </div>
    </div>
  );
}

function LogoPill({ logo }: { logo: BrandLogo }) {
  return (
    <div className="group relative flex h-[52px] min-w-[160px] items-center justify-center gap-2.5 overflow-hidden rounded-[1px] border border-[#1E4E9E] bg-[#08162D] px-5 text-[#2F63C7] shadow-[0_0_18px_rgba(47,107,217,0.22),inset_0_0_0_1px_rgba(47,107,217,0.12),inset_0_-22px_34px_rgba(5,9,15,0.30)] transition-colors duration-300 before:absolute before:inset-0 before:bg-[linear-gradient(180deg,rgba(47,107,217,0.08)_0%,rgba(5,9,15,0.16)_100%)] hover:border-[#2F63C7] hover:shadow-[0_0_22px_rgba(47,107,217,0.35),inset_0_0_0_1px_rgba(47,107,217,0.14),inset_0_-22px_34px_rgba(5,9,15,0.30)] md:h-[64px] md:min-w-[196px] min-[1900px]:h-[74px] min-[1900px]:min-w-[228px]">
      <LogoMark logo={logo} />
      <span
        className="relative whitespace-nowrap text-[0.96rem] font-bold tracking-[-0.035em] text-[#2F63C7] drop-shadow-[0_0_8px_rgba(47,99,199,0.25)] group-hover:text-[#376dd7] md:text-[1.18rem] min-[1900px]:text-[1.36rem]"
        style={{ fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif" }}
      >
        {logo.name}
      </span>
    </div>
  );
}

function LogoMark({ logo }: { logo: BrandLogo }) {
  const Icon = logo.Icon;

  if (logo.customIcon === "cube") {
    return <CubeIcon />;
  }

  if (logo.name === "Boltshift" && Icon) {
    return (
      <span className="relative grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#2F63C7] text-[#08162D] shadow-[0_0_10px_rgba(47,99,199,0.25)] md:h-8 md:w-8 min-[1900px]:h-9 min-[1900px]:w-9">
        <Icon className="h-[58%] w-[58%]" strokeWidth={3.2} fill="currentColor" />
      </span>
    );
  }

  if (!Icon) return null;

  return (
    <Icon
      className="relative h-7 w-7 shrink-0 text-[#2F63C7] drop-shadow-[0_0_8px_rgba(47,99,199,0.25)] md:h-8 md:w-8 min-[1900px]:h-9 min-[1900px]:w-9"
      strokeWidth={logo.filled ? 2 : 2.25}
      fill={logo.filled ? "currentColor" : "none"}
    />
  );
}

function CubeIcon() {
  return (
    <svg
      className="relative h-7 w-7 shrink-0 drop-shadow-[0_0_8px_rgba(47,99,199,0.25)] md:h-8 md:w-8 min-[1900px]:h-9 min-[1900px]:w-9"
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M32 6L54 18.6V44L32 57L10 44V18.6L32 6Z"
        stroke="#2F63C7"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path d="M32 31.8L10.8 19.2" stroke="#2F63C7" strokeWidth="5" strokeLinejoin="round" />
      <path d="M32 31.8L53.2 19.2" stroke="#2F63C7" strokeWidth="5" strokeLinejoin="round" />
      <path d="M32 31.8V56" stroke="#2F63C7" strokeWidth="5" strokeLinejoin="round" />
    </svg>
  );
}
