import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Menu, X } from "lucide-react";

const Navbar = ({ onAdminClick, onTrialClick }: { onAdminClick: () => void; onTrialClick: () => void }) => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container flex items-center justify-between h-16">
        <button onClick={onAdminClick} className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
          <MapPin className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold">GIS Learn ZW</span>
        </button>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
          <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
          <a href="#teachers" className="text-sm text-muted-foreground hover:text-foreground transition-colors">For Teachers</a>
          <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</a>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => alert("Log In functionality - Coming soon!")}>Log In</Button>
          <Button size="sm" onClick={onTrialClick}>Start Free Trial</Button>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden p-2">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-background border-b border-border p-4 space-y-3">
          <a href="#features" className="block text-sm py-2 hover:text-primary transition-colors">Features</a>
          <a href="#pricing" className="block text-sm py-2 hover:text-primary transition-colors">Pricing</a>
          <a href="#teachers" className="block text-sm py-2 hover:text-primary transition-colors">For Teachers</a>
          <a href="#contact" className="block text-sm py-2 hover:text-primary transition-colors">Contact</a>
          <div className="flex gap-3 pt-2">
            <Button variant="ghost" size="sm" className="flex-1" onClick={() => alert("Log In functionality - Coming soon!")}>Log In</Button>
            <Button size="sm" className="flex-1" onClick={onTrialClick}>Start Free Trial</Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
