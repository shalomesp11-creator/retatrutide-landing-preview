import { useEffect, useRef, useState } from "react";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";

type ProductSpec = {
  label: string;
  value: string;
};

type ProductCardProps = {
  name: string;
  dosage: string;
  description: string;
  badges: readonly string[];
  specs: readonly ProductSpec[];
  cta: string;
  ctaHref: string;
  detailCta: string;
  onOpenDisclosure: () => void;
  isAvailable?: boolean;
};

const PACKSHOT = `${import.meta.env.BASE_URL}assets/product/retatrutide/product/drada-retatrutide-packshot.webp`;

export function ProductCard({
  name,
  dosage,
  description,
  badges,
  specs,
  cta,
  ctaHref,
  detailCta,
  onOpenDisclosure,
  isAvailable,
}: ProductCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const [isVisible, setVisible] = useState(false);
  const isUnavailable = isAvailable === false;

  useEffect(() => {
    const element = cardRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { threshold: 0.16 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={cardRef}
      className={`product-card ${isVisible ? "product-card--visible" : ""} ${isUnavailable ? "product-card--unavailable" : ""}`.trim()}
      data-availability={isUnavailable ? "unavailable" : "default"}
    >
      <div className="product-card__image">
        <img
          src={PACKSHOT}
          alt="DRADA Medical Retatrutide 10 mg package"
          width="1600"
          height="1600"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="product-card__content">
        <div className="product-card__topline" aria-label="Product format">
          {badges.map((badge) => <Badge tone="accent" key={badge}>{badge}</Badge>)}
          {isUnavailable && <Badge>Unavailable</Badge>}
        </div>

        <p className="product-card__brand">DRADA MEDICAL</p>
        <h3>{name}</h3>
        <p className="product-card__strength">{dosage}</p>
        <p className="product-card__description">{description}</p>

        <dl className="product-card__specs">
          {specs.map((spec) => (
            <div key={spec.label}>
              <dt>{spec.label}</dt>
              <dd>{spec.value}</dd>
            </div>
          ))}
        </dl>

        <div className="product-card__footer">
          <span>One product · one dosage</span>
          <div className="product-card__actions">
            <Button type="button" variant="secondary" onClick={onOpenDisclosure}>{detailCta}</Button>
            <Button href={ctaHref} disabled={isUnavailable}>{cta}</Button>
          </div>
        </div>
      </div>
    </article>
  );
}
