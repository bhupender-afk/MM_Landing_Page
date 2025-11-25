import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        // Contained button - solid background
        default: "bg-emerald-500 text-white hover:bg-emerald-600 focus-visible:ring-emerald-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
        // Contained secondary - solid background with secondary color
        secondary: "bg-orange-500 text-white hover:bg-orange-600 focus-visible:ring-orange-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
        // Outline button - transparent with border
        outline: "border-2 border-gray-300 text-gray-700 bg-transparent hover:bg-gray-50 hover:border-gray-400 focus-visible:ring-gray-500 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:border-gray-500",
        // Outline with emerald color
        "outline-emerald": "border-2 border-emerald-500 text-emerald-600 bg-transparent hover:bg-emerald-50 hover:text-emerald-700 focus-visible:ring-emerald-500 dark:text-emerald-400 dark:hover:bg-emerald-950/20",
        // Outline with orange color
        "outline-orange": "border-2 border-orange-500 text-orange-600 bg-transparent hover:bg-orange-50 hover:text-orange-700 focus-visible:ring-orange-500 dark:text-orange-400 dark:hover:bg-orange-950/20",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
