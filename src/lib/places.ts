export interface Place {
  id: string;
  name: string;
  description: { EN: string; RU: string; KG: string };
  image: string;
  coords: [number, number];
  crowd: "low" | "medium" | "high";
  /** Whether the place can be booked (hotels, yurts, guesthouses, glamping, tours). Historical/protected sites are not bookable. */
  bookable: boolean;
}

// Curated real photos of Kyrgyzstan — yurts, mountains, Issyk-Kul, Tian Shan landscapes.
// Sourced from Wikimedia Commons & Pexels (public/free-use, Kyrgyzstan-specific).
export const places: Place[] = [
  {
    id: "sonkul",
    name: "Son Kul Yurt Camp",
    description: {
      EN: "Authentic nomadic lifestyle at 3000m. Zero cell service, pure nature, direct support to local herder families.",
      RU: "Аутентичная кочевая жизнь на 3000м. Без связи, чистая природа, прямая поддержка семей пастухов.",
      KG: "3000м бийиктикте чыныгы көчмөн жашоо. Байланыш жок, таза жаратылыш, жергиликтүү үй-бүлөлөргө түз колдоо.",
    },
    // Song-Köl, Kyrgyzstan — Wikimedia Commons (verified)
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Song-Kul%2C_Kyrgyzstan_%28Unsplash%29.jpg/1280px-Song-Kul%2C_Kyrgyzstan_%28Unsplash%29.jpg",
    coords: [41.85, 75.15],
    crowd: "low",
    bookable: true,
  },
  {
    id: "karakol",
    name: "Karakol Guesthouse & Tours",
    description: {
      EN: "Wildflower meadows beneath the Tian Shan. Family-run guesthouses and community-led hiking tours.",
      RU: "Луга с цветами у подножия Тянь-Шаня. Семейные гостевые дома и походы с местными гидами.",
      KG: "Тянь-Шандын этегиндеги гүлдөр. Үй-бүлөлүк меймандар үйлөрү жана жергиликтүү гид турлары.",
    },
    // Jeti-Ögüz Rocks, Karakol / Issyk-Kul Region, Kyrgyzstan — Wikimedia Commons (verified)
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Jeti-%C3%96g%C3%BCz_Rocks_-_Issyk-Kul_Region%2C_Jeti-Oguz_District.jpg/1280px-Jeti-%C3%96g%C3%BCz_Rocks_-_Issyk-Kul_Region%2C_Jeti-Oguz_District.jpg",
    coords: [42.49, 78.39],
    crowd: "medium",
    bookable: true,
  },
  {
    id: "tashrabat",
    name: "Tash Rabat",
    description: {
      EN: "15th-century stone caravanserai on the Silk Road. A protected historical monument — visit with respect.",
      RU: "Каменный караван-сарай XV века на Шёлковом пути. Охраняемый исторический памятник.",
      KG: "Жибек жолундагы 15-кылымдын таш кербен сарайы. Корголуучу тарыхый эстелик.",
    },
    // Tash Rabat caravanserai, Kyrgyzstan — Wikimedia Commons (verified)
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Tash_Rabat_September_2012.jpg/1280px-Tash_Rabat_September_2012.jpg",
    coords: [40.82, 75.28],
    crowd: "low",
    bookable: false,
  },
  {
    id: "issykkul",
    name: "Issyk-Kul Lakeside Glamping",
    description: {
      EN: "World's second-largest alpine lake. Crystal-clear waters with comfortable lakeside glamping and family hotels.",
      RU: "Второе по величине горное озеро мира. Прозрачная вода, комфортный глэмпинг и семейные отели.",
      KG: "Дүйнөдөгү экинчи чоң тоо көлү. Тунук суу, ыңгайлуу глэмпинг жана үй-бүлөлүк мейманканалар.",
    },
    // Lake Issyk-Kul, Kyrgyzstan — Wikimedia Commons (verified)
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Lake_Issyk-Kul%2C_Kyrgyzstan.jpg/1280px-Lake_Issyk-Kul%2C_Kyrgyzstan.jpg",
    coords: [42.45, 77.25],
    crowd: "high",
    bookable: true,
  },
];

// Heatmap mock data covering Kyrgyzstan
export const heatPoints: [number, number, number][] = [
  // High crowd: Bishkek, Issyk-Kul resort
  [42.87, 74.59, 1.0],
  [42.65, 77.08, 0.9],
  [42.48, 76.18, 0.85],
  [42.45, 77.25, 0.95],
  // Medium
  [42.49, 78.39, 0.55],
  [42.64, 74.62, 0.6],
  [40.51, 72.8, 0.55],
  // Low (good places)
  [41.85, 75.15, 0.25],
  [40.82, 75.28, 0.2],
  [39.7, 73.3, 0.3],
  [41.42, 75.98, 0.3],
];
