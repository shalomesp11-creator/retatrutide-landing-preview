import { Container } from "../components/layout/Container";
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
        <Button href="#product" className="site-header__cta">View product</Button>
      </Container>
    </header>
  );
}
