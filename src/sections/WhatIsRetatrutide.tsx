import { Container } from "../components/layout/Container";
import { Badge } from "../components/ui/Badge";
import { SectionHeading } from "../components/ui/SectionHeading";
import { siteContent } from "../content/siteContent";

export function WhatIsRetatrutide() {
  const content = siteContent.whatIs;
  return (
    <section id="about" className="section what-is">
      <Container className="split-layout">
        <SectionHeading eyebrow={content.eyebrow} title={content.title} />
        <div className="what-is__body">
          {content.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <Badge>{content.note}</Badge>
        </div>
      </Container>
    </section>
  );
}
