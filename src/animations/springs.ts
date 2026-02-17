import { spring, SpringConfig } from "remotion";

export const springConfigs = {
  gentle: { damping: 20, mass: 0.5, stiffness: 80, overshootClamping: false } satisfies SpringConfig,
  bounce: { damping: 12, mass: 0.8, stiffness: 120, overshootClamping: false } satisfies SpringConfig,
  snappy: { damping: 30, mass: 0.3, stiffness: 200, overshootClamping: true } satisfies SpringConfig,
  slow: { damping: 25, mass: 1.2, stiffness: 60, overshootClamping: false } satisfies SpringConfig,
} as const;

export const fadeIn = (frame: number, fps: number, delay = 0) =>
  spring({ frame: frame - delay * fps, fps, config: springConfigs.gentle });

export const slideIn = (frame: number, fps: number, delay = 0) => {
  const progress = spring({
    frame: frame - delay * fps,
    fps,
    config: springConfigs.snappy,
  });
  return { opacity: progress, translateY: (1 - progress) * 40 };
};

export const scaleIn = (frame: number, fps: number, delay = 0) => {
  const progress = spring({
    frame: frame - delay * fps,
    fps,
    config: springConfigs.bounce,
  });
  return { opacity: progress, scale: progress };
};
