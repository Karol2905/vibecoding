import { parseSpanishDay } from "./parser";
import type { CalculationResult, Category, CategoryTotal } from "./types";

const CATEGORY_ORDER: Category[] = ["food", "transport", "energy"];

export function calculateFootprint(text: string): CalculationResult {
  const trimmed = text.trim();
  const { items, unmatched } = parseSpanishDay(trimmed);
  const totalKg = Number(
    items.reduce((sum, item) => sum + item.kgCo2e, 0).toFixed(3)
  );

  const totals = new Map<Category, number>();
  for (const item of items) {
    totals.set(item.category, (totals.get(item.category) ?? 0) + item.kgCo2e);
  }

  const byCategory: CategoryTotal[] = CATEGORY_ORDER.filter((category) =>
    totals.has(category)
  ).map((category) => ({
    category,
    kgCo2e: Number((totals.get(category) ?? 0).toFixed(3)),
  }));

  return {
    input: trimmed,
    totalKg,
    items,
    byCategory,
    unmatched,
  };
}
