import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin } from "lucide-react";

export interface MapProps {
  geojsonData?: GeoJSON.FeatureCollection;
  layerName?: string;
  zoom?: number;
  center?: [number, number];
  height?: string;
  showCoordinates?: boolean;
}

const InteractiveMap = ({
  geojsonData,
  layerName = "Data Layer",
  zoom = 6,
  center = [-19.015, 29.154], // Zimbabwe center
  height = "400px",
  showCoordinates = true,
}: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const geoJsonLayer = useRef<L.GeoJSON | null>(null);
  const [liveCoords, setLiveCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [mouseInMap, setMouseInMap] = useState(false);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map
    if (!map.current) {
      map.current = L.map(mapContainer.current).setView(center, zoom);

      // Add OSM Tile Layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(map.current);

      // Track mouse movement for live coordinates
      const mapElement = map.current.getContainer();
      mapElement.addEventListener("mousemove", (e: MouseEvent) => {
        if (!map.current) return;
        const rect = mapElement.getBoundingClientRect();
        const point = L.point(e.clientX - rect.left, e.clientY - rect.top);
        const coords = map.current.containerPointToLatLng(point);
        setLiveCoords({ lat: coords.lat, lng: coords.lng });
      });

      mapElement.addEventListener("mouseenter", () => setMouseInMap(true));
      mapElement.addEventListener("mouseleave", () => {
        setMouseInMap(false);
        setLiveCoords(null);
      });
    }

    // Add GeoJSON if provided
    if (geojsonData && map.current) {
      // Remove existing layer
      if (geoJsonLayer.current) {
        map.current.removeLayer(geoJsonLayer.current);
      }

      // Add new GeoJSON layer with immediate display
      geoJsonLayer.current = L.geoJSON(geojsonData, {
        style: {
          color: "#FF6B35",
          weight: 2,
          opacity: 0.8,
          fillOpacity: 0.3,
        },
        onEachFeature: (feature, layer) => {
          const props = feature.properties || {};
          const popupContent = `
            <div style="font-size: 11px; max-width: 200px;">
              <strong>${layerName}</strong><br/>
              ${Object.entries(props)
                .map(([key, value]) => `<small>${key}: ${value}</small>`)
                .join("<br/>")}
            </div>
          `;
          layer.bindPopup(popupContent);
          
          // Show tooltip on hover
          layer.bindTooltip(`${layerName}`, { permanent: false, sticky: true });
        },
        pointToLayer: (feature, latlng) => {
          return L.circleMarker(latlng, {
            radius: 6,
            fillColor: "#FF6B35",
            color: "#fff",
            weight: 2,
            opacity: 1,
            fillOpacity: 0.8,
          });
        },
      }).addTo(map.current);

      // Fit bounds immediately
      const bounds = geoJsonLayer.current.getBounds();
      if (bounds.isValid()) {
        map.current.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
      }
    }

    return () => {
      // Cleanup on unmount
    };
  }, [geojsonData, layerName, center, zoom]);

  return (
    <div style={{ position: "relative", width: "100%", height }}>
      <div ref={mapContainer} style={{ width: "100%", height: "100%", borderRadius: "8px" }} />

      {/* Live Coordinates Display */}
      {showCoordinates && mouseInMap && liveCoords && (
        <div
          style={{
            position: "absolute",
            bottom: "12px",
            left: "12px",
            background: "rgba(0, 0, 0, 0.8)",
            color: "#fff",
            padding: "8px 12px",
            borderRadius: "6px",
            fontSize: "11px",
            fontFamily: "monospace",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            gap: "6px",
            backdropFilter: "blur(4px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <MapPin size={14} />
          <span>
            <strong>WGS 1984</strong> | Lat: {liveCoords.lat.toFixed(6)} | Lng:{" "}
            {liveCoords.lng.toFixed(6)}
          </span>
        </div>
      )}

      {/* Layer Info Badge */}
      {geojsonData && (
        <div
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            background: "rgba(255, 107, 53, 0.9)",
            color: "#fff",
            padding: "6px 10px",
            borderRadius: "4px",
            fontSize: "11px",
            fontWeight: "bold",
            zIndex: 1000,
            backdropFilter: "blur(4px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
          }}
        >
          {geojsonData.features.length} features
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;
