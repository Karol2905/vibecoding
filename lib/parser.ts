import { ACTIVITY_FACTORS, type ActivityFactor } from "./emission-factors";
import {
  extractQuantity,
  normalizeSpanish,
  splitClauses,
  toActivityQuantity,
} from "./normalize";
import type { EmissionItem } from "./types";

function hasKeyword(clause: string, keyword: string): boolean {
  const token = normalizeSpanish(keyword).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(^|[^a-z])${token}(es|s)?($|[^a-z])`).test(clause);
}

function findFactor(clause: string): ActivityFactor | null {
  let best: { factor: ActivityFactor; length: number } | null = null;

  for (const factor of ACTIVITY_FACTORS) {
    for (const keyword of factor.keywords) {
      if (!hasKeyword(clause, keyword)) {
        continue;
      }
      const length = normalizeSpanish(keyword).length;
      if (!best || length > best.length) {
        best = { factor, length };
      }
    }
  }

  return best?.factor ?? null;
}

function toItem(factor: ActivityFactor, clause: string, index: number): EmissionItem | null {
  const quantity = extractQuantity(clause);
  const amount = toActivityQuantity(quantity, factor.unit, factor.defaultQuantity);

  if (amount <= 0) {
    return null;
  }

  const kgCo2e = amount * factor.kgPerUnit;

  return {
    id: `${factor.id}-${index}`,
    label: factor.label,
    category: factor.category,
    quantity: amount,
    unit: factor.unit,
    factorKg: factor.kgPerUnit,
    kgCo2e: Number(kgCo2e.toFixed(3)),
  };
}

export interface ParseOutcome {
  items: EmissionItem[];
  unmatched: string[];
}

export function parseSpanishDay(text: string): ParseOutcome {
  const normalized = normalizeSpanish(text);
  if (!normalized) {
    return { items: [], unmatched: [] };
  }

  const clauses = splitClauses(normalized);
  const items: EmissionItem[] = [];
  const unmatched: string[] = [];

  clauses.forEach((clause, index) => {
    const factor = findFactor(clause);
    if (!factor) {
      unmatched.push(clause);
      return;
    }

    const item = toItem(factor, clause, index);
    if (!item) {
      unmatched.push(clause);
      return;
    }

    items.push(item);
  });

  return { items, unmatched };
}
