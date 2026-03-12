import LessonCard from "@/components/LessonCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface LessonsPageProps {
  onBack: () => void;
}

const LessonsPage = ({ onBack }: LessonsPageProps) => {
  const courses = [
    {
      id: "1",
      title: "GIS Fundamentals",
      description: "Learn the basics of Geographic Information Systems and spatial data visualization",
      students: 1250,
      lessons: 8,
      geojson: {
        type: "FeatureCollection" as const,
        features: [
          {
            type: "Feature" as const,
            properties: { region: "Harare Metropolitan" },
            geometry: {
              type: "Polygon" as const,
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
        ],
      },
    },
    {
      id: "2",
      title: "Remote Sensing Basics",
      description: "Understand satellite imagery, spectral analysis, and land use classification",
      students: 890,
      lessons: 6,
      geojson: {
        type: "FeatureCollection" as const,
        features: [
          {
            type: "Feature" as const,
            properties: { area: "Agriculture Zone" },
            geometry: {
              type: "Polygon" as const,
              coordinates: [
                [
                  [28.5, -18.5],
                  [30.5, -18.5],
                  [30.5, -19.5],
                  [28.5, -19.5],
                  [28.5, -18.5],
                ],
              ],
            },
          },
        ],
      },
    },
    {
      id: "3",
      title: "Spatial Analysis",
      description: "Master buffering, overlay analysis, and spatial statistics techniques",
      students: 654,
      lessons: 7,
      geojson: {
        type: "FeatureCollection" as const,
        features: [
          {
            type: "Feature" as const,
            properties: { feature: "Road Network" },
            geometry: {
              type: "LineString" as const,
              coordinates: [
                [28.5, -18.5],
                [30.5, -19.5],
                [31.5, -20.5],
              ],
            },
          },
        ],
      },
    },
    {
      id: "4",
      title: "Map Projections & Coordinate Systems",
      description: "Explore WGS 1984, projections, and coordinate transformations",
      students: 523,
      lessons: 5,
      geojson: {
        type: "FeatureCollection" as const,
        features: [
          {
            type: "Feature" as const,
            properties: { zone: "Zimbabwe Standard Grid" },
            geometry: {
              type: "Polygon" as const,
              coordinates: [
                [
                  [25, -16],
                  [33, -16],
                  [33, -23],
                  [25, -23],
                  [25, -16],
                ],
              ],
            },
          },
        ],
      },
    },
    {
      id: "5",
      title: "Shapefile & GeoJSON Handling",
      description: "Work with vector data formats, import, export, and transform",
      students: 456,
      lessons: 4,
    },
    {
      id: "6",
      title: "Web Mapping & Interactive Visualization",
      description: "Create interactive web maps with Leaflet and OpenStreetMap",
      students: 789,
      lessons: 6,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border/50 sticky top-0 z-40">
        <div className="container py-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="mb-4 gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold">GIS Learning Courses</h1>
            <p className="text-muted-foreground mt-1">
              Master geospatial analysis with interactive maps and real-world data
            </p>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="container py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <LessonCard
              key={course.id}
              id={course.id}
              title={course.title}
              description={course.description}
              students={course.students}
              lessons={course.lessons}
              geojsonData={course.geojson}
              onEnroll={() =>
                alert(
                  `🎓 Enrolled in "${course.title}"!\n\nLaunch the lesson to start with interactive maps and spatial data.`
                )
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LessonsPage;
