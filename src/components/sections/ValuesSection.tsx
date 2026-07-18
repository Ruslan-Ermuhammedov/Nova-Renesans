"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const values = [
  {
    title: "IMPACT",
    description:
      "Driving measurable change through technology, strategy, and design that deliver lasting value for businesses and people.",
    className: "left-[2%] top-[39.52%]",
  },
  {
    title: "INNOVATION",
    description:
      "Continuously delving into the latest emerging technologies and innovative strategies to provide more future-ready solutions.",
    className: "left-[2%] top-[57.58%]",
  },
  {
    title: "COLLABORATION",
    description:
      "Growing lasting partnerships through openness, collaboration, and mutual trust because progress happens together.",
    className: "left-[70.42%] top-[57.33%]",
  },
  {
    title: "RESPONSIBILITY",
    description:
      "Committed to ethical innovation, sustainable practices, and delivering solutions that create positive social and environmental impact.",
    className: "left-[70.42%] top-[75.39%]",
  },
];

const sequences = {
  desktop: {
    path: "/values-sequence/desktop/",
    frameCount: 150,
  },
  mobile: {
    path: "/values-sequence/mobile/",
    frameCount: 150,
  },
};

type DecodedFrame = ImageBitmap | HTMLImageElement;

type SequenceConfig = {
  path: string;
  frameCount: number;
  isDesktop: boolean;
};

const padFrame = (index: number) => String(index + 1).padStart(4, "0");

