import Link from "next/link";
import { ComponentProps } from "react";

type ButtonProps = ComponentProps<"button"> & {
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
};

const variants = {
  primary: "bg-ink text-linen shadow-soft hover:-translate-y-0.5",
  secondary: "bg-linen text-ink border border-ink/10 hover:-translate-y-0.5",
  ghost: "bg-transparent text-ink hover:bg-ink/5"
};

export function Button({ href, variant = "primary", className = "", children, ...props }: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
