import { Link, useLocation } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Mountain } from "lucide-react";
import { useI18n, type Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const langs: Lang[] = ["EN", "RU", "KG"];

export function Navbar() {
  const { lang, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const loc = useLocation();

  const links = [
    { to: "/", label: t("nav.home") },
    { to: "/map", label: t("nav.map") },
    { to: "/chat", label: t("nav.chat") },
    { to: "/dashboard", label: t("nav.dashboard") },
  ] as const;

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-xl border-b border-border/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg" onClick={() => setOpen(false)}>
          <Mountain className="h-6 w-6 text-primary" strokeWidth={2.5} />
          <span className="text-primary">TengriFlow</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const active = loc.pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                  active ? "bg-primary-soft text-accent-foreground" : "text-foreground/70 hover:text-foreground hover:bg-muted",
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center bg-muted rounded-full p-1 text-xs font-medium">
            {langs.map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={cn(
                  "px-3 py-1 rounded-full transition-all",
                  lang === l ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {l}
              </button>
            ))}
          </div>
          <button
            className="md:hidden p-2 rounded-full hover:bg-muted"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container mx-auto flex flex-col px-4 py-3 gap-1">
            {links.map((l) => {
              const active = loc.pathname === l.to;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-lg text-sm font-medium",
                    active ? "bg-primary-soft text-accent-foreground" : "text-foreground/80",
                  )}
                >
                  {l.label}
                </Link>
              );
            })}
            <div className="flex items-center gap-2 pt-2 sm:hidden">
              {langs.map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={cn(
                    "flex-1 py-2 rounded-full text-xs font-medium border",
                    lang === l ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground",
                  )}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
