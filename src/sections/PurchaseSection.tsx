import { Container } from "../components/layout/Container";
import { Button } from "../components/ui/Button";
import { SectionHeading } from "../components/ui/SectionHeading";
import { siteContent } from "../content/siteContent";

export function PurchaseSection() {
  const content = siteContent.purchase;

  return (
    <section id="purchase" className="section section--muted purchase-section">
      <Container>
        <SectionHeading eyebrow={content.eyebrow} title={content.title} />
        <div className="purchase-details">
          {content.cards.map((card, index) => (
            <article className="purchase-detail" key={card.title}>
              <span>0{index + 1}</span>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </article>
          ))}
        </div>
        <div className="purchase-next-step">
          <div>
            <h3>{content.nextStepTitle}</h3>
            <p>{content.nextStepBody}</p>
          </div>
          <div className="purchase-next-step__actions">
            <Button href={content.secondaryHref} variant="secondary">{content.secondaryCta}</Button>
            <Button href={content.primaryHref}>{content.primaryCta}</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