export default function ValuesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const desktopStageRef = useRef<HTMLDivElement | null>(null);
  const mobileStageRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      const setupStage = (stage: HTMLDivElement | null, config: SequenceConfig) => {
        if (!sectionRef.current || !stage) return undefined;

        const canvas = stage.querySelector<HTMLCanvasElement>(".values-canvas");
        const media = stage.querySelector<HTMLElement>(".values-media");
        const cards = gsap.utils.toArray<HTMLElement>(stage.querySelectorAll(".values-card"));
        if (!canvas || !media || cards.length === 0) return undefined;

        const context = canvas.getContext("2d", { alpha: false });
        if (!context) return undefined;

        let disposed = false;
        let startedLoading = false;
        let timeline: gsap.core.Timeline | null = null;
        let intersectionObserver: IntersectionObserver | null = null;
        let resizeObserver: ResizeObserver | null = null;
        let abortController: AbortController | null = null;
        let lastRenderedFrame = -1;
        let currentFrame = 0;
        let cssWidth = 0;
        let cssHeight = 0;
        let playhead = { frame: 0 };
        const frames: Array<DecodedFrame | null> = Array.from({ length: config.frameCount }, () => null);
        const fallbackUrls: string[] = [];

        const drawFrame = (frameIndex: number, force = false) => {
          const clampedIndex = gsap.utils.clamp(0, config.frameCount - 1, frameIndex);
          const roundedIndex = Math.round(clampedIndex);

          if (!force && roundedIndex === lastRenderedFrame) return;

          const frame = findNearestFrame(frames, roundedIndex);
          if (!frame || cssWidth <= 0 || cssHeight <= 0) return;

          lastRenderedFrame = roundedIndex;
          currentFrame = roundedIndex;

          context.clearRect(0, 0, canvas.width, canvas.height);
          context.imageSmoothingEnabled = true;
          context.imageSmoothingQuality = "high";

          const frameWidth = "naturalWidth" in frame ? frame.naturalWidth : frame.width;
          const frameHeight = "naturalHeight" in frame ? frame.naturalHeight : frame.height;
          const scale = Math.min(canvas.width / frameWidth, canvas.height / frameHeight);
          const drawWidth = frameWidth * scale;
          const drawHeight = frameHeight * scale;
          const drawX = (canvas.width - drawWidth) / 2;
          const drawY = (canvas.height - drawHeight) / 2;

          context.drawImage(frame, drawX, drawY, drawWidth, drawHeight);
        };

        const resizeCanvas = () => {
          const bounds = media.getBoundingClientRect();
          cssWidth = Math.max(1, Math.round(bounds.width));
          cssHeight = Math.max(1, Math.round(bounds.height));

          const pixelRatio = config.isDesktop ? Math.min(window.devicePixelRatio || 1, 1.5) : 1;
          const nextWidth = Math.round(cssWidth * pixelRatio);
          const nextHeight = Math.round(cssHeight * pixelRatio);

          if (canvas.width !== nextWidth || canvas.height !== nextHeight) {
            canvas.width = nextWidth;
            canvas.height = nextHeight;
          }

          canvas.style.width = `${cssWidth}px`;
          canvas.style.height = `${cssHeight}px`;
          drawFrame(currentFrame, true);
        };

        const loadFrame = async (index: number) => {
          if (disposed || frames[index]) return;

          const url = `${config.path}frame_${padFrame(index)}.webp`;
          const response = await fetch(url, { signal: abortController?.signal });
          if (!response.ok) {
            if (process.env.NODE_ENV !== "production") {
              console.warn(`Failed to load values sequence frame: ${url}`);
            }
            return;
          }

          const blob = await response.blob();

          if ("createImageBitmap" in window) {
            frames[index] = await createImageBitmap(blob);
          } else {
            frames[index] = await loadImageElement(blob, fallbackUrls);
          }

          if (index === 0) drawFrame(0, true);
        };

        const loadBatch = async (indexes: number[], batchSize = 8) => {
          for (let i = 0; i < indexes.length && !disposed; i += batchSize) {
            await Promise.all(indexes.slice(i, i + batchSize).map((index) => loadFrame(index)));
          }
        };

        const createTimeline = () => {
          if (!sectionRef.current || disposed || timeline) return;

          playhead = { frame: 0 };

          timeline = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: () => {
                const distance = config.isDesktop ? window.innerHeight * 0.95 : window.innerHeight * 0.8;
                return `+=${Math.round(
                  config.isDesktop
                    ? Math.min(Math.max(distance, 800), 1050)
                    : Math.min(Math.max(distance, 650), 850),
                )}`;
              },
              pin: true,
              pinSpacing: true,
              scrub: 0.09,
              anticipatePin: 1,
              fastScrollEnd: true,
              invalidateOnRefresh: true,
            },
            defaults: {
              ease: "none",
            },
          });

          const masterTimeline = timeline;

          masterTimeline.to(
            playhead,
            {
              frame: config.frameCount - 1,
              duration: 1,
              ease: "none",
              onUpdate: () => {
                drawFrame(Math.round(playhead.frame));
              },
            },
            0,
          );

          const addLiquidCardReveal = ({
            card,
            position,
          }: {
            card: HTMLElement;
            position: number;
          }) => {
            const line = card.querySelector<HTMLElement>("[data-card-line]");
            const icon = card.querySelector<HTMLElement>("[data-card-icon]");
            const title = card.querySelector<HTMLElement>("[data-card-title]");
            const description = card.querySelector<HTMLElement>("[data-card-description]");
            const glow = card.querySelector<HTMLElement>("[data-card-glow]");
            const liquidState = config.isDesktop
              ? {
                  initial: { y: 52, scaleX: 0.82, scaleY: 0.55 },
                  stretch: { y: -9, scaleX: 0.93, scaleY: 1.12 },
                  squash: { y: 3, scaleX: 1.055, scaleY: 0.955 },
                }
              : {
                  initial: { y: 34, scaleX: 0.88, scaleY: 0.65 },
                  stretch: { y: -5, scaleX: 0.96, scaleY: 1.08 },
                  squash: { y: 2, scaleX: 1.035, scaleY: 0.97 },
                };

            gsap.set(card, {
              autoAlpha: 0,
              ...liquidState.initial,
              transformOrigin: "50% 100%",
              force3D: true,
              willChange: "transform, opacity",
            });

            if (line) {
              gsap.set(line, {
                scaleY: 0,
                transformOrigin: "top center",
                willChange: "transform",
              });
            }

            if (icon) {
              gsap.set(icon, {
                autoAlpha: 0,
                scale: 0.25,
                rotation: -35,
                willChange: "transform, opacity",
              });
            }

            if (title) {
              gsap.set(title, {
                autoAlpha: 0,
                y: 14,
                willChange: "transform, opacity",
              });
            }

            if (description) {
              gsap.set(description, {
                autoAlpha: 0,
                y: 18,
                willChange: "transform, opacity",
              });
            }

            if (glow) {
              gsap.set(glow, {
                autoAlpha: 0,
                scale: 0.35,
                transformOrigin: "50% 60%",
                willChange: "transform, opacity",
              });
            }

            masterTimeline
              .to(
                card,
                {
                  autoAlpha: 1,
                  ...liquidState.stretch,
                  duration: 0.065,
                  ease: "power3.out",
                  force3D: true,
                  overwrite: "auto",
                },
                position,
              )
              .to(
                card,
                {
                  ...liquidState.squash,
                  duration: 0.045,
                  ease: "power2.inOut",
                  force3D: true,
                  overwrite: "auto",
                },
                position + 0.065,
              )
              .to(
                card,
                {
                  y: 0,
                  scaleX: 1,
                  scaleY: 1,
                  duration: 0.065,
                  ease: "power2.out",
                  force3D: true,
                  overwrite: "auto",
                },
                position + 0.11,
              );

            if (glow) {
              masterTimeline
                .to(
                  glow,
                  {
                    autoAlpha: 0.45,
                    scale: 1.1,
                    duration: 0.065,
                    ease: "power2.out",
                    force3D: true,
                    overwrite: "auto",
                  },
                  position,
                )
                .to(
                  glow,
                  {
                    autoAlpha: 0,
                    scale: 1.45,
                    duration: 0.1,
                    ease: "power2.out",
                    force3D: true,
                    overwrite: "auto",
                  },
                  position + 0.065,
                );
            }

            if (line) {
              masterTimeline.to(
                line,
                {
                  scaleY: 1,
                  duration: 0.12,
                  ease: "power3.out",
                  force3D: true,
                  overwrite: "auto",
                },
                position + 0.025,
              );
            }

            if (icon) {
              masterTimeline.to(
                icon,
                {
                  autoAlpha: 1,
                  scale: 1,
                  rotation: 0,
                  duration: 0.11,
                  ease: "back.out(1.8)",
                  force3D: true,
                  overwrite: "auto",
                },
                position + 0.045,
              );
            }

            if (title) {
              masterTimeline.to(
                title,
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.1,
                  ease: "power2.out",
                  force3D: true,
                  overwrite: "auto",
                },
                position + 0.06,
              );
            }

            if (description) {
              masterTimeline.to(
                description,
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.11,
                  ease: "power2.out",
                  force3D: true,
                  overwrite: "auto",
                },
                position + 0.085,
              );
            }
          };

          [
            { card: cards[0], position: 0.01 },
            { card: cards[1], position: 0.21 },
            { card: cards[2], position: 0.46 },
            { card: cards[3], position: 0.71 },
          ].forEach(addLiquidCardReveal);

          ScrollTrigger.refresh();
        };

        const startLoading = () => {
          if (startedLoading || disposed) return;

          startedLoading = true;
          abortController = new AbortController();
          resizeCanvas();

          const importantFrames = [
            0,
            Math.round((config.frameCount - 1) * 0.25),
            Math.round((config.frameCount - 1) * 0.5),
            Math.round((config.frameCount - 1) * 0.75),
            config.frameCount - 1,
          ];
          const remainingFrames = Array.from({ length: config.frameCount }, (_, index) => index).filter(
            (index) => !importantFrames.includes(index),
          );

          loadBatch(importantFrames, 5)
            .then(() => {
              if (disposed) return;
              drawFrame(0, true);
              createTimeline();
              return loadBatch(remainingFrames, 8);
            })
            .catch((error) => {
              if (!disposed && error?.name !== "AbortError") {
                console.warn("Values image sequence failed to load.", error);
              }
            });
        };

        resizeObserver = new ResizeObserver(resizeCanvas);
        resizeObserver.observe(media);

        gsap.set(cards, {
          autoAlpha: 0,
          y: config.isDesktop ? 52 : 34,
          scaleX: config.isDesktop ? 0.82 : 0.88,
          scaleY: config.isDesktop ? 0.55 : 0.65,
          transformOrigin: "50% 100%",
          force3D: true,
          willChange: "transform, opacity",
        });
        cards.forEach((card) => {
          const line = card.querySelector<HTMLElement>("[data-card-line]");
          const icon = card.querySelector<HTMLElement>("[data-card-icon]");
          const title = card.querySelector<HTMLElement>("[data-card-title]");
          const description = card.querySelector<HTMLElement>("[data-card-description]");

          if (line) {
            gsap.set(line, {
              scaleY: 0,
              transformOrigin: "top center",
              willChange: "transform",
            });
          }

          if (icon) {
            gsap.set(icon, {
              autoAlpha: 0,
              scale: 0.25,
              rotation: -35,
              willChange: "transform, opacity",
            });
          }

          if (title) {
            gsap.set(title, {
              autoAlpha: 0,
              y: 14,
              willChange: "transform, opacity",
            });
          }

          if (description) {
            gsap.set(description, {
              autoAlpha: 0,
              y: config.isDesktop ? 14 : 12,
              willChange: "transform, opacity",
            });
          }

          const glow = card.querySelector<HTMLElement>("[data-card-glow]");
          if (glow) {
            gsap.set(glow, {
              autoAlpha: 0,
              scale: 0.35,
              transformOrigin: "50% 60%",
              willChange: "transform, opacity",
            });
          }
        });

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          startLoading();
          gsap.set(cards, { autoAlpha: 1, y: 0, scaleX: 1, scaleY: 1 });
          cards.forEach((card) => {
            gsap.set(card.querySelector("[data-card-line]"), { scaleY: 1 });
            gsap.set(card.querySelector("[data-card-icon]"), { autoAlpha: 1, scale: 1, rotation: 0 });
            gsap.set(card.querySelector("[data-card-title]"), { autoAlpha: 1, y: 0 });
            gsap.set(card.querySelector("[data-card-description]"), { autoAlpha: 1, y: 0 });
            gsap.set(card.querySelector("[data-card-glow]"), { autoAlpha: 0, scale: 1 });
          });
          return () => {
            disposed = true;
            abortController?.abort();
            resizeObserver?.disconnect();
            disposeFrames(frames, fallbackUrls);
          };
        }

        intersectionObserver = new IntersectionObserver(
          ([entry]) => {
            if (entry?.isIntersecting) startLoading();
          },
          { rootMargin: "1200px 0px" },
        );
        intersectionObserver.observe(sectionRef.current);

        return () => {
          disposed = true;
          abortController?.abort();
          intersectionObserver?.disconnect();
          resizeObserver?.disconnect();
          timeline?.scrollTrigger?.kill();
          timeline?.kill();
          disposeFrames(frames, fallbackUrls);
          cards.forEach((card) => {
            gsap.set(
              [
                card,
                card.querySelector("[data-card-line]"),
                card.querySelector("[data-card-icon]"),
                card.querySelector("[data-card-title]"),
                card.querySelector("[data-card-description]"),
                card.querySelector("[data-card-glow]"),
              ],
              { clearProps: "opacity,visibility,transform,willChange" },
            );
          });
        };
      };

      mm.add("(min-width: 768px)", () => setupStage(desktopStageRef.current, { ...sequences.desktop, isDesktop: true }));
      mm.add("(max-width: 767px)", () => setupStage(mobileStageRef.current, { ...sequences.mobile, isDesktop: false }));
    }, sectionRef);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="values" data-dark-nav="true" className="relative overflow-hidden bg-[#030304] text-white">
      <div className="section-container relative py-12 md:py-16 lg:py-0">
        <div
          ref={desktopStageRef}
          className="relative mx-auto hidden aspect-[1194/825] w-full overflow-hidden bg-[#030304] [container-type:inline-size] md:block"
        >
          <h2 className="absolute  z-50 left-1/2 top-[12.85%] w-[68.68cqw] -translate-x-1/2 text-center text-[6.03cqw] font-normal leading-[0.96] tracking-[-0.088em] text-white">
            <span className="mx-auto block w-fit border-b border-white/55 pb-[0.17cqw]">Driven by Values</span>
            <span className="mx-auto block w-fit border-b border-white/55 pb-[0.17cqw]">Guided by Responsibility</span>
          </h2>

          <div className="values-media pointer-events-none absolute left-[20%] top-[27%] h-[54cqw] w-[54cqw]">
            <div className="absolute inset-[-0.7cqw] rounded-full bg-[#061650]/42 blur-[3.6cqw]" />
            <canvas className="values-canvas relative h-full w-full select-none object-contain" aria-hidden="true" />
          </div>

          {values.map((value) => (
            <ValueItem key={value.title} value={value} />
          ))}
        </div>

        <div ref={mobileStageRef} className="md:hidden">
          <h2 className="mx-auto text-center text-[clamp(2.8rem,10vw,4.5rem)] font-normal leading-[0.96] tracking-[-0.088em] text-white">
            <span className="mx-auto block w-fit border-b border-white/55 pb-[2px]">Driven by Values</span>
            <span className="mx-auto mt-1 block w-fit border-b border-white/55 pb-[2px]">
              Guided by Responsibility
            </span>
          </h2>

          <div className="values-media pointer-events-none relative mx-auto mt-12 h-[min(104vw,560px)] w-[min(104vw,560px)]">
            <div className="absolute inset-[-4px] rounded-full bg-[#061650]/42 blur-[34px]" />
            <canvas className="values-canvas relative h-full w-full select-none object-contain" aria-hidden="true" />
          </div>

          <div className="mt-12 grid gap-10">
            {values.map((value) => (
              <ValueItemMobile key={value.title} value={value} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function findNearestFrame(frames: Array<DecodedFrame | null>, targetIndex: number) {
  if (frames[targetIndex]) return frames[targetIndex];

  for (let offset = 1; offset < frames.length; offset += 1) {
    const previous = targetIndex - offset;
    const next = targetIndex + offset;

    if (previous >= 0 && frames[previous]) return frames[previous];
    if (next < frames.length && frames[next]) return frames[next];
  }

  return null;
}

function loadImageElement(blob: Blob, fallbackUrls: string[]) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const url = URL.createObjectURL(blob);
    fallbackUrls.push(url);

    const image = new Image();
    image.decoding = "async";
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = url;
  });
}

