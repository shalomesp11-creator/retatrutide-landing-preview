import type { InputHTMLAttributes } from "react";

type FieldStatus = "default" | "error" | "success";

type FormFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  status?: FieldStatus;
  message?: string;
};

export function FormField({ label, status = "default", message, id, className = "", ...props }: FormFieldProps) {
  const messageId = message ? `${id}-message` : undefined;

  return (
    <div className={`form-field form-field--${status} ${className}`.trim()}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        aria-invalid={status === "error" || undefined}
        aria-describedby={messageId}
        {...props}
      />
      {message && (
        <p
          id={messageId}
          className="form-field__message"
          role={status === "error" ? "alert" : "status"}
          aria-live="polite"
        >
          {message}
        </p>
      )}
    </div>
  );
}
