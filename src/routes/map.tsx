import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { useI18n } from "@/lib/i18n";
import { places, type Place } from "@/lib/places";
import { BookingModal } from "@/components/BookingModal";
import { Compass, Navigation, Circle, ChevronDown } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const MapView = lazy(() => import("@/components/MapView"));

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "Map — TengriFlow" },
      { name: "description", content: "Interactive heatmap of Kyrgyzstan. Plan smart routes that avoid crowds." },
      { property: "og:title", content: "Map — TengriFlow" },
      { property: "og:description", content: "Interactive heatmap and smart routes for Kyrgyzstan." },
    ],
  }),
  component: MapPage,
});

function MapPage() {
  const { t, lang } = useI18n();
  const [selected, setSelected] = useState<Place | null>(null);
  const [bookOpen, setBookOpen] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [hidden, setHidden] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* MAP CONTAINER — always visible, stable */}
        <div className="rounded-3xl overflow-hidden border border-border shadow-card h-[55vh] md:h-[60vh] bg-muted">
          <Suspense fallback={<div className="h-full w-full bg-muted animate-pulse" />}>
            <MapView
              onSelect={setSelected}
              routeFrom={from}
              routeTo={to}
              showHidden={hidden}
            />
          </Suspense>
        </div>

        {/* INTRO */}
        <div className="mt-8 max-w-2xl">
          <div className="flex items-center gap-2 text-primary font-semibold text-sm">
            <Compass className="h-4 w-4" />
            {t("map.badge")}
          </div>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold">{t("map.title")}</h1>
          <p className="mt-3 text-muted-foreground">{t("map.subtitle")}</p>

          <div className="mt-6 rounded-2xl border border-border bg-card shadow-card p-4 grid grid-cols-3 divide-x divide-border">
            <Stat label={t("map.support")} value="84%" />
            <Stat label={t("map.co2")} value="2.4t" />
            <Stat label={t("map.artisans")} value="12.5k" />
          </div>
        </div>

        {/* SMART ROUTE PLANNER */}
        <div className="mt-8 grid lg:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-border bg-card shadow-card p-6">
            <div className="flex items-center gap-2 mb-4 text-sm font-semibold">
              <Navigation className="h-4 w-4 text-primary" />
              {lang === "RU" ? "Умный планировщик маршрутов" : lang === "KG" ? "Акылдуу маршрут пландоочу" : "Smart route planner"}
            </div>
            <div className="relative space-y-3">
              <div className="absolute left-3 top-6 bottom-6 border-l-2 border-dashed border-border" />
              <RouteSelect
                ring="ring-2 ring-primary"
                dot={<Circle className="h-3 w-3 fill-background text-primary" strokeWidth={3} />}
                label={t("map.from")}
                value={from}
                onChange={setFrom}
              />
              <RouteSelect
                ring=""
                dot={<div className="h-3 w-3 rounded-full bg-primary" />}
                label={t("map.to")}
                value={to}
                onChange={setTo}
              />
            </div>
            <button
              disabled={!from || !to}
              onClick={() => { /* triggered by state already */ }}
              className="mt-5 w-full h-12 rounded-full bg-primary text-primary-foreground font-semibold disabled:opacity-50 disabled:bg-primary/50 hover:bg-primary/90 transition"
            >
              {t("map.build")}
            </button>
          </div>

          <div className="rounded-3xl border border-border bg-primary-soft p-6 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg text-accent-foreground">{t("map.hidden")}</h3>
              <p className="text-sm text-accent-foreground/80 mt-1 max-w-xs">{t("map.hiddenSub")}</p>
            </div>
            <Switch checked={hidden} onCheckedChange={setHidden} />
          </div>
        </div>

        {/* RECOMMENDATIONS */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-5">{t("map.recommends")}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {places.map((p) => (
              <div key={p.id} className="rounded-3xl bg-card border border-border shadow-card overflow-hidden flex flex-col">
                <div className="relative aspect-[5/3] bg-muted">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
                  {p.crowd === "low" && (
                    <span className="absolute top-3 right-3 bg-foreground/80 text-background text-xs font-semibold px-3 py-1 rounded-full">
                      {t("map.lowCrowd")}
                    </span>
                  )}
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-bold text-lg">{p.name}</h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed flex-1">
                    {p.description[lang]}
                  </p>
                  <button
                    onClick={() => { setSelected(p); setBookOpen(true); }}
                    className="mt-4 h-11 rounded-full border border-border font-semibold text-sm hover:bg-muted transition"
                  >
                    {t("map.book")}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SELECTED PLACE QUICK CARD */}
      {selected && !bookOpen && (
        <div
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:w-96 rounded-3xl bg-card shadow-elevated border border-border overflow-hidden animate-in slide-in-from-bottom z-40"
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={() => setSelected(null)} className="absolute top-3 right-3 z-10 h-8 w-8 rounded-full bg-background/90 flex items-center justify-center text-lg">×</button>
          <img src={selected.image} alt={selected.name} className="w-full aspect-[16/9] object-cover" />
          <div className="p-5">
            <h3 className="font-bold text-lg">{selected.name}</h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{selected.description[lang]}</p>
            <button
              onClick={() => setBookOpen(true)}
              className="mt-4 w-full h-11 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition"
            >
              {t("map.bookNow")}
            </button>
          </div>
        </div>
      )}

      <BookingModal open={bookOpen} onOpenChange={setBookOpen} placeName={selected?.name ?? ""} />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center px-2">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-xl font-bold text-primary mt-1">{value}</p>
    </div>
  );
}

function RouteSelect({ ring, dot, label, value, onChange }: { ring: string; dot: React.ReactNode; label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-3 relative">
      <div className={`h-6 w-6 rounded-full bg-background border-2 border-primary flex items-center justify-center z-10 ${ring}`}>{dot}</div>
      <div className="flex-1 relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-12 pl-4 pr-10 rounded-full border border-border bg-background text-sm appearance-none cursor-pointer hover:border-primary/50 transition"
        >
          <option value="">{label}</option>
          {places.map((p) => (<option key={p.id} value={p.id}>{p.name}</option>))}
        </select>
        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
      </div>
    </div>
  );
}
