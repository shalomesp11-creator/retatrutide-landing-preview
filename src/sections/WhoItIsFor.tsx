import { useState } from "react";
import { Container } from "../components/layout/Container";
import { SectionHeading } from "../components/ui/SectionHeading";
import { siteContent } from "../content/siteContent";

export function WhoItIsFor() {
  const content = siteContent.whoFor;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedCard = content.cards[selectedIndex];

  return (
    <section id="who-it-is-for" className="section who-for">
      <Container>
        <SectionHeading eyebrow={content.eyebrow} title={content.title} body={content.intro} align="center" />
        <div className="benefit-selector" aria-label="Who may benefit topics">
          {content.cards.map((card, index) => {
            const isSelected = selectedIndex === index;
            return (
              <button
                className={`benefit-selector__button ${isSelected ? "is-selected" : ""}`.trim()}
                type="button"
                aria-pressed={isSelected}
                aria-controls="selected-benefit"
                key={card.title}
                onClick={() => setSelectedIndex(index)}
              >
                <img src={card.image} alt={card.imageAlt} width="480" height="600" loading="lazy" decoding="async" />
                <span className="benefit-selector__index">0{index + 1}</span>
                <span className="benefit-selector__title">{card.title}</span>
                <span className="benefit-selector__state">{isSelected ? "Selected" : "Select"}</span>
              </button>
            );
          })}
        </div>
        <article id="selected-benefit" className="benefit-detail" aria-live="polite">
          <img src={selectedCard.image} alt="" width="480" height="600" loading="lazy" decoding="async" />
          <span className="benefit-detail__index" aria-hidden="true">0{selectedIndex + 1}</span>
          <div>
            <h3>{selectedCard.title}</h3>
            <p>{selectedCard.body}</p>
          </div>
        </article>
      </Container>
    </section>
  );
}
