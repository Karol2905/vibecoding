import { Calculator } from "@/components/Calculator";
import { Header } from "@/components/Header";

export default function HomePage() {
  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 py-8 md:px-6 md:py-12">
      <div className="space-y-8">
        <Header />
        <p className="max-w-2xl text-forest-muted">
          Escribe tu día en español. EcoTrack reconoce comida (res, cerdo, pollo)
          y transporte (bus, auto, vuelo) con factores de emisión estándar.
        </p>
        <Calculator />
      </div>
    </main>
  );
}
