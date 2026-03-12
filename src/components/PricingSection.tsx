import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Basic",
    price: "$50",
    period: "/year",
    description: "Perfect for getting started",
    features: [
      "Up to 100 students",
      "5 teacher accounts",
      "All beginner courses",
      "Basic support",
      "Student progress tracking",
    ],
    highlighted: false,
  },
  {
    name: "Standard",
    price: "$100",
    period: "/year",
    description: "Most popular for schools",
    features: [
      "Up to 300 students",
      "10 teacher accounts",
      "All courses (beginner to advanced)",
      "Priority support",
      "Course creation tools",
      "Analytics dashboard",
    ],
    highlighted: true,
  },
  {
    name: "Premium",
    price: "$200",
    period: "/year",
    description: "For large institutions",
    features: [
      "Unlimited students",
      "Unlimited teachers",
      "Custom course development",
      "Dedicated support",
      "School branding",
      "API access",
    ],
    highlighted: false,
  },
];

const PricingSection = () => {
  return (
    <section className="py-24 bg-secondary/30" id="pricing">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">Pricing</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Affordable Plans for Every School
          </h2>
          <p className="text-muted-foreground text-lg">
            Designed for Zimbabwean schools. Flexible payment via mobile money, bank transfer, or card.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 flex flex-col transition-all duration-300 hover:-translate-y-1 ${
                plan.highlighted
                  ? "bg-primary text-primary-foreground shadow-2xl shadow-primary/20 scale-[1.03]"
                  : "bg-card border border-border shadow-lg"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-xs font-bold px-4 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <h3 className="text-xl font-bold">{plan.name}</h3>
              <p className={`text-sm mt-1 ${plan.highlighted ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                {plan.description}
              </p>
              <div className="mt-6 mb-8">
                <span className="text-5xl font-extrabold">{plan.price}</span>
                <span className={`text-sm ${plan.highlighted ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                  {plan.period}
                </span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check className={`h-5 w-5 shrink-0 ${plan.highlighted ? "text-accent" : "text-primary"}`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant={plan.highlighted ? "hero" : "default"}
                size="lg"
                className="w-full rounded-xl cursor-pointer"
                onClick={() => alert(`${plan.name} plan selected! Proceeding to checkout...`)}
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>

        <p className="text-center text-muted-foreground mt-10 text-sm">
          District licenses available from <strong>$500/year</strong>. Contact us for volume pricing.
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
