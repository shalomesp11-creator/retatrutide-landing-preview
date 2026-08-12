import type { CSSProperties } from "react";

export type ProductVisualRenderer = "image";
export type ProductVisualPhase = "enter" | "scrub" | "settled";

export type ProductVisualProps = {
  progress: number;
  phase: ProductVisualPhase;
  renderer?: ProductVisualRenderer;
  reducedMotion?: boolean;
  className?: string;
};

const PRODUCT_IMAGE = `${import.meta.env.BASE_URL}assets/product/retatrutide/hero/drada-retatrutide-hero-premium.webp`;
const clamp = (value: number) => Math.min(1, Math.max(0, value));

export function ProductVisual({
  progress,
  phase,
  renderer = "image",
  reducedMotion = false,
  className = "",
}: ProductVisualProps) {
  const p = reducedMotion ? 0 : clamp(progress);
  const style = {
    "--product-scroll-x": `${p * 8}px`,
    "--product-scroll-y": `${p * -22}px`,
    "--product-scroll-scale": 1 + p * 0.018,
    "--product-scroll-rotate": `${-0.45 + p * 0.32}deg`,
    "--product-mobile-scroll-x": `${p * 3}px`,
    "--product-mobile-scroll-y": `${p * -10}px`,
    "--product-mobile-scroll-scale": 1 + p * 0.008,
    "--product-mobile-scroll-rotate": `${-0.24 + p * 0.16}deg`,
  } as CSSProperties;

  return (
    <div
      className={`product-visual product-visual--editorial ${className}`.trim()}
      style={style}
      data-phase={phase}
      data-renderer={renderer}
      data-reduced-motion={reducedMotion ? "true" : "false"}
    >
      <figure className="editorial-product">
        <img
          src={PRODUCT_IMAGE}
          alt="DRADA Medical Retatrutide 10 mg package"
          width="1600"
          height="2555"
          decoding="async"
          fetchPriority="high"
        />
      </figure>
    </div>
  );
}
