import confetti from "canvas-confetti";

export const triggerLessonSuccessConfetti = (originY: number = 0.6) => {
  // 1. Initial center starburst
  confetti({
    particleCount: 90,
    spread: 70,
    origin: { y: originY },
    colors: ["#06b6d4", "#10b981", "#3b82f6", "#f59e0b", "#ec4899", "#8b5cf6"],
    ticks: 250,
    gravity: 0.9,
    scalar: 1.1
  });

  // 2. Left and right cannons after 180ms
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 60,
      origin: { x: 0.05, y: originY + 0.1 },
      colors: ["#10b981", "#06b6d4", "#fbbf24"]
    });
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 60,
      origin: { x: 0.95, y: originY + 0.1 },
      colors: ["#3b82f6", "#a855f7", "#ec4899"]
    });
  }, 180);

  // 3. Falling gold stars / glitter after 350ms
  setTimeout(() => {
    confetti({
      particleCount: 35,
      spread: 100,
      origin: { y: originY - 0.2 },
      colors: ["#fbbf24", "#f59e0b", "#fde047"],
      shapes: ["circle"],
      scalar: 0.8
    });
  }, 350);

  // Synthesize pleasant celebratory chime with Web Audio API
  playCelebrationSound();
};

export const playCelebrationSound = () => {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    
    // Uplifting arpeggio: C5 (523.25Hz), E5 (659.25Hz), G5 (783.99Hz), C6 (1046.50Hz)
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
      
      gain.gain.setValueAtTime(0.001, ctx.currentTime + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.35);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(ctx.currentTime + idx * 0.08);
      osc.stop(ctx.currentTime + idx * 0.08 + 0.4);
    });
  } catch {
    // Graceful fallback if autoplay restrictions prevent audio
  }
};
