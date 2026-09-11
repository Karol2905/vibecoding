import { CATEGORY_COLORS, CATEGORY_LABELS } from "@/lib/emission-factors";
import type { CategoryTotal } from "@/lib/types";

/**
 * @typedef {object} CategoryBarsProps
 * @property {CategoryTotal[]} totals Emissions grouped by category.
 * @property {number} totalKg Grand total used for bar widths.
 */

interface CategoryBarsProps {
  totals: CategoryTotal[];
  totalKg: number;
}

/**
 * Horizontal bars showing the share of CO2 by category.
 */
export function CategoryBars({ totals, totalKg }: CategoryBarsProps) {
  if (totals.length === 0 || totalKg <= 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex h-3 overflow-hidden rounded-full bg-forest/10">
        {totals.map((row) => (
          <span
            key={row.category}
            className="h-full"
            style={{
              width: `${(row.kgCo2e / totalKg) * 100}%`,
              backgroundColor: CATEGORY_COLORS[row.category],
            }}
          />
        ))}
      </div>
      <ul className="space-y-3">
        {totals.map((row) => {
          const percent = Math.round((row.kgCo2e / totalKg) * 100);
          return (
            <li key={row.category} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 font-medium">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: CATEGORY_COLORS[row.category] }}
                  />
                  {CATEGORY_LABELS[row.category]}
                </span>
                <span className="tabular-nums text-forest-muted">
                  {row.kgCo2e.toFixed(2)} kg · {percent}%
                </span>
              </div>
              <div className="h-2 rounded-full bg-forest/10">
                <div
                  className="h-2 rounded-full"
                  style={{
                    width: `${percent}%`,
                    backgroundColor: CATEGORY_COLORS[row.category],
                  }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
