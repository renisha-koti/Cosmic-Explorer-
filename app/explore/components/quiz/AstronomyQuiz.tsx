"use client";

import { useState } from "react";
import DifficultySelector from "./DifficultySelector";
import {
  DIFFICULTY_OPTIONS,
  QUIZ_QUESTIONS_BY_DIFFICULTY,
} from "./questions";
import QuizQuestionView from "./QuizQuestion";
import QuizResults from "./QuizResults";
import type { QuizDifficulty, QuizPhase } from "./types";
import { useQuizSounds } from "./useQuizSounds";

/** Interactive astronomy quiz with score tracking and results screen. */
export default function AstronomyQuiz() {
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<QuizDifficulty | null>(null);
  const [phase, setPhase] = useState<QuizPhase>("selecting");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const { muted, playCorrect, playWrong, toggleMuted } = useQuizSounds();

  const questions = selectedDifficulty
    ? QUIZ_QUESTIONS_BY_DIFFICULTY[selectedDifficulty]
    : [];
  const total = questions.length;
  const currentQuestion = questions[currentIndex];
  const isLast = currentIndex === total - 1;

  const resetProgress = () => {
    setCurrentIndex(0);
    setScore(0);
    setSelectedIndex(null);
    setAnswered(false);
  };

  const handleDifficultySelect = (difficulty: QuizDifficulty) => {
    setSelectedDifficulty(difficulty);
    resetProgress();
    setPhase("playing");
  };

  const handleSelect = (index: number) => {
    if (answered || !currentQuestion) return;
    setSelectedIndex(index);
    setAnswered(true);
    if (index === currentQuestion.correctIndex) {
      playCorrect();
      setScore((s) => s + 1);
    } else {
      playWrong();
    }
  };

  const handleNext = () => {
    if (isLast) {
      setPhase("results");
      return;
    }
    setCurrentIndex((i) => i + 1);
    setSelectedIndex(null);
    setAnswered(false);
  };

  const handleRestart = () => {
    resetProgress();
    setPhase(selectedDifficulty ? "playing" : "selecting");
  };

  const handleChangeDifficulty = () => {
    resetProgress();
    setPhase("selecting");
  };

  return (
    <div className="mt-12 w-full max-w-5xl" aria-label="Astronomy quiz">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-4 shadow-[0_0_80px_rgba(99,102,241,0.08)] backdrop-blur-xl sm:p-6">
        <div className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-r from-violet-400/15 via-transparent to-cyan-400/15" />

        <div className="relative">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.28em] text-violet-300/80 uppercase">
                Challenge mode
              </p>
              <h2 className="mt-1 text-xl font-semibold text-white sm:text-2xl">
                Astronomy quiz
              </h2>
            </div>
            <button
              type="button"
              onClick={toggleMuted}
              aria-pressed={muted}
              aria-label={muted ? "Unmute quiz sounds" : "Mute quiz sounds"}
              title={muted ? "Unmute sounds" : "Mute sounds"}
              className="inline-flex h-10 items-center gap-2 rounded-2xl border border-white/10 bg-black/25 px-3 text-xs font-semibold text-slate-200 transition hover:border-cyan-300/50 hover:bg-cyan-400/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
            >
              <span aria-hidden="true">{muted ? "Off" : "On"}</span>
              <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(103,232,249,0.75)]" />
            </button>
          </div>
          <p className="mt-1 max-w-2xl text-sm text-slate-400">
            Test your space knowledge. Choose a difficulty, get instant
            feedback, and see how you score across each mission.
          </p>

          {(phase === "selecting" || selectedDifficulty) && (
            <DifficultySelector
              options={DIFFICULTY_OPTIONS}
              selectedDifficulty={selectedDifficulty}
              onSelect={handleDifficultySelect}
            />
          )}

          <div className="mt-6">
            {phase === "selecting" ? (
              <div className="rounded-2xl border border-dashed border-white/10 bg-black/20 px-4 py-5 text-sm text-slate-400">
                Pick a mission difficulty to begin the quiz.
              </div>
            ) : phase === "results" ? (
              <QuizResults
                score={score}
                total={total}
                onRestart={handleRestart}
                onChangeDifficulty={handleChangeDifficulty}
              />
            ) : currentQuestion ? (
              <QuizQuestionView
                question={currentQuestion}
                questionNumber={currentIndex + 1}
                totalQuestions={total}
                score={score}
                selectedIndex={selectedIndex}
                answered={answered}
                onSelect={handleSelect}
                onNext={handleNext}
                isLast={isLast}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
