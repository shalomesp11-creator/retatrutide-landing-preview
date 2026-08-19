import { Container } from "../components/layout/Container";
import { ProductVisual } from "../components/product/ProductVisual";
import { Button } from "../components/ui/Button";
import { siteContent } from "../content/siteContent";

export function Hero() {
  const { hero } = siteContent;

  return (
    <section id="top" className="hero">
      <Container className="hero__inner">
        <div className="hero__copy">
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1>{hero.title}</h1>
          <p className="hero__lead">{hero.lead}</p>
          <p className="hero__body">{hero.body}</p>
          <div className="hero__actions">
            <Button href="#how-it-works">{hero.primaryCta}</Button>
            <Button href={hero.secondaryHref} target="_blank" rel="noreferrer" variant="secondary">{hero.secondaryCta}</Button>
          </div>
          <div className="hero__facts" aria-label="Availability and delivery information">
            <span className="hero__status"><i aria-hidden="true" />In stock</span>
            <span>EU delivery</span>
            <span>Dispatch within 48 hours</span>
          </div>
          <div className="hero__review-links">
            <a href={hero.reviewHref} target="_blank" rel="noreferrer">Lab test · 99% purity</a>
            <a href={hero.reviewHref} target="_blank" rel="noreferrer">★ 4.92/5 · 36 reviews</a>
            <a href={hero.secondaryReviewHref} target="_blank" rel="noreferrer">DriadaShop reviews · eRoids</a>
            <a href="#reviews">View all reviews</a>
          </div>
        </div>
        <ProductVisual progress={0} phase="settled" reducedMotion />
      </Container>
    </section>
  );
}
