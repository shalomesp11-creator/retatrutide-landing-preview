import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const START_IMAGE = `${import.meta.env.BASE_URL}assets/people/transformation/start.webp`;
const END_IMAGE = `${import.meta.env.BASE_URL}assets/people/transformation/end.webp`;

export function TransformationVisual() {
  const root = useRef<HTMLElement>(null);

  useGSAP((_context, contextSafe) => {
    const element = root.current;
    if (!element) return;

    const startImage = element.querySelector<HTMLElement>(".transformation-visual__start");
    const endImage = element.querySelector<HTMLElement>(".transformation-visual__end");
    const progressBar = element.querySelector<HTMLElement>(".transformation-visual__progress");
    if (!startImage || !endImage || !progressBar) return;

    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(startImage, { autoAlpha: 0, scale: 1 });
      gsap.set(endImage, { autoAlpha: 1, scale: 1 });
      gsap.set(progressBar, { scaleX: 1 });
    });

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const playhead = { progress: 0 };
      let autoDirection = 1;
      let motionTween: gsap.core.Tween | null = null;
      let resumeCall: gsap.core.Tween | null = null;
      let isVisible = true;
      let destroyed = false;

      const visualTimeline = gsap.timeline({ paused: true, defaults: { ease: "power2.inOut" } });
      visualTimeline
        .set(startImage, { autoAlpha: 1, scale: 1.012 })
        .set(endImage, { autoAlpha: 0, scale: 1.012 })
        .set(progressBar, { scaleX: 0 })
        .to(progressBar, { scaleX: 1, duration: 1, ease: "none" }, 0)
        .to(startImage, { autoAlpha: 0, scale: 1, duration: 1 }, 0)
        .to(endImage, { autoAlpha: 1, scale: 1, duration: 1 }, 0);

      const render = () => {
        const value = gsap.utils.clamp(0, 1, playhead.progress);
        visualTimeline.progress(value);
        element.dataset.transformationProgress = value.toFixed(3);
      };

      const cancelPendingMotion = () => {
        motionTween?.kill();
        resumeCall?.kill();
        motionTween = null;
        resumeCall = null;
      };

      const runAuto = () => {
        if (destroyed || !isVisible) return;
        cancelPendingMotion();
        const target = autoDirection > 0 ? 1 : 0;
        const distance = Math.abs(target - playhead.progress);
        motionTween = gsap.to(playhead, {
          progress: target,
          duration: Math.max(0.55, distance * 2.4),
          ease: "power2.inOut",
          overwrite: true,
          onUpdate: render,
          onComplete: () => {
            autoDirection *= -1;
            resumeCall = gsap.delayedCall(1.05, runAuto);
          },
        });
      };

      const toggle = contextSafe?.(() => {
        cancelPendingMotion();
        const target = playhead.progress < 0.5 ? 1 : 0;
        autoDirection = target === 1 ? -1 : 1;
        motionTween = gsap.to(playhead, {
          progress: target,
          duration: 0.9,
          ease: "power2.inOut",
          overwrite: true,
          onUpdate: render,
          onComplete: () => {
            resumeCall = gsap.delayedCall(1.25, runAuto);
          },
        });
      });

      const onKeyDown = contextSafe?.((event: KeyboardEvent) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        toggle?.();
      });

      const observer = new IntersectionObserver(([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) runAuto();
        else cancelPendingMotion();
      }, { threshold: 0.08 });

      element.addEventListener("click", toggle as EventListener);
      element.addEventListener("keydown", onKeyDown as EventListener);
      observer.observe(element);
      render();
      runAuto();

      return () => {
        destroyed = true;
        cancelPendingMotion();
        observer.disconnect();
        visualTimeline.kill();
        element.removeEventListener("click", toggle as EventListener);
        element.removeEventListener("keydown", onKeyDown as EventListener);
        delete element.dataset.transformationProgress;
      };
    });

    return () => media.revert();
  }, { scope: root });

  return (
    <figure
      ref={root}
      className="transformation-visual"
      aria-label="Illustrative full-body composition change. Activate to switch between both states."
      role="button"
      tabIndex={0}
    >
      <div className="transformation-visual__frame">
        <img
          className="transformation-visual__image transformation-visual__start"
          src={START_IMAGE}
          alt="Woman before an illustrative body-composition transformation"
          width="2048"
          height="2048"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <img
          className="transformation-visual__image transformation-visual__end"
          src={END_IMAGE}
          alt="The same woman after an illustrative body-composition transformation"
          width="2048"
          height="2048"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <span className="transformation-visual__hint" aria-hidden="true">Tap to compare</span>
        <div className="transformation-visual__progress" aria-hidden="true" />
      </div>
    </figure>
  );
}
