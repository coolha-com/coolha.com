"use client"

import * as React from "react"
import { createPortal } from "react-dom"

import { Button } from "@/components/ui/button"
import { RiCloseLine } from "react-icons/ri"

function joinClasses(...classes: Array<string | boolean | undefined>) {
  return classes.filter(Boolean).join(" ")
}

type SheetContextValue = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const SheetContext = React.createContext<SheetContextValue | null>(null)

function useSheetContext() {
  const context = React.useContext(SheetContext)

  if (!context) {
    throw new Error("Sheet components must be used within <Sheet>")
  }

  return context
}

function Sheet({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
}: {
  children: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const open = controlledOpen ?? uncontrolledOpen

  const setOpen = React.useCallback(
    (nextValue: React.SetStateAction<boolean>) => {
      const nextOpen =
        typeof nextValue === "function" ? nextValue(open) : nextValue

      if (controlledOpen === undefined) {
        setUncontrolledOpen(nextOpen)
      }

      onOpenChange?.(nextOpen)
    },
    [controlledOpen, onOpenChange, open]
  )

  return (
    <SheetContext.Provider value={{ open, setOpen }}>
      {children}
    </SheetContext.Provider>
  )
}

function SheetTrigger({
  asChild = false,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean
  children: React.ReactNode
}) {
  const { setOpen } = useSheetContext()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    props.onClick?.(event)

    if (!event.defaultPrevented) {
      setOpen(true)
    }
  }

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{ onClick?: React.MouseEventHandler; className?: string }>

    return React.cloneElement(child, {
      ...props,
      onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
        child.props.onClick?.(event)
        handleClick(event)
      },
    })
  }

  return (
    <button data-slot="sheet-trigger" type="button" {...props} onClick={handleClick}>
      {children}
    </button>
  )
}

function SheetClose({
  asChild = false,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean
  children: React.ReactNode
}) {
  const { setOpen } = useSheetContext()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    props.onClick?.(event)

    if (!event.defaultPrevented) {
      setOpen(false)
    }
  }

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{ onClick?: React.MouseEventHandler; className?: string }>

    return React.cloneElement(child, {
      ...props,
      onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
        child.props.onClick?.(event)
        handleClick(event)
      },
    })
  }

  return (
    <button data-slot="sheet-close" type="button" {...props} onClick={handleClick}>
      {children}
    </button>
  )
}

function SheetPortal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return createPortal(children, document.body)
}

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { open, setOpen } = useSheetContext()

  if (!open) return null

  return (
    <div
      data-slot="sheet-overlay"
      className={joinClasses(
        "fixed inset-0 z-50 bg-black/30 duration-100 supports-backdrop-filter:backdrop-blur-sm",
        className
      )}
      onClick={() => setOpen(false)}
      {...props}
    />
  )
}

function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}: React.ComponentProps<"div"> & {
  side?: "top" | "right" | "bottom" | "left"
  showCloseButton?: boolean
}) {
  const { open, setOpen } = useSheetContext()

  React.useEffect(() => {
    if (!open) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [open, setOpen])

  if (!open) return null

  return (
    <SheetPortal>
      <SheetOverlay />
      <div
        data-slot="sheet-content"
        data-side={side}
        className={joinClasses(
          "fixed z-50 flex flex-col bg-popover bg-clip-padding text-sm text-popover-foreground shadow-xl transition duration-200 ease-in-out",
          side === "bottom" && "inset-x-0 bottom-0 h-auto border-t",
          side === "left" && "inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          side === "right" && "inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          side === "top" && "inset-x-0 top-0 h-auto border-b",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <SheetClose asChild>
            <Button
              variant="ghost"
              className="absolute top-4 right-4 bg-secondary"
              size="icon-sm"
            >
              <RiCloseLine />
              <span className="sr-only">Close</span>
            </Button>
          </SheetClose>
        )}
      </div>
    </SheetPortal>
  )
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={joinClasses("flex flex-col gap-1.5 p-6", className)}
      {...props}
    />
  )
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={joinClasses("mt-auto flex flex-col gap-2 p-6", className)}
      {...props}
    />
  )
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-title"
      className={joinClasses(
        "font-heading text-base font-medium text-foreground",
        className
      )}
      {...props}
    />
  )
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-description"
      className={joinClasses("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
