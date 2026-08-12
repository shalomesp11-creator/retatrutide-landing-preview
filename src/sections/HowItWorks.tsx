import { Container } from "../components/layout/Container";
import { SectionHeading } from "../components/ui/SectionHeading";
import { siteContent } from "../content/siteContent";

export function HowItWorks() {
  const content = siteContent.howItWorks;
  return (
    <section id="how-it-works" className="section section--muted how-it-works">
      <Container>
        <SectionHeading eyebrow={content.eyebrow} title={content.title} />
        <ol className="process-grid">
          {content.steps.map((step) => (
            <li className="process-step" key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
