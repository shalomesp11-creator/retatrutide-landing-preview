import { Container } from "../components/layout/Container";
import { Accordion } from "../components/ui/Accordion";
import { SectionHeading } from "../components/ui/SectionHeading";
import { siteContent } from "../content/siteContent";

export function FaqSection() {
  return (
    <section id="faq" className="section faq-section">
      <Container className="faq-section__grid">
        <SectionHeading eyebrow="FAQ" title="Useful answers, without the noise." />
        <Accordion items={siteContent.faqs} />
      </Container>
    </section>
  );
}
