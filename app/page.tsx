import { Topbar } from "@/components/sections/Topbar";
import { Hero } from "@/components/sections/Hero";
import { Story } from "@/components/sections/Story";
import { Roadmap } from "@/components/sections/Roadmap";
import { Manifesto } from "@/components/sections/Manifesto";
import { HowToBuy } from "@/components/sections/HowToBuy";
import { ContractSection } from "@/components/sections/ContractSection";
import { BuildInPublic } from "@/components/sections/BuildInPublic";
import { Community } from "@/components/sections/Community";
import { MemeWall } from "@/components/sections/MemeWall";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main>
      <Topbar />
      <Hero />
      <Story />
      <Roadmap />
      <Manifesto />
      <HowToBuy />
      <ContractSection />
      <BuildInPublic />
      <Community />
      <MemeWall />
      <Faq />
      <FinalCta />
      <Footer />
    </main>
  );
}
