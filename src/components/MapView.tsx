import { useEffect, useMemo, useRef } from "react";
import { places, type Place } from "@/lib/places";
import { CITIES } from "@/lib/cities";

interface MapViewProps {
  onSelect: (p: Place) => void;
  routeFrom: string;
  routeTo: string;
  showHidden: boolean;
}

// Heatmap zones — soft, large, continuous regions (lat, lng, radiusKm, intensity)
const HEAT_ZONES: { lat: number; lng: number; r: number; level: "high" | "mid" | "low" }[] = [
  { lat: 42.87, lng: 74.59, r: 55, level: "high" },   // Bishkek
  { lat: 42.65, lng: 77.08, r: 70, level: "high" },   // Cholpon-Ata / N shore
  { lat: 42.45, lng: 77.25, r: 90, level: "mid" },    // Issyk-Kul broad
  { lat: 42.49, lng: 78.39, r: 50, level: "mid" },    // Karakol
  { lat: 40.53, lng: 72.80, r: 60, level: "high" },   // Osh
  { lat: 40.93, lng: 73.00, r: 45, level: "mid" },    // Jalal-Abad
  { lat: 42.52, lng: 72.24, r: 50, level: "low" },    // Talas
  { lat: 41.42, lng: 75.98, r: 70, level: "low" },    // Naryn
  { lat: 41.85, lng: 75.15, r: 60, level: "low" },    // Son-Kul
];

export default function MapView({ onSelect, routeFrom, routeTo, showHidden }: MapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const layersRef = useRef<{ markers: any[]; route: any | null; heat: any | null }>({
    markers: [],
    route: null,
    heat: null,
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

      // Clean light tile layer (CartoDB Positron)
      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution: "&copy; OpenStreetMap &copy; CARTO",
        subdomains: "abcd",
        maxZoom: 19,
      }).addTo(map);

      // City labels (always visible)
      CITIES.forEach((c) => {
        const isPrimary = c.tier === "primary";
        const icon = L.divIcon({
          className: "tf-city-label",
          html: `<div class="tf-city ${isPrimary ? "tf-city-primary" : ""}"><span class="tf-city-dot"></span><span class="tf-city-name">${c.name}</span></div>`,
          iconSize: [120, 24],
          iconAnchor: [6, 12],
        });
        L.marker(c.coords, { icon, interactive: false, keyboard: false }).addTo(map);
      });

      renderHeat();
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

  // Smooth heatmap using SVG overlay with large blurred radial gradients
  const renderHeat = () => {
    const L = LRef.current;
    const map = mapRef.current;
    if (!L || !map) return;
    if (layersRef.current.heat) {
      map.removeLayer(layersRef.current.heat);
      layersRef.current.heat = null;
    }

    // Bounding box covering all heat zones with padding
    const bounds = L.latLngBounds(HEAT_ZONES.map((z) => [z.lat, z.lng] as [number, number])).pad(0.5);
    const sw = bounds.getSouthWest();
    const ne = bounds.getNorthEast();

    const W = 1000;
    const H = 700;
    const lngSpan = ne.lng - sw.lng;
    const latSpan = ne.lat - sw.lat;

    const project = (lat: number, lng: number) => {
      const x = ((lng - sw.lng) / lngSpan) * W;
      const y = (1 - (lat - sw.lat) / latSpan) * H;
      return { x, y };
    };

    // Approximate km → svg units (use 1 deg lat ≈ 111km)
    const kmToUnits = (km: number) => (km / 111) * (H / latSpan);

    const colorFor = (level: "high" | "mid" | "low") =>
      level === "high" ? "rgba(239,68,68," : level === "mid" ? "rgba(251,191,36," : "rgba(16,185,129,";

    const circles = HEAT_ZONES.map((z) => {
      const { x, y } = project(z.lat, z.lng);
      const r = kmToUnits(z.r);
      const c = colorFor(z.level);
      return `<radialGradient id="g${z.lat}${z.lng}" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="${c}0.65)"/>
        <stop offset="60%" stop-color="${c}0.25)"/>
        <stop offset="100%" stop-color="${c}0)"/>
      </radialGradient>
      <circle cx="${x}" cy="${y}" r="${r}" fill="url(#g${z.lat}${z.lng})"/>`;
    }).join("");

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" style="width:100%;height:100%;filter:blur(14px);opacity:0.85">
      <defs>${HEAT_ZONES.map(() => "").join("")}</defs>
      ${circles}
    </svg>`;

    const url = "data:image/svg+xml;utf8," + encodeURIComponent(svg);
    const overlay = L.imageOverlay(url, bounds, { opacity: 1, interactive: false, className: "tf-heat-overlay" }).addTo(map);
    layersRef.current.heat = overlay;
  };

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
    const a = CITIES.find((c) => c.id === routeFrom);
    const b = CITIES.find((c) => c.id === routeTo);
    if (!a || !b) return;

    const lat1 = a.coords[0];
    const lng1 = a.coords[1];
    const lat2 = b.coords[0];
    const lng2 = b.coords[1];
    const points: [number, number][] = [];
    const steps = 32;
    const midLat = (lat1 + lat2) / 2 + (lng2 - lng1) * 0.06;
    const midLng = (lng1 + lng2) / 2 - (lat2 - lat1) * 0.06;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const lat = (1 - t) * (1 - t) * lat1 + 2 * (1 - t) * t * midLat + t * t * lat2;
      const lng = (1 - t) * (1 - t) * lng1 + 2 * (1 - t) * t * midLng + t * t * lng2;
      points.push([lat, lng]);
    }

    const route = L.layerGroup([
      // Soft halo
      L.polyline(points, { color: "#10B981", weight: 12, opacity: 0.18, lineCap: "round" }),
      // Main line
      L.polyline(points, { color: "#10B981", weight: 4, opacity: 0.95, dashArray: "1 9", lineCap: "round" }),
      // Endpoints
      L.circleMarker(a.coords, { radius: 8, color: "#fff", weight: 3, fillColor: "#10B981", fillOpacity: 1 }),
      L.circleMarker(b.coords, { radius: 8, color: "#fff", weight: 3, fillColor: "#10B981", fillOpacity: 1 }),
    ]).addTo(map);
    layersRef.current.route = route;

    map.fitBounds(L.latLngBounds([a.coords, b.coords]).pad(0.4), { animate: true });
  };

  useEffect(() => {
    renderPlaces();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showHidden]);

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
          Optimized route between regions for better travel distribution
        </div>
      )}

      <div className="pointer-events-none absolute right-3 top-3 z-[400] rounded-full bg-background/90 px-3 py-1.5 text-xs font-semibold text-muted-foreground shadow-sm backdrop-blur">
        Kyrgyzstan
      </div>
    </div>
  );
}
