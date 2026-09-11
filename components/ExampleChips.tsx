/**
 * @typedef {object} ExampleChipsProps
 * @property {(example: string) => void} onSelect Fills the input with a sample day.
 */

interface ExampleChipsProps {
  onSelect: (example: string) => void;
}

const EXAMPLES = [
  "Comí carne y viajé 20km en bus",
  "Almorcé 300g de pollo y manejé 15 km en auto",
  "Comí cerdo y volé 400 km",
];

/**
 * Quick-fill examples so users can try the parser without typing.
 */
export function ExampleChips({ onSelect }: ExampleChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {EXAMPLES.map((example) => (
        <button
          key={example}
          type="button"
          onClick={() => onSelect(example)}
          className="rounded-full border border-forest/15 bg-white px-3 py-1.5 text-left text-xs text-forest-muted transition hover:border-forest/40 hover:text-forest"
        >
          {example}
        </button>
      ))}
    </div>
  );
}
