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
  const featuredReviews = content.items.slice(0, 6);

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
        </div>

        <div className="reviews-grid" aria-label="Featured customer reviews">
          {featuredReviews.map((review, index) => (
            <article className="review-card" key={`${review.name}-${review.date}-${index}`} aria-label={`Featured review ${index + 1} of ${featuredReviews.length}`}>
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

        <div className="reviews-section__sources">
          <a href={content.sourceHref} target="_blank" rel="noreferrer">Read all 36 verified forum reviews</a>
          <a href={content.secondarySourceHref} target="_blank" rel="noreferrer">DriadaShop reviews</a>
        </div>
      </Container>
    </section>
  );
}
