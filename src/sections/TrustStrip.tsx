import { Container } from "../components/layout/Container";
import { siteContent } from "../content/siteContent";

export function TrustStrip() {
  return (
    <section className="trust-strip" aria-label="Product commitments">
      <Container className="trust-strip__inner">
        {siteContent.trustItems.map((item, index) => (
          <div className="trust-strip__item" key={item.title}>
            <span aria-hidden="true">0{index + 1}</span>
            <div>
              <p>{item.title}</p>
              <small>{item.detail}</small>
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
}
