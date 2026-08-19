import { Container } from "../components/layout/Container";
import { TransformationVisual } from "../components/product/TransformationVisual";
import { SectionHeading } from "../components/ui/SectionHeading";
import { siteContent } from "../content/siteContent";

export function WhatIsRetatrutide() {
  const content = siteContent.whatIs;
  return (
    <section id="about" className="section what-is">
      <Container>
        <div className="split-layout">
          <SectionHeading eyebrow={content.eyebrow} title={content.title} />
          <div className="what-is__body">
            {content.body.map((paragraph) => <p key={paragraph}><strong>{paragraph}</strong></p>)}
          </div>
        </div>
        <div className="what-is__visual-row">
          <TransformationVisual />
          <div className="receptor-map" role="img" aria-label="GLP-1, GIP, and glucagon regulate appetite, blood sugar, and energy expenditure through a combined triple mechanism.">
            <div className="receptor-map__receptors">
              {content.receptors.map((receptor) => <span key={receptor}>{receptor}</span>)}
            </div>
            <span className="receptor-map__connector" aria-hidden="true">Combined activation</span>
            <div className="receptor-map__outcomes">
              {content.outcomes.map((outcome) => <span key={outcome}>{outcome}</span>)}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
