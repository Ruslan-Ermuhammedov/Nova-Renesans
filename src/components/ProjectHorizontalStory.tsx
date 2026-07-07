"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import imageDesktop from "@/assets/FinkoImage.png";
import imageMobile from "@/assets/Image2.png";
import imageEvent from "@/assets/f0171a17-242a-4d46-8b39-0c1f6dcd2ac3.png";

type ProjectStoryProps = {
  project: {
    tag: string;
    title: string;
    description: string;
    scope: string;
    result: string;
  };
};

export default function ProjectHorizontalStory({ project }: ProjectStoryProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const progressMaskRef = useRef<SVGRectElement | null>(null);
  const progressPathRef = useRef<SVGPathElement | null>(null);
  const progressDotRef = useRef<HTMLSpanElement | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !trackRef.current || !progressMaskRef.current || !progressPathRef.current || !progressDotRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      const progressMask = progressMaskRef.current!;
      const progressPath = progressPathRef.current!;
      const progressDot = progressDotRef.current!;
      let pathLength = progressPath.getTotalLength();
      let pathStartX = progressPath.getPointAtLength(0).x;
      let pathEndX = progressPath.getPointAtLength(pathLength).x;

      const getPointAtX = (targetX: number) => {
        let start = 0;
        let end = pathLength;

        for (let i = 0; i < 24; i += 1) {
          const middle = (start + end) / 2;
          const point = progressPath.getPointAtLength(middle);

          if (point.x < targetX) {
            start = middle;
          } else {
            end = middle;
          }
        }

        return progressPath.getPointAtLength(start);
      };

      const updateLine = (scrollProgress: number) => {
        const drawUntilX = pathStartX + (pathEndX - pathStartX) * scrollProgress;
        const dotPoint = getPointAtX(drawUntilX);

        gsap.set(progressMask, {
          attr: { width: drawUntilX },
        });
        gsap.set(progressDot, {
          x: `${(dotPoint.x / 3000) * 300}vw`,
          y: `${(dotPoint.y / 760) * 100}vh`,
        });
      };

      gsap.set(track, { x: 0, force3D: true });
      gsap.set(progressMask, { attr: { x: 0, width: 0 } });
      gsap.set(progressDot, { xPercent: -50, yPercent: -50, x: 0, y: 0 });
      updateLine(0);

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          scrub: 1.45,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: (self) => {
            pathLength = progressPath.getTotalLength();
            pathStartX = progressPath.getPointAtLength(0).x;
            pathEndX = progressPath.getPointAtLength(pathLength).x;
            updateLine(self.progress);
          },
        },
      });

      timeline.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        duration: 1,
      });
      timeline.eventCallback("onUpdate", () => updateLine(timeline.progress()));

      window.requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden bg-[#020407] text-white">
      <div className="relative h-screen overflow-hidden bg-[#020407]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_38%,rgba(52,120,255,0.16),transparent_32%),linear-gradient(180deg,#020407_0%,#050914_54%,#020407_100%)]" />

        <div
          ref={trackRef}
          className="relative h-full w-[300vw] will-change-transform"
        >
          <svg
            className="pointer-events-none absolute left-0 top-0 h-full w-full"
            viewBox="0 0 3000 760"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <clipPath id="project-story-line-clip">
                <rect ref={progressMaskRef} x="0" y="0" width="0" height="760" />
              </clipPath>
            </defs>
            <path
              d="M94 106 H1782 C1868 106 1920 130 2006 166 L2518 372 C2630 417 2695 444 2814 386 C2868 360 2900 350 2960 350"
              fill="none"
              stroke="rgba(143,182,255,0.34)"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
            <path
              ref={progressPathRef}
              d="M94 106 H1782 C1868 106 1920 130 2006 166 L2518 372 C2630 417 2695 444 2814 386 C2868 360 2900 350 2960 350"
              clipPath="url(#project-story-line-clip)"
              fill="none"
              stroke="#3478ff"
              strokeLinecap="round"
              strokeWidth="3"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M2960 350 L2941 335 M2960 350 L2941 365"
              fill="none"
              stroke="rgba(143,182,255,0.62)"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <span
            ref={progressDotRef}
            className="pointer-events-none absolute left-0 top-0 h-[13px] w-[13px] rounded-full bg-[#3478ff] shadow-[0_0_16px_rgba(52,120,255,0.95),0_0_32px_rgba(52,120,255,0.36)]"
            aria-hidden="true"
          />

          <div className="absolute left-[5vw] top-[9vh] text-[13px] font-black tracking-[-0.04em] text-white/86">
            &lt;{project.tag.toLowerCase()}/&gt;
          </div>

          <div className="absolute left-[23vw] top-[27vh]">
            <p className="text-[34px] font-medium leading-none tracking-[-0.06em] text-white">1440 px</p>
          </div>

          <div className="absolute left-[23vw] top-[51vh] max-w-[400px]">
            <p className="text-[15px] font-medium uppercase tracking-[-0.04em] text-white">Desktop workspace</p>
            <p className="mt-3 text-[18px] leading-[1.5] text-white/50">
              A full-width interface for comparison, review, and confident operational decisions. {project.scope}
            </p>
          </div>

          <div className="absolute left-[40vw] top-[27vh] h-[45vh] w-[36vw] overflow-hidden rounded-[4px] border border-[#0d388353] bg-[#071D46]/40 shadow-[0_0_38px_rgba(52,120,255,0.18)]">
            <img src={imageDesktop.src} alt="" className="h-full w-full object-cover" />
            <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,4,7,0.02),rgba(2,4,7,0.18))]" />
            <span className="absolute bottom-5 right-5 grid h-[68px] w-[68px] place-items-center rounded-full border border-white/45 bg-black/25 text-[20px] font-black text-white backdrop-blur-md">
              6+
            </span>
          </div>

          <div className="absolute left-[103vw] top-[15vh] h-[61vh] w-[21vw] overflow-hidden rounded-[7px] border border-[#0d388353] bg-[#071D46]/40 shadow-[0_0_34px_rgba(52,120,255,0.16)]">
            <img src={imageMobile.src} alt="" className="h-full w-full object-cover" />
          </div>

          <div className="absolute left-[82vw] top-[19vh] w-[260px]">
            <h3 className="text-[28px] font-black uppercase leading-[1.22] tracking-[-0.06em] text-white">
              Mobile
              <br />
              experience
            </h3>
          </div>

          <div className="absolute left-[128vw] top-[62vh] max-w-[350px]">
            <p className="text-[11px] leading-[1.5] text-white/50">
              The mobile layer keeps the essential journey compact: quick checks, clear next actions, and enough context to continue work away from a desktop.
            </p>
          </div>

          <div className="absolute left-[176vw] top-[16vh]">
            <h3 className="text-[28px] font-black uppercase leading-[1.18] tracking-[-0.06em] text-white">
              Product
              <br />
              intelligence
            </h3>
          </div>

          <div className="absolute left-[184vw] top-[25vh] h-[292px] w-[292px] overflow-hidden rounded-full border border-[#0d388353] bg-[#071D46]/40 shadow-[0_0_38px_rgba(52,120,255,0.18)]">
            <img src={imageEvent.src} alt="" className="h-full w-full object-cover" />
          </div>

          <div className="absolute left-[218vw] top-[62vh] max-w-[380px]">
            <p className="text-[11px] leading-[1.5] text-white/50">
              {project.result} The product becomes more than a screen: it creates a reliable layer for patterns, decisions, and measurable improvement.
            </p>
          </div>

          <a
            href="#contact"
            className="absolute left-[276vw] top-[42vh] grid h-[104px] w-[104px] place-items-center rounded-full bg-[#ff4b00] text-[10px] font-black uppercase text-white transition hover:scale-105 hover:bg-white hover:text-[#05090F]"
          >
            Start
          </a>
        </div>
      </div>
    </section>
  );
}
