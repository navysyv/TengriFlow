import sonkul from "@/assets/place-sonkul.jpg";
import karakol from "@/assets/place-karakol.jpg";
import tashrabat from "@/assets/place-tashrabat.jpg";
import issykkul from "@/assets/place-issykkul.jpg";

export interface Place {
  id: string;
  name: string;
  description: { EN: string; RU: string; KG: string };
  image: string;
  coords: [number, number];
  crowd: "low" | "medium" | "high";
}

export const places: Place[] = [
  {
    id: "sonkul",
    name: "Son Kul Yurt Camp",
    description: {
      EN: "Authentic nomadic lifestyle at 3000m. Zero cell service, pure nature, direct support to local herder families.",
      RU: "Аутентичная кочевая жизнь на 3000м. Без связи, чистая природа, прямая поддержка семей пастухов.",
      KG: "3000м бийиктикте чыныгы көчмөн жашоо. Байланыш жок, таза жаратылыш, жергиликтүү үй-бүлөлөргө түз колдоо.",
    },
    image: sonkul,
    coords: [41.85, 75.15],
    crowd: "low",
  },
  {
    id: "karakol",
    name: "Karakol Valley",
    description: {
      EN: "Wildflower meadows beneath the Tian Shan. Hiking trails maintained by the local community.",
      RU: "Луга с цветами у подножия Тянь-Шаня. Тропы, которые поддерживает местное сообщество.",
      KG: "Тянь-Шандын этегиндеги гүлдөр. Жергиликтүү жамаат тейлеген жолдор.",
    },
    image: karakol,
    coords: [42.49, 78.39],
    crowd: "medium",
  },
  {
    id: "tashrabat",
    name: "Tash Rabat",
    description: {
      EN: "15th-century stone caravanserai on the Silk Road. Remote, atmospheric, and quiet.",
      RU: "Каменный караван-сарай XV века на Шёлковом пути. Удалённый и тихий.",
      KG: "Жибек жолундагы 15-кылымдын таш кербен сарайы. Алыскы жана тынч.",
    },
    image: tashrabat,
    coords: [40.82, 75.28],
    crowd: "low",
  },
  {
    id: "issykkul",
    name: "Issyk-Kul Lake",
    description: {
      EN: "World's second-largest alpine lake. Crystal-clear waters and family-run guesthouses.",
      RU: "Второе по величине горное озеро мира. Прозрачные воды и семейные гестхаусы.",
      KG: "Дүйнөдөгү экинчи чоң тоо көлү. Тунук суу жана үй-бүлөлүк коноктор үйлөрү.",
    },
    image: issykkul,
    coords: [42.45, 77.25],
    crowd: "high",
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
