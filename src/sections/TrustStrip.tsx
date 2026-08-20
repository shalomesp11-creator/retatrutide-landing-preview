import { Container } from "../components/layout/Container";
import { siteContent } from "../content/siteContent";

export function TrustStrip() {
  const items = [...siteContent.trustItems, ...siteContent.trustItems];

  return (
    <section className="trust-strip" aria-label="Product commitments">
      <div className="trust-strip__viewport">
        <Container className="trust-strip__inner">
          {items.map((item, index) => {
            const content = <><p>{item.title}</p><small>{item.detail}</small></>;
            return (
              <div className="trust-strip__item" key={`${item.title}-${index}`} aria-hidden={index >= siteContent.trustItems.length || undefined}>
                {"href" in item
                  ? <a className="trust-strip__content" href={item.href} target="_blank" rel="noreferrer">{content}</a>
                  : <div className="trust-strip__content">{content}</div>}
              </div>
            );
          })}
        </Container>
      </div>
    </section>
  );
}
