import { Container } from "../components/layout/Container";
import { SectionHeading } from "../components/ui/SectionHeading";
import { siteContent } from "../content/siteContent";

export function HowItWorks() {
  const content = siteContent.howItWorks;
  return (
    <section id="how-it-works" className="section section--muted how-it-works">
      <Container>
        <SectionHeading eyebrow={content.eyebrow} title={content.title} body={content.intro} />
        <ol className="mechanism-list">
          {content.receptors.map((receptor) => (
            <li className="mechanism-card" key={receptor.number}>
              <div className="mechanism-card__heading">
                <span aria-hidden="true">{receptor.number}</span>
                <h3>{receptor.title}</h3>
              </div>
              <div className="mechanism-card__copy">
                {receptor.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
