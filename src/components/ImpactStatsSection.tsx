const stats = [
  {
    value: "199+",
    label: "Trusted enterprise clients served worldwide",
  },
  {
    value: "500+",
    label: "Digital innovation strategy projects delivered",
  },
  {
    value: "15+",
    label: "Years of experience in software engineering",
  },
];

export default function ImpactStatsSection() {
  return (
    <section
      data-dark-nav="true"
      className="relative z-40 -mt-[76vh] min-h-[760px] overflow-hidden bg-[#030304] px-5 pb-8 pt-[210px] text-white md:h-[800px] md:px-10 md:pt-[220px] lg:px-16 lg:pt-[235px]"
    >
      <div className="pointer-events-none absolute inset-0">
        <img
          className="absolute left-0 top-0 h-auto w-full max-w-none object-contain object-top"
          src="/brand/BacroundSection2.png"
          alt=""
        />
        <div className="absolute inset-x-0 top-[50%] h-px bg-white/[0.025]" />
      </div>

      <div className="relative mx-auto grid max-w-[1600px] gap-14 lg:grid-cols-[0.92fr_1.35fr] lg:gap-24">
        <div className="max-w-[610px] pt-0">
          <h2 className="text-balance text-[clamp(2rem,2.85vw,3.55rem)] font-medium leading-[1.05] tracking-[-0.052em]">
            A tech partner helping to transform, innovate, and achieve real results.
          </h2>
          <p className="mt-8 max-w-[560px] text-[clamp(0.95rem,0.92vw,1.08rem)] font-medium leading-7 text-white/43">
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

        <div className="grid gap-x-16 gap-y-20 lg:grid-cols-2 lg:pt-1">
          <StatCard stat={stats[0]} className="lg:col-span-2 lg:max-w-[455px]" />
          <StatCard stat={stats[1]} />
          <StatCard stat={stats[2]} />
        </div>
      </div>

      <div className="relative mx-auto mt-20 flex max-w-[1600px] justify-center text-center md:mt-24">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-white/56 md:text-sm">
          [ Trusted by leading global brands ]
        </p>
      </div>
    </section>
  );
}

function StatCard({
  stat,
  className = "",
}: {
  stat: {
    value: string;
    label: string;
  };
  className?: string;
}) {
  return (
    <article className={`relative border-b border-white/[0.13] pb-5 ${className}`}>
      <div className="flex items-end justify-between gap-6">
        <p className="text-[clamp(4rem,5.8vw,6.9rem)] font-semibold leading-[0.82] tracking-[-0.075em] text-white">
          {stat.value}
        </p>
        <span className="mb-2.5 h-3 w-3 shrink-0 bg-nova-orange" aria-hidden="true" />
      </div>
      <p className="mt-7 max-w-[350px] text-[clamp(0.92rem,0.9vw,1.02rem)] font-semibold leading-6 text-white/50">
        {stat.label}
      </p>
    </article>
  );
}
