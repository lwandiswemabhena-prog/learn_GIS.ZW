import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import topoPattern from "@/assets/topo-pattern.jpg";

const ZitfBanner = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={topoPattern} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[hsl(var(--section-dark)/0.85)]" />
      </div>
      <div className="container relative z-10 py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="max-w-xl space-y-5">
            <div className="inline-flex items-center gap-2 bg-accent/20 text-accent rounded-full px-4 py-1.5 text-sm font-semibold">
              <Calendar className="h-4 w-4" />
              ZITF 2025 — Visit Our Booth
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-section-dark-foreground tracking-tight">
              See Us at the Zimbabwe International Trade Fair
            </h2>
            <p className="text-section-dark-foreground/70 text-lg">
              Experience live demos, hands-on trials, and exclusive 40% off for ZITF attendees. Come see why teachers love our platform.
            </p>
            <Button variant="hero" size="lg" className="text-base px-8 py-6 rounded-xl cursor-pointer" onClick={() => alert("ZITF 2025 - 40% off coupon applied!")}>
              Claim ZITF Discount <ArrowRight className="ml-1 h-5 w-5" />
            </Button>
          </div>

          <div className="glass rounded-2xl p-8 max-w-sm w-full space-y-4 text-section-dark-foreground">
            <h3 className="text-xl font-bold">ZITF Special Offer</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-section-dark-foreground/10 pb-2">
                <span className="text-section-dark-foreground/70">Discount</span>
                <span className="font-bold text-accent">40% OFF</span>
              </div>
              <div className="flex justify-between border-b border-section-dark-foreground/10 pb-2">
                <span className="text-section-dark-foreground/70">Basic Plan</span>
                <span className="font-bold"><s className="text-section-dark-foreground/40 mr-2">$50</s>$30</span>
              </div>
              <div className="flex justify-between border-b border-section-dark-foreground/10 pb-2">
                <span className="text-section-dark-foreground/70">Standard Plan</span>
                <span className="font-bold"><s className="text-section-dark-foreground/40 mr-2">$100</s>$60</span>
              </div>
              <div className="flex justify-between">
                <span className="text-section-dark-foreground/70">Premium Plan</span>
                <span className="font-bold"><s className="text-section-dark-foreground/40 mr-2">$200</s>$120</span>
              </div>
            </div>
            <p className="text-xs text-section-dark-foreground/50 pt-2">
              *First year pricing. Valid for ZITF 2025 attendees only.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ZitfBanner;