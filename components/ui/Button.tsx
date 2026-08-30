"use client";

import { ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "md" | "lg" | "xl";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-gradient-to-b from-aurora-violet to-aurora-indigo text-white shadow-glow border border-white/10",
  secondary: "glass-strong text-haze-200 hover:bg-white/10",
  ghost: "bg-transparent text-haze-300 hover:text-white",
  danger:
    "bg-gradient-to-b from-signal-taboo to-signal-taboo-deep text-white shadow-glass border border-white/10",
};

const sizeClasses: Record<Size, string> = {
  md: "px-5 py-3 text-sm rounded-2xl",
  lg: "px-6 py-4 text-base rounded-3xl",
  xl: "px-8 py-5 text-lg rounded-3xl",
};

export function Button({
  children,
  variant = "primary",
  size = "lg",
  fullWidth = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.96 }}
      className={`font-display font-semibold tracking-wide transition-colors duration-200 disabled:opacity-40 disabled:pointer-events-none ${variantClasses[variant]} ${sizeClasses[size]} ${fullWidth ? "w-full" : ""} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
}
