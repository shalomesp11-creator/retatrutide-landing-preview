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
            <p className="receptor-map__eyebrow">One molecule · three signals</p>
            <div className="receptor-map__receptors">
              {content.receptors.map((receptor) => <span key={receptor}>{receptor}</span>)}
            </div>
            <div className="receptor-map__hub" aria-hidden="true">
              <span>Combined activation</span>
              <strong>Triple-action signal</strong>
              <i>↓</i>
            </div>
            <div className="receptor-map__outcomes">
              {content.outcomes.map((outcome, index) => <span key={outcome}><small>0{index + 1}</small>{outcome}</span>)}
            </div>
            <p className="receptor-map__note">Three metabolic pathways working as one coordinated system.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
