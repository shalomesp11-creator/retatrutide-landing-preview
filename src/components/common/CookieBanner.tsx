import { useEffect, useState } from "react";
import { Button } from "../ui/Button";

const consentKey = "retatrutide-essential-cookie-choice";
const dismissedKey = "retatrutide-cookie-notice-dismissed";

export function CookieBanner() {
  const [isVisible, setVisible] = useState(() => {
    try {
      return localStorage.getItem(consentKey) !== "accepted" && sessionStorage.getItem(dismissedKey) !== "true";
    } catch {
      return true;
    }
  });

  useEffect(() => {
    const reopen = () => setVisible(true);
    window.addEventListener("retatrutide:open-cookie-settings", reopen);
    return () => window.removeEventListener("retatrutide:open-cookie-settings", reopen);
  }, []);

  const dismiss = () => {
    try { sessionStorage.setItem(dismissedKey, "true"); } catch { /* Storage can be unavailable. */ }
    setVisible(false);
  };

  const acceptEssential = () => {
    try { localStorage.setItem(consentKey, "accepted"); } catch { /* Storage can be unavailable. */ }
    setVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside className="cookie-banner" aria-label="Cookie notice" aria-live="polite">
      <p>
        <strong>Your privacy matters.</strong>{" "}
        This site uses essential cookies.
        <span className="cookie-banner__detail"> Optional analytics or marketing cookies are not active.</span>
      </p>
      <div className="cookie-banner__actions">
        <Button type="button" variant="text" onClick={dismiss}>Dismiss</Button>
        <Button type="button" onClick={acceptEssential}>Accept essential</Button>
      </div>
    </aside>
  );
}
