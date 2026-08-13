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
import { Marquee } from "@/components/fx/Marquee";
import { MusicPlayer } from "@/components/fx/MusicPlayer";
import { principles } from "@/components/content";

export default function Home() {
  return (
    <main>
      <div className="aurora" aria-hidden="true"><i /><i /><i /></div>
      <Topbar />
      <Hero />
      <Marquee items={[...principles, "$BAMNU ON SOLANA"]} />
      <Story />
      <HowToBuy />
      <ContractSection />
      <Roadmap />
      <Manifesto />
      <BuildInPublic />
      <Community />
      <MemeWall />
      <Faq />
      <FinalCta />
      <Footer />
      <MusicPlayer />
    </main>
  );
}
