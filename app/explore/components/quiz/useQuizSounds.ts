"use client";

import { useCallback, useRef, useState } from "react";

type BrowserAudioWindow = Window & {
  webkitAudioContext?: typeof AudioContext;
};

const MASTER_VOLUME = 0.16;

/** Small Web Audio sound set for quiz feedback. */
export function useQuizSounds() {
  const [muted, setMuted] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  const getAudioContext = useCallback(() => {
    if (typeof window === "undefined") return null;

    if (!audioContextRef.current) {
      const AudioContextClass =
        window.AudioContext ||
        (window as BrowserAudioWindow).webkitAudioContext;

      if (!AudioContextClass) return null;
      audioContextRef.current = new AudioContextClass();
    }

    return audioContextRef.current;
  }, []);

  const playTone = useCallback(
    (
      frequency: number,
      startTime: number,
      duration: number,
      type: OscillatorType,
      volume: number,
    ) => {
      const audioContext = getAudioContext();
      if (!audioContext || muted) return;

      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();

      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, startTime);
      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.exponentialRampToValueAtTime(volume, startTime + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      oscillator.connect(gain);
      gain.connect(audioContext.destination);
      oscillator.start(startTime);
      oscillator.stop(startTime + duration + 0.02);
    },
    [getAudioContext, muted],
  );

  const playCorrect = useCallback(() => {
    const audioContext = getAudioContext();
    if (!audioContext || muted) return;

    void audioContext.resume();
    const now = audioContext.currentTime;
    playTone(523.25, now, 0.18, "sine", MASTER_VOLUME);
    playTone(783.99, now + 0.08, 0.22, "triangle", MASTER_VOLUME * 0.9);
  }, [getAudioContext, muted, playTone]);

  const playWrong = useCallback(() => {
    const audioContext = getAudioContext();
    if (!audioContext || muted) return;

    void audioContext.resume();
    const now = audioContext.currentTime;
    playTone(220, now, 0.14, "sawtooth", MASTER_VOLUME * 0.55);
    playTone(164.81, now + 0.08, 0.18, "triangle", MASTER_VOLUME * 0.5);
  }, [getAudioContext, muted, playTone]);

  return {
    muted,
    playCorrect,
    playWrong,
    toggleMuted: () => setMuted((isMuted) => !isMuted),
  };
}
