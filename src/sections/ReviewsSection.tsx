import { useEffect, useRef, useState } from "react";
import { Container } from "../components/layout/Container";
import { SectionHeading } from "../components/ui/SectionHeading";
import { siteContent } from "../content/siteContent";

export function ReviewsSection() {
  const content = siteContent.reviews;
  const viewportRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(content.items.length - 1);

  const goTo = (index: number) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const slides = viewport.querySelectorAll<HTMLElement>(".review-card");
    const nextIndex = Math.max(0, Math.min(index, maxIndex));
    const slide = slides[nextIndex];
    viewport.scrollTo({ left: slide.offsetLeft - viewport.offsetLeft, behavior: "smooth" });
    setActiveIndex(nextIndex);
  };

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    let frame = 0;
    const measure = () => {
      const slides = [...viewport.querySelectorAll<HTMLElement>(".review-card")];
      const maxScroll = viewport.scrollWidth - viewport.clientWidth;
      const lastStart = slides.reduce((last, slide, index) => (
        slide.offsetLeft - viewport.offsetLeft <= maxScroll + 1 ? index : last
      ), 0);
      setMaxIndex(lastStart);
      setActiveIndex((current) => Math.min(current, lastStart));
    };
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const slides = [...viewport.querySelectorAll<HTMLElement>(".review-card")].slice(0, maxIndex + 1);
        const closest = slides.reduce((best, slide, index) => {
          const distance = Math.abs(slide.offsetLeft - viewport.offsetLeft - viewport.scrollLeft);
          return distance < best.distance ? { index, distance } : best;
        }, { index: 0, distance: Number.POSITIVE_INFINITY });
        setActiveIndex(closest.index);
      });
    };
    measure();
    viewport.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(frame);
      viewport.removeEventListener("scroll", update);
      window.removeEventListener("resize", measure);
    };
  }, [maxIndex]);

  return (
    <section id="reviews" className="section reviews-section">
      <Container>
        <div className="reviews-section__heading">
          <SectionHeading eyebrow={content.eyebrow} title={content.title} />
          <div className="reviews-controls" aria-label="Review carousel controls">
            <button type="button" onClick={() => goTo(activeIndex - 1)} disabled={activeIndex === 0} aria-label="Previous review">
              <span aria-hidden="true">←</span>
            </button>
            <span aria-live="polite">{activeIndex + 1} / {maxIndex + 1}</span>
            <button type="button" onClick={() => goTo(activeIndex + 1)} disabled={activeIndex === maxIndex} aria-label="Next review">
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
        <div
          className="reviews-carousel"
          ref={viewportRef}
          tabIndex={0}
          aria-label="Reviews"
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              goTo(activeIndex - 1);
            }
            if (event.key === "ArrowRight") {
              event.preventDefault();
              goTo(activeIndex + 1);
            }
          }}
        >
          <div className="reviews-track">
            {content.items.map((review, index) => (
              <article className="review-card" key={`${review.name}-${review.country}`} aria-label={`Review ${index + 1} of ${content.items.length}`}>
                <div className="review-card__meta">
                  <span className="review-card__avatar" aria-hidden="true">{review.initials}</span>
                  <div>
                    <h3>{review.name}</h3>
                    <p>
                      <span className={`review-card__flag review-card__flag--${review.flagCode}`} role="img" aria-label={`Flag of ${review.country}`} />
                      {review.country}
                    </p>
                  </div>
                </div>
                <p className="review-card__body">“{review.body}”</p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
