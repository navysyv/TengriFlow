import { Link, useLocation } from "@tanstack/react-router";
import { Mountain } from "lucide-react";
import { useI18n, type Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const langs: Lang[] = ["EN", "RU", "KG"];

export function Navbar() {
  const { lang, setLang, t } = useI18n();
  const loc = useLocation();

  const links = [
    { to: "/", label: t("nav.home") },
    { to: "/map", label: t("nav.map") },
    { to: "/chat", label: t("nav.chat") },
    { to: "/dashboard", label: t("nav.dashboard") },
  ] as const;

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-xl border-b border-border/60">
      <div className="container mx-auto flex h-16 items-center justify-between gap-2 px-3 sm:px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2 font-bold text-base sm:text-lg flex-shrink-0">
          <Mountain className="h-5 w-5 sm:h-6 sm:w-6 text-primary" strokeWidth={2.5} />
          <span className="text-primary">TengriFlow</span>
        </Link>

        {/* Always-visible nav (desktop + mobile) */}
        <nav className="flex items-center gap-0.5 sm:gap-1 overflow-x-auto">
          {links.map((l) => {
            const active = loc.pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={cn(
                  "px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors whitespace-nowrap",
                  active
                    ? "bg-primary-soft text-accent-foreground"
                    : "text-foreground/70 hover:text-foreground hover:bg-muted",
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center bg-muted rounded-full p-0.5 sm:p-1 text-[10px] sm:text-xs font-medium flex-shrink-0">
          {langs.map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={cn(
                "px-2 sm:px-3 py-0.5 sm:py-1 rounded-full transition-all",
                lang === l
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
