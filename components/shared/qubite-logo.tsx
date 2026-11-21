import React from "react";
import { cn } from "@/lib/utils";

export interface QubiteLogoProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  imgClassName?: string;
  variant?: "cream" | "transparent";
}

const sizeMap = {
  xs: "h-7 w-7 rounded-lg",
  sm: "h-9 w-9 rounded-xl",
  md: "h-11 w-11 rounded-2xl",
  lg: "h-14 w-14 rounded-3xl",
  xl: "h-16 w-16 rounded-3xl",
};

/**
 * Official QuBite Application Logo Component.
 * Displays the authentic Q-shaped food icon with the rising steam cloche and golden spark accents.
 */
export function QubiteLogo({
  size = "md",
  className,
  imgClassName,
  variant = "cream",
}: QubiteLogoProps) {
  const src = variant === "transparent" ? "/images/qubite-logo-transparent.png" : "/images/qubite-logo.png";

  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden bg-[#FCFAEE] flex items-center justify-center shadow-xs border border-amber-200/70 select-none",
        sizeMap[size],
        className
      )}
    >
      <img
        src={src}
        alt="QuBite Official Food Logo"
        className={cn("h-full w-full object-cover", imgClassName)}
      />
    </div>
  );
}
