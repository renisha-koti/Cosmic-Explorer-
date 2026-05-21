type QuizResultsProps = {
  score: number;
  total: number;
  onRestart: () => void;
  onChangeDifficulty: () => void;
};

/** Final score screen after the last question. */
export default function QuizResults({
  score,
  total,
  onRestart,
  onChangeDifficulty,
}: QuizResultsProps) {
  const percent = total > 0 ? Math.round((score / total) * 100) : 0;

  let headline = "Keep exploring!";
  if (percent === 100) headline = "Stellar performance!";
  else if (percent >= 80) headline = "Cosmic expert!";
  else if (percent >= 50) headline = "Good flight path!";

  return (
    <div className="animate-quiz-in text-center">
      <p className="text-[11px] font-semibold tracking-[0.28em] text-cyan-300/80 uppercase">
        Mission complete
      </p>
      <h3 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
        {headline}
      </h3>

      <div className="mx-auto mt-6 flex h-32 w-32 items-center justify-center rounded-full border border-cyan-300/30 bg-gradient-to-br from-cyan-400/20 via-blue-500/10 to-indigo-600/20 shadow-[0_0_48px_rgba(34,211,238,0.18)]">
        <div>
          <p className="text-4xl font-bold text-white">
            {score}
            <span className="text-lg text-slate-400">/{total}</span>
          </p>
          <p className="text-xs text-cyan-200/80">{percent}% correct</p>
        </div>
      </div>

      <p className="mt-6 text-sm text-slate-400">
        {score === total
          ? "Perfect score — you know your way around the cosmos."
          : score >= total / 2
            ? "Solid knowledge. Review the solar system and try again!"
            : "Every astronomer starts somewhere. Restart and climb the leaderboard!"}
      </p>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex h-12 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 px-8 text-sm font-semibold text-white shadow-[0_0_28px_rgba(34,211,238,0.22)] transition duration-300 hover:-translate-y-0.5 hover:from-cyan-300 hover:to-indigo-500"
        >
          Retry mission
        </button>
        <button
          type="button"
          onClick={onChangeDifficulty}
          className="inline-flex h-12 items-center justify-center rounded-2xl border border-white/10 bg-black/30 px-8 text-sm font-semibold text-slate-200 shadow-inner shadow-white/5 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/50 hover:bg-cyan-400/10 hover:text-white"
        >
          Change difficulty
        </button>
      </div>
    </div>
  );
}
