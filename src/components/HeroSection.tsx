import { Button } from "@/components/ui/button";
import { MapPin, BookOpen, Users, Award, ArrowRight } from "lucide-react";
import heroMap from "@/assets/hero-map.jpg";

const HeroSection = ({ onTrialClick }: { onTrialClick: () => void }) => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroMap} alt="GIS satellite view of Zimbabwe" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--hero-overlay)/0.92)] via-[hsl(var(--hero-overlay)/0.8)] to-[hsl(var(--hero-overlay)/0.5)]" />
      </div>

      {/* Content */}
      <div className="container relative z-10 py-20">
        <div className="max-w-2xl space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary-foreground backdrop-blur-sm animate-fade-in">
            <MapPin className="h-4 w-4" />
            <span>Zimbabwe's #1 GIS Learning Platform</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight text-primary-foreground animate-fade-in-up">
            Making GIS Education{" "}
            <span className="text-accent">Accessible</span>{" "}
            for Every Student
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/75 max-w-lg animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
            Web-based GIS & Remote Sensing training for Zimbabwe's high school teachers and students. No installation. No complexity. Just learning.
          </p>

          <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <Button variant="hero" size="lg" className="text-base px-8 py-6 rounded-xl cursor-pointer" onClick={onTrialClick}>
              Start Free Trial <ArrowRight className="ml-1 h-5 w-5" />
            </Button>
            <Button variant="hero-outline" size="lg" className="text-base px-8 py-6 rounded-xl cursor-pointer" onClick={() => alert("Video demo - Coming soon!")}>
              Watch Demo
            </Button>
          </div>

          <div className="flex gap-8 pt-4 animate-fade-in-up" style={{ animationDelay: "0.45s" }}>
            {[
              { icon: BookOpen, label: "150+ Lessons" },
              { icon: Users, label: "5,000+ Students" },
              { icon: Award, label: "Certified" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-primary-foreground/60 text-sm">
                <Icon className="h-4 w-4 text-accent" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
