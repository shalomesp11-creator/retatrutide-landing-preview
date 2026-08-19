import { useEffect, useRef, useState } from "react";
import { Container } from "../components/layout/Container";
import { SectionHeading } from "../components/ui/SectionHeading";
import { siteContent } from "../content/siteContent";

function getReviewerInitials(name: string) {
  const parts = name.match(/[A-Za-z]+/g) ?? [];
  if (parts.length > 1) return `${parts[0]?.[0] ?? ""}${parts[1]?.[0] ?? ""}`.toUpperCase();
  return (parts[0] ?? name).slice(0, 2).toUpperCase();
}

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
          <div className="reviews-summary">
            <strong>{content.rating}</strong>
            <span aria-label="Rated 4.92 out of 5">★★★★★</span>
            <a href={content.sourceHref} target="_blank" rel="noreferrer">{content.count}</a>
          </div>
          <div className="reviews-controls" aria-label="Review carousel controls">
            <button type="button" onClick={() => goTo(activeIndex - 1)} disabled={activeIndex === 0} aria-label="Previous review">←</button>
            <span aria-live="polite">{activeIndex + 1} / {maxIndex + 1}</span>
            <button type="button" onClick={() => goTo(activeIndex + 1)} disabled={activeIndex === maxIndex} aria-label="Next review">→</button>
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
              <article className="review-card" key={`${review.name}-${review.date}-${index}`} aria-label={`Review ${index + 1} of ${content.items.length}`}>
                <div className="review-card__meta">
                  <div className="review-card__identity">
                    {"avatar" in review && review.avatar ? (
                      <img
                        className="review-card__avatar"
                        src={review.avatar}
                        alt={`${review.name}'s forum avatar`}
                        width="96"
                        height="96"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <span className="review-card__avatar review-card__avatar--fallback" aria-hidden="true">
                        {getReviewerInitials(review.name)}
                      </span>
                    )}
                    <div>
                      <a href={review.href} target="_blank" rel="noreferrer"><h3>{review.name}</h3></a>
                      <p>{review.date}</p>
                    </div>
                  </div>
                  <span className="review-card__stars" aria-label={`${review.rating} out of 5 stars`}>{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</span>
                </div>
                <p className="review-card__body">{review.body}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="reviews-section__sources">
          <a href={content.sourceHref} target="_blank" rel="noreferrer">View all 36 reviews</a>
          <a href={content.secondarySourceHref} target="_blank" rel="noreferrer">DriadaShop reviews</a>
        </div>
      </Container>
    </section>
  );
}
