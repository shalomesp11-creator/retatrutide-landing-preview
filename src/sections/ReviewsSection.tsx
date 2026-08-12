import { Container } from "../components/layout/Container";
import { SectionHeading } from "../components/ui/SectionHeading";
import { siteContent } from "../content/siteContent";

export function ReviewsSection() {
  const content = siteContent.reviews;

  return (
    <section id="reviews" className="section reviews-section">
      <Container>
        <div className="reviews-section__heading">
          <SectionHeading eyebrow={content.eyebrow} title={content.title} />
          <p className="reviews-section__notice">{content.notice}</p>
        </div>
        <div className="reviews-grid">
          {content.items.map((review) => (
            <article className="review-card" key={`${review.name}-${review.country}`}>
              <div className="review-card__meta">
                <span className="review-card__avatar" aria-hidden="true">{review.initials}</span>
                <div>
                  <h3>{review.name}</h3>
                  <p>
                    <span
                      className={`review-card__flag review-card__flag--${review.flagCode}`}
                      role="img"
                      aria-label={`Flag of ${review.country}`}
                    />
                    {review.country}
                  </p>
                </div>
              </div>
              <p className="review-card__body">“{review.body}”</p>
              <span className="review-card__status">Demonstration review</span>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
