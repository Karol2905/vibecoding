/** Lowercase, strip accents, collapse whitespace, unify decimal commas. */
export function normalizeSpanish(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/,/g, ".")
    .replace(/\s+/g, " ")
    .trim();
}

export function splitClauses(normalized: string): string[] {
  return normalized
    .split(/\s+(?:y|luego|despues|ademas|tambien|,|;)\s+/u)
    .map((part) => part.trim())
    .filter(Boolean);
}

export interface ParsedQuantity {
  value: number;
  unit: "km" | "kg" | "g" | "unknown";
}

const QUANTITY_RE =
  /(\d+(?:\.\d+)?)\s*(kilometros|km|kilos|kilogramos|kg|gramos|gr|g)?/u;

export function extractQuantity(clause: string): ParsedQuantity | null {
  const match = clause.match(QUANTITY_RE);
  if (!match) {
    return null;
  }

  const value = Number(match[1]);
  const rawUnit = match[2] ?? "";

  if (rawUnit === "kg" || rawUnit === "kilos" || rawUnit.startsWith("kilogram")) {
    return { value, unit: "kg" };
  }

  if (rawUnit.startsWith("km") || rawUnit.startsWith("kilometr")) {
    return { value, unit: "km" };
  }

  if (rawUnit.startsWith("g")) {
    return { value, unit: "g" };
  }

  if (/\bkm\b|kilometr/.test(clause)) {
    return { value, unit: "km" };
  }

  return { value, unit: "unknown" };
}

export function toActivityQuantity(
  quantity: ParsedQuantity | null,
  unit: string,
  defaultQuantity: number
): number {
  if (!quantity) {
    return defaultQuantity;
  }

  if (unit === "kg" && quantity.unit === "g") {
    return quantity.value / 1000;
  }

  return quantity.value;
}
