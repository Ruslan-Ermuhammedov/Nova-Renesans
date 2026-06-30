import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Plus, Sparkle } from "lucide-react";
import detailImage from "@/assets/ecc6142c-cd15-40b1-8b06-c20d8b9fd15f.png";

const projectDetails = [
  {
    slug: "smart-financial-marketplace-for-uzbekistan",
    tag: "FINANCE OPS",
    title: "Smart Financial Marketplace\nfor Uzbekistan",
    description:
      "Compare loans, deposits, bank cards, and exchange rates in one digital platform. FINKO helps users choose the right financial solution faster, smarter, and with confidence.",
    scope: "Marketplace strategy, product UX, fintech dashboards, comparison flows, and scalable web delivery.",
    result: "A clearer financial decision-making experience built around speed, trust, and local market needs.",
  },
  {
    slug: "real-time-fleet-visibility-platform",
    tag: "ROUTE OPS",
    title: "Real-Time Fleet Visibility Platform",
    description: "Track deliveries, drivers, and route performance across regional logistics hubs.",
    scope: "Fleet dashboards, route intelligence, dispatch workflows, and operational reporting.",
    result: "Improved delivery visibility and faster response for distributed logistics teams.",
  },
  {
    slug: "automated-inventory-control-system",
    tag: "WAREHOUSE",
    title: "Automated Inventory Control System",
    description: "Improve stock accuracy and warehouse visibility with live operational signals.",
    scope: "Inventory automation, warehouse data modeling, role-based tools, and live status screens.",
    result: "Reduced manual checks and stronger inventory confidence across warehouse operations.",
  },
  {
    slug: "smart-dispatch-optimization-engine",
    tag: "DISPATCH",
    title: "Smart Dispatch Optimization Engine",
    description: "Assign deliveries faster and improve last-mile efficiency for field teams.",
    scope: "Dispatch planning, route assignment logic, mobile-friendly workflows, and performance analytics.",
    result: "Faster dispatch decisions and more predictable delivery execution.",
  },
  {
    slug: "from-data-to-business-impact",
    tag: "ANALYTICS",
    title: "From Data to Business Impact",
    description: "A reporting suite that turns financial data into clear leadership insights.",
    scope: "Analytics dashboards, financial KPIs, reporting architecture, and executive views.",
    result: "Decision-makers get faster access to performance signals and measurable outcomes.",
  },
  {
    slug: "compliance-and-risk-review-portal",
    tag: "RISK",
    title: "Compliance and Risk Review Portal",
    description: "A secure workspace for audit trails, risk scoring, and document review.",
    scope: "Risk workflows, secure access, audit history, document review, and approval states.",
    result: "More transparent review processes and stronger compliance readiness.",
  },
  {
    slug: "unified-retail-operations-hub",
    tag: "COMMERCE",
    title: "Unified Retail Operations Hub",
    description: "Connect catalog, orders, stock movement, and store performance data.",
    scope: "Commerce integrations, inventory sync, order dashboards, and retail reporting.",
    result: "A single operational layer for faster retail decisions.",
  },
  {
    slug: "personalized-shopping-experience",
    tag: "CUSTOMER",
    title: "Personalized Shopping Experience",
    description: "Adapt recommendations and promotions to customer behavior.",
    scope: "Personalization logic, product discovery, offer surfaces, and customer journey design.",
    result: "More relevant shopping experiences and stronger conversion opportunities.",
  },
  {
    slug: "demand-forecasting-dashboard",
    tag: "SUPPLY",
    title: "Demand Forecasting Dashboard",
    description: "Plan stock more accurately and reduce missed sales opportunities.",
    scope: "Forecasting views, stock planning, data visualization, and demand trend analysis.",
    result: "Better inventory planning and fewer stock gaps.",
  },
  {
    slug: "digital-patient-coordination-system",
    tag: "PATIENT",
    title: "Digital Patient Coordination System",
    description: "Coordinate appointments, records, notifications, and secure care workflows.",
    scope: "Patient flows, scheduling tools, record access, secure notifications, and team handoff.",
    result: "More responsive coordination between care teams and patients.",
  },
  {
    slug: "healthcare-workflow-automation",
    tag: "CLINIC OPS",
    title: "Healthcare Workflow Automation",
    description: "Improve task handoff, patient follow-up, and internal visibility.",
    scope: "Clinic task automation, follow-up flows, dashboards, and staff coordination tools.",
    result: "Smoother clinic operations and clearer accountability.",
  },
  {
    slug: "protected-medical-data-workspace",
    tag: "SECURITY",
    title: "Protected Medical Data Workspace",
    description: "Manage sensitive records, access roles, and compliance review.",
    scope: "Secure workspaces, permissions, review flows, and sensitive-data UX.",
    result: "Better protection and traceability for healthcare data.",
  },
  {
    slug: "service-monitoring-command-center",
    tag: "NETWORK",
    title: "Service Monitoring Command Center",
    description: "View incidents, network health, and response coordination in one place.",
    scope: "Network status dashboards, incident tracking, alert surfaces, and team response views.",
    result: "Faster visibility into telecom service quality and incidents.",
  },
  {
    slug: "customer-issue-resolution-portal",
    tag: "SUPPORT",
    title: "Customer Issue Resolution Portal",
    description: "Triage tickets, assign ownership, and reduce resolution time.",
    scope: "Support queues, ticket routing, ownership states, and resolution analytics.",
    result: "More organized support workflows and shorter issue cycles.",
  },
  {
    slug: "subscription-billing-automation",
    tag: "BILLING",
    title: "Subscription Billing Automation",
    description: "Automate service plans, renewals, and operational reporting.",
    scope: "Billing workflows, subscription states, renewal tracking, and finance reporting.",
    result: "Cleaner telecom billing operations and fewer manual steps.",
  },
  {
    slug: "energy-asset-monitoring-platform",
    tag: "GRID OPS",
    title: "Energy Asset Monitoring Platform",
    description: "Monitor field assets, maintenance signals, and operational status.",
    scope: "Asset dashboards, maintenance signals, field reporting, and operational monitoring.",
    result: "Better uptime visibility and faster field response.",
  },
  {
    slug: "scalable-infrastructure-for-energy-teams",
    tag: "CLOUD",
    title: "Scalable Infrastructure for Energy Teams",
    description: "Improve uptime, data access, and engineering delivery speed.",
    scope: "Cloud architecture, delivery pipelines, system monitoring, and reliability improvements.",
    result: "A stronger technical foundation for energy operations.",
  },
  {
    slug: "operational-intelligence-dashboard",
    tag: "REPORTING",
    title: "Operational Intelligence Dashboard",
    description: "Track output, incidents, and efficiency trends for energy leaders.",
    scope: "Executive dashboards, incident analytics, performance trends, and reporting systems.",
    result: "Clearer operational insight for leadership and technical teams.",
  },
];

