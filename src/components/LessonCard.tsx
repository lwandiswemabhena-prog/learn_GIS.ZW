import InteractiveMap from "./InteractiveMap";
import { BookOpen, Map, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LessonCardProps {
  id: string;
  title: string;
  description: string;
  geojsonData?: GeoJSON.FeatureCollection;
  students: number;
  lessons: number;
  onEnroll?: () => void;
}

const LessonCard = ({
  id,
  title,
  description,
  geojsonData,
  students,
  lessons,
  onEnroll,
}: LessonCardProps) => {
  // Sample GeoJSON if none provided (Zimbabwe boundaries)
  const defaultGeojson: GeoJSON.FeatureCollection = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: { name: "Sample Region" },
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [28, -18],
              [32, -18],
              [32, -22],
              [28, -22],
              [28, -18],
            ],
          ],
        },
      },
    ],
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
      {/* Map Preview */}
      <div className="h-64 bg-secondary/30">
        <InteractiveMap
          geojsonData={geojsonData || defaultGeojson}
          layerName={title}
          center={[-19.015, 29.154]}
          zoom={5}
          height="100%"
          showCoordinates={true}
        />
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>

        {/* Stats */}
        <div className="flex gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4 text-primary" />
            <span>{lessons} lessons</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4 text-primary" />
            <span>{students} students</span>
          </div>
          <div className="flex items-center gap-1">
            <Map className="h-4 w-4 text-primary" />
            <span>Interactive</span>
          </div>
        </div>

        {/* Buttons */}
        <Button
          size="sm"
          onClick={onEnroll}
          className="w-full"
        >
          Start Lesson
        </Button>
      </div>
    </div>
  );
};

export default LessonCard;
