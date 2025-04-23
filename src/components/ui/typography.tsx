import { cn } from "@/lib/utils";
import * as React from "react";

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
}

export function H1({ children, className, ...props }: TypographyProps) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl",
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  );
}

export function H2({ children, className, ...props }: TypographyProps) {
  return (
    <h2
      className={cn(
        "scroll-m-20 pb-2 text-2xl font-semibold tracking-tight first:mt-0 sm:text-2xl lg:text-3xl",
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  );
}

export function H3({ children, className, ...props }: TypographyProps) {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight sm:text-xl lg:text-2xl",
        className,
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

export function H4({ children, className, ...props }: TypographyProps) {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-lg font-semibold tracking-tight sm:text-lg lg:text-xl",
        className,
      )}
      {...props}
    >
      {children}
    </h4>
  );
}

export function H5({ children, className, ...props }: TypographyProps) {
  return (
    <h5
      className={cn(
        "text-base font-semibold tracking-tight sm:text-base lg:text-lg",
        className,
      )}
      {...props}
    >
      {children}
    </h5>
  );
}

export function H6({ children, className, ...props }: TypographyProps) {
  return (
    <h6
      className={cn(
        "text-sm font-semibold tracking-tight sm:text-base",
        className,
      )}
      {...props}
    >
      {children}
    </h6>
  );
}

export function P({ children, className, ...props }: TypographyProps) {
  return (
    <p className={cn("text-sm leading-6 sm:text-base", className)} {...props}>
      {children}
    </p>
  );
}

export function Blockquote({ children, className, ...props }: TypographyProps) {
  return (
    <blockquote
      className={cn(
        "mt-6 border-l-2 pl-6 text-sm italic sm:text-base",
        className,
      )}
      {...props}
    >
      {children}
    </blockquote>
  );
}

export function Lead({ children, className, ...props }: TypographyProps) {
  return (
    <p
      className={cn("text-muted-foreground text-lg sm:text-xl", className)}
      {...props}
    >
      {children}
    </p>
  );
}

export function Large({ children, className, ...props }: TypographyProps) {
  return (
    <div
      className={cn("text-base font-semibold sm:text-lg", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function Small({ children, className, ...props }: TypographyProps) {
  return (
    <small
      className={cn("text-xs leading-none font-medium sm:text-sm", className)}
      {...props}
    >
      {children}
    </small>
  );
}

export function Muted({ children, className, ...props }: TypographyProps) {
  return (
    <p
      className={cn("text-muted-foreground text-xs sm:text-sm", className)}
      {...props}
    >
      {children}
    </p>
  );
}
