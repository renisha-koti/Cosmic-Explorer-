import type { DifficultyOption, QuizDifficulty } from "./types";

type DifficultySelectorProps = {
  options: DifficultyOption[];
  selectedDifficulty: QuizDifficulty | null;
  onSelect: (difficulty: QuizDifficulty) => void;
};

/** Futuristic quiz difficulty selector shown before and during a mission. */
export default function DifficultySelector({
  options,
  selectedDifficulty,
  onSelect,
}: DifficultySelectorProps) {
  return (
    <div className="mt-6 animate-quiz-in">
      <p className="text-[11px] font-semibold tracking-[0.28em] text-cyan-300/80 uppercase">
        Select difficulty
      </p>

      <div className="mt-3 grid gap-3 md:grid-cols-3">
        {options.map((option) => {
          const isSelected = selectedDifficulty === option.id;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.id)}
              aria-pressed={isSelected}
              className={`group relative overflow-hidden rounded-2xl border px-4 py-4 text-left shadow-inner shadow-white/5 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/60 hover:bg-cyan-400/10 hover:shadow-[0_18px_46px_rgba(8,47,73,0.24),0_0_28px_rgba(34,211,238,0.14)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 ${
                isSelected
                  ? "border-cyan-300/70 bg-cyan-400/15 shadow-[0_0_34px_rgba(34,211,238,0.22)]"
                  : "border-white/10 bg-white/[0.045]"
              }`}
            >
              <span
                className={`pointer-events-none absolute inset-x-4 top-0 h-px transition ${
                  isSelected
                    ? "bg-gradient-to-r from-transparent via-cyan-200 to-transparent opacity-100"
                    : "bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-80"
                }`}
              />
              <span className="flex items-center justify-between gap-3">
                <span>
                  <span
                    className={`block text-[10px] font-semibold tracking-[0.24em] uppercase ${
                      isSelected ? "text-cyan-100" : "text-violet-300/75"
                    }`}
                  >
                    {option.eyebrow}
                  </span>
                  <span className="mt-1 block text-base font-semibold text-white">
                    {option.label}
                  </span>
                </span>
                <span
                  className={`h-3 w-3 rounded-full border transition ${
                    isSelected
                      ? "border-cyan-100 bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.9)]"
                      : "border-slate-500 bg-slate-900 group-hover:border-cyan-300"
                  }`}
                  aria-hidden="true"
                />
              </span>
              <span className="mt-3 block text-sm leading-6 text-slate-400">
                {option.description}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
