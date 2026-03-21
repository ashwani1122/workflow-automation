import { Footer, FooterCTA, FooterCTASectionSeparator } from "@/components/footer-cta";
import Header from "@/components/header";
import { HeroContent } from "@/components/hero-illustration/heroContent";
import { EditorialLines } from "@/components/hero/EditorialLines";
import { FeaturesSection } from "@/components/hero/FeaturesSection";
import { SectionSeparators } from "@/components/hero/SectionSeparators";
import { DesktopPlayground } from "@/components/playground/DesktopPlayground";
import { PricingSection } from "@/components/pricing";
import { ScrollArea } from "@/components/ui/scroll-area";
export default function Home() {
    return (<main className="h-screen bg-[#151515]">
      <ScrollArea type="scroll" scrollHideDelay={500} className="h-full w-full">
        <EditorialLines />
        <Header />
        <HeroContent />        
        <div className="w-[90%] sm:w-[88%] md:w-[85%] lg:w-[80%] xl:w-[80%] mx-auto md:px-4 lg:px-6 xl:px-8 max-w-[1400px]">
          <SectionSeparators />
          <div className="snap-y snap-mandatory">
            <FeaturesSection />
            <DesktopPlayground />
          </div>
          <div className="md:hidden">
            <SectionSeparators />
          </div>
          <PricingSection /> 
          <FooterCTA/>
        </div>
        <FooterCTASectionSeparator/>
         <div className="w-[90%] sm:w-[88%] md:w-[85%] lg:w-[80%] xl:w-[80%] mx-auto md:px-4 lg:px-6 xl:px-8 max-w-[1400px]">
          <Footer />
        </div>
      </ScrollArea>
    </main>
    );
}