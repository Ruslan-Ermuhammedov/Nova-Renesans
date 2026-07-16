import NovaLanding from "@/components/NovaLanding";
import ImpactStatsSection from "@/components/ImpactStatsSection";
import IndustriesSection from "@/components/sections/IndustriesSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ValuesSection from "@/components/sections/ValuesSection";

export default function Home() {
  return (
    <>
      <NovaLanding />
      <ImpactStatsSection />
      <ServicesSection />
      <IndustriesSection />
      <ValuesSection />
    </>
  );
}
