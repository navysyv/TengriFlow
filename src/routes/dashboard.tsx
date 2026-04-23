import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { useI18n } from "@/lib/i18n";
import { Wallet, Users, Leaf, TrendingUp } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from "recharts";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — TengriFlow" },
      { name: "description", content: "Track your travel spending, CO₂ offset, and direct impact on local Kyrgyz communities." },
      { property: "og:title", content: "Dashboard — TengriFlow" },
      { property: "og:description", content: "Your impact dashboard: spending, CO₂, families supported." },
    ],
  }),
  component: Dashboard,
});

const walletData = [
  { m: "Jan", v: 1200 }, { m: "Feb", v: 2200 }, { m: "Mar", v: 4000 },
  { m: "Apr", v: 5500 }, { m: "May", v: 8500 },
];

const recent = [
  { i: "S", name: "Son Kul Yurt Stay", cat: { EN: "Accommodation • Direct to Family", RU: "Жильё • Напрямую семье", KG: "Жашоо • Үй-бүлөгө түз" }, amount: -4500 },
  { i: "K", name: "Karakol Artisan Scarf", cat: { EN: "Shopping • Women Co-op", RU: "Шоппинг • Женский кооп", KG: "Соода • Аялдар кооп" }, amount: -1200 },
  { i: "E", name: "Eagle Hunting Demo", cat: { EN: "Experience • Heritage Preservation", RU: "Опыт • Культурное наследие", KG: "Тажрыйба • Маданий мурас" }, amount: -2500 },
  { i: "B", name: "Bokonbaevo Cafe", cat: { EN: "Food • Local Family", RU: "Еда • Местная семья", KG: "Тамак • Жергиликтүү үй-бүлө" }, amount: -800 },
];

const visited = [
  { name: "Son Kul", v: 8 },
  { name: "Karakol", v: 5 },
  { name: "Tash Rabat", v: 3 },
  { name: "Issyk-Kul", v: 2 },
];

