import type { CSSProperties } from "react";
import { Container } from "../components/layout/Container";
import { ProductVisual } from "../components/product/ProductVisual";
import { useProductVisualMotion } from "../components/product/useProductVisualMotion";
import { Button } from "../components/ui/Button";
import { siteContent } from "../content/siteContent";

export function Hero() {
  const { heroRef, progress, phase, reducedMotion } = useProductVisualMotion();
  const { hero } = siteContent;
  const heroStyle = {
    "--hero-progress": progress,
  } as CSSProperties;

  return (
    <section id="top" className="hero" ref={heroRef} style={heroStyle}>
      <Container className="hero__inner">
        <div className="hero__copy">
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1>{hero.title}</h1>
          <p className="hero__body">{hero.body}</p>
          <div className="hero__actions">
            <Button href="#product">{hero.primaryCta}</Button>
            <Button href="#how-it-works" variant="secondary">{hero.secondaryCta}</Button>
          </div>
          <div className="hero__marker">
            <span aria-hidden="true">01</span>
            <span>{hero.proof}</span>
          </div>
        </div>
        <ProductVisual progress={progress} phase={phase} reducedMotion={reducedMotion} />
      </Container>
    </section>
  );
}
