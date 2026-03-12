import { Globe, Layers, Monitor, Smartphone, BarChart3, GraduationCap } from "lucide-react";

const features = [
  {
    icon: Monitor,
    title: "No Installation Required",
    description: "Runs entirely in the browser. Works on any computer—no expensive software licenses needed.",
  },
  {
    icon: Globe,
    title: "Interactive Map Tools",
    description: "Explore real geographic data with built-in mapping, spatial analysis, and remote sensing tools.",
  },
  {
    icon: GraduationCap,
    title: "Curriculum Aligned",
    description: "Content designed specifically for Zimbabwe's ZIMSEC geography syllabus and teacher training needs.",
  },
  {
    icon: Layers,
    title: "Structured Learning Paths",
    description: "From beginner to advanced—clear progression with hands-on exercises and assessments.",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly",
    description: "Optimized for low-bandwidth connections. Students can learn from any device, anywhere.",
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description: "Teachers monitor student progress with dashboards, analytics, and automated reports.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">Why Choose Us</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            GIS Learning, <span className="text-gradient">Simplified</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything teachers and students need to master Geographic Information Systems—without the complexity.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="group relative p-8 rounded-2xl border border-border bg-card hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-1"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="mb-5 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
