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

const categories = ["LOGISTICS", "FINANCE", "RETAIL", "HEALTHCARE", "TELECOM", "ENERGY"] as const;

const projects = {
  LOGISTICS: [
    {
      tag: "ROUTE OPS",
      title: "Real-Time Fleet Visibility Platform",
      description: "A logistics dashboard for tracking deliveries, driver activity, and route performance across regional hubs.",
      image: image1,
    },
    {
      tag: "WAREHOUSE",
      title: "Automated Inventory Control System",
      description: "A warehouse operations tool that reduces manual checks and improves stock accuracy with live inventory signals.",
      image: image3,
    },
    {
      tag: "DELIVERY",
      title: "Smart Dispatch Optimization Engine",
      description: "A dispatch planning system that helps teams assign deliveries faster and improve last-mile efficiency.",
      image: image6,
    },
  ],
  FINANCE: [
    {
      tag: "FINTECH",
      title: "Secure Digital Banking Workflow",
      description: "A finance platform for customer onboarding, approvals, and transaction monitoring with stronger operational control.",
      image: image2,
    },
    {
      tag: "ANALYTICS",
      title: "From Data to Business Impact",
      description: "A reporting suite that turns financial data into clear performance insights for leadership teams.",
      image: image5,
    },
    {
      tag: "RISK",
      title: "Compliance and Risk Review Portal",
      description: "A secure workspace for audit trails, risk scoring, and document review across financial departments.",
      image: image4,
    },
  ],
  RETAIL: [
    {
      tag: "COMMERCE",
      title: "Unified Retail Operations Hub",
      description: "A centralized platform connecting product catalog, orders, stock movement, and store performance data.",
      image: image3,
    },
    {
      tag: "CUSTOMER",
      title: "Personalized Shopping Experience",
      description: "A customer-facing product flow that adapts recommendations and promotions to buyer behavior.",
      image: image5,
    },
    {
      tag: "SUPPLY",
      title: "Demand Forecasting Dashboard",
      description: "A forecasting tool that helps retail teams plan stock and reduce missed sales opportunities.",
      image: image1,
    },
  ],
  HEALTHCARE: [
    {
      tag: "PATIENT",
      title: "Digital Patient Coordination System",
      description: "A care coordination platform for appointments, records, notifications, and secure team workflows.",
      image: image4,
    },
    {
      tag: "CLINIC OPS",
      title: "Healthcare Workflow Automation",
      description: "A clinic operations tool that improves task handoff, patient follow-up, and internal visibility.",
      image: image6,
    },
    {
      tag: "SECURITY",
      title: "Protected Medical Data Workspace",
      description: "A controlled environment for sensitive records, access roles, and compliance-focused review processes.",
      image: image2,
    },
  ],
  TELECOM: [
    {
      tag: "NETWORK",
      title: "Service Monitoring Command Center",
      description: "A telecom dashboard for live incident visibility, network health, and response coordination.",
      image: image5,
    },
    {
      tag: "SUPPORT",
      title: "Customer Issue Resolution Portal",
      description: "A support platform that helps teams triage tickets, assign ownership, and reduce resolution time.",
      image: image3,
    },
    {
      tag: "BILLING",
      title: "Subscription Billing Automation",
      description: "A billing workflow for service plans, renewals, and operational reporting at scale.",
      image: image2,
    },
  ],
  ENERGY: [
    {
      tag: "GRID OPS",
      title: "Energy Asset Monitoring Platform",
      description: "A monitoring system for field assets, maintenance signals, and operational status across locations.",
      image: image6,
    },
    {
      tag: "CLOUD",
      title: "Scalable Infrastructure for Energy Teams",
      description: "A cloud platform designed to improve uptime, data access, and engineering delivery speed.",
      image: image1,
    },
    {
      tag: "REPORTING",
      title: "Operational Intelligence Dashboard",
      description: "A performance dashboard that helps energy leaders track output, incidents, and efficiency trends.",
      image: image4,
    },
  ],
} satisfies Record<(typeof categories)[number], Project[]>;

type Project = {
  tag: string;
  title: string;
  description: string;
  image: { src: string };
};

