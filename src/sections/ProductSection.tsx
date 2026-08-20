import { Container } from "../components/layout/Container";
import { ExternalCartForm } from "../components/common/ExternalCartForm";
import { ProductCard } from "../components/product/ProductCard";
import { SectionHeading } from "../components/ui/SectionHeading";
import { siteContent } from "../content/siteContent";

export function ProductSection() {
  const { product } = siteContent;
  return (
    <section id="product" className="section product-section">
      <Container>
        <SectionHeading eyebrow={product.eyebrow} title={product.title} />
        <ProductCard {...product} />
        <section className="bundle-pricing" aria-labelledby="bundle-pricing-title">
          <header className="bundle-pricing__heading">
            <p className="eyebrow">Stock up & save</p>
            <h3 id="bundle-pricing-title">Buy more, pay less per unit.</h3>
          </header>
          <div className="bundle-pricing__grid">
            {product.bundles.map((bundle) => (
              <article className={`bundle-card ${"popular" in bundle && bundle.popular ? "bundle-card--popular" : ""}`.trim()} key={bundle.name}>
                {"popular" in bundle && bundle.popular ? <span className="bundle-card__popular">Most popular</span> : null}
                <div>
                  <h4>{bundle.name}</h4>
                  <p>{bundle.units}</p>
                </div>
                <div className="bundle-card__price">
                  <strong>{bundle.total}</strong>
                  <s>{bundle.original}</s>
                </div>
                <p className="bundle-card__value"><span>{bundle.unitPrice}</span><span>{bundle.saving}</span></p>
                <ExternalCartForm>{bundle.cta}</ExternalCartForm>
              </article>
            ))}
          </div>
        </section>
        <aside className="storage-panel product-storage" aria-labelledby="storage-title">
          <div>
            <p className="eyebrow">Storage & safety information</p>
            <h3 id="storage-title">{siteContent.quality.storageTitle}</h3>
          </div>
          <ul>
            {siteContent.quality.storage.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </aside>
      </Container>
    </section>
  );
}
