import { useEffect, useState } from "react";
import { Button } from "../ui/Button";

type MobileStickyCtaProps = {
  href: string;
  label: string;
};

export function MobileStickyCta({ href, label }: MobileStickyCtaProps) {
  const [heroVisible, setHeroVisible] = useState(true);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) {
      setHeroVisible(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0.01 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const footer = document.querySelector(".site-footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0.01 },
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  if (heroVisible || footerVisible) return null;

  return (
    <div className="mobile-sticky-cta">
      <Button href={href}>{label}</Button>
    </div>
  );
}
