import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const START_IMAGE = `${import.meta.env.BASE_URL}assets/people/transformation/start.webp`;
const END_IMAGE = `${import.meta.env.BASE_URL}assets/people/transformation/end.webp`;

export function TransformationVisual() {
  const root = useRef<HTMLElement>(null);

  useGSAP((_context, contextSafe) => {
    const media = gsap.matchMedia();
    const images = gsap.utils.toArray<HTMLImageElement>(".transformation-visual__image");
    const refresh = () => ScrollTrigger.refresh();

    images.forEach((image) => {
      if (!image.complete) image.addEventListener("load", refresh, { once: true });
    });

    media.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(".transformation-visual__start", { autoAlpha: 0 });
      gsap.set(".transformation-visual__end", { autoAlpha: 1 });
      gsap.set(".transformation-visual__progress", { scaleX: 1 });
    });

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const element = root.current;
      if (!element) return;

      const playhead = { progress: 0 };
      let autoDirection = 1;
      let resumeCall: gsap.core.Tween | null = null;
      let destroyed = false;

      const visualTimeline = gsap.timeline({ paused: true, defaults: { ease: "power2.inOut" } });
      visualTimeline
        .set(".transformation-visual__start", { autoAlpha: 1, scale: 1.075 })
        .set(".transformation-visual__end", { autoAlpha: 0, scale: 1.085 })
        .set(".transformation-visual__progress", { scaleX: 0 })
        .to(".transformation-visual__progress", { scaleX: 1, duration: 1, ease: "none" }, 0)
        .to(".transformation-visual__start", { autoAlpha: 0, scale: 0.985, duration: 1 }, 0)
        .to(".transformation-visual__end", { autoAlpha: 1, scale: 1, duration: 1 }, 0);

      const render = () => {
        visualTimeline.progress(gsap.utils.clamp(0, 1, playhead.progress));
        element.dataset.transformationProgress = playhead.progress.toFixed(3);
      };

      const cancelPendingMotion = () => {
        gsap.killTweensOf(playhead);
        resumeCall?.kill();
        resumeCall = null;
      };

      const runAuto = () => {
        if (destroyed) return;
        cancelPendingMotion();

        const target = autoDirection > 0 ? 1 : 0;
        const distance = Math.abs(target - playhead.progress);
        gsap.to(playhead, {
          progress: target,
          duration: Math.max(0.35, distance * 2),
          ease: "power2.inOut",
          overwrite: true,
          onUpdate: render,
          onComplete: () => {
            autoDirection *= -1;
            resumeCall = gsap.delayedCall(0.18, runAuto);
          },
        });
      };

      const resumeAutoAfter = (delay: number) => {
        resumeCall?.kill();
        resumeCall = gsap.delayedCall(delay, runAuto);
      };

      const animateFromInput = (target: number, duration: number, resumeDelay: number) => {
        cancelPendingMotion();
        autoDirection = target >= 0.5 ? -1 : 1;
        gsap.to(playhead, {
          progress: target,
          duration,
          ease: "power2.inOut",
          overwrite: true,
          onUpdate: render,
          onComplete: () => resumeAutoAfter(resumeDelay),
        });
      };

      const toggle = contextSafe?.(() => {
        const target = playhead.progress < 0.5 ? 1 : 0;
        const distance = Math.abs(target - playhead.progress);
        animateFromInput(target, Math.max(0.35, distance * 1.4), 0.45);
      });

      const onKeyDown = contextSafe?.((event: KeyboardEvent) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        toggle?.();
      });

      let lastScrollProgress = -1;
      const scrollTrigger = ScrollTrigger.create({
        id: "body-transformation",
        trigger: element,
        start: "top 82%",
        end: "bottom 18%",
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (Math.abs(self.progress - lastScrollProgress) < 0.001) return;
          lastScrollProgress = self.progress;
          cancelPendingMotion();
          playhead.progress = self.progress;
          autoDirection = self.progress >= 0.5 ? -1 : 1;
          render();
          resumeAutoAfter(0.75);
        },
      });

      element.addEventListener("click", toggle as EventListener);
      element.addEventListener("keydown", onKeyDown as EventListener);
      render();
      runAuto();

      return () => {
        destroyed = true;
        cancelPendingMotion();
        scrollTrigger.kill();
        visualTimeline.kill();
        element.removeEventListener("click", toggle as EventListener);
        element.removeEventListener("keydown", onKeyDown as EventListener);
        delete element.dataset.transformationProgress;
      };
    });

    return () => {
      images.forEach((image) => image.removeEventListener("load", refresh));
      media.revert();
    };
  }, { scope: root });

  return (
    <figure
      ref={root}
      className="transformation-visual"
      aria-label="Illustrative body-composition transformation"
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
        <div className="transformation-visual__progress" aria-hidden="true" />
      </div>
    </figure>
  );
}
