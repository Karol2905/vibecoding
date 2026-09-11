import { Leaf } from "lucide-react";

export function Header() {
  return (
    <header className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-forest text-cream">
        <Leaf className="h-5 w-5" aria-hidden />
      </div>
      <div>
        <p className="text-sm font-medium text-forest-muted">EcoTrack MVP</p>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Calcula el CO2 de tu día
        </h1>
      </div>
    </header>
  );
}
