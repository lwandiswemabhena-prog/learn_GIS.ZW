import { useState } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FileUploadProps {
  onUpload: (geojson: GeoJSON.FeatureCollection, filename: string) => void;
}

const FileUpload = ({ onUpload }: FileUploadProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (!files || files.length === 0) return;

    setLoading(true);
    setError(null);

    try {
      const file = files[0];
      const filename = file.name.replace(/\.[^.]+$/, "");

      if (file.name.endsWith(".geojson") || file.name.endsWith(".json")) {
        // Handle GeoJSON
        const text = await file.text();
        const geojson = JSON.parse(text);
        onUpload(geojson, filename);
      } else if (file.name.endsWith(".zip")) {
        // Handle Shapefile (compressed as .zip)
        const shp = require("shpjs");
        const arrayBuffer = await file.arrayBuffer();
        const geojson = await shp.parseZip(arrayBuffer);
        onUpload(geojson, filename);
      } else {
        setError("Please upload a .geojson or .zip (shapefile) file");
      }
    } catch (err) {
      setError(`Error processing file: ${err instanceof Error ? err.message : "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="relative border-2 border-dashed border-primary/30 rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer group">
        <input
          type="file"
          accept=".geojson,.json,.zip"
          onChange={handleFileChange}
          disabled={loading}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
        <div className="flex flex-col items-center gap-2">
          <Upload className="h-8 w-8 text-primary group-hover:text-primary/75 transition-colors" />
          <div>
            <p className="text-sm font-semibold">Drop your GeoJSON or Shapefile</p>
            <p className="text-xs text-muted-foreground">.geojson, .json, or .zip (shapefile)</p>
          </div>
          {loading && <p className="text-xs text-accent">Processing...</p>}
        </div>
      </div>

      {error && (
        <div className="bg-destructive/10 border border-destructive/50 rounded-lg p-3 flex items-start gap-2">
          <X className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
