import type { ReactNode } from "react";
import { Button } from "../ui/Button";

const EXTERNAL_CART_ENDPOINT = "https://driadashop.to/index.php?route=external/cart/add";
const EXTERNAL_CART_TOKEN = "1912.bedc2c70ff05b76507b1478aa3f0ed44ed757a932014dbf6c0993527f02bc750";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
const SUBID_KEYS = ["subid", "sub_id", "clickid", "click_id", "cid", "cnv_id", "tid", "transaction_id"] as const;

type ExternalCartFormProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "text";
  className?: string;
  disabled?: boolean;
  appearance?: "button" | "link";
};

type TrackingField = {
  name: string;
  value: string;
};

function getTrackingFields(): TrackingField[] {
  if (typeof window === "undefined") return [];

  const query = new URLSearchParams(window.location.search);
  const fields: TrackingField[] = [];
  const add = (name: string, value: string) => fields.push({ name, value: value.slice(0, 120) });

  UTM_KEYS.forEach((key) => {
    const value = query.get(key);
    if (value) add(key, value);
  });

  for (const key of SUBID_KEYS) {
    const value = query.get(key);
    if (value) {
      add("subid", value);
      break;
    }
  }

  return fields;
}

export function ExternalCartForm({
  children,
  variant = "primary",
  className = "",
  disabled = false,
  appearance = "button",
}: ExternalCartFormProps) {
  const trackingFields = getTrackingFields();

  return (
    <form className={`external-cart-form external-cart-form--${appearance}`} method="post" action={EXTERNAL_CART_ENDPOINT}>
      <input type="hidden" name="token" value={EXTERNAL_CART_TOKEN} />
      {trackingFields.map((field) => (
        <input type="hidden" name={field.name} value={field.value} key={field.name} />
      ))}
      {appearance === "link" ? (
        <button className={`external-cart-form__link ${className}`.trim()} type="submit" disabled={disabled}>{children}</button>
      ) : (
        <Button className={className} type="submit" variant={variant} disabled={disabled}>{children}</Button>
      )}
    </form>
  );
}