export default function IndustryProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("FINANCE");
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const tabsRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const isSwitchingRef = useRef(false);

  const activeProjects = projects[activeCategory];

  const handleCategoryChange = (category: (typeof categories)[number]) => {
    if (category === activeCategory || isSwitchingRef.current) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActiveCategory(category);
      return;
    }

    isSwitchingRef.current = true;

    gsap
      .timeline({
        defaults: {
          ease: "power3.out",
        },
        onComplete: () => {
          isSwitchingRef.current = false;
        },
      })
      .to(".industry-project-row", {
        autoAlpha: 0,
        y: 24,
        filter: "blur(8px)",
        duration: 0.28,
        stagger: 0.045,
      })
      .add(() => setActiveCategory(category))
      .set(".industry-project-row", { autoAlpha: 0, y: 36, filter: "blur(10px)" })
      .to(".industry-project-row", {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.62,
        stagger: 0.09,
      });
  };

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let revealObserver: IntersectionObserver | null = null;

    const ctx = gsap.context(() => {
      gsap.set([headingRef.current, tabsRef.current], { autoAlpha: 0, y: 34, filter: "blur(10px)" });
      gsap.set(".projects-heading-line", { width: 0 });
      gsap.set(".projects-heading-dot", { autoAlpha: 0, scale: 0.6, transformOrigin: "50% 50%" });
      gsap.set(".industry-project-row", { autoAlpha: 0, y: 48, filter: "blur(12px)" });

      const tl = gsap
        .timeline({
          paused: true,
          defaults: {
            ease: "power3.out",
          },
        })
        .to(headingRef.current, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.82 })
        .to(".projects-heading-line", { width: "100%", duration: 0.86, ease: "power2.inOut" }, 0.15)
        .to(".projects-heading-dot", { autoAlpha: 1, scale: 1, duration: 0.36 }, 0.72)
        .to(tabsRef.current, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.74 }, 0.26)
        .to(
          ".industry-project-row",
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.82,
            stagger: 0.14,
          },
          0.44,
        );

      revealObserver = new IntersectionObserver(
        ([entry]) => {
          if (!entry || entry.intersectionRatio < 0.2) return;

          tl.play();
          revealObserver?.disconnect();
          revealObserver = null;
        },
        {
          threshold: [0, 0.2],
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
    <section ref={sectionRef} id="projects" data-dark-nav="true" className="relative overflow-hidden bg-black py-20 text-white md:py-24 lg:py-28">
      <div className="section-container">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          <div ref={headingRef} className="max-w-[560px]">
            <div className="inline-block">
              <h2 className="text-[clamp(3.1rem,4.4vw,5.25rem)] font-normal leading-[0.9] tracking-[-0.06em] text-white">
                Projects
              </h2>
              <div className="mt-2 flex w-full items-center">
                <div className="projects-heading-line h-px bg-white/70" />
              </div>
              <div className="mt-4 flex items-center justify-between gap-5">
                <p className="text-sm uppercase tracking-[0.14em] text-white/58">Selected Work</p>
                <span className="projects-heading-dot h-3.5 w-3.5 shrink-0 bg-[#ff4b00]" aria-hidden="true" />
              </div>
            </div>
          </div>

          <div ref={tabsRef} className="flex flex-nowrap items-center gap-2 overflow-x-auto lg:justify-end lg:overflow-visible">
            {categories.map((category) => {
              const isActive = category === activeCategory;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleCategoryChange(category)}
                  className={`h-[44px] shrink-0 border px-3 text-[17px] font-medium uppercase leading-[1.15] tracking-[-0.05em] shadow-[0_0_30px_rgba(29,88,210,0.10),inset_0_1px_0_rgba(255,255,255,0.035)] backdrop-blur-2xl transition duration-500 md:min-w-[104px] lg:min-w-[108px] xl:min-w-[118px] ${
                    isActive
                      ? "border-[#1d58d2] bg-[#082B67]/50 text-white shadow-[0_0_34px_rgba(42,104,230,0.20),inset_0_1px_0_rgba(255,255,255,0.045)]"
                      : "border-[#0d388353] bg-[#071D46]/40 text-white/64 hover:border-[#1d58d2]/80 hover:bg-[#082B67]/50 hover:text-white hover:shadow-[0_0_34px_rgba(42,104,230,0.20),inset_0_1px_0_rgba(255,255,255,0.045)]"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        <div ref={listRef} className="mt-16 border-t border-white/[0.12]">
          {activeProjects.map((project) => (
            <article
              key={`${activeCategory}-${project.title}`}
              className="industry-project-row grid gap-8 border-b border-white/[0.12] py-10 md:grid-cols-[150px_1fr_330px] md:items-center lg:grid-cols-[180px_1fr_430px] lg:py-12"
            >
              <p className="text-sm font-medium uppercase tracking-[0.12em] text-[#3478ff]">[ {project.tag} ]</p>

              <div className="max-w-[560px]">
                <h3 className="text-[clamp(1.85rem,2.05vw,2.7rem)] font-normal leading-[1.02] tracking-[-0.055em] text-white">
                  {project.title}
                </h3>
                <p className="mt-5 max-w-[540px] text-[1rem] font-medium leading-[1.45] text-white/46 md:text-[1.08rem]">
                  {project.description}
                </p>
                <a
                  href="#contact"
                  className="mt-7 inline-flex h-[42px] w-[132px] items-center justify-center gap-2 bg-white text-[11px] font-black uppercase tracking-[0.04em] text-[#05090F] transition duration-300 hover:bg-[#ff4b00] hover:text-white"
                >
                  <Plus className="h-3.5 w-3.5" strokeWidth={3} />
                  Read More
                </a>
              </div>

              <div className="relative h-[190px] overflow-hidden bg-[#071D46]/40 shadow-[0_0_30px_rgba(29,88,210,0.10),inset_0_1px_0_rgba(255,255,255,0.035)] md:h-[170px] lg:h-[210px]">
                <img src={project.image.src} alt="" className="h-full w-full object-cover transition duration-700 hover:scale-105" />
                <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(11,29,70,0.04),rgba(0,0,0,0.18))]" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
