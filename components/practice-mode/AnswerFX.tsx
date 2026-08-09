"use client";

import { useEffect, useRef } from "react";

interface AnswerFXProps {
  isCorrect: boolean;
}

export default function AnswerFX({ isCorrect }: AnswerFXProps) {
  const played = useRef(false);

  useEffect(() => {
    if (played.current) return;
    played.current = true;
    playSound(isCorrect);
  }, [isCorrect]);

  return (
    <>
      <div className="answer-fx-emoji">{isCorrect ? "🎉" : "👎"}</div>
      <style jsx>{`
        .answer-fx-emoji {
          font-size: 56px;
          text-align: center;
          animation: pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        @keyframes pop {
          0% {
            transform: scale(0) rotate(-15deg);
            opacity: 0;
          }
          60% {
            transform: scale(1.3) rotate(8deg);
            opacity: 1;
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}

function playSound(isCorrect: boolean) {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    if (isCorrect) {
      [523.25, 659.25, 783.99].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.15, now + i * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.1);
        osc.stop(now + i * 0.1 + 0.25);
      });
    } else {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.3);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
    }
  } catch {
    // audio bloqué par le navigateur (ex: avant interaction utilisateur) — on ignore
  }
}
