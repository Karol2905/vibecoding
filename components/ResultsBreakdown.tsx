import { CategoryBars } from "@/components/CategoryBars";
import type { CalculationResult } from "@/lib/types";
import { Trees } from "lucide-react";

/**
 * @typedef {object} ResultsBreakdownProps
 * @property {CalculationResult} result Calculated footprint for the submitted day.
 */

interface ResultsBreakdownProps {
  result: CalculationResult;
}

/**
 * Total kg CO2e plus per-item and per-category visual breakdown.
 */
export function ResultsBreakdown({ result }: ResultsBreakdownProps) {
  return (
    <section className="space-y-6 rounded-3xl border border-forest/10 bg-white p-5 md:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-forest-muted">Emisión estimada</p>
          <p className="mt-1 text-4xl font-semibold tabular-nums tracking-tight">
            {result.totalKg.toFixed(2)}
            <span className="ml-2 text-lg font-medium text-forest-muted">kg CO2e</span>
          </p>
        </div>
        <div className="hidden rounded-2xl bg-cream p-3 text-forest-muted sm:block">
          <Trees className="h-6 w-6" aria-hidden />
        </div>
      </div>

      <CategoryBars totals={result.byCategory} totalKg={result.totalKg} />

      {result.items.length > 0 ? (
        <ul className="divide-y divide-forest/10">
          {result.items.map((item) => (
            <li key={item.id} className="flex items-center justify-between py-3 text-sm">
              <div>
                <p className="font-medium">{item.label}</p>
                <p className="text-forest-muted">
                  {item.quantity} {item.unit} × {item.factorKg} kg CO2e/{item.unit}
                </p>
              </div>
              <p className="tabular-nums font-medium">{item.kgCo2e.toFixed(2)} kg</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-forest-muted">
          No reconocimos actividades. Prueba con carne, pollo, cerdo, bus, auto o vuelo.
        </p>
      )}

      {result.unmatched.length > 0 ? (
        <p className="text-xs text-forest-muted">
          No se pudo estimar: {result.unmatched.join(" · ")}
        </p>
      ) : null}
    </section>
  );
}
