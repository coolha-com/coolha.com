import * as React from "react"

import { cn } from "@/lib/utils"

const cardVariants = {
  default:
    "border border-base-content/10 bg-base-200/50 hover:border-[#C0E218]/30 hover:bg-[#C0E218]/5",
  accent:
    "border border-[#C0E218]/20 bg-[#C0E218]/5 hover:border-[#C0E218]/40 hover:bg-[#C0E218]/10",
  ghost:
    "border border-transparent bg-transparent hover:border-base-content/10 hover:bg-base-200/50",
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
        "group relative rounded-2xl p-6 transition-all duration-300",
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
        "mb-4 flex size-12 items-center justify-center rounded-xl transition-colors",
        variant === "accent"
          ? "bg-[#C0E218]/15 text-[#C0E218] group-hover:bg-[#C0E218]/25"
          : variant === "ghost"
            ? "bg-base-200/50 text-base-content/60 group-hover:bg-base-200"
            : "bg-[#C0E218]/10 text-[#C0E218] group-hover:bg-[#C0E218]/20",
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
      className={cn("text-lg font-semibold text-base-content", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm leading-relaxed text-base-content/70", className)}
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
