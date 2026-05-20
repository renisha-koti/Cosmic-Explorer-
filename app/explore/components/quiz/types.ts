/** One multiple-choice astronomy question. */
export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  /** Index into `options` for the correct answer (0–3). */
  correctIndex: number;
  /** Short explanation shown after answering. */
  explanation: string;
};

export type QuizPhase = "playing" | "results";
