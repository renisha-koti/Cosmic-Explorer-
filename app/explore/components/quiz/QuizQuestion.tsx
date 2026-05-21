import type { QuizQuestion } from "./types";

type QuizQuestionProps = {
  question: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  score: number;
  selectedIndex: number | null;
  answered: boolean;
  onSelect: (index: number) => void;
  onNext: () => void;
  isLast: boolean;
};

/** Single question view with options and instant feedback. */
export default function QuizQuestionView({
  question,
  questionNumber,
  totalQuestions,
  score,
  selectedIndex,
  answered,
  onSelect,
  onNext,
  isLast,
}: QuizQuestionProps) {
  const isCorrect = selectedIndex === question.correctIndex;
  const progressPercent = Math.round((questionNumber / totalQuestions) * 100);

  return (
    <div key={question.id} className="animate-quiz-in">
      <div className="rounded-2xl border border-white/10 bg-black/25 p-3 shadow-[0_0_24px_rgba(34,211,238,0.08)]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[11px] font-semibold tracking-[0.28em] text-cyan-300/80 uppercase">
            Question {questionNumber} of {totalQuestions}
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <span className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1 font-semibold text-cyan-100">
              {progressPercent}%
            </span>
            <span className="rounded-full border border-white/10 bg-black/25 px-3 py-1">
              Score:{" "}
              <span className="font-semibold text-cyan-200">{score}</span>
            </span>
          </div>
        </div>

        <div
          className="mt-3 h-2 overflow-hidden rounded-full border border-cyan-300/20 bg-slate-950/80"
          aria-label={`Quiz progress ${progressPercent}%`}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progressPercent}
        >
          <div
            className="relative h-full rounded-full bg-gradient-to-r from-cyan-300 via-violet-400 to-indigo-400 shadow-[0_0_18px_rgba(34,211,238,0.55)] transition-[width] duration-700 ease-out"
            style={{ width: `${progressPercent}%` }}
          >
            <span className="absolute inset-0 animate-pulse bg-white/25" />
          </div>
        </div>
      </div>

      <h3 className="mt-4 text-lg font-semibold leading-snug text-white sm:text-xl">
        {question.question}
      </h3>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {question.options.map((option, index) => {
          const isSelected = selectedIndex === index;
          const isAnswer = index === question.correctIndex;

          let optionClass =
            "rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-left text-sm text-slate-200 transition hover:border-cyan-400/40 hover:bg-black/40 hover:text-white";

          if (answered) {
            if (isAnswer) {
              optionClass =
                "rounded-xl border border-emerald-400/50 bg-emerald-950/40 px-4 py-3 text-left text-sm text-emerald-100 shadow-[0_0_20px_rgba(52,211,153,0.15)]";
            } else if (isSelected && !isAnswer) {
              optionClass =
                "rounded-xl border border-rose-400/50 bg-rose-950/40 px-4 py-3 text-left text-sm text-rose-100 shadow-[0_0_20px_rgba(251,113,133,0.12)]";
            } else {
              optionClass =
                "rounded-xl border border-white/5 bg-black/15 px-4 py-3 text-left text-sm text-slate-500";
            }
          }

          return (
            <button
              key={option}
              type="button"
              disabled={answered}
              onClick={() => onSelect(index)}
              className={`${optionClass} disabled:cursor-default`}
            >
              <span className="mr-2 text-xs font-semibold text-slate-500">
                {String.fromCharCode(65 + index)}.
              </span>
              {option}
              {answered && isAnswer && (
                <span className="ml-2 text-xs text-emerald-300">✓</span>
              )}
              {answered && isSelected && !isAnswer && (
                <span className="ml-2 text-xs text-rose-300">✗</span>
              )}
            </button>
          );
        })}
      </div>

      {answered && (
        <div
          className={`mt-5 rounded-xl border px-4 py-3 text-sm animate-quiz-in ${
            isCorrect
              ? "border-emerald-400/30 bg-emerald-950/30 text-emerald-100"
              : "border-rose-400/30 bg-rose-950/30 text-rose-100"
          }`}
          role="status"
        >
          <p className="font-semibold">
            {isCorrect ? "Correct!" : "Not quite."}
          </p>
          <p className="mt-1 text-slate-300">{question.explanation}</p>
        </div>
      )}

      {answered && (
        <button
          type="button"
          onClick={onNext}
          className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:from-cyan-400 hover:to-indigo-500 sm:w-auto sm:px-8"
        >
          {isLast ? "See results" : "Next question"}
        </button>
      )}
    </div>
  );
}
