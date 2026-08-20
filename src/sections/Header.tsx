import { Container } from "../components/layout/Container";
import { ExternalCartForm } from "../components/common/ExternalCartForm";
import { Button } from "../components/ui/Button";
import { siteContent } from "../content/siteContent";

export function Header() {
  return (
    <header className="site-header">
      <Container className="site-header__inner">
        <a className="wordmark" href="#top" aria-label="Retatrutide home">{siteContent.brand}</a>
        <nav className="site-nav" aria-label="Main navigation">
          {siteContent.navigation.map((item) => (
            <a href={item.href} key={item.href}>{item.label}</a>
          ))}
        </nav>
        <div className="site-header__actions">
          <Button
            href={siteContent.product.consultHref}
            target="_blank"
            rel="noreferrer"
            variant="secondary"
            className="site-header__consult"
          >
            Consult an expert
          </Button>
          <ExternalCartForm className="site-header__cta">
            Buy · {siteContent.product.price.current}
          </ExternalCartForm>
        </div>
      </Container>
    </header>
  );
}