export function generateStaticParams() {
  return projectDetails.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectDetails.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#020407] text-white">
      <section className="relative min-h-screen overflow-hidden bg-black py-8 md:py-10 lg:py-12">
        <div className="section-container relative z-10">
          <Link
            href="/#projects"
            className="mb-5 inline-flex h-11 items-center gap-3 border border-white/[0.18] bg-white/[0.035] px-4 text-xs font-bold uppercase tracking-[0.08em] text-white/72 transition hover:border-[#3478ff] hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2.5} />
            Back
          </Link>

          <div className="relative min-h-[720px] overflow-hidden rounded-[2px] bg-black md:min-h-[760px] lg:min-h-[790px] min-[1721px]:min-h-[900px]">
            <img
              src={detailImage.src}
              alt=""
              className="absolute right-0 top-[42px] h-[600px] object-contain opacity-95 md:h-[650px] lg:top-[34px] lg:h-[690px] min-[1721px]:top-0 min-[1721px]:h-[900px]"
            />

            <div className="relative z-10 flex min-h-[720px] flex-col justify-between py-8 md:min-h-[760px] md:py-10 lg:min-h-[790px] lg:py-12 min-[1721px]:min-h-[900px] min-[1721px]:py-16">
              <div className="max-w-[620px] min-[1721px]:max-w-[760px]">
                <h1 className="max-w-[560px] text-[clamp(2.55rem,3.35vw,3.35rem)] font-normal leading-[1] tracking-[-0.06em] text-white xl:max-w-[600px] min-[1721px]:max-w-[760px] min-[1721px]:text-[65px]">
                  TechNova operates in global tech hubs, blending reach with local insight.
                </h1>
                <p className="mt-6 max-w-[500px] text-[1.05rem] font-normal leading-[1.45] text-[#cecece] md:text-[1.14rem] min-[1721px]:mt-7 min-[1721px]:max-w-[560px] min-[1721px]:text-[1.28rem]">
                  Wherever our clients are — we’re close enough to support, yet global enough to scale.
                </p>
                <a
                  href="#project-overview"
                  className="mt-7 inline-flex h-[44px] w-[220px] items-center justify-center gap-2 bg-white text-xs uppercase text-[#05090F] transition duration-300 hover:bg-[#ff4b00] hover:text-white min-[1721px]:mt-9 min-[1721px]:h-[48px] min-[1721px]:w-[244px] min-[1721px]:text-sm"
                >
                  <Sparkle className="h-4 w-4" fill="currentColor" strokeWidth={.6} />
                  Go To Global Presences
                </a>
              </div>

              <div id="project-overview" className="mt-16 grid max-w-[980px] gap-5 md:grid-cols-3 lg:mt-20 lg:max-w-[1040px] min-[1721px]:mt-36 min-[1721px]:max-w-[1140px] min-[1721px]:gap-6">
                {[
                  {
                    title: "NEW YORK, USA",
                    body: "123 Madison Avenue, 12th Floor,\nNew York, NY 10010\n\n+1 212 555 0123\n\ntechnova.ny@gmail.com",
                  },
                  {
                    title: "SINGAPORE, SG",
                    body: "8 Marina View, Asia Square\nTower 1, Singapore 018960\n\n+65 6234 5678\n\ntechnova.sg@gmail.com",
                  },
                  {
                    title: "LONDON, UK",
                    body: "24 Old Street, Shoreditch,\nLondon EC1V 9AB\n\n+44 20 7946 0123\n\ntechnova.uk@gmail.com",
                  },
                ].map((card) => (
                  <article
                    key={card.title}
                    className="group relative flex min-h-[250px] flex-col overflow-hidden rounded-[1px] bg-[#071D46]/40 p-6 shadow-[0_0_30px_rgba(29,88,210,0.10),inset_0_1px_0_rgba(255,255,255,0.035)] backdrop-blur-2xl transition duration-500 hover:bg-[#082B67]/50 hover:shadow-[0_0_34px_rgba(42,104,230,0.20),inset_0_1px_0_rgba(255,255,255,0.045)] lg:min-h-[280px] lg:p-7 min-[1721px]:min-h-[340px] min-[1721px]:p-8"
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
                    <div className="relative flex h-full flex-col transition duration-500 ease-out group-hover:-translate-y-4">
                      <p className="text-[1.2rem] font-normal uppercase leading-tight tracking-[-0.045em] text-[#e8eef8] lg:text-[1.36rem] min-[1721px]:text-[1.68rem]">
                        {card.title}
                      </p>
                      <div className="mt-4 h-px w-full bg-white/[0.14] min-[1721px]:mt-5" />
                      <p className="mt-5 whitespace-pre-line text-[0.92rem] font-normal leading-[1.42] text-white/66 lg:text-[1rem] min-[1721px]:mt-7 min-[1721px]:text-[1.1rem] min-[1721px]:leading-[1.45]">
                        {card.body}
                      </p>
                      <p className="mt-auto pt-6 text-[0.72rem] font-black uppercase tracking-[0.14em] text-white/82 min-[1721px]:pt-9 min-[1721px]:text-[0.8rem]">
                        View on map +
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
