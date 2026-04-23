import { useMemo } from "react";
import { places, heatPoints, type Place } from "@/lib/places";

interface MapViewProps {
  onSelect: (p: Place) => void;
  routeFrom: string;
  routeTo: string;
  showHidden: boolean;
}

// Kyrgyzstan geographic bounding box (approximate)
const BOUNDS = {
  minLat: 39.0,
  maxLat: 43.5,
  minLng: 69.0,
  maxLng: 80.5,
};

const VIEW_W = 1000;
const VIEW_H = 500;

function project(lat: number, lng: number): [number, number] {
  const x = ((lng - BOUNDS.minLng) / (BOUNDS.maxLng - BOUNDS.minLng)) * VIEW_W;
  const y = ((BOUNDS.maxLat - lat) / (BOUNDS.maxLat - BOUNDS.minLat)) * VIEW_H;
  return [x, y];
}

export default function MapView({ onSelect, routeFrom, routeTo, showHidden }: MapViewProps) {
  const filteredPlaces = useMemo(
    () => (showHidden ? places.filter((p) => p.crowd === "low") : places),
    [showHidden]
  );

  const route = useMemo(() => {
    if (!routeFrom || !routeTo) return null;
    const a = places.find((p) => p.id === routeFrom);
    const b = places.find((p) => p.id === routeTo);
    if (!a || !b) return null;
    const [ax, ay] = project(a.coords[0], a.coords[1]);
    const [bx, by] = project(b.coords[0], b.coords[1]);
    const mx = (ax + bx) / 2 + (by - ay) * 0.15;
    const my = (ay + by) / 2 - (bx - ax) * 0.15;
    return { ax, ay, bx, by, mx, my, a, b };
  }, [routeFrom, routeTo]);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#E8F4EC] via-[#F0F7F2] to-[#E0EDE4]">
      {/* Subtle grid */}
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(16,185,129,0.08)" strokeWidth="1" />
          </pattern>
          <radialGradient id="heat-high" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#EF4444" stopOpacity="0.55" />
            <stop offset="60%" stopColor="#F97316" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#FBBF24" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="heat-mid" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F97316" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#FBBF24" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#FBBF24" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="heat-low" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#34D399" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#34D399" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width={VIEW_W} height={VIEW_H} fill="url(#grid)" />

        {/* Stylized country silhouette */}
        <path
          d="M 80 220 Q 150 160, 240 180 T 420 200 Q 520 170, 620 200 T 820 220 Q 900 240, 920 290 T 820 360 Q 700 380, 580 360 T 380 350 Q 260 360, 160 330 T 80 220 Z"
          fill="rgba(16,185,129,0.06)"
          stroke="rgba(16,185,129,0.25)"
          strokeWidth="1.5"
          strokeDasharray="4 6"
        />

        {/* Heatmap blobs */}
        {heatPoints.map(([lat, lng, intensity], i) => {
          const [cx, cy] = project(lat, lng);
          const r = 90 + intensity * 60;
          const fill =
            intensity >= 0.8 ? "url(#heat-high)" : intensity >= 0.5 ? "url(#heat-mid)" : "url(#heat-low)";
          return <circle key={i} cx={cx} cy={cy} r={r} fill={fill} />;
        })}

        {/* Route line */}
        {route && (
          <>
            <path
              d={`M ${route.ax} ${route.ay} Q ${route.mx} ${route.my} ${route.bx} ${route.by}`}
              fill="none"
              stroke="#10B981"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="2 10"
              opacity="0.9"
            />
            <circle cx={route.ax} cy={route.ay} r="8" fill="#10B981" stroke="white" strokeWidth="3" />
            <circle cx={route.bx} cy={route.by} r="8" fill="#10B981" stroke="white" strokeWidth="3" />
          </>
        )}

        {/* Markers */}
        {filteredPlaces.map((p) => {
          const [cx, cy] = project(p.coords[0], p.coords[1]);
          const color = p.crowd === "low" ? "#10B981" : p.crowd === "medium" ? "#FBBF24" : "#EF4444";
          return (
            <g
              key={p.id}
              className="cursor-pointer"
              onClick={() => onSelect(p)}
              style={{ transition: "transform .2s" }}
            >
              <circle cx={cx} cy={cy} r="14" fill={color} opacity="0.25" />
              <circle
                cx={cx}
                cy={cy}
                r="9"
                fill={color}
                stroke="white"
                strokeWidth="3"
                style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.25))" }}
              />
              <text
                x={cx}
                y={cy - 20}
                textAnchor="middle"
                fontSize="12"
                fontWeight="600"
                fill="#1f2937"
                style={{ pointerEvents: "none" }}
              >
                {p.name.split(" ")[0]}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="absolute bottom-3 left-3 flex flex-wrap gap-2 rounded-full bg-background/85 px-3 py-1.5 text-xs font-medium shadow-sm backdrop-blur">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> Low
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" /> Medium
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500" /> High
        </span>
      </div>

      <div className="absolute right-3 top-3 rounded-full bg-background/85 px-3 py-1.5 text-xs font-semibold text-muted-foreground shadow-sm backdrop-blur">
        Kyrgyzstan
      </div>
    </div>
  );
}
