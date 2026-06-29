"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Plus } from "lucide-react";
import image1 from "@/assets/Image1.png";
import image2 from "@/assets/Image2.png";
import image3 from "@/assets/Image3.png";
import image4 from "@/assets/Image4.png";
import image5 from "@/assets/Image5.png";
import image6 from "@/assets/Image6.png";

const industries = [
  {
    label: "LOGISTICS",
    image: image1,
    title: "Driving Innovation Across\nthe Most Dynamic Industries",
    description:
      "TechNova empowers logistics companies with advanced digital solutions that streamline operations, enhance visibility, and optimize delivery efficiency.",
  },
  {
    label: "FINANCE",
    image: image2,
    title: "Secure Digital Systems\nfor Modern Finance",
    description:
      "Build reliable platforms for financial teams with automation, analytics, and secure infrastructure designed for high-volume operations.",
  },
  {
    label: "RETAIL",
    image: image3,
    title: "Smarter Retail\nExperiences at Scale",
    description:
      "Connect commerce, inventory, and customer data through adaptive products that help retail brands move faster and serve better.",
  },
  {
    label: "HEALTHCARE",
    image: image4,
    title: "Digital Healthcare\nBuilt Around Trust",
    description:
      "Create compliant healthcare systems that improve workflows, protect sensitive data, and support more responsive patient experiences.",
  },
  {
    label: "TELECOM",
    image: image5,
    title: "Connected Platforms\nfor Telecom Growth",
    description:
      "Modernize telecom operations with scalable software, data intelligence, and resilient tools for distributed service teams.",
  },
  {
    label: "ENERGY",
    image: image6,
    title: "Resilient Technology\nfor the Energy Sector",
    description:
      "Support energy organizations with monitoring, automation, and digital platforms that improve operational clarity and uptime.",
  },
];

