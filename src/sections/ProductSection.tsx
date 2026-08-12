import { Container } from "../components/layout/Container";
import { ProductCard } from "../components/product/ProductCard";
import { SectionHeading } from "../components/ui/SectionHeading";
import { siteContent } from "../content/siteContent";

type ProductSectionProps = {
  onOpenDisclosure: () => void;
};

export function ProductSection({ onOpenDisclosure }: ProductSectionProps) {
  const { product } = siteContent;
  return (
    <section id="product" className="section product-section">
      <Container>
        <SectionHeading eyebrow={product.eyebrow} title={product.title} />
        <ProductCard {...product} onOpenDisclosure={onOpenDisclosure} />
      </Container>
    </section>
  );
}
