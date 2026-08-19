import { Container } from "../components/layout/Container";
import { Button } from "../components/ui/Button";
import { siteContent } from "../content/siteContent";

export function Footer() {
  const { footer } = siteContent;

  return (
    <footer className="site-footer">
      <Container>
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <p className="wordmark">{siteContent.brand}</p>
            <p>{footer.statement}</p>
            <p className="site-footer__seller">{footer.sellerNote}</p>
            <div className="site-footer__actions">
              <Button href={siteContent.product.consultHref} target="_blank" rel="noreferrer" variant="secondary">Consult an expert</Button>
              <Button href={siteContent.product.buyHref} target="_blank" rel="noreferrer">Buy now</Button>
            </div>
          </div>
          <div className="site-footer__groups">
            {footer.groups.map((group) => (
              <nav aria-label={group.title} key={group.title}>
                <h2>{group.title}</h2>
                {group.links.map((item) => (
                  <a
                    href={item.href}
                    key={`${group.title}-${item.label}`}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            ))}
          </div>
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