export default function IndustriesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const nextImageRef = useRef<HTMLImageElement | null>(null);
  const imageWrapRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const detailRef = useRef<HTMLDivElement | null>(null);
  const wipeRef = useRef<HTMLDivElement | null>(null);
  const isSwitchingRef = useRef(false);

  const activeIndustry = industries[activeIndex];

  const handleIndustryChange = (nextIndex: number) => {
    if (nextIndex === activeIndex || isSwitchingRef.current) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActiveIndex(nextIndex);
      return;
    }

    isSwitchingRef.current = true;

    const shine = wipeRef.current?.querySelector(".industries-wipe-shine");
    const nextImage = nextImageRef.current;
    if (nextImage) {
      nextImage.src = industries[nextIndex].image.src;
    }

    gsap
      .timeline({
        defaults: {
          ease: "power3.inOut",
        },
        onComplete: () => {
          isSwitchingRef.current = false;
        },
      })
      .set(nextImage, { autoAlpha: 0, scale: 1.08, filter: "blur(18px) brightness(1.12)" })
      .set(wipeRef.current, { autoAlpha: 1, xPercent: -72 })
      .set(shine ?? null, { xPercent: -80, autoAlpha: 0 })
      .to(imageRef.current, { scale: 1.025, filter: "blur(10px) brightness(0.78)", duration: 0.34 }, 0)
      .to(nextImage, { autoAlpha: 1, scale: 1.02, duration: 0.42, ease: "power2.out" }, 0.08)
      .to(wipeRef.current, { xPercent: 72, duration: 0.72, ease: "power3.inOut" }, 0.02)
      .to(shine ?? null, { xPercent: 160, autoAlpha: 1, duration: 0.7, ease: "power2.out" }, 0.04)
      .to([contentRef.current, detailRef.current], { autoAlpha: 0, y: 12, duration: 0.22, ease: "power2.out" }, 0.12)
      .add(() => setActiveIndex(nextIndex), 0.42)
      .to(nextImage, { scale: 1, filter: "blur(0px) brightness(1)", duration: 0.72, ease: "power3.out" }, 0.34)
      .to(imageRef.current, { autoAlpha: 1, scale: 1, filter: "blur(0px) brightness(1)", duration: 0.2 }, 0.48)
      .to([contentRef.current, detailRef.current], { autoAlpha: 1, y: 0, duration: 0.52, ease: "power3.out" }, 0.58)
      .to(wipeRef.current, { autoAlpha: 0, duration: 0.24 }, 0.64)
      .set(nextImage, { autoAlpha: 0, clearProps: "transform,filter" })
      .set(wipeRef.current, { xPercent: -72 });
  };

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let revealObserver: IntersectionObserver | null = null;

    const ctx = gsap.context(() => {
      gsap.set(panelRef.current, {
        width: "80%",
        autoAlpha: 0,
        y: 78,
        scale: 0.97,
        transformOrigin: "50% 0%",
      });
      gsap.set(imageWrapRef.current, { scale: 1.08, filter: "brightness(0.86)" });
      gsap.set(contentRef.current, { autoAlpha: 0, y: 30 });
      gsap.set(detailRef.current, { autoAlpha: 0, y: 26 });
      gsap.set(".industry-tab", { autoAlpha: 0, y: 20 });
      gsap.set(wipeRef.current, { autoAlpha: 0, xPercent: -104 });

      const tl = gsap
        .timeline({
          paused: true,
          defaults: {
            ease: "power3.out",
          },
        })
        .to(panelRef.current, {
          autoAlpha: 1,
          width: "100%",
          y: 0,
          scale: 1,
          duration: 1.05,
        })
        .to(
          imageWrapRef.current,
          {
            scale: 1,
            filter: "brightness(1)",
            duration: 1.18,
          },
          0,
        )
        .to(
          contentRef.current,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.84,
          },
          0.18,
        )
        .to(
          ".industry-tab",
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.62,
            stagger: 0.055,
          },
          0.34,
        )
        .to(
          detailRef.current,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.78,
          },
          0.52,
        );

      revealObserver = new IntersectionObserver(
        ([entry]) => {
          if (!entry || entry.intersectionRatio < 0.48) return;

          tl.play();
          revealObserver?.disconnect();
          revealObserver = null;
        },
        {
          threshold: [0, 0.48],
        },
      );

      revealObserver.observe(sectionRef.current!);
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
      <div
        ref={panelRef}
        className="section-container overflow-hidden bg-black will-change-transform"
      >
        <div
          ref={imageWrapRef}
          className="relative h-[38vh] min-h-[300px] overflow-hidden bg-[#061328] md:h-[48vh] lg:h-[57vh] lg:max-h-[610px]"
        >
          <div ref={imageRef} className="absolute inset-0 will-change-transform">
            <img
              key={activeIndustry.label}
              src={activeIndustry.image.src}
              alt=""
              className="h-full w-full object-cover object-center"
            />
          </div>
          <img
            ref={nextImageRef}
            alt=""
            className="pointer-events-none absolute inset-0 z-10 h-full w-full object-cover object-center opacity-0 will-change-transform"
          />
          <div
            ref={wipeRef}
            className="pointer-events-none absolute inset-y-0 left-[-18%] z-20 w-[46%] overflow-hidden bg-[linear-gradient(90deg,transparent,rgba(52,120,255,0.18),rgba(255,255,255,0.10),transparent)] opacity-0 blur-md"
            aria-hidden="true"
          >
            <span className="industries-wipe-shine absolute inset-y-0 left-0 w-[65%] bg-[linear-gradient(90deg,transparent,rgba(52,120,255,0.46),rgba(255,255,255,0.28),transparent)]" />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,0,0,0.17))]" />
        </div>

        <div className="pb-4 pt-10 lg:pt-12">
          <div>
            <div ref={contentRef} className="grid gap-8 lg:grid-cols-[minmax(440px,0.66fr)_1fr] lg:items-end">
              <h2 className="whitespace-pre-line text-[clamp(2.35rem,2.7vw,3.55rem)] font-normal leading-[1.02] tracking-[-0.05em] text-white">
                {activeIndustry.title}
              </h2>

              <div className="flex flex-nowrap items-center justify-start gap-[8px] overflow-x-auto lg:justify-end lg:overflow-visible">
                {industries.map((industry, index) => {
                  const isActive = index === activeIndex;

                  return (
                    <button
                      key={industry.label}
                      type="button"
                      onClick={() => handleIndustryChange(index)}
                      className={`industry-tab h-[44px] shrink-0 border px-2 text-[19px] font-medium uppercase leading-[1.18] tracking-[-0.055em] shadow-[0_0_30px_rgba(29,88,210,0.10),inset_0_1px_0_rgba(255,255,255,0.035)] backdrop-blur-2xl transition duration-500 md:min-w-[104px] lg:min-w-[108px] xl:min-w-[118px] min-[1721px]:h-[50px] min-[1721px]:min-w-[136px] ${
                        isActive
                          ? "border-[#1d58d2] bg-[#082B67]/50 text-white shadow-[0_0_34px_rgba(42,104,230,0.20),inset_0_1px_0_rgba(255,255,255,0.045)]"
                          : "border-[#0d388353] bg-[#071D46]/40 text-white/64 hover:border-[#1d58d2]/80 hover:bg-[#082B67]/50 hover:text-white hover:shadow-[0_0_34px_rgba(42,104,230,0.20),inset_0_1px_0_rgba(255,255,255,0.045)]"
                      }`}
                    >
                      {industry.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-9 h-px w-full bg-white/[0.12]" />

            <div ref={detailRef} className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.52fr_176px] lg:items-start">
              <span className="mt-1 h-[16px] w-[16px] bg-[#ff4b00]" aria-hidden="true" />
              <p className="max-w-[520px] text-[1rem] font-medium leading-[1.42] text-white/56 md:text-[1.08rem] lg:justify-self-end">
                {activeIndustry.description}
              </p>
              <a
                href="#contact"
                className="inline-flex h-[50px] w-[176px] items-center justify-center gap-3 bg-white text-[12px] font-black uppercase tracking-[0.04em] text-[#05090F] transition duration-300 hover:bg-[#ff4b00] hover:text-white lg:justify-self-end"
              >
                <Plus className="h-4 w-4" strokeWidth={3.1} />
                Read Details
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
