import { useState } from "react";
import { Container } from "../components/layout/Container";
import { SectionHeading } from "../components/ui/SectionHeading";
import { siteContent } from "../content/siteContent";

export function WhoItIsFor() {
  const content = siteContent.whoFor;
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const visualIndex = previewIndex ?? selectedIndex;

  return (
    <section id="who-it-is-for" className="section who-for">
      <Container>
        <SectionHeading eyebrow={content.eyebrow} title={content.title} body={content.intro} align="center" />
        <div className="card-grid" aria-label="Product guidance topics">
          {content.cards.map((card, index) => {
            const isSelected = selectedIndex === index;
            const isVisuallyActive = visualIndex === index;

            return (
              <button
                className={`card card--interactive ${isVisuallyActive ? "card--accent" : ""}`.trim()}
                type="button"
                aria-pressed={isSelected}
                key={card.title}
                onClick={() => setSelectedIndex(index)}
                onKeyDown={(event) => {
                  if (event.key !== "Enter" && event.key !== " ") return;
                  event.preventDefault();
                  setSelectedIndex(index);
                }}
                onMouseEnter={() => setPreviewIndex(index)}
                onMouseLeave={() => setPreviewIndex(null)}
                onFocus={() => setPreviewIndex(index)}
                onBlur={() => setPreviewIndex(null)}
              >
              <span className="card__index">0{index + 1}</span>
                <span className="card__title">{card.title}</span>
                <span className="card__body">{card.body}</span>
              </button>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
