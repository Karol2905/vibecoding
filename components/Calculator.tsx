"use client";

import { CarbonForm } from "@/components/CarbonForm";
import { ResultsBreakdown } from "@/components/ResultsBreakdown";
import type { CalculationResult } from "@/lib/types";
import { useState } from "react";

/**
 * Client page controller: posts diary text to /api/calculate and shows results.
 */
export function Calculator() {
  const [text, setText] = useState("Comí carne y viajé 20km en bus");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CalculationResult | null>(null);

  async function handleSubmit(): Promise<void> {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const payload = (await response.json()) as CalculationResult & {
        error?: string;
      };

      if (!response.ok) {
        setResult(null);
        setError(payload.error ?? "No se pudo calcular la huella.");
        return;
      }

      setResult(payload);
    } catch {
      setError("Error de red. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="rounded-3xl border border-forest/10 bg-white p-5 md:p-6">
        <CarbonForm
          text={text}
          onTextChange={setText}
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
        />
      </section>
      {result ? <ResultsBreakdown result={result} /> : <EmptyState />}
    </div>
  );
}

function EmptyState() {
  return (
    <section className="flex min-h-[220px] items-center rounded-3xl border border-dashed border-forest/20 bg-white/60 p-6 text-sm text-forest-muted">
      El desglose por alimentación y transporte aparecerá aquí.
    </section>
  );
}
