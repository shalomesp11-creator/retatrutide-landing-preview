import { Container } from "../components/layout/Container";
import { Accordion } from "../components/ui/Accordion";
import { Button } from "../components/ui/Button";
import { SectionHeading } from "../components/ui/SectionHeading";
import { siteContent } from "../content/siteContent";

export function FaqSection() {
  return (
    <section id="faq" className="section faq-section">
      <Container className="faq-section__grid">
        <SectionHeading eyebrow="FAQ" title="Frequently asked questions." />
        <div className="faq-section__content">
          <Accordion items={siteContent.faqs} />
          <div className="faq-section__actions">
            <Button href={siteContent.product.buyHref} target="_blank" rel="noreferrer">Buy now</Button>
            <Button href={siteContent.product.consultHref} target="_blank" rel="noreferrer" variant="secondary">Consult an expert</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
