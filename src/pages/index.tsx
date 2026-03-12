import { useState } from "react";
import Navbar from "@/components/Navbar";
import FeaturesSection from "@/components/FeaturesSection";
import ZitfBanner from "@/components/ZitfBanner";
import Footer from "@/components/Footer";
import AdminControlCenter from "@/components/AdminControlCenter";
import DataVisualizationDashboard from "@/components/DataVisualizationDashboard";
import LessonsPage from "@/components/LessonsPage";
import InteractiveMap from "@/components/InteractiveMap";
import { Button } from "@/components/ui/button";
import { Map, Upload, BookOpen, ArrowRight } from "lucide-react";

const Index = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentPage, setCurrentPage] = useState<"home" | "lessons" | "visualize" | "admin">("home");
  const [showModal, setShowModal] = useState<string | null>(null);

  if (isAdmin) {
    return <AdminControlCenter onExit={() => setIsAdmin(false)} />;
  }

  if (currentPage === "lessons") {
    return <LessonsPage onBack={() => setCurrentPage("home")} />;
  }

  if (currentPage === "visualize") {
    return (
      <div className="min-h-screen bg-background">
        <div className="fixed top-0 left-0 right-0 z-40 bg-card border-b border-border/50 px-8 py-4">
          <div className="flex items-center justify-between container">
            <h1 className="text-2xl font-bold">GIS Data Visualization</h1>
            <Button variant="outline" onClick={() => setCurrentPage("home")}>
              Back to Home
            </Button>
          </div>
        </div>
        <div className="pt-20">
          <DataVisualizationDashboard />
        </div>
      </div>
    );
  }

  // Zimbabwe sample GeoJSON
  const zimbabweSample: GeoJSON.FeatureCollection = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: { name: "Harare", type: "City" },
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [30.9, -17.8],
              [31.2, -17.8],
              [31.2, -17.5],
              [30.9, -17.5],
              [30.9, -17.8],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: { name: "Main Road", type: "Highway" },
        geometry: {
          type: "LineString",
          coordinates: [
            [28.5, -18],
            [31.5, -20],
          ],
        },
      },
    ],
  };

  return (
    <div className="min-h-screen">
      <Navbar onAdminClick={() => setIsAdmin(true)} onTrialClick={() => setShowModal("trial")} />

      {/* Hero Section with Map */}
      <section className="relative pt-20 pb-12 bg-gradient-to-b from-primary/5 to-background overflow-hidden">
        <div className="container grid lg:grid-cols-2 gap-8 items-center">
          {/* Left: Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary-foreground">
              <Map className="h-4 w-4" />
              Interactive GIS Platform
            </div>

            <h1 className="text-5xl font-bold text-foreground">
              Visualize Geospatial Data on Interactive Maps
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg">
              Import Shapefiles and GeoJSON files. Visualize on OpenStreetMap with WGS 1984 coordinate system. Perfect for spatial analysis, teaching, and data exploration.
            </p>

            <div className="flex flex-wrap gap-3 pt-4">
              <Button
                size="lg"
                onClick={() => setCurrentPage("visualize")}
                className="gap-2"
              >
                <Upload className="h-5 w-5" />
                Start Visualizing
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setCurrentPage("lessons")}
                className="gap-2"
              >
                <BookOpen className="h-5 w-5" />
                Learn GIS
              </Button>
            </div>

            {/* Features List */}
            <div className="grid gap-3 pt-4">
              {[
                "Import GeoJSON & Shapefiles",
                "Interactive OSM Background",
                "WGS 1984 Coordinate System",
                "Real-time Data Visualization",
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {feature}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Map Preview */}
          <div className="bg-card border border-border rounded-xl overflow-hidden shadow-lg">
            <InteractiveMap
              geojsonData={zimbabweSample}
              layerName="Zimbabwe Sample"
              center={[-19.015, 29.154]}
              zoom={6}
              height="450px"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-background">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Powerful GIS Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "📁",
                title: "Multi-Format Support",
                desc: "Import Shapefiles, GeoJSON, and other vector formats seamlessly",
              },
              {
                icon: "🗺️",
                title: "Interactive Mapping",
                desc: "Visualize spatial data with zoom, pan, and layer controls",
              },
              {
                icon: "📐",
                title: "Coordinate Systems",
                desc: "Work with WGS 1984 and other coordinate reference systems",
              },
              {
                icon: "📊",
                title: "Spatial Analysis",
                desc: "Perform buffering, overlay, and statistical analysis",
              },
              {
                icon: "🎓",
                title: "Learning Courses",
                desc: "Interactive lessons with real GIS data and examples",
              },
              {
                icon: "🔄",
                title: "Export & Share",
                desc: "Download visualizations and share spatial analysis results",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <p className="text-4xl mb-3">{feature.icon}</p>
                <h3 className="font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/5 border-t border-border">
        <div className="container text-center space-y-6">
          <h2 className="text-3xl font-bold">Ready to Explore Geospatial Data?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Start visualizing your maps and data today using our powerful, web-based GIS platform
          </p>
          <div className="flex gap-3 justify-center">
            <Button size="lg" onClick={() => setCurrentPage("visualize")} className="gap-2">
              Open Data Visualizer <ArrowRight className="h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setCurrentPage("lessons")}
            >
              Browse Courses
            </Button>
          </div>
        </div>
      </section>

      <Footer />

      {/* Trial Signup Modal */}
      {showModal === "trial" && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-4">Start Your GIS Journey</h2>
            <p className="text-muted-foreground mb-6">
              Access unlimited data visualization and courses.
            </p>
            <div className="space-y-3 mb-6">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-2 border border-border rounded-lg bg-background"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-2 border border-border rounded-lg bg-background"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border border-border rounded-lg bg-background"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(null)}
                className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowModal(null);
                  alert("Account created! Welcome to GIS Learn ZW");
                }}
                className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;