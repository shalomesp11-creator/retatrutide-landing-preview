import { ExternalCartForm } from "../common/ExternalCartForm";
import { Button } from "../ui/Button";

type ProductSpec = {
  label: string;
  value: string;
};

type ProductCardProps = {
  name: string;
  dosage: string;
  specs: readonly ProductSpec[];
  buyCta: string;
  consultCta: string;
  consultHref: string;
  labCta: string;
  labHref: string;
  price: {
    current: string;
    original: string;
    saving: string;
  };
  isAvailable?: boolean;
};

const PACKSHOT = `${import.meta.env.BASE_URL}assets/product/retatrutide/product/drada-retatrutide-packshot.webp`;

export function ProductCard({
  name,
  dosage,
  specs,
  buyCta,
  consultCta,
  consultHref,
  labCta,
  labHref,
  price,
  isAvailable,
}: ProductCardProps) {
  const isUnavailable = isAvailable === false;

  return (
    <article
      className={`product-card product-card--visible ${isUnavailable ? "product-card--unavailable" : ""}`.trim()}
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
        <div className="product-card__topline" aria-label="Product availability and quality">
          <span className="product-card__stock"><i aria-hidden="true" />{isUnavailable ? "Unavailable" : "In stock"}</span>
          <a className="product-card__lab" href={labHref}>{labCta}</a>
        </div>

        <p className="product-card__brand">DRADA MEDICAL</p>
        <h3>{name}</h3>
        <p className="product-card__strength">{dosage}</p>
        <div className="product-card__price" aria-label={`Current price ${price.current}; previous price ${price.original}; ${price.saving}`}>
          <strong>{price.current}</strong>
          <s>{price.original}</s>
          <span>{price.saving}</span>
        </div>

        <dl className="product-card__specs">
          {specs.map((spec) => (
            <div key={spec.label}>
              <dt>{spec.label}</dt>
              <dd>{spec.value}</dd>
            </div>
          ))}
        </dl>

        <div className="product-card__footer">
          <div className="product-card__actions">
            <Button href={consultHref} target="_blank" rel="noreferrer" variant="secondary">{consultCta}</Button>
            <ExternalCartForm disabled={isUnavailable}>{buyCta} · {price.current}</ExternalCartForm>
          </div>
        </div>
      </div>
    </article>
  );
}
