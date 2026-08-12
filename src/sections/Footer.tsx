import { Container } from "../components/layout/Container";
import { siteContent } from "../content/siteContent";

export function Footer() {
  const { footer } = siteContent;

  const handleCookieSettings = () => {
    window.dispatchEvent(new Event("retatrutide:open-cookie-settings"));
  };

  return (
    <footer className="site-footer">
      <Container>
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <p className="wordmark">{siteContent.brand}</p>
            <p>{footer.statement}</p>
            <p className="site-footer__seller">Confirm the seller's identity and direct contact details on the purchasing website before ordering.</p>
          </div>
          <div className="site-footer__groups">
            {footer.groups.map((group) => (
              <nav aria-label={group.title} key={group.title}>
                <h2>{group.title}</h2>
                {group.links.map((item) => (
                  <a
                    href={item.href}
                    key={`${group.title}-${item.label}`}
                    onClick={item.href === "#cookies" ? handleCookieSettings : undefined}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            ))}
          </div>
        </div>

        <div className="site-footer__legal-copy" aria-label="Legal and service information">
          {footer.disclosures.map((item) => (
            <section id={item.id} key={item.id}>
              <h2>{item.title}</h2>
              <p>{item.body}</p>
            </section>
          ))}
        </div>

        <p className="site-footer__disclaimer">{footer.disclaimer}</p>
        <div className="site-footer__bottom">
          <p>© {new Date().getFullYear()} Retatrutide</p>
          <a href="#top">Back to top</a>
        </div>
      </Container>
    </footer>
  );
}
