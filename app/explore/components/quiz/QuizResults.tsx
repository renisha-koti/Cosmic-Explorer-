type QuizResultsProps = {
  score: number;
  total: number;
  onRestart: () => void;
};

/** Final score screen after the last question. */
export default function QuizResults({
  score,
  total,
  onRestart,
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

      <div className="mx-auto mt-6 flex h-32 w-32 items-center justify-center rounded-full border border-cyan-400/30 bg-gradient-to-br from-cyan-500/20 to-indigo-600/20 shadow-[0_0_40px_rgba(34,211,238,0.15)]">
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

      <button
        type="button"
        onClick={onRestart}
        className="mt-8 inline-flex h-12 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-8 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:from-cyan-400 hover:to-indigo-500 hover:shadow-cyan-400/30"
      >
        Restart quiz
      </button>
    </div>
  );
}
