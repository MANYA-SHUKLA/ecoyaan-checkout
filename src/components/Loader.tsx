"use client";

interface LoaderProps {
  className?: string;
  variant?: "default" | "white";
}

export function Loader({
  className = "",
  variant = "default",
}: LoaderProps) {
  const borderClass =
    variant === "white"
      ? "border-white border-t-transparent"
      : "border-ecoyaan-green border-t-transparent";
  return (
    <span
      className={`inline-block animate-spin rounded-full border-2 ${borderClass} ${className}`}
      aria-hidden
    />
  );
}
