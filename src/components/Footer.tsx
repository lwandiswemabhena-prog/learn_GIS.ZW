import { MapPin, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="section-dark py-16">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-section-dark-foreground">GIS Learn ZW</span>
            </div>
            <p className="text-section-dark-foreground/60 max-w-sm leading-relaxed">
              Making geographic literacy a reality for every student in Zimbabwe. Web-based GIS & Remote Sensing education, built for African schools.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="text-section-dark-foreground/40 hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </a>
              <a href="#" className="text-section-dark-foreground/40 hover:text-primary transition-colors">
                <Phone className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-section-dark-foreground mb-4">Platform</h4>
            <ul className="space-y-3 text-sm text-section-dark-foreground/50">
              <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-primary transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">For Teachers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">For Schools</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-section-dark-foreground mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-section-dark-foreground/50">
              <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Partnerships</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-section-dark-foreground/10 mt-12 pt-8 text-center text-sm text-section-dark-foreground/40">
          <p>© {new Date().getFullYear()} GIS Learn ZW. All rights reserved. Transforming GIS education in Zimbabwe.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
