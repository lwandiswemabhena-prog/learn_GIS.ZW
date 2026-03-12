import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileUp, Map, Download, Trash2, Info } from "lucide-react";
import InteractiveMap from "./InteractiveMap";
import FileUpload from "./FileUpload";

interface UploadedLayer {
  id: string;
  name: string;
  geojson: GeoJSON.FeatureCollection;
  uploadTime: string;
}

const DataVisualizationDashboard = () => {
  const [layers, setLayers] = useState<UploadedLayer[]>([
    {
      id: "1",
      name: "Zimbabwe Districts",
      uploadTime: new Date().toLocaleString(),
      geojson: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: { name: "Harare", district: "Harare", population: "1.5M" },
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
            properties: { name: "Bulawayo", district: "Bulawayo", population: "0.6M" },
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [28.6, -20.2],
                  [29.0, -20.2],
                  [29.0, -19.8],
                  [28.6, -19.8],
                  [28.6, -20.2],
                ],
              ],
            },
          },
        ],
      },
    },
    {
      id: "2",
      name: "Road Network Sample",
      uploadTime: new Date().toLocaleString(),
      geojson: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: { road_name: "Main Highway", road_class: "A", length: "450km" },
            geometry: {
              type: "LineString",
              coordinates: [
                [28.5, -18.5],
                [30.5, -19.5],
                [31.5, -20.5],
              ],
            },
          },
          {
            type: "Feature",
            properties: { road_name: "Secondary Road", road_class: "B", length: "250km" },
            geometry: {
              type: "LineString",
              coordinates: [
                [30.0, -18.0],
                [31.0, -19.0],
              ],
            },
          },
        ],
      },
    },
  ]);

  const [selectedLayer, setSelectedLayer] = useState<UploadedLayer | null>(layers[0]);
  const [showUpload, setShowUpload] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<any>(null);

  const handleUpload = (geojson: GeoJSON.FeatureCollection, filename: string) => {
    const newLayer: UploadedLayer = {
      id: Date.now().toString(),
      name: filename,
      geojson,
      uploadTime: new Date().toLocaleString(),
    };
    setLayers([...layers, newLayer]);
    setSelectedLayer(newLayer);
    setShowUpload(false);
    alert(`✅ "${filename}" loaded! Displaying ${geojson.features.length} features on map.`);
  };

  const deleteLayer = (id: string) => {
    const updatedLayers = layers.filter((l) => l.id !== id);
    setLayers(updatedLayers);
    if (selectedLayer?.id === id) {
      setSelectedLayer(updatedLayers[0] || null);
    }
  };

  const downloadGeoJSON = () => {
    if (!selectedLayer) return;
    const dataStr = JSON.stringify(selectedLayer.geojson, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${selectedLayer.name}.geojson`;
    link.click();
  };

  const getBounds = (geojson: GeoJSON.FeatureCollection) => {
    let minLat = 90,
      maxLat = -90,
      minLng = 180,
      maxLng = -180;

    geojson.features.forEach((feature: any) => {
      const coords = feature.geometry.coordinates;
      if (feature.geometry.type === "Point") {
        minLat = Math.min(minLat, coords[1]);
        maxLat = Math.max(maxLat, coords[1]);
        minLng = Math.min(minLng, coords[0]);
        maxLng = Math.max(maxLng, coords[0]);
      } else if (feature.geometry.type === "LineString") {
        coords.forEach((c: any) => {
          minLat = Math.min(minLat, c[1]);
          maxLat = Math.max(maxLat, c[1]);
          minLng = Math.min(minLng, c[0]);
          maxLng = Math.max(maxLng, c[0]);
        });
      } else if (feature.geometry.type === "Polygon") {
        coords[0].forEach((c: any) => {
          minLat = Math.min(minLat, c[1]);
          maxLat = Math.max(maxLat, c[1]);
          minLng = Math.min(minLng, c[0]);
          maxLng = Math.max(maxLng, c[0]);
        });
      }
    });

    return { minLat, maxLat, minLng, maxLng };
  };

  const bounds = selectedLayer ? getBounds(selectedLayer.geojson) : null;

  return (
    <div className="min-h-screen bg-background/50">
      <div className="container py-12">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Map className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">GIS Data Visualization</h1>
          </div>
          <p className="text-muted-foreground">
            Import and visualize GeoJSON and Shapefiles on OpenStreetMap with WGS 1984 coordinates. 
            Hover over the map to see live coordinates.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Upload Section */}
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <div className="flex items-center gap-2">
                <FileUp className="h-5 w-5 text-primary" />
                <h3 className="font-bold">Import Layers</h3>
              </div>

              {showUpload ? (
                <div className="space-y-3">
                  <FileUpload onUpload={handleUpload} />
                  <Button size="sm" variant="outline" className="w-full" onClick={() => setShowUpload(false)}>
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button size="sm" className="w-full" onClick={() => setShowUpload(true)}>
                  + Add New Layer
                </Button>
              )}
            </div>

            {/* Layers List */}
            <div className="bg-card border border-border rounded-lg p-6 space-y-3 max-h-80 overflow-y-auto">
              <h3 className="font-bold text-sm">Loaded Layers ({layers.length})</h3>
              <div className="space-y-2">
                {layers.map((layer) => (
                  <div
                    key={layer.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedLayer?.id === layer.id
                        ? "bg-primary/10 border-primary shadow-md"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedLayer(layer)}
                  >
                    <p className="text-sm font-semibold truncate">{layer.name}</p>
                    <p className="text-xs text-muted-foreground">{layer.geojson.features.length} features</p>
                    <p className="text-xs text-muted-foreground mt-1">{layer.uploadTime}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            {selectedLayer && (
              <div className="bg-card border border-border rounded-lg p-6 space-y-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full gap-2"
                  onClick={downloadGeoJSON}
                >
                  <Download className="h-4 w-4" />
                  Download
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  className="w-full gap-2"
                  onClick={() => deleteLayer(selectedLayer.id)}
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </div>
            )}
          </div>

          {/* Map Area */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              {selectedLayer ? (
                <InteractiveMap
                  geojsonData={selectedLayer.geojson}
                  layerName={selectedLayer.name}
                  center={[-19.015, 29.154]}
                  zoom={6}
                  height="600px"
                  showCoordinates={true}
                />
              ) : (
                <div className="h-96 flex items-center justify-center text-muted-foreground">
                  No layer selected. Upload or select a layer to visualize.
                </div>
              )}
            </div>

            {/* Info Panel */}
            {selectedLayer && (
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Info className="h-5 w-5 text-primary" />
                  <h3 className="font-bold text-lg">{selectedLayer.name}</h3>
                </div>

                {/* Summary Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  <div className="bg-background rounded p-3">
                    <p className="text-muted-foreground text-xs">Features</p>
                    <p className="text-xl font-bold text-primary">{selectedLayer.geojson.features.length}</p>
                  </div>
                  <div className="bg-background rounded p-3">
                    <p className="text-muted-foreground text-xs">Coordinate System</p>
                    <p className="text-sm font-semibold">WGS 1984</p>
                  </div>
                  <div className="bg-background rounded p-3">
                    <p className="text-muted-foreground text-xs">Format</p>
                    <p className="text-sm font-semibold">GeoJSON</p>
                  </div>
                  <div className="bg-background rounded p-3">
                    <p className="text-muted-foreground text-xs">Uploaded</p>
                    <p className="text-xs font-semibold">{selectedLayer.uploadTime}</p>
                  </div>
                </div>

                {/* Bounds */}
                {bounds && (
                  <div className="bg-background rounded p-4 space-y-2">
                    <p className="text-sm font-semibold mb-2">Geographic Bounds (WGS 1984)</p>
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                      <div>
                        <span className="text-muted-foreground">Min Lat:</span>
                        <p className="text-primary">{bounds.minLat.toFixed(6)}°</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Max Lat:</span>
                        <p className="text-primary">{bounds.maxLat.toFixed(6)}°</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Min Lng:</span>
                        <p className="text-primary">{bounds.minLng.toFixed(6)}°</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Max Lng:</span>
                        <p className="text-primary">{bounds.maxLng.toFixed(6)}°</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Features List */}
                <div className="bg-background rounded p-4">
                  <p className="text-sm font-semibold mb-2">Features</p>
                  <div className="max-h-48 overflow-y-auto space-y-1">
                    {selectedLayer.geojson.features.map((feature: any, idx: number) => (
                      <div
                        key={idx}
                        className="text-xs p-2 bg-card border border-border rounded cursor-pointer hover:border-primary transition-colors"
                        onClick={() => setSelectedFeature(feature)}
                      >
                        <p className="font-semibold truncate">
                          {feature.properties?.name || feature.properties?.title || `Feature ${idx + 1}`}
                        </p>
                        <p className="text-muted-foreground text-xs">{feature.geometry.type}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataVisualizationDashboard;
