import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Tengri } from "@/components/Tengri";
import { useI18n, type Lang } from "@/lib/i18n";
import { Send, Coffee, Map as MapIcon, Tent, Leaf } from "lucide-react";
import { places } from "@/lib/places";
import { SmartImage } from "@/components/SmartImage";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "Chat with Tengri — TengriFlow" },
      { name: "description", content: "Chat with Tengri, your smart local guide for Kyrgyzstan." },
      { property: "og:title", content: "Chat with Tengri — TengriFlow" },
      { property: "og:description", content: "Personal recommendations from your AI local guide." },
    ],
  }),
  component: ChatPage,
});

interface Msg {
  id: string;
  role: "tengri" | "user";
  text: string;
  images?: string[];
}

function buildResponse(input: string, lang: Lang): { text: string; images?: string[] } {
  const lower = input.toLowerCase();
  const recommend = (ids: string[]) => places.filter((p) => ids.includes(p.id));

  if (/yurt|юрт|боз|son|сон/i.test(lower)) {
    const items = recommend(["sonkul", "tashrabat"]);
    const text = lang === "RU"
      ? "Тихие юрточные лагеря с минимальным числом туристов:"
      : lang === "KG"
      ? "Аз туристтери бар тынч боз үй лагерлери:"
      : "Quiet yurt camps with minimal crowds:";
    return { text, images: items.map((p) => p.image).slice(0, 2) };
  }
  if (/food|еда|тамак|cafe|кафе/i.test(lower)) {
    return {
      text: lang === "RU"
        ? "Попробуй бешбармак в Бокомбаево — семейное кафе, всё прямо с фермы."
        : lang === "KG"
        ? "Бокомбайдан беш бармакты татып көр — үй-бүлөлүк кафе."
        : "Try beshbarmak in Bokonbayevo — family café, everything farm-to-table.",
    };
  }
  if (/crowd|загруж|жүктөл|map|карт/i.test(lower)) {
    return {
      text: lang === "RU"
        ? "Сейчас Иссык-Куль перегружен. Тенгри советует Тaш-Рабат — там почти никого."
        : lang === "KG"
        ? "Азыр Ысык-Көл толгон. Тенгри Таш-Рабатты сунуштайт — ал жакта эч ким жок."
        : "Issyk-Kul is crowded today. Tengri suggests Tash Rabat — almost empty.",
      images: [places.find((p) => p.id === "tashrabat")!.image],
    };
  }
  if (/eco|эко|impact/i.test(lower)) {
    return {
      text: lang === "RU"
        ? "Твой эко-вклад: 142 кг CO₂, 8 семей поддержано, 66% расходов местным."
        : lang === "KG"
        ? "Сиздин эко-салым: 142 кг CO₂, 8 үй-бүлө, 66% жергиликтүүлөргө."
        : "Your eco impact: 142kg CO₂ offset, 8 families supported, 66% spent locally.",
    };
  }
  return {
    text: lang === "RU"
      ? "Расскажи, что ты ищешь — тихие места, еду, маршрут или что-то особенное?"
      : lang === "KG"
      ? "Эмне издеп жатканыңды айт — тынч жерди, тамакты же башка нерсени?"
      : "Tell me what you're looking for — quiet places, food, a route, or something special?",
  };
}

const STORAGE_KEY = "tf_chat_history";

function ChatPage() {
  const { t, lang } = useI18n();
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try { setMsgs(JSON.parse(stored)); return; } catch { /* ignore */ }
    }
    // Initial greetings
    setMsgs([
      { id: "g1", role: "tengri", text: t("chat.greet1") },
      { id: "g2", role: "tengri", text: t("chat.greet2") },
    ]);
    // We intentionally only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (msgs.length) localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs));
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Msg = { id: crypto.randomUUID(), role: "user", text };
    setMsgs((m) => [...m, userMsg]);
    setInput("");
    setTimeout(() => {
      const reply = buildResponse(text, lang);
      const tengriMsg: Msg = { id: crypto.randomUUID(), role: "tengri", text: reply.text, images: reply.images };
      setMsgs((m) => [...m, tengriMsg]);
    }, 700);
  };

  const suggestions = [
    { icon: <Coffee className="h-4 w-4" />, text: t("chat.s1") },
    { icon: <MapIcon className="h-4 w-4" />, text: t("chat.s2") },
    { icon: <Tent className="h-4 w-4" />, text: t("chat.s3") },
    { icon: <Leaf className="h-4 w-4" />, text: t("chat.s4") },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 md:px-6 py-6 md:py-10 max-w-2xl">
        {/* Header card */}
        <div className="rounded-3xl bg-card border border-border shadow-card p-5 flex items-center gap-4">
          <div className="rounded-full bg-primary-soft p-1 flex-shrink-0">
            <Tengri size={56} />
          </div>
          <div>
            <h2 className="font-bold text-lg">{t("chat.title")}</h2>
            <p className="text-sm text-primary font-medium flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-primary inline-block" />
              {t("chat.role")}
            </p>
          </div>
        </div>

        {/* Messages panel */}
        <div className="mt-4 rounded-3xl bg-card border border-border shadow-card flex flex-col h-[55vh] overflow-hidden">
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4">
            {msgs.map((m) => (
              <div key={m.id} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                {m.role === "tengri" && (
                  <div className="h-10 w-10 rounded-full bg-primary-soft flex-shrink-0 flex items-center justify-center overflow-hidden">
                    <Tengri size={36} />
                  </div>
                )}
                <div className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${m.role === "user" ? "bg-primary text-primary-foreground rounded-tr-sm" : "bg-muted text-foreground rounded-tl-sm"}`}>
                  <p>{m.text}</p>
                  {m.images && (
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {m.images.map((src, i) => (
                        <SmartImage key={i} src={src} alt="suggestion" wrapperClassName="rounded-lg aspect-[4/3]" className="w-full h-full object-cover" />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Suggestions */}
          <div className="px-5 pt-2 pb-3 flex gap-2 overflow-x-auto border-t border-border">
            {suggestions.map((s) => (
              <button
                key={s.text}
                onClick={() => send(s.text)}
                className="flex-shrink-0 inline-flex items-center gap-2 px-3 py-2 rounded-full border border-border text-xs font-medium hover:bg-muted transition"
              >
                <span className="text-primary">{s.icon}</span>
                {s.text}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") send(input); }}
              placeholder={t("chat.placeholder")}
              className="flex-1 h-12 px-4 rounded-full bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
            <button
              onClick={() => send(input)}
              className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition flex-shrink-0"
              aria-label="Send"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
