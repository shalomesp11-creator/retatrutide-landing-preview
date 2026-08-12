import { Container } from "../components/layout/Container";
import { Button } from "../components/ui/Button";
import { SectionHeading } from "../components/ui/SectionHeading";
import { siteContent } from "../content/siteContent";

export function HowToGet() {
  const content = siteContent.howToGet;
  return (
    <section id="how-to-get" className="section how-to-get">
      <Container>
        <SectionHeading eyebrow={content.eyebrow} title={content.title} />
        <ol className="numbered-steps">
          {content.steps.map((step) => (
            <li key={step.number}>
              <span>{step.number}</span>
              <div><h3>{step.title}</h3><p>{step.body}</p></div>
            </li>
          ))}
        </ol>
        <div className="how-to-get__action">
          <Button href={content.ctaHref}>{content.cta}</Button>
        </div>
      </Container>
    </section>
  );
}
