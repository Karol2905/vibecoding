export type Category = "food" | "transport" | "energy";

export interface EmissionItem {
  id: string;
  label: string;
  category: Category;
  quantity: number;
  unit: string;
  factorKg: number;
  kgCo2e: number;
}

export interface CategoryTotal {
  category: Category;
  kgCo2e: number;
}

export interface CalculationResult {
  input: string;
  totalKg: number;
  items: EmissionItem[];
  byCategory: CategoryTotal[];
  unmatched: string[];
}

export interface CalculateRequest {
  text: string;
}
