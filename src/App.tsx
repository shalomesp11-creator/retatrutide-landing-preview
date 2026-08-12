import { useState } from "react";
import { CookieBanner } from "./components/common/CookieBanner";
import { MobileStickyCta } from "./components/common/MobileStickyCta";
import { Button } from "./components/ui/Button";
import { Modal } from "./components/ui/Modal";
import { siteContent } from "./content/siteContent";
import { FaqSection } from "./sections/FaqSection";
import { Footer } from "./sections/Footer";
import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { HowItWorks } from "./sections/HowItWorks";
import { HowToGet } from "./sections/HowToGet";
import { ProductSection } from "./sections/ProductSection";
import { PurchaseSection } from "./sections/PurchaseSection";
import { QualitySection } from "./sections/QualitySection";
import { ReviewsSection } from "./sections/ReviewsSection";
import { TrustStrip } from "./sections/TrustStrip";
import { WhatIsRetatrutide } from "./sections/WhatIsRetatrutide";
import { WhoItIsFor } from "./sections/WhoItIsFor";

export default function App() {
  const [activeModal, setActiveModal] = useState<"product" | "lab" | null>(null);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <WhatIsRetatrutide />
        <HowItWorks />
        <WhoItIsFor />
        <ProductSection onOpenDisclosure={() => setActiveModal("product")} />
        <HowToGet />
        <QualitySection onOpenReport={() => setActiveModal("lab")} />
        <PurchaseSection />
        <ReviewsSection />
        <FaqSection />
      </main>
      <Footer />
      <CookieBanner />
      <MobileStickyCta href="#product" label={siteContent.mobileCta} />
      <Modal
        isOpen={activeModal === "product"}
        title={siteContent.product.disclosureTitle}
        onClose={() => setActiveModal(null)}
      >
        <p>{siteContent.product.disclosureBody}</p>
      </Modal>
      <Modal
        isOpen={activeModal === "lab"}
        title={siteContent.quality.report.title}
        onClose={() => setActiveModal(null)}
        size="document"
      >
        <div className="document-viewer">
          <img
            src={siteContent.quality.report.image}
            alt={siteContent.quality.report.alt}
            width="725"
            height="1107"
          />
          <div className="document-viewer__actions">
            <p>Supplied laboratory report for batch {siteContent.quality.report.batch}.</p>
            <Button href={siteContent.quality.report.image} target="_blank" rel="noreferrer">
              {siteContent.quality.report.openLabel}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
