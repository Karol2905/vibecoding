"use client";

import { ExampleChips } from "@/components/ExampleChips";
import { Loader2, Sparkles } from "lucide-react";
import { FormEvent } from "react";

/**
 * @typedef {object} CarbonFormProps
 * @property {string} text Current diary text.
 * @property {(value: string) => void} onTextChange Updates the diary field.
 * @property {() => void} onSubmit Runs the CO2 estimate.
 * @property {boolean} loading Whether a request is in flight.
 * @property {string | null} error Inline error message.
 */

interface CarbonFormProps {
  text: string;
  onTextChange: (value: string) => void;
  onSubmit: () => void;
  loading: boolean;
  error: string | null;
}

/**
 * Natural-language day diary used as the only input to the calculator.
 */
export function CarbonForm({
  text,
  onTextChange,
  onSubmit,
  loading,
  error,
}: CarbonFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label htmlFor="day" className="block text-sm font-medium">
        ¿Cómo fue tu día?
      </label>
      <textarea
        id="day"
        name="day"
        rows={4}
        value={text}
        onChange={(event) => onTextChange(event.target.value)}
        placeholder="Ej: Comí carne y viajé 20km en bus"
        className="w-full resize-y rounded-2xl border border-forest/15 bg-white px-4 py-3 text-base outline-none ring-forest/20 transition focus:border-forest/40 focus:ring-4"
      />
      <ExampleChips onSelect={onTextChange} />
      {error ? (
        <p className="text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={loading}
        className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-forest px-4 py-3 font-medium text-cream transition hover:bg-forest-muted disabled:cursor-not-allowed disabled:opacity-70 md:w-auto"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        ) : (
          <Sparkles className="h-4 w-4" aria-hidden />
        )}
        Estimar CO2
      </button>
    </form>
  );
}