function disposeFrames(frames: Array<DecodedFrame | null>, fallbackUrls: string[]) {
  frames.forEach((frame, index) => {
    if (frame && "close" in frame && typeof frame.close === "function") {
      frame.close();
    }
    frames[index] = null;
  });

  fallbackUrls.forEach((url) => URL.revokeObjectURL(url));
  fallbackUrls.length = 0;
}

function ValueItem({ value }: { value: (typeof values)[number] }) {
  return (
    <article
      data-value-card
      className={`values-card absolute isolate min-h-[8.29cqw] w-[29.31cqw] pl-[1.34cqw] ${value.className}`}
    >
      <span
        data-card-glow
        className="pointer-events-none absolute inset-[-0.84cqw] -z-10 rounded-[1.2cqw]"
        style={{
          background:
            "radial-gradient(circle at 30% 60%, rgba(37, 99, 235, 0.16), rgba(37, 99, 235, 0.05) 40%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <span data-card-line className="absolute bottom-0 left-0 top-0 w-px origin-top bg-white/18" aria-hidden="true" />
      <div className="flex items-center gap-[1.26cqw]">
        <CrossMark
          dataAttribute="card-icon"
          className="h-[1.01cqw] w-[1.01cqw] [&>span:first-child]:w-[0.34cqw] [&>span:last-child]:h-[0.34cqw]"
        />
        <h3
          data-card-title
          className="font-mono text-[2.01cqw] font-normal uppercase leading-none tracking-[-0.085em] text-white"
        >
          {value.title}
        </h3>
      </div>
      <p
        data-card-description
        className="mt-[1.51cqw] max-w-[26.38cqw] text-[1.34cqw] font-normal leading-[1.26] tracking-[-0.052em] text-white/45"
      >
        {value.description}
      </p>
    </article>
  );
}

function ValueItemMobile({ value }: { value: (typeof values)[number] }) {
  return (
    <article data-value-card className="values-card relative isolate min-h-[99px] pl-[16px]">
      <span
        data-card-glow
        className="pointer-events-none absolute inset-[-8px] -z-10 rounded-[12px]"
        style={{
          background:
            "radial-gradient(circle at 30% 60%, rgba(37, 99, 235, 0.16), rgba(37, 99, 235, 0.05) 40%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <span data-card-line className="absolute bottom-0 left-0 top-0 w-px origin-top bg-white/18" aria-hidden="true" />
      <div className="flex items-center gap-[15px]">
        <CrossMark
          dataAttribute="card-icon"
          className="h-[12px] w-[12px] [&>span:first-child]:w-[4px] [&>span:last-child]:h-[4px]"
        />
        <h3 data-card-title className="font-mono text-[24px] font-normal uppercase leading-none tracking-[-0.085em] text-white">
          {value.title}
        </h3>
      </div>
      <p
        data-card-description
        className="mt-[18px] max-w-[315px] text-[16px] font-normal leading-[1.26] tracking-[-0.052em] text-white/45"
      >
        {value.description}
      </p>
    </article>
  );
}

function CrossMark({
  className = "h-[12px] w-[12px] [&>span:first-child]:w-[4px] [&>span:last-child]:h-[4px]",
  dataAttribute,
}: {
  className?: string;
  dataAttribute?: "card-icon";
}) {
  const dataProps = dataAttribute === "card-icon" ? { "data-card-icon": true } : {};

  return (
    <span {...dataProps} className={`relative shrink-0 text-[#f24602] ${className}`} aria-hidden="true">
      <span className="absolute left-1/2 top-0 h-full -translate-x-1/2 bg-current" />
      <span className="absolute left-0 top-1/2 w-full -translate-y-1/2 bg-current" />
    </span>
  );
}
