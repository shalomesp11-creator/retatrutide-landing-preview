import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "text";

type CommonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

type NativeButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type LinkButtonProps = CommonProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  disabled?: boolean;
};

export type ButtonProps = NativeButtonProps | LinkButtonProps;

export function Button({ children, variant = "primary", className = "", ...props }: ButtonProps) {
  const classes = `button button--${variant} ${className}`.trim();
  const content = (
    <>
      <span className="button__label">{children}</span>
      {variant !== "text" && (
        <svg className="button__icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
          <path d="M4 12 12 4M6 4h6v6" />
        </svg>
      )}
    </>
  );

  if ("href" in props && props.href) {
    const { disabled, href, ...linkProps } = props;
    return (
      <a
        className={classes}
        href={disabled ? undefined : href}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        {...linkProps}
      >
        {content}
      </a>
    );
  }

  return (
    <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>{content}</button>
  );
}
