import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
  hoverable?: boolean;
  onClick?: () => void;
}

const paddingStyles = {
  none: "",
  sm: "p-3",
  md: "p-4",
  lg: "p-6",
};

export function Card({
  children,
  className = "",
  padding = "none",
  hoverable = false,
  onClick,
}: CardProps) {
  return (
    <article
      onClick={onClick}
      className={`rounded-2xl bg-white shadow-sm overflow-hidden ${paddingStyles[padding]} ${hoverable ? "transition-shadow hover:shadow-lg cursor-pointer" : ""} ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      {children}
    </article>
  );
}
