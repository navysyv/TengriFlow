import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { SmartImage } from "@/components/SmartImage";
import { useI18n } from "@/lib/i18n";
import { ArrowRight, Map, MessageCircle, Wallet, Compass, MapPin } from "lucide-react";

// Real photos of Kyrgyzstan — Tian Shan, Song-Köl yurts, Issyk-Kul, nomadic life
const heroMountains = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Ala_Archa_National_Park%2C_Kyrgyzstan_%2843285661574%29.jpg/1600px-Ala_Archa_National_Park%2C_Kyrgyzstan_%2843285661574%29.jpg";
const heroFriends = "https://images.pexels.com/photos/12530881/pexels-photo-12530881.jpeg?auto=compress&cs=tinysrgb&w=1600";
const localCulture = "https://images.pexels.com/photos/16022118/pexels-photo-16022118.jpeg?auto=compress&cs=tinysrgb&w=1000";
const pureNature = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Lake_Issyk_Kul.jpg/1000px-Lake_Issyk_Kul.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TengriFlow — Smart tourism for Kyrgyzstan" },
      { name: "description", content: "Travel Kyrgyzstan smarter. Avoid crowds, discover hidden places, support local communities through smart routes and local impact analytics." },
      { property: "og:title", content: "TengriFlow — Smart tourism for Kyrgyzstan" },
      { property: "og:description", content: "Avoid crowds. Discover hidden places. Support locals." },
    ],
  }),
  component: Home,
});

function Home() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-soft pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 py-16 md:py-24 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-border shadow-sm mb-8">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-semibold tracking-wider text-foreground/80">
                {t("home.badge")}
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight">
              {t("home.title1")}
              <br />
              <span className="text-primary">{t("home.title2")}</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl">
              {t("home.subtitle")}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <Link
                to="/map"
                className="inline-flex items-center justify-center gap-2 px-7 h-14 rounded-full bg-primary text-primary-foreground font-semibold shadow-elevated hover:bg-primary/90 transition"
              >
                {t("home.cta1")}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/chat"
                className="inline-flex items-center justify-center gap-2 px-7 h-14 rounded-full bg-background border border-border font-semibold hover:bg-muted transition"
              >
                {t("home.cta2")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* IMAGE COLLAGE */}
      <section className="container mx-auto px-4 md:px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          <div className="md:col-span-2 relative rounded-3xl overflow-hidden aspect-[16/11] md:aspect-[4/3]">
            <SmartImage
              src={heroFriends}
              alt="Hiking through the Tian Shan mountains, Kyrgyzstan"
              loading="eager"
              wrapperClassName="absolute inset-0"
              className="w-full h-full object-cover"
              width={1600}
              height={1200}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 p-6 md:p-10 text-white">
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                {t("home.ancient")}<br />{t("home.modern")}
              </h2>
              <p className="mt-3 text-white/80 max-w-md">{t("home.heroSub")}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-4 md:gap-5">
            <div className="relative rounded-3xl overflow-hidden aspect-square md:aspect-[4/3]">
              <SmartImage src={localCulture} alt="Yurts on Song-Köl plateau, Kyrgyzstan" wrapperClassName="absolute inset-0" className="w-full h-full object-cover" width={1000} height={1000} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              <span className="absolute bottom-4 left-4 text-white font-bold text-lg">{t("home.localCulture")}</span>
            </div>
            <div className="relative rounded-3xl overflow-hidden aspect-square md:aspect-[4/3]">
              <SmartImage src={pureNature} alt="Lake Issyk-Kul, Kyrgyzstan" wrapperClassName="absolute inset-0" className="w-full h-full object-cover" width={1000} height={1000} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              <span className="absolute bottom-4 left-4 text-white font-bold text-lg">{t("home.pureNature")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="container mx-auto px-4 md:px-6 pb-24">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-14">{t("home.everything")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <FeatureCard icon={<Map className="h-6 w-6" />} title={t("feat.routes.t")} desc={t("feat.routes.d")} />
          <FeatureCard icon={<MapPin className="h-6 w-6" />} title={t("feat.heat.t")} desc={t("feat.heat.d")} />
          <FeatureCard icon={<MessageCircle className="h-6 w-6" />} title={t("feat.guide.t")} desc={t("feat.guide.d")} />
          <FeatureCard icon={<Wallet className="h-6 w-6" />} title={t("feat.impact.t")} desc={t("feat.impact.d")} />
          <FeatureCard icon={<Compass className="h-6 w-6" />} title={t("feat.hidden.t")} desc={t("feat.hidden.d")} />
          <Link to="/map" className="rounded-3xl p-7 bg-gradient-primary text-primary-foreground shadow-elevated flex flex-col justify-between min-h-[200px] group hover:scale-[1.02] transition-transform">
            <Compass className="h-8 w-8" />
            <div>
              <p className="text-2xl font-bold">{t("home.cta1")}</p>
              <ArrowRight className="h-5 w-5 mt-3 group-hover:translate-x-1 transition" />
            </div>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-10">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2026 TengriFlow. Kyrgyzstan.</p>
          <p>Built with respect for local communities.</p>
        </div>
      </footer>

      {/* Hidden preload reference for hero mountains LCP fallback */}
      <link rel="preload" as="image" href={heroMountains} />
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="rounded-3xl p-7 bg-card border border-border shadow-card hover:shadow-elevated transition-shadow min-h-[200px] flex flex-col">
      <div className="h-12 w-12 rounded-2xl bg-primary-soft flex items-center justify-center text-primary mb-5">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  );
}
