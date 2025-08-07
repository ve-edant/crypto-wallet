import React from "react";
import { cn } from "@/app/Utils/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost";
};

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = "default",
  ...props
}) => {
  const base =
    "inline-flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    default: "bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-gray-200",
    outline: "border border-zinc-300 text-zinc-800 dark:text-white hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-700",
    ghost: "bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-800 dark:text-white",
  };

  const disabled = "opacity-50 cursor-not-allowed";

  return (
    <button
      className={cn(
        base,
        variants[variant],
        props.disabled && disabled,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
