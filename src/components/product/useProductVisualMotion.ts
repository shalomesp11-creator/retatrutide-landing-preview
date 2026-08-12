import { useEffect, useRef, useState } from "react";
import type { ProductVisualPhase } from "./ProductVisual";

export function useProductVisualMotion() {
  const heroRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [phase, setPhase] = useState<ProductVisualPhase>("enter");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setReducedMotion(mediaQuery.matches);
    syncPreference();
    mediaQuery.addEventListener("change", syncPreference);
    return () => mediaQuery.removeEventListener("change", syncPreference);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setProgress(0);
      setPhase("settled");
      return;
    }

    let animationFrame = 0;
    let currentProgress = 0;
    let targetProgress = 0;
    let isInterpolating = false;

    const measureProgress = () => {
      const element = heroRef.current;
      if (!element) return 0;
      const rect = element.getBoundingClientRect();
      const responseDistance = Math.max(480, window.innerHeight * 0.72);
      return Math.min(1, Math.max(0, -rect.top / responseDistance));
    };

    const publish = (nextProgress: number) => {
      setProgress(nextProgress);
      setPhase(nextProgress <= 0.02 ? "enter" : nextProgress >= 0.96 ? "settled" : "scrub");
    };

    const interpolate = () => {
      const difference = targetProgress - currentProgress;
      currentProgress = Math.abs(difference) < 0.0005
        ? targetProgress
        : currentProgress + difference * 0.16;
      publish(currentProgress);

      if (currentProgress !== targetProgress) {
        animationFrame = requestAnimationFrame(interpolate);
      } else {
        isInterpolating = false;
      }
    };

    const updateTarget = () => {
      targetProgress = measureProgress();
      if (!isInterpolating) {
        isInterpolating = true;
        animationFrame = requestAnimationFrame(interpolate);
      }
    };

    currentProgress = measureProgress();
    targetProgress = currentProgress;
    publish(currentProgress);
    window.addEventListener("scroll", updateTarget, { passive: true });
    window.addEventListener("resize", updateTarget);
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", updateTarget);
      window.removeEventListener("resize", updateTarget);
    };
  }, [reducedMotion]);

  return { heroRef, progress, phase, reducedMotion };
}
