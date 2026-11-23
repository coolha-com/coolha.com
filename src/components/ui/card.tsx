import * as React from "react"

import { cn } from "@/lib/utils"

const cardVariants = {
  default:
    "glass-panel hover:-translate-y-1 hover:bg-white/[0.09]",
  accent:
    "glass-panel bg-[#C8F237]/[0.05] hover:-translate-y-1 hover:bg-[#C8F237]/[0.1]",
  ghost:
    "border border-transparent bg-transparent hover:-translate-y-1 hover:bg-white/[0.06]",
} as const

type CardVariant = keyof typeof cardVariants

function Card({
  className,
  variant = "default" as CardVariant,
  ...props
}: React.ComponentProps<"div"> & { variant?: CardVariant }) {
  return (
    <div
      data-slot="card"
      className={cn(
        "group relative overflow-hidden rounded-3xl p-6 transition-all duration-300 md:p-7",
        cardVariants[variant],
        className
      )}
      {...props}
    />
  )
}

function CardIcon({
  className,
  variant = "default" as CardVariant,
  ...props
}: React.ComponentProps<"div"> & { variant?: CardVariant }) {
  return (
    <div
      data-slot="card-icon"
      className={cn(
        "mb-5 flex size-12 items-center justify-center rounded-2xl border transition-colors",
        variant === "accent"
          ? "bg-[#C8F237]/15 text-[#C8F237] group-hover:bg-[#C8F237]/25"
          : variant === "ghost"
            ? "bg-white/[0.05] text-white/60 group-hover:bg-white/[0.1]"
            : "bg-[#C8F237]/10 text-[#C8F237] group-hover:bg-[#C8F237]/20",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn("mb-3", className)}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("text-lg font-semibold tracking-tight text-white/90", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm leading-relaxed text-white/65", className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "mt-4 flex items-center gap-2",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardIcon,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
}
