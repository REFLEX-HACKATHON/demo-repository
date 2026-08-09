"use client";

import { useState } from "react";
import { CheckCircle, Sparkles } from "lucide-react";
import { shuffleContent } from "@/lib/gameLogic";
import AnswerFX from "@/components/practice-mode/AnswerFX";
import { mockContent } from "@/data/mockContent";

export default function PracticeMode() {
  const [shuffledContent, setShuffledContent] = useState(() =>
    shuffleContent(mockContent)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState
    "real" | "ai_generated" | null
  >(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [imageError, setImageError] = useState(false);

  const current = shuffledContent[currentIndex];
  const hasAnswered = selectedAnswer !== null;
  const isCorrect = selectedAnswer === current.correctAnswer;

  function handleAnswer(answer: "real" | "ai_generated") {
    setSelectedAnswer(answer);
    if (answer === current.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  }

  function handleNext() {
    if (currentIndex + 1 < shuffledContent.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setImageError(false);
    } else {
      setIsFinished(true);
    }
  }

  function handleRestart() {
    setShuffledContent(shuffleContent(mockContent));
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setIsFinished(false);
    setImageError(false);
  }

  if (isFinished) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center bg-[#0a0e1a]">
        <h1 className="text-3xl font-bold text-white">
          Score: {score} / {shuffledContent.length}
        </h1>
        <p className="text-slate-400">Well played! Ready for another round?</p>
        <button
          onClick={handleRestart}
          className="mt-4 px-8 py-3 rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black font-semibold transition-colors"
        >
          Play Again
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center bg-[#0a0e1a]">
      <header className="w-full max-w-lg flex items-center justify-between mb-2">
        <img src="/reflex-logo.png" alt="Reflex" className="h-8" />
        <span className="text-sm text-slate-400">Score: {score}</span>
      </header>

      <div className="w-full max-w-lg h-2 bg-white/10 rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-gradient-to-r from-amber-500 to-yellow-600 transition-all duration-300"
          style={{
            width: `${((currentIndex + 1) / shuffledContent.length) * 100}%`,
          }}
        />
      </div>

      <div className="max-w-lg bg-white/5 rounded-2xl p-8 border border-white/10">
        {current.type === "text" ? (
          <p className="text-xl text-white">{current.contentText}</p>
        ) : imageError ? (
          <div className="flex flex-col items-center gap-2 py-8">
            <p className="text-slate-500">Image unavailable</p>
          </div>
        ) : (
          <img
            src={current.contentUrl}
            alt="Content to evaluate"
            className="rounded-xl max-h-80 mx-auto"
            onError={() => setImageError(true)}
          />
        )}
      </div>

      {!hasAnswered ? (
        <div className="flex gap-4">
          <button
            onClick={() => handleAnswer("real")}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors"
          >
            <CheckCircle size={18} />
            Real
          </button>
          <button
            onClick={() => handleAnswer("ai_generated")}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors"
          >
            <Sparkles size={18} />
            AI-generated
          </button>
        </div>
      ) : (
        <div
          className={`max-w-lg bg-white/5 rounded-2xl p-8 border-2 flex flex-col gap-3 ${
            isCorrect ? "border-green-400/50" : "border-red-400/50"
          }`}
        >
          <AnswerFX isCorrect={isCorrect} />
          <p
            className={`text-lg font-bold ${
              isCorrect ? "text-green-400" : "text-red-400"
            }`}
          >
            {isCorrect ? "Correct" : "Not quite"}
          </p>
          <p className="text-sm uppercase tracking-wide text-amber-400">
            {current.technique.replace("_", " ")}
          </p>
          <p className="text-slate-300">{current.explanation}</p>

          <button
            onClick={handleNext}
            className="mt-4 px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black font-semibold transition-colors self-center"
          >
            Next
          </button>
        </div>
      )}
    </main>
  );
}
