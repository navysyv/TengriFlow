import { useEffect, useMemo, useRef } from "react";
import { places, type Place } from "@/lib/places";

interface MapViewProps {
  onSelect: (p: Place) => void;
  routeFrom: string;
  routeTo: string;
  showHidden: boolean;
}

// Major Kyrgyz cities for labels
const CITIES: { name: string; coords: [number, number] }[] = [
  { name: "Bishkek", coords: [42.8746, 74.5698] },
  { name: "Osh", coords: [40.5283, 72.7985] },
  { name: "Karakol", coords: [42.4907, 78.3936] },
  { name: "Naryn", coords: [41.4287, 75.9911] },
  { name: "Talas", coords: [42.5228, 72.2425] },
  { name: "Jalal-Abad", coords: [40.9333, 73.0] },
  { name: "Cholpon-Ata", coords: [42.6489, 77.0814] },
  { name: "Issyk-Kul", coords: [42.45, 77.25] },
];

export default function MapView({ onSelect, routeFrom, routeTo, showHidden }: MapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const layersRef = useRef<{ markers: any[]; route: any | null; heat: any[] }>({
    markers: [],
    route: null,
    heat: [],
  });
  const LRef = useRef<any>(null);

  const filteredPlaces = useMemo(
    () => (showHidden ? places.filter((p) => p.crowd === "low") : places),
    [showHidden]
  );

  // Init map (client-only)
  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;
    let cancelled = false;

    (async () => {
      const L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css");
      if (cancelled || !containerRef.current) return;
      LRef.current = L;

      const map = L.map(containerRef.current, {
        center: [41.6, 74.8],
        zoom: 7,
        minZoom: 6,
        maxZoom: 12,
        zoomControl: true,
        attributionControl: true,
        scrollWheelZoom: false,
      });
      mapRef.current = map;

      // Clean light tile layer (CartoDB Positron) — readable, modern look
      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; OpenStreetMap &copy; CARTO',
        subdomains: "abcd",
        maxZoom: 19,
      }).addTo(map);

      // City labels (always visible)
      CITIES.forEach((c) => {
        const icon = L.divIcon({
          className: "tf-city-label",
          html: `<div class="tf-city"><span class="tf-city-dot"></span><span class="tf-city-name">${c.name}</span></div>`,
          iconSize: [120, 24],
          iconAnchor: [6, 12],
        });
        L.marker(c.coords, { icon, interactive: false, keyboard: false }).addTo(map);
      });

      renderPlaces();
      renderRoute();
    })();

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderPlaces = () => {
    const L = LRef.current;
    const map = mapRef.current;
    if (!L || !map) return;
    layersRef.current.markers.forEach((m) => map.removeLayer(m));
    layersRef.current.markers = [];

    filteredPlaces.forEach((p) => {
      const color = p.crowd === "low" ? "#10B981" : p.crowd === "medium" ? "#FBBF24" : "#EF4444";
      const icon = L.divIcon({
        className: "tf-place-marker",
        html: `<div class="tf-pin" style="--pin:${color}"><span></span></div>`,
        iconSize: [22, 22],
        iconAnchor: [11, 11],
      });
      const marker = L.marker(p.coords, { icon }).addTo(map);
      marker.on("click", () => onSelect(p));
      marker.bindTooltip(p.name, { direction: "top", offset: [0, -10], className: "tf-tooltip" });
      layersRef.current.markers.push(marker);
    });
  };

  const renderRoute = () => {
    const L = LRef.current;
    const map = mapRef.current;
    if (!L || !map) return;
    if (layersRef.current.route) {
      map.removeLayer(layersRef.current.route);
      layersRef.current.route = null;
    }
    if (!routeFrom || !routeTo) return;
    const a = places.find((p) => p.id === routeFrom);
    const b = places.find((p) => p.id === routeTo);
    if (!a || !b) return;

    // Build a slightly curved polyline between A and B (simulated road)
    const lat1 = a.coords[0];
    const lng1 = a.coords[1];
    const lat2 = b.coords[0];
    const lng2 = b.coords[1];
    const points: [number, number][] = [];
    const steps = 24;
    const midLat = (lat1 + lat2) / 2 + (lng2 - lng1) * 0.08;
    const midLng = (lng1 + lng2) / 2 - (lat2 - lat1) * 0.08;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      // Quadratic bezier
      const lat = (1 - t) * (1 - t) * lat1 + 2 * (1 - t) * t * midLat + t * t * lat2;
      const lng = (1 - t) * (1 - t) * lng1 + 2 * (1 - t) * t * midLng + t * t * lng2;
      points.push([lat, lng]);
    }

    const route = L.layerGroup([
      L.polyline(points, {
        color: "#10B981",
        weight: 5,
        opacity: 0.9,
        dashArray: "1 10",
        lineCap: "round",
      }),
      L.circleMarker(a.coords, { radius: 7, color: "#fff", weight: 3, fillColor: "#10B981", fillOpacity: 1 }),
      L.circleMarker(b.coords, { radius: 7, color: "#fff", weight: 3, fillColor: "#10B981", fillOpacity: 1 }),
    ]).addTo(map);
    layersRef.current.route = route;

    map.fitBounds(L.latLngBounds([a.coords, b.coords]).pad(0.4), { animate: true });
  };

  // Re-render markers when filter changes
  useEffect(() => {
    renderPlaces();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showHidden]);

  // Re-render route when selection changes
  useEffect(() => {
    renderRoute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeFrom, routeTo]);

  return (
    <div className="relative h-full w-full">
      <div ref={containerRef} className="h-full w-full rounded-2xl" />

      {/* Legend */}
      <div className="pointer-events-none absolute bottom-3 left-3 z-[400] flex flex-wrap gap-2 rounded-full bg-background/90 px-3 py-1.5 text-xs font-medium shadow-sm backdrop-blur">
        <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> Low</span>
        <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-amber-400" /> Medium</span>
        <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-red-500" /> High</span>
      </div>

      {(routeFrom && routeTo) && (
        <div className="pointer-events-none absolute top-3 left-1/2 -translate-x-1/2 z-[400] rounded-full bg-background/90 px-3 py-1.5 text-xs font-medium shadow-sm backdrop-blur">
          Optimized route based on accessibility and crowd distribution
        </div>
      )}

      <div className="pointer-events-none absolute right-3 top-3 z-[400] rounded-full bg-background/90 px-3 py-1.5 text-xs font-semibold text-muted-foreground shadow-sm backdrop-blur">
        Kyrgyzstan
      </div>
    </div>
  );
}
