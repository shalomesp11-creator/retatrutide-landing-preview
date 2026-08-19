import { Container } from "../components/layout/Container";
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
