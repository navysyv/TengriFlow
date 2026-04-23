import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type Lang = "EN" | "RU" | "KG";

type Dict = Record<string, { EN: string; RU: string; KG: string }>;

export const dict: Dict = {
  "nav.home": { EN: "Home", RU: "Главная", KG: "Башкы" },
  "nav.map": { EN: "Map", RU: "Карта", KG: "Карта" },
  "nav.chat": { EN: "Chat", RU: "Чат", KG: "Чат" },
  "nav.dashboard": { EN: "Dashboard", RU: "Дашборд", KG: "Дашборд" },

  "home.badge": { EN: "SMART TOURISM PLATFORM", RU: "УМНАЯ ТУРИСТИЧЕСКАЯ ПЛАТФОРМА", KG: "АКЫЛДУУ ТУРИЗМ ПЛАТФОРМАСЫ" },
  "home.title1": { EN: "Travel Kyrgyzstan", RU: "Путешествуй по Кыргызстану", KG: "Кыргызстанды кыдыр" },
  "home.title2": { EN: "smarter.", RU: "умнее.", KG: "акылдуураак." },
  "home.subtitle": { EN: "Avoid crowds. Discover hidden places. Support locals.", RU: "Избегай толп. Открывай скрытые места. Поддерживай местных.", KG: "Көп элден алыс. Жашыруун жерлерди ач. Жергиликтүүлөргө колдоо." },
  "home.cta1": { EN: "View Map", RU: "Смотреть карту", KG: "Картаны көрүү" },
  "home.cta2": { EN: "Start Chat", RU: "Начать чат", KG: "Чат баштоо" },
  "home.everything": { EN: "Everything you need", RU: "Всё необходимое", KG: "Бардык керектүү" },
  "home.ancient": { EN: "Ancient land,", RU: "Древняя земля,", KG: "Байыркы жер," },
  "home.modern": { EN: "modern guide.", RU: "современный гид.", KG: "заманбап гид." },
  "home.heroSub": { EN: "Kyrgyzstan's wild beauty, intelligently navigated", RU: "Дикая красота Кыргызстана с умной навигацией", KG: "Кыргызстандын жапайы сулуулугу, акылдуу багытталган" },
  "home.localCulture": { EN: "Local Culture", RU: "Местная культура", KG: "Жергиликтүү маданият" },
  "home.pureNature": { EN: "Pure Nature", RU: "Чистая природа", KG: "Таза жаратылыш" },

  "feat.routes.t": { EN: "Smart Routes", RU: "Умные маршруты", KG: "Акылдуу багыттар" },
  "feat.routes.d": { EN: "Optimized paths around crowds with local community support", RU: "Оптимизированные пути в обход толп с поддержкой местных сообществ", KG: "Көп элди айланып, жергиликтүү жамаатты колдогон жолдор" },
  "feat.heat.t": { EN: "Heatmap", RU: "Карта загруженности", KG: "Жүктөлүү картасы" },
  "feat.heat.d": { EN: "Real-time tourist density across all of Kyrgyzstan", RU: "Плотность туристов в реальном времени по всему Кыргызстану", KG: "Кыргызстан боюнча реалдуу убакытта туристтердин тыгыздыгы" },
  "feat.guide.t": { EN: "Smart Guide", RU: "Умный гид", KG: "Акылдуу гид" },
  "feat.guide.d": { EN: "Chat with Tengri for personal recommendations", RU: "Общайся с Тенгри для персональных рекомендаций", KG: "Тенгри менен жеке сунуштар үчүн сүйлөш" },
  "feat.impact.t": { EN: "Local Impact", RU: "Местный вклад", KG: "Жергиликтүү салым" },
  "feat.impact.d": { EN: "See where your money goes in real time", RU: "Смотри, куда идут твои деньги в реальном времени", KG: "Акчаңыздын кайда кеткенин көрүңүз" },
  "feat.hidden.t": { EN: "Hidden Places", RU: "Скрытые места", KG: "Жашыруун жерлер" },
  "feat.hidden.d": { EN: "Unique locations regular tourists never find", RU: "Уникальные локации, которые не найдут обычные туристы", KG: "Кадимки туристтер таппаган уникалдуу жерлер" },

  "map.badge": { EN: "SMART NAVIGATOR", RU: "УМНЫЙ НАВИГАТОР", KG: "АКЫЛДУУ НАВИГАТОР" },
  "map.title": { EN: "Plan your trip", RU: "Спланируй поездку", KG: "Сапарыңды пландаштыр" },
  "map.subtitle": { EN: "Intelligent routes around crowds with even income distribution.", RU: "Интеллектуальные маршруты в обход толп с равномерным распределением дохода.", KG: "Көп элди айланып, кирешени бирдей бөлүштүргөн акылдуу багыттар." },
  "map.from": { EN: "From", RU: "Откуда", KG: "Кайдан" },
  "map.to": { EN: "To", RU: "Куда", KG: "Кайда" },
  "map.build": { EN: "Build route", RU: "Проложить маршрут", KG: "Багыт түзүү" },
  "map.hidden": { EN: "Hidden places", RU: "Скрытые места", KG: "Жашыруун жерлер" },
  "map.hiddenSub": { EN: "Show low-traffic, unique locations", RU: "Показать малолюдные, уникальные локации", KG: "Аз жүргөн, уникалдуу жерлерди көрсөтүү" },
  "map.recommends": { EN: "Tengri recommends", RU: "Тенгри рекомендует", KG: "Тенгри сунуштайт" },
  "map.book": { EN: "Book", RU: "Забронировать", KG: "Брондоо" },
  "map.bookNow": { EN: "Book now", RU: "Забронировать", KG: "Азыр брондоо" },
  "map.support": { EN: "Support Rate", RU: "Поддержка", KG: "Колдоо" },
  "map.co2": { EN: "CO₂ Offset", RU: "CO₂", KG: "CO₂" },
  "map.artisans": { EN: "To Artisans", RU: "Мастерам", KG: "Усталарга" },
  "map.lowCrowd": { EN: "Low Crowd", RU: "Мало людей", KG: "Аз эл" },

  "chat.title": { EN: "Tengri", RU: "Тенгри", KG: "Тенгри" },
  "chat.role": { EN: "Smart guide", RU: "Умный гид", KG: "Акылдуу гид" },
  "chat.placeholder": { EN: "Ask Tengri…", RU: "Спроси Тенгри…", KG: "Тенгриден сура…" },
  "chat.greet1": { EN: "Salam! I'm Tengri, your smart local guide. How can I help you discover the real Kyrgyzstan?", RU: "Салам! Я Тенгри, твой умный местный гид. Как помочь тебе открыть настоящий Кыргызстан?", KG: "Салам! Мен Тенгри, сенин акылдуу жергиликтүү гидиңмин. Чыныгы Кыргызстанды ачууга кантип жардам берейин?" },
  "chat.greet2": { EN: "I can help you find quiet yurt camps, local food, or check crowd levels.", RU: "Могу помочь найти тихие юрточные лагеря, местную еду или проверить загруженность мест.", KG: "Тынч боз үй лагерлерин, жергиликтүү тамакты табууга же көп элди текшерүүгө жардам бере алам." },
  "chat.s1": { EN: "Local food nearby", RU: "Местная еда рядом", KG: "Жакын жердеги тамак" },
  "chat.s2": { EN: "Crowd map", RU: "Карта загруженности", KG: "Жүктөлүү картасы" },
  "chat.s3": { EN: "Quiet yurt camp", RU: "Тихий лагерь с юртой", KG: "Тынч боз үй" },
  "chat.s4": { EN: "My eco impact", RU: "Мой эко-вклад", KG: "Менин эко-салымым" },

  "dash.label": { EN: "DASHBOARD", RU: "ДАШБОРД", KG: "ДАШБОРД" },
  "dash.title": { EN: "Your impact dashboard", RU: "Ваш дашборд воздействия", KG: "Сиздин таасир дашборду" },
  "dash.subtitle": { EN: "Balance, spending history and flow analytics — all in one place.", RU: "Баланс, история расходов и аналитика потоков — всё в одном месте.", KG: "Баланс, чыгашалар жана аналитика — баары бир жерде." },
  "dash.topup": { EN: "Top up", RU: "Пополнить", KG: "Толтуруу" },
  "dash.total": { EN: "Total Spending", RU: "Всего потрачено", KG: "Бардыгы сарпталды" },
  "dash.remaining": { EN: "Remaining Budget", RU: "Остаток бюджета", KG: "Калган бюджет" },
  "dash.families": { EN: "Families Empowered", RU: "Семей поддержано", KG: "Үй-бүлөлөр" },
  "dash.co2": { EN: "CO₂ Offset", RU: "CO₂", KG: "CO₂" },
  "dash.wallet": { EN: "Impact Wallet", RU: "Кошелёк воздействия", KG: "Таасир капчыгы" },
  "dash.walletSub": { EN: "Your spending & community goals", RU: "Ваши расходы и цели сообщества", KG: "Чыгашалар жана максаттар" },
  "dash.recent": { EN: "Recent Impact", RU: "Недавнее воздействие", KG: "Жакында" },
  "dash.recentSub": { EN: "Direct contributions to local economy", RU: "Прямой вклад в местную экономику", KG: "Жергиликтүү экономикага түз салым" },
  "dash.supported": { EN: "You supported local businesses", RU: "Вы поддержали местный бизнес", KG: "Жергиликтүү бизнести колдодуңуз" },
  "dash.supportedSub": { EN: "Your spending went directly to local families & artisans.", RU: "Ваши расходы пошли напрямую местным семьям и мастерам.", KG: "Чыгашаларыңыз жергиликтүү үй-бүлөлөргө түз кетти." },
  "dash.top10": { EN: "Top 10%", RU: "Топ 10%", KG: "Топ 10%" },

  "book.title": { EN: "Book your stay", RU: "Забронировать", KG: "Брондоо" },
  "book.date": { EN: "Date", RU: "Дата", KG: "Күн" },
  "book.people": { EN: "People", RU: "Гостей", KG: "Адам" },
  "book.confirm": { EN: "Confirm booking", RU: "Подтвердить", KG: "Ырастоо" },
  "book.success": { EN: "Booking confirmed!", RU: "Бронь подтверждена!", KG: "Брондоо ырасталды!" },
};

interface I18nCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: string) => string;
}

const Ctx = createContext<I18nCtx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("EN");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? (localStorage.getItem("tf_lang") as Lang | null) : null;
    if (saved && ["EN", "RU", "KG"].includes(saved)) setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("tf_lang", l);
  };

  const t = (k: string) => dict[k]?.[lang] ?? k;

  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export function useI18n() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useI18n must be used within I18nProvider");
  return c;
}
