import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const START_IMAGE = `${import.meta.env.BASE_URL}assets/people/transformation/start.webp`;
const END_IMAGE = `${import.meta.env.BASE_URL}assets/people/transformation/end.webp`;

export function TransformationVisual() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(".transformation-visual__start", { autoAlpha: 0 });
      gsap.set(".transformation-visual__end", { autoAlpha: 1 });
      gsap.set(".transformation-visual__progress", { scaleX: 1 });
    });

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const timeline = gsap.timeline({ repeat: -1, repeatDelay: 1.2 });
      timeline
        .set(".transformation-visual__start", { autoAlpha: 1, scale: 1 })
        .set(".transformation-visual__end", { autoAlpha: 0, scale: 1.015 })
        .set(".transformation-visual__progress", { scaleX: 0 })
        .to(".transformation-visual__progress", { scaleX: 1, duration: 3.8, ease: "power1.inOut" }, 0.8)
        .to(".transformation-visual__start", { autoAlpha: 0, scale: 0.992, duration: 2.4, ease: "power2.inOut" }, 1.5)
        .to(".transformation-visual__end", { autoAlpha: 1, scale: 1, duration: 2.4, ease: "power2.inOut" }, 1.5)
        .to([".transformation-visual__start", ".transformation-visual__end"], { autoAlpha: 1, duration: 0.9 }, "+=1.8")
        .to(".transformation-visual__end", { autoAlpha: 0, duration: 1.8, ease: "power2.inOut" })
        .to(".transformation-visual__progress", { scaleX: 0, duration: 1.8, ease: "power2.inOut" }, "<");
    });

    return () => media.revert();
  }, { scope: root });

  return (
    <figure
      ref={root}
      className="transformation-visual"
      aria-label="Illustrative body-composition transformation"
    >
      <div className="transformation-visual__frame">
        <img
          className="transformation-visual__image transformation-visual__start"
          src={START_IMAGE}
          alt="Woman before an illustrative body-composition transformation"
          width="2048"
          height="2048"
          loading="lazy"
          decoding="async"
        />
        <img
          className="transformation-visual__image transformation-visual__end"
          src={END_IMAGE}
          alt="The same woman after an illustrative body-composition transformation"
          width="2048"
          height="2048"
          loading="lazy"
          decoding="async"
        />
        <div className="transformation-visual__progress" aria-hidden="true" />
      </div>
    </figure>
  );
}
