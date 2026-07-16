import valuesImage from "@/assets/3drasim.png";

const values = [
  {
    title: "IMPACT",
    description:
      "Driving measurable change through technology, strategy, and design that deliver lasting value for businesses and people.",
    className: "left-[02%] top-[39.52%]",
  },
  {
    title: "INNOVATION",
    description:
      "Continuously delving into the latest emerging technologies and innovative strategies to provide more future-ready solutions.",
    className: "left-[02%] top-[57.58%]",
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

export default function ValuesSection() {
  return (
    <section id="values" data-dark-nav="true" className="relative overflow-hidden bg-[#030304] text-white">
      <div className="section-container relative py-12 md:py-16 lg:py-0">
        <div className="relative mx-auto hidden aspect-[1194/825] w-full overflow-hidden bg-[#030304] [container-type:inline-size] lg:block">
          <h2 className="absolute left-1/2 top-[12.85%] w-[68.68cqw] -translate-x-1/2 text-center text-[6.03cqw] font-normal leading-[0.96] tracking-[-0.088em] text-white">
            <span className="mx-auto block w-fit border-b border-white/55 pb-[0.17cqw]">Driven by Values</span>
            <span className="mx-auto block w-fit border-b border-white/55 pb-[0.17cqw]">Guided by Responsibility</span>
          </h2>

          <div className="pointer-events-none absolute left-[34.09%] top-[42.79%] h-[29.73cqw] w-[29.73cqw]">
            <div className="absolute inset-[-0.34cqw] rounded-full bg-[#061650]/42 blur-[2.85cqw]" />
            <img src={valuesImage.src} alt="" className="relative h-full w-full select-none object-contain" />
          </div>

          {values.map((value) => (
            <ValueItem key={value.title} value={value} />
          ))}
        </div>

        <div className="lg:hidden">
          <h2 className="mx-auto text-center text-[clamp(2.8rem,10vw,4.5rem)] font-normal leading-[0.96] tracking-[-0.088em] text-white">
            <span className="mx-auto block w-fit border-b border-white/55 pb-[2px]">Driven by Values</span>
            <span className="mx-auto mt-1 block w-fit border-b border-white/55 pb-[2px]">
              Guided by Responsibility
            </span>
          </h2>

          <div className="pointer-events-none relative mx-auto mt-12 h-[min(76vw,355px)] w-[min(76vw,355px)]">
            <div className="absolute inset-[-4px] rounded-full bg-[#061650]/42 blur-[34px]" />
            <img src={valuesImage.src} alt="" className="relative h-full w-full select-none object-contain" />
          </div>

          <div className="mt-12 grid gap-10 md:grid-cols-2">
            {values.map((value) => (
              <ValueItemMobile key={value.title} value={value} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ValueItem({ value }: { value: (typeof values)[number] }) {
  return (
    <article className={`absolute min-h-[8.29cqw] w-[29.31cqw] border-l border-white/18 pl-[1.34cqw] ${value.className}`}>
      <div className="flex items-center gap-[1.26cqw]">
        <CrossMark className="h-[1.01cqw] w-[1.01cqw] [&>span:first-child]:w-[0.34cqw] [&>span:last-child]:h-[0.34cqw]" />
        <h3 className="font-mono text-[2.01cqw] font-normal uppercase leading-none tracking-[-0.085em] text-white">
          {value.title}
        </h3>
      </div>
      <p className="mt-[1.51cqw] max-w-[26.38cqw] text-[1.34cqw] font-normal leading-[1.26] tracking-[-0.052em] text-white/45">
        {value.description}
      </p>
    </article>
  );
}

function ValueItemMobile({ value }: { value: (typeof values)[number] }) {
  return (
    <article className="relative min-h-[99px] border-l border-white/18 pl-[16px]">
      <div className="flex items-center gap-[15px]">
        <CrossMark className="h-[12px] w-[12px] [&>span:first-child]:w-[4px] [&>span:last-child]:h-[4px]" />
        <h3 className="font-mono text-[24px] font-normal uppercase leading-none tracking-[-0.085em] text-white">
          {value.title}
        </h3>
      </div>
      <p className="mt-[18px] max-w-[315px] text-[16px] font-normal leading-[1.26] tracking-[-0.052em] text-white/45">
        {value.description}
      </p>
    </article>
  );
}

function CrossMark({ className = "h-[12px] w-[12px] [&>span:first-child]:w-[4px] [&>span:last-child]:h-[4px]" }: { className?: string }) {
  return (
    <span className={`relative shrink-0 text-[#f24602] ${className}`} aria-hidden="true">
      <span className="absolute left-1/2 top-0 h-full -translate-x-1/2 bg-current" />
      <span className="absolute left-0 top-1/2 w-full -translate-y-1/2 bg-current" />
    </span>
  );
}