function Dashboard() {
  const { t, lang } = useI18n();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 md:px-6 py-8 md:py-10 max-w-6xl">
        <p className="text-primary font-bold text-sm tracking-wider">{t("dash.label")}</p>
        <h1 className="mt-2 text-4xl md:text-5xl font-bold">{t("dash.title")}</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">{t("dash.subtitle")}</p>
        <button className="mt-6 h-12 px-7 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition shadow-elevated">
          {t("dash.topup")}
        </button>

        {/* TOP STAT CARDS */}
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-3xl bg-primary text-primary-foreground p-6 shadow-card relative overflow-hidden">
            <div className="absolute top-4 right-4 h-10 w-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
              <Wallet className="h-5 w-5" />
            </div>
            <p className="text-sm opacity-90">{t("dash.total")}</p>
            <p className="mt-2 text-3xl font-bold">18,450 <span className="text-base opacity-80">KGS</span></p>
          </div>
          <Card label={t("dash.remaining")} value="6,550" suffix="KGS" />
          <Card label={t("dash.families")} value="8" icon={<Users className="h-5 w-5" />} />
          <Card label={t("dash.co2")} value="142" suffix="kg" icon={<Leaf className="h-5 w-5" />} />
        </div>

        {/* IMPACT WALLET CHART */}
        <div className="mt-6 rounded-3xl bg-card border border-border shadow-card p-6">
          <h3 className="font-bold text-lg">{t("dash.wallet")}</h3>
          <p className="text-sm text-muted-foreground mb-4">{t("dash.walletSub")}</p>
          <div className="h-72">
            <ResponsiveContainer>
              <LineChart data={walletData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="4 4" stroke="oklch(0.92 0.01 150)" vertical={false} />
                <XAxis dataKey="m" stroke="oklch(0.5 0.02 240)" fontSize={13} tickLine={false} axisLine={false} />
                <YAxis stroke="oklch(0.5 0.02 240)" fontSize={13} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.92 0.01 150)" }} />
                <Line type="monotone" dataKey="v" stroke="oklch(0.74 0.16 158)" strokeWidth={3} dot={{ fill: "oklch(0.74 0.16 158)", r: 5 }} activeDot={{ r: 7 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* SPLIT: RECENT IMPACT + ANALYTICS */}
        <div className="mt-6 grid lg:grid-cols-2 gap-6">
          <div className="rounded-3xl bg-card border border-border shadow-card p-6">
            <h3 className="font-bold text-lg">{t("dash.recent")}</h3>
            <p className="text-sm text-muted-foreground mb-5">{t("dash.recentSub")}</p>
            <div className="space-y-4">
              {recent.map((r) => (
                <div key={r.name} className="flex items-center gap-4">
                  <div className="h-11 w-11 rounded-full bg-primary-soft text-accent-foreground font-bold flex items-center justify-center flex-shrink-0">
                    {r.i}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{r.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{r.cat[lang]}</p>
                  </div>
                  <p className="font-bold text-sm whitespace-nowrap">{r.amount.toLocaleString()} KGS</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-card border border-border shadow-card p-6">
            <h3 className="font-bold text-lg flex items-center gap-2"><TrendingUp className="h-5 w-5 text-primary" />{lang === "RU" ? "Аналитика мест" : lang === "KG" ? "Жерлердин аналитикасы" : "Place analytics"}</h3>
            <p className="text-sm text-muted-foreground mb-5">{lang === "RU" ? "Самые посещаемые направления" : lang === "KG" ? "Эң көп барган жерлер" : "Most visited destinations"}</p>
            <div className="h-56">
              <ResponsiveContainer>
                <BarChart data={visited} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="4 4" stroke="oklch(0.92 0.01 150)" horizontal={false} />
                  <XAxis type="number" stroke="oklch(0.5 0.02 240)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis type="category" dataKey="name" stroke="oklch(0.5 0.02 240)" fontSize={12} tickLine={false} axisLine={false} width={80} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.92 0.01 150)" }} />
                  <Bar dataKey="v" fill="oklch(0.74 0.16 158)" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl bg-muted p-3">
                <p className="text-muted-foreground text-xs">{lang === "RU" ? "Средний расход" : lang === "KG" ? "Орточо чыгаша" : "Avg spending"}</p>
                <p className="font-bold mt-1">2,250 KGS</p>
              </div>
              <div className="rounded-2xl bg-muted p-3">
                <p className="text-muted-foreground text-xs">{lang === "RU" ? "Скрытые места" : lang === "KG" ? "Жашыруун жерлер" : "Hidden gems"}</p>
                <p className="font-bold mt-1">+3 {lang === "RU" ? "новых" : lang === "KG" ? "жаңы" : "new"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* SUPPORTED LOCAL */}
        <div className="mt-6 rounded-3xl bg-primary-soft p-6 md:p-8 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-primary/20 blur-2xl" />
          <h3 className="text-2xl md:text-3xl font-bold relative">{t("dash.supported")}</h3>
          <p className="mt-2 text-sm md:text-base text-foreground/70 max-w-md relative">{t("dash.supportedSub")}</p>
          <div className="mt-5 flex items-end gap-3 relative">
            <p className="text-5xl md:text-6xl font-bold text-primary leading-none">66%</p>
            <span className="ml-auto self-start px-3 py-1 rounded-full bg-background text-primary text-xs font-bold">{t("dash.top10")}</span>
          </div>
          <div className="mt-4 h-2 rounded-full bg-background/60 overflow-hidden relative">
            <div className="h-full rounded-full bg-primary" style={{ width: "66%" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ label, value, suffix, icon }: { label: string; value: string; suffix?: string; icon?: React.ReactNode }) {
  return (
    <div className="rounded-3xl bg-card border border-border shadow-card p-6 relative">
      {icon && (
        <div className="absolute top-4 right-4 h-10 w-10 rounded-xl bg-primary-soft text-primary flex items-center justify-center">
          {icon}
        </div>
      )}
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-2 text-3xl font-bold">
        {value} {suffix && <span className="text-base text-muted-foreground font-medium">{suffix}</span>}
      </p>
    </div>
  );
}
