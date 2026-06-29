"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Sparkle } from "lucide-react";
import spiralImage from "@/assets/BackroundImage1.png";

const services = [
  {
    number: "01",
    title: "CLOUD TRANSFORMATION",
    description:
      "Modernize and optimize your infrastructure with scalable cloud solutions that accelerate innovation and reduce operational costs.",
    desktopClass: "lg:col-start-1 lg:row-start-1",
  },
  {
    number: "02",
    title: "AI & DATA SOLUTIONS",
    description:
      "Turn data into intelligence with AI-powered analytics and predictive modeling that drive smarter business decisions.",
    desktopClass: "lg:col-start-3 lg:row-start-1",
  },
  {
    number: "03",
    title: "PRODUCT ENGINEERING",
    description:
      "Design, build, and scale digital products from concept to launch — with a focus on usability, and long-term growth.",
    desktopClass: "lg:col-start-2 lg:row-start-2",
  },
  {
    number: "04",
    title: "SOFTWARE DEVELOPMENT",
    description:
      "Deliver robust, integrated systems that streamline operations and empower teams across large-scale organizations.",
    desktopClass: "lg:col-start-3 lg:row-start-2",
  },
  {
    number: "05",
    title: "DEVOPS & AUTOMATION",
    description:
      "Accelerate delivery and improve reliability through CI/CD, infrastructure as code, and intelligent process automation.",
    desktopClass: "lg:col-start-1 lg:row-start-3",
  },
  {
    number: "06",
    title: "CYBERSECURITY",
    description:
      "Protect your business with advanced security frameworks, continuous monitoring, and compliance with global standards.",
    desktopClass: "lg:col-start-2 lg:row-start-3",
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const spiralRef = useRef<HTMLImageElement | null>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let revealObserver: IntersectionObserver | null = null;

    const ctx = gsap.context(() => {
      gsap.set(headerRef.current, { autoAlpha: 0, y: 34, filter: "blur(10px)" });
      gsap.set(".services-heading-line", { width: 0 });
      gsap.set(".services-heading-dot", { autoAlpha: 0, scale: 0.6, transformOrigin: "50% 50%" });
      gsap.set(spiralRef.current, { autoAlpha: 0, left: -520, rotate: -8, scale: 0.92, filter: "blur(12px)" });
      gsap.set(cardRefs.current, {
        autoAlpha: 0,
        y: 72,
        scale: 0.965,
        filter: "blur(14px)",
        transformOrigin: "50% 85%",
      });
      gsap.set(".service-card-number", { autoAlpha: 0, y: 30 });
      gsap.set(".service-card-content", { autoAlpha: 0, y: 36 });
      gsap.set(".service-card-divider", { scaleX: 0, transformOrigin: "left center" });

      const tl = gsap.timeline({
        paused: true,
        defaults: {
          ease: "power3.out",
        },
      });

      tl.to(headerRef.current, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.95 })
        .to(".services-heading-line", { width: "100%", duration: 0.85, ease: "power2.inOut" }, 0.18)
        .to(".services-heading-dot", { autoAlpha: 1, scale: 1, duration: 0.38, ease: "power2.out" }, 0.82)
        .to(
          spiralRef.current,
          { autoAlpha: 1, left: -250, rotate: 0, scale: 1, filter: "blur(0px)", duration: 1.25, ease: "power3.out" },
          0.08,
        )
        .to(
          cardRefs.current,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.95,
            stagger: {
              each: 0.13,
              from: "start",
            },
          },
          0.28,
        )
        .to(
          ".service-card-number",
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.68,
            stagger: 0.1,
            clearProps: "transform,opacity,visibility",
          },
          0.48,
        )
        .to(
          ".service-card-content",
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.72,
            stagger: 0.1,
            clearProps: "transform,opacity,visibility",
          },
          0.58,
        )
        .to(
          ".service-card-divider",
          {
            scaleX: 1,
            duration: 0.82,
            stagger: 0.1,
            ease: "power2.inOut",
          },
          0.78,
        );

      revealObserver = new IntersectionObserver(
        ([entry]) => {
          if (!entry || entry.intersectionRatio < 0.08) return;

          tl.play();
          revealObserver?.disconnect();
          revealObserver = null;
        },
        {
          rootMargin: "0px 0px -6% 0px",
          threshold: [0, 0.08],
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
      data-dark-nav="true"
      className="relative overflow-hidden bg-black py-20 text-white md:py-24 lg:py-28"
    >
      <div className="section-container relative">
        <div ref={headerRef} className="relative z-20 w-full max-w-[520px]">
          <div className="inline-block">
            <h2 className="text-[clamp(3.35rem,4.55vw,4.35rem)] font-normal leading-[0.9] tracking-[-0.065em] text-white">
              Smart Solutions
            </h2>
            <div className="mt-1 flex w-full items-center gap-0">
              <div className="services-heading-line h-px bg-white/70" />
            </div>
            <div  className="mt-4 flex flex-row justify-between items-center gap-2 ">

          <p className=" text-md text-[#dcdcdc] uppercase tracking-[-0.03em] text-white/58">SERVICES</p>
              <span className="services-heading-dot h-3.5 w-3.5 shrink-0 bg-[#ff4b00]" aria-hidden="true" />
            </div>
          </div>
        </div>

        <img
          ref={spiralRef}
          src={spiralImage.src}
          alt=""
          className="pointer-events-none absolute left-[-250px] top-[500px] z-[1] hidden w-[500px] select-none bg-transparent object-contain lg:block xl:w-[540px] min-[1721px]:w-[580px]"
        />

        <div
          ref={gridRef}
          className="relative z-[2] mt-16 grid gap-6 md:grid-cols-2 lg:mt-24 lg:grid-cols-3 lg:grid-rows-[repeat(3,390px)] lg:gap-8 xl:gap-9 min-[1721px]:grid-rows-[repeat(3,430px)] min-[1721px]:gap-10"
        >
          {services.map((service, index) => (
            <ServiceCard
              key={service.number}
              service={service}
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

function ServiceCard({
  service,
  index,
  refCallback,
}: {
  service: (typeof services)[number];
  index: number;
  refCallback: (node: HTMLElement | null) => void;
}) {
  return (
    <article
      ref={refCallback}
      className={`group relative flex min-h-[292px] flex-col overflow-hidden rounded-[1px] bg-[#071D46]/40 p-8 shadow-[0_0_30px_rgba(29,88,210,0.10),inset_0_1px_0_rgba(255,255,255,0.035)] backdrop-blur-2xl transition duration-500 hover:bg-[#082B67]/50 hover:shadow-[0_0_34px_rgba(42,104,230,0.20),inset_0_1px_0_rgba(255,255,255,0.045)] md:p-9 lg:min-h-0 min-[1721px]:p-10 ${service.desktopClass}`}
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
      <p className="service-card-number relative text-[3.4rem] font-bold leading-none tracking-[-0.08em] text-[#3478ff] min-[1721px]:text-[3.8rem]">
        [{service.number}]
      </p>

      <div className="service-card-content relative mt-auto transition duration-500 ease-out group-hover:-translate-y-14">
        <h3 className="text-[1.86rem] font-normal uppercase leading-tight tracking-[-0.08em] text-[#e8eef8] md:text-[2rem] min-[1721px]:text-[2.18rem]">
          {service.title}
        </h3>
        <div className="service-card-divider mt-4 h-px w-full bg-white/[0.14]" />
        <p className="mt-5 max-w-[430px] text-[1.18rem] font-medium leading-[1.45] text-[rgba(225,235,255,0.68)] min-[1721px]:max-w-[470px] min-[1721px]:text-[1.26rem]">
          {service.description}
        </p>
      </div>

      <a
        href="#story"
        className="service-card-cta absolute bottom-8 left-8 z-10 inline-flex h-[34px] w-[122px] translate-y-[calc(100%+2rem)] items-center justify-center gap-2 bg-white text-[11px] font-black uppercase tracking-[0.04em] text-[#05090F] opacity-0 transition duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 hover:bg-[#ff4b00] hover:text-white md:bottom-9 md:left-9 min-[1721px]:bottom-10 min-[1721px]:left-10"
      >
        <Sparkle className="h-3.5 w-3.5" fill="currentColor" strokeWidth={2.3} />
        Learn More
      </a>

      <span className="sr-only">Service {index + 1}</span>
    </article>
  );
}
