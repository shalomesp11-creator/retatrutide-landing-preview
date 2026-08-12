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
            <span>{content.report.cta}</span>
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
        <ul className="quality-list" aria-label="Quality and authenticity information">
          {content.points.map((point, index) => (
            <li key={point.title}>
              <span aria-hidden="true">0{index + 1}</span>
              <div><h3>{point.title}</h3><p>{point.body}</p></div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
