// Major Kyrgyz cities — used for routing AND map labels.
// Kept in a separate file so route components can import it without pulling in Leaflet.
export interface City {
  id: string;
  name: string;
  coords: [number, number];
  tier: "primary" | "secondary";
}

export const CITIES: City[] = [
  { id: "bishkek", name: "Bishkek", coords: [42.8746, 74.5698], tier: "primary" },
  { id: "osh", name: "Osh", coords: [40.5283, 72.7985], tier: "primary" },
  { id: "karakol", name: "Karakol", coords: [42.4907, 78.3936], tier: "primary" },
  { id: "issykkul", name: "Issyk-Kul", coords: [42.45, 77.25], tier: "primary" },
  { id: "naryn", name: "Naryn", coords: [41.4287, 75.9911], tier: "primary" },
  { id: "talas", name: "Talas", coords: [42.5228, 72.2425], tier: "secondary" },
  { id: "jalalabad", name: "Jalal-Abad", coords: [40.9333, 73.0], tier: "secondary" },
  { id: "cholpon", name: "Cholpon-Ata", coords: [42.6489, 77.0814], tier: "secondary" },
];
