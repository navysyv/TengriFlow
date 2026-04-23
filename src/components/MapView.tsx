import { useEffect, useRef, useState } from "react";
import type * as LeafletNS from "leaflet";
import { places, heatPoints, type Place } from "@/lib/places";

interface MapViewProps {
  onSelect: (p: Place) => void;
  routeFrom: string;
  routeTo: string;
  showHidden: boolean;
}

function MapViewInner({ onSelect, routeFrom, routeTo, showHidden }: MapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletNS.Map | null>(null);
  const LRef = useRef<typeof LeafletNS | null>(null);
  const heatRef = useRef<LeafletNS.Layer | null>(null);
  const routeRef = useRef<LeafletNS.Polyline | null>(null);
  const markersRef = useRef<LeafletNS.Marker[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const L = (await import("leaflet")).default;
      await import("leaflet.heat");
      if (cancelled || !containerRef.current || mapRef.current) return;
      LRef.current = L;

      const map = L.map(containerRef.current, {
        center: [41.7, 75.0],
        zoom: 7,
        zoomControl: true,
        attributionControl: true,
      });

      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution: "© OpenStreetMap contributors © CARTO",
        maxZoom: 19,
        subdomains: "abcd",
      }).addTo(map);

      mapRef.current = map;

      const heat = (L as unknown as { heatLayer: (pts: [number, number, number][], opts: object) => LeafletNS.Layer })
        .heatLayer(heatPoints, {
          radius: 55,
          blur: 45,
          minOpacity: 0.35,
          maxZoom: 11,
          gradient: { 0.2: "#34D399", 0.5: "#FBBF24", 0.8: "#F97316", 1.0: "#EF4444" },
        });
      heat.addTo(map);
      heatRef.current = heat;

      setReady(true);
    })();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  // Markers
  useEffect(() => {
    const map = mapRef.current;
    const L = LRef.current;
    if (!map || !L || !ready) return;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    const filtered = showHidden ? places.filter((p) => p.crowd === "low") : places;

    filtered.forEach((p) => {
      const color = p.crowd === "low" ? "#10B981" : p.crowd === "medium" ? "#FBBF24" : "#EF4444";
      const icon = L.divIcon({
        className: "tf-marker",
        html: `<div style="width:22px;height:22px;border-radius:50%;background:${color};border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,.3);"></div>`,
        iconSize: [22, 22],
        iconAnchor: [11, 11],
      });
      const marker = L.marker(p.coords, { icon }).addTo(map);
      marker.on("click", () => onSelect(p));
      markersRef.current.push(marker);
    });
  }, [onSelect, showHidden, ready]);

  // Route line
  useEffect(() => {
    const map = mapRef.current;
    const L = LRef.current;
    if (!map || !L || !ready) return;
    if (routeRef.current) {
      routeRef.current.remove();
      routeRef.current = null;
    }
    if (!routeFrom || !routeTo) return;

    const a = places.find((p) => p.id === routeFrom);
    const b = places.find((p) => p.id === routeTo);
    if (!a || !b) return;

    const mid: [number, number] = [
      (a.coords[0] + b.coords[0]) / 2 + 0.15,
      (a.coords[1] + b.coords[1]) / 2 - 0.2,
    ];
    const mid2: [number, number] = [
      (a.coords[0] + b.coords[0]) / 2 - 0.1,
      (a.coords[1] + b.coords[1]) / 2 + 0.15,
    ];

    const line = L.polyline([a.coords, mid, mid2, b.coords], {
      color: "#10B981",
      weight: 5,
      opacity: 0.85,
      dashArray: "1, 10",
      lineCap: "round",
    }).addTo(map);
    routeRef.current = line;
    map.fitBounds(line.getBounds(), { padding: [80, 80] });
  }, [routeFrom, routeTo, ready]);

  return <div ref={containerRef} className="h-full w-full rounded-2xl overflow-hidden" />;
}

export default function MapViewSafe(props: MapViewProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-full w-full rounded-2xl bg-muted animate-pulse" />;
  return <MapViewInner {...props} />;
}
