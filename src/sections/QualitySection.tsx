import { Container } from "../components/layout/Container";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { SectionHeading } from "../components/ui/SectionHeading";
import { siteContent } from "../content/siteContent";

type QualitySectionProps = {
  onOpenReport: () => void;
};

export function QualitySection({ onOpenReport }: QualitySectionProps) {
  const content = siteContent.quality;
  return (
    <section id="quality" className="section quality-section">
      <Container>
        <SectionHeading eyebrow={content.eyebrow} title={content.title} body={content.body} />
        <div className="quality-document">
          <button className="quality-document__preview" type="button" onClick={onOpenReport} aria-label={content.report.cta}>
            <img src={content.report.image} alt="" width="725" height="1107" loading="eager" decoding="async" />
          </button>
          <div className="quality-document__content">
            <Badge tone="accent">Document available</Badge>
            <h3>{content.report.title}</h3>
            <dl className="quality-document__facts">
              <div><dt>Report date</dt><dd>{content.report.date}</dd></div>
              <div><dt>Batch</dt><dd>{content.report.batch}</dd></div>
              <div><dt>Reported content</dt><dd>{content.report.content}</dd></div>
              <div><dt>Reported purity</dt><dd>{content.report.purity}</dd></div>
            </dl>
            <Button type="button" onClick={onOpenReport}>{content.report.cta}</Button>
            <p className="quality-document__note">{content.note}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
