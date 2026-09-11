import type { Category } from "./types";

export interface ActivityFactor {
  id: string;
  label: string;
  category: Category;
  /** kg CO2e per unit */
  kgPerUnit: number;
  unit: string;
  defaultQuantity: number;
  keywords: string[];
}

/**
 * Standardized factors from project rules.
 * Pork uses the high end of 6–12; chicken uses the low end.
 */
export const ACTIVITY_FACTORS: ActivityFactor[] = [
  {
    id: "beef",
    label: "Carne de res",
    category: "food",
    kgPerUnit: 27,
    unit: "kg",
    defaultQuantity: 0.2,
    keywords: [
      "carne de res",
      "bistec",
      "hamburguesa",
      "res",
      "vacuno",
      "ternera",
      "carne",
    ],
  },
  {
    id: "pork",
    label: "Cerdo",
    category: "food",
    kgPerUnit: 12,
    unit: "kg",
    defaultQuantity: 0.2,
    keywords: [
      "carne de cerdo",
      "cerdo",
      "puerco",
      "chuleta",
      "jamon",
      "jamón",
      "tocino",
    ],
  },
  {
    id: "chicken",
    label: "Pollo",
    category: "food",
    kgPerUnit: 6,
    unit: "kg",
    defaultQuantity: 0.2,
    keywords: ["carne de pollo", "pollo", "pechuga", "alitas"],
  },
  {
    id: "bus",
    label: "Bus urbano",
    category: "transport",
    kgPerUnit: 0.089,
    unit: "km",
    defaultQuantity: 0,
    keywords: ["autobus", "autobús", "bus", "camion", "camión"],
  },
  {
    id: "car",
    label: "Auto particular",
    category: "transport",
    kgPerUnit: 0.21,
    unit: "km",
    defaultQuantity: 0,
    keywords: [
      "auto",
      "carro",
      "coche",
      "taxi",
      "uber",
      "vehiculo",
      "vehículo",
      "maneje",
      "manejar",
      "conduje",
      "conducir",
    ],
  },
  {
    id: "flight",
    label: "Vuelo doméstico",
    category: "transport",
    kgPerUnit: 0.255,
    unit: "km",
    defaultQuantity: 0,
    keywords: ["vuelo", "avion", "avión", "volar", "vole"],
  },
];

export const CATEGORY_LABELS: Record<Category, string> = {
  food: "Alimentación",
  transport: "Transporte",
  energy: "Energía",
};

export const CATEGORY_COLORS: Record<Category, string> = {
  food: "#40916C",
  transport: "#1B4332",
  energy: "#95D5B2",
};
