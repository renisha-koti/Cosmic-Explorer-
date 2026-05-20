"use client";

import { useState } from "react";
import { QUIZ_QUESTIONS } from "./questions";
import QuizQuestionView from "./QuizQuestion";
import QuizResults from "./QuizResults";
import type { QuizPhase } from "./types";

/** Interactive astronomy quiz with score tracking and results screen. */
export default function AstronomyQuiz() {
  const total = QUIZ_QUESTIONS.length;
  const [phase, setPhase] = useState<QuizPhase>("playing");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  const currentQuestion = QUIZ_QUESTIONS[currentIndex];
  const isLast = currentIndex === total - 1;

  const handleSelect = (index: number) => {
    if (answered || !currentQuestion) return;
    setSelectedIndex(index);
    setAnswered(true);
    if (index === currentQuestion.correctIndex) {
      setScore((s) => s + 1);
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
    setPhase("playing");
    setCurrentIndex(0);
    setScore(0);
    setSelectedIndex(null);
    setAnswered(false);
  };

  return (
    <div className="mt-12 w-full max-w-5xl" aria-label="Astronomy quiz">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-4 shadow-[0_0_80px_rgba(99,102,241,0.08)] backdrop-blur-xl sm:p-6">
        <div className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-r from-violet-400/15 via-transparent to-cyan-400/15" />

        <div className="relative">
          <p className="text-[11px] font-semibold tracking-[0.28em] text-violet-300/80 uppercase">
            Challenge mode
          </p>
          <h2 className="mt-1 text-xl font-semibold text-white sm:text-2xl">
            Astronomy quiz
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-slate-400">
            Test your space knowledge. Pick an answer, get instant feedback, and
            see how you score across {total} questions.
          </p>

          <div className="mt-6">
            {phase === "results" ? (
              <QuizResults
                score={score}
                total={total}
                onRestart={handleRestart}
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
