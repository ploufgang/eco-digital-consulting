import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
const buttonVariants = cva("inline-flex items-center justify-center gap-2 rounded-full font-bold transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4", { variants: { variant: { default: "bg-foreground text-background hover:bg-accent-strong hover:text-white", outline: "border border-border bg-surface text-foreground hover:border-accent hover:bg-accent-soft", ghost: "text-foreground hover:bg-accent-soft" }, size: { sm: "h-10 px-5 text-sm", default: "h-11 px-6", lg: "h-13 px-7 text-sm sm:text-base" } }, defaultVariants: { variant: "default", size: "default" } });
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants> & { asChild?: boolean };
export function Button({ asChild = false, className, size, variant, ...props }: ButtonProps) { const Comp = asChild ? Slot : "button"; return <Comp className={cn(buttonVariants({ size, variant }), className)} {...props} />; }
