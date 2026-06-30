"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Plus } from "lucide-react";
import Link from "next/link";
import image1 from "@/assets/Image1.png";
import image2 from "@/assets/Image2.png";
import image3 from "@/assets/Image3.png";
import image4 from "@/assets/Image4.png";
import image5 from "@/assets/Image5.png";
import image6 from "@/assets/Image6.png";
import finkoImage from "@/assets/FinkoImage.png";
import financeAnalyticsImage from "@/assets/f0171a17-242a-4d46-8b39-0c1f6dcd2ac3.png";

const industries = [
  {
    label: "LOGISTICS",
    image: image1,
    title: "Driving Innovation Across\nthe Most Dynamic Industries",
    description:
      "TechNova empowers logistics companies with advanced digital solutions that streamline operations, enhance visibility, and optimize delivery efficiency.",
    projects: [
      {
        slug: "real-time-fleet-visibility-platform",
        tag: "ROUTE OPS",
        title: "Real-Time Fleet Visibility Platform",
        description: "Track deliveries, drivers, and route performance across regional logistics hubs.",
        image: image1,
      },
      {
        slug: "automated-inventory-control-system",
        tag: "WAREHOUSE",
        title: "Automated Inventory Control System",
        description: "Improve stock accuracy and warehouse visibility with live operational signals.",
        image: image3,
      },
      {
        slug: "smart-dispatch-optimization-engine",
        tag: "DISPATCH",
        title: "Smart Dispatch Optimization Engine",
        description: "Assign deliveries faster and improve last-mile efficiency for field teams.",
        image: image6,
      },
    ],
  },
  {
    label: "FINANCE",
    image: image2,
    title: "Secure Digital Systems\nfor Modern Finance",
    description:
      "Build reliable platforms for financial teams with automation, analytics, and secure infrastructure designed for high-volume operations.",
    projects: [
      {
        slug: "smart-financial-marketplace-for-uzbekistan",
        tag: "FINANCE OPS",
        title: "Smart Financial Marketplace\nfor Uzbekistan",
        description:
          "Compare loans, deposits, bank cards, and exchange rates in one digital platform. FINKO helps users choose the right financial solution faster, smarter, and with confidence.",
        image: finkoImage,
      },
      {
        slug: "from-data-to-business-impact",
        tag: "ANALYTICS",
        title: "From Data to Business Impact",
        description: "A reporting suite that turns financial data into clear leadership insights.",
        image: financeAnalyticsImage,
      },
      {
        slug: "compliance-and-risk-review-portal",
        tag: "RISK",
        title: "Compliance and Risk Review Portal",
        description: "A secure workspace for audit trails, risk scoring, and document review.",
        image: image4,
      },
    ],
  },
  {
    label: "RETAIL",
    image: image3,
    title: "Smarter Retail\nExperiences at Scale",
    description:
      "Connect commerce, inventory, and customer data through adaptive products that help retail brands move faster and serve better.",
    projects: [
      {
        slug: "unified-retail-operations-hub",
        tag: "COMMERCE",
        title: "Unified Retail Operations Hub",
        description: "Connect catalog, orders, stock movement, and store performance data.",
        image: image3,
      },
      {
        slug: "personalized-shopping-experience",
        tag: "CUSTOMER",
        title: "Personalized Shopping Experience",
        description: "Adapt recommendations and promotions to customer behavior.",
        image: image5,
      },
      {
        slug: "demand-forecasting-dashboard",
        tag: "SUPPLY",
        title: "Demand Forecasting Dashboard",
        description: "Plan stock more accurately and reduce missed sales opportunities.",
        image: image1,
      },
    ],
  },
  {
    label: "HEALTHCARE",
    image: image4,
    title: "Digital Healthcare\nBuilt Around Trust",
    description:
      "Create compliant healthcare systems that improve workflows, protect sensitive data, and support more responsive patient experiences.",
    projects: [
      {
        slug: "digital-patient-coordination-system",
        tag: "PATIENT",
        title: "Digital Patient Coordination System",
        description: "Coordinate appointments, records, notifications, and secure care workflows.",
        image: image4,
      },
      {
        slug: "healthcare-workflow-automation",
        tag: "CLINIC OPS",
        title: "Healthcare Workflow Automation",
        description: "Improve task handoff, patient follow-up, and internal visibility.",
        image: image6,
      },
      {
        slug: "protected-medical-data-workspace",
        tag: "SECURITY",
        title: "Protected Medical Data Workspace",
        description: "Manage sensitive records, access roles, and compliance review.",
        image: image2,
      },
    ],
  },
  {
    label: "TELECOM",
    image: image5,
    title: "Connected Platforms\nfor Telecom Growth",
    description:
      "Modernize telecom operations with scalable software, data intelligence, and resilient tools for distributed service teams.",
    projects: [
      {
        slug: "service-monitoring-command-center",
        tag: "NETWORK",
        title: "Service Monitoring Command Center",
        description: "View incidents, network health, and response coordination in one place.",
        image: image5,
      },
      {
        slug: "customer-issue-resolution-portal",
        tag: "SUPPORT",
        title: "Customer Issue Resolution Portal",
        description: "Triage tickets, assign ownership, and reduce resolution time.",
        image: image3,
      },
      {
        slug: "subscription-billing-automation",
        tag: "BILLING",
        title: "Subscription Billing Automation",
        description: "Automate service plans, renewals, and operational reporting.",
        image: image2,
      },
    ],
  },
  {
    label: "ENERGY",
    image: image6,
    title: "Resilient Technology\nfor the Energy Sector",
    description:
      "Support energy organizations with monitoring, automation, and digital platforms that improve operational clarity and uptime.",
    projects: [
      {
        slug: "energy-asset-monitoring-platform",
        tag: "GRID OPS",
        title: "Energy Asset Monitoring Platform",
        description: "Monitor field assets, maintenance signals, and operational status.",
        image: image6,
      },
      {
        slug: "scalable-infrastructure-for-energy-teams",
        tag: "CLOUD",
        title: "Scalable Infrastructure for Energy Teams",
        description: "Improve uptime, data access, and engineering delivery speed.",
        image: image1,
      },
      {
        slug: "operational-intelligence-dashboard",
        tag: "REPORTING",
        title: "Operational Intelligence Dashboard",
        description: "Track output, incidents, and efficiency trends for energy leaders.",
        image: image4,
      },
    ],
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
  const projectsRef = useRef<HTMLDivElement | null>(null);
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
      .to([contentRef.current, detailRef.current, projectsRef.current], { autoAlpha: 0, y: 12, duration: 0.22, ease: "power2.out" }, 0.12)
      .add(() => setActiveIndex(nextIndex), 0.42)
      .to(nextImage, { scale: 1, filter: "blur(0px) brightness(1)", duration: 0.72, ease: "power3.out" }, 0.34)
      .to(imageRef.current, { autoAlpha: 1, scale: 1, filter: "blur(0px) brightness(1)", duration: 0.2 }, 0.48)
      .set(".industry-project-item", { autoAlpha: 0, x: 48, y: 20, filter: "blur(8px)" }, 0.5)
      .to([contentRef.current, detailRef.current, projectsRef.current], { autoAlpha: 1, y: 0, duration: 0.52, ease: "power3.out" }, 0.58)
      .to(
        ".industry-project-item",
        {
          autoAlpha: 1,
          x: 0,
          y: 0,
          filter: "blur(0px)",
          duration: 0.58,
          stagger: 0.075,
          ease: "power3.out",
        },
        0.66,
      )
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
      gsap.set(projectsRef.current, { autoAlpha: 0, y: 34 });
      gsap.set(".industry-project-item", { autoAlpha: 0, x: 54, y: 28, filter: "blur(10px)" });
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
        )
        .to(
          projectsRef.current,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.78,
          },
          0.68,
        )
        .to(
          ".industry-project-item",
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            filter: "blur(0px)",
            duration: 0.76,
            stagger: 0.1,
          },
          0.78,
        );

      revealObserver = new IntersectionObserver(
        ([entry]) => {
          if (!entry || entry.intersectionRatio < 0.22) return;

          tl.play();
          revealObserver?.disconnect();
          revealObserver = null;
        },
        {
          threshold: [0, 0.22],
        },
      );

      revealObserver.observe(imageWrapRef.current ?? sectionRef.current!);
    }, sectionRef);

    return () => {
      revealObserver?.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      data-dark-nav="true"
      className="relative overflow-hidden bg-black py-16 text-white md:py-20 lg:py-20 min-[1721px]:py-28"
    >
      <div
        ref={panelRef}
        className="section-container overflow-hidden bg-black will-change-transform"
      >
        <div
          ref={imageWrapRef}
          className="relative h-[40vh] min-h-[350px] overflow-hidden bg-[#061328] md:h-[48vh] lg:h-[52vh] lg:max-h-[540px] min-[1721px]:h-[57vh] min-[1721px]:max-h-[610px]"
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

        <div className="pb-4 pt-8 lg:pt-9 min-[1721px]:pt-12">
          <div>
            <div ref={contentRef} className="grid gap-6 lg:grid-cols-[minmax(390px,0.56fr)_1fr] lg:items-end min-[1721px]:grid-cols-[minmax(440px,0.66fr)_1fr] min-[1721px]:gap-8">
              <h2 className="whitespace-pre-line text-[clamp(2.15rem,2.45vw,3.15rem)] font-normal leading-[1.02] tracking-[-0.05em] text-white min-[1721px]:text-[clamp(2.35rem,2.7vw,3.55rem)]">
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

            <div className="mt-7 h-px w-full bg-white/[0.12] min-[1721px]:mt-9" />

            <div ref={detailRef} className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.52fr_176px] lg:items-start min-[1721px]:mt-8 min-[1721px]:gap-8">
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

            <div
              ref={projectsRef}
              className="mt-8 border-t border-white/[0.12] min-[1721px]:mt-16"
            >
              {activeIndustry.projects.map((project) => (
                <Link
                  key={`${activeIndustry.label}-${project.title}`}
                  href={`/projects/${project.slug}`}
                  className="industry-project-item grid gap-6 border-b border-white/[0.12] py-7 md:grid-cols-[150px_1fr_300px] md:items-start lg:grid-cols-[190px_minmax(360px,0.92fr)_360px] lg:gap-8 lg:py-8 min-[1721px]:grid-cols-[285px_minmax(520px,0.92fr)_540px] min-[1721px]:gap-12 min-[1721px]:py-14"
                >
                  <p className="pt-1 text-[0.92rem] font-medium uppercase tracking-[0.11em] text-[#1f5fd2] min-[1721px]:text-base">
                    [ {project.tag} ]
                  </p>

                  <div className="max-w-[560px]">
                    <h3 className="max-w-[640px] whitespace-pre-line text-[clamp(1.65rem,1.85vw,2.35rem)] font-light leading-[1.02] tracking-[-0.06em] text-white min-[1721px]:max-w-[720px] min-[1721px]:text-[clamp(2rem,2.25vw,3.05rem)]">
                      {project.title}
                    </h3>
                    <p className="mt-4 max-w-[590px] text-[0.98rem] font-normal leading-[1.42] text-white/44 md:text-[1.04rem] min-[1721px]:mt-7 min-[1721px]:max-w-[670px] min-[1721px]:text-[1.24rem] min-[1721px]:leading-[1.45]">
                      {project.description}
                    </p>
                    <span
                      className="mt-6 inline-flex h-[42px] w-[138px] items-center justify-center gap-2 bg-white text-[11px] font-black uppercase tracking-[0.04em] text-[#05090F] transition duration-300 hover:bg-[#ff4b00] hover:text-white min-[1721px]:mt-10 min-[1721px]:h-[48px] min-[1721px]:w-[158px] min-[1721px]:gap-3 min-[1721px]:text-[12px]"
                    >
                      <Plus className="h-4 w-4" strokeWidth={3} />
                      Read More
                    </span>
                  </div>

                  <div className="relative h-[180px] overflow-hidden bg-[#071D46]/40 shadow-[0_0_30px_rgba(29,88,210,0.10),inset_0_1px_0_rgba(255,255,255,0.035)] md:h-[165px] lg:h-[185px] min-[1721px]:h-[285px]">
                    <img src={project.image.src} alt="" className="h-full w-full object-cover transition duration-700 hover:scale-105" />
                    <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(11,29,70,0.04),rgba(0,0,0,0.18))]" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
