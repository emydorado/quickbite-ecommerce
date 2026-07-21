import { cn } from "@/lib/utils/cn";

const backgrounds: Record<string, string> = {
  "dark-green": "bg-primary text-lime",
  "light-green": "bg-lime text-primary",
  black: "bg-neutral text-secondary",
  white: "bg-secondary text-primary",
};

export interface QIconProps {
  variant?: keyof typeof backgrounds;
  size?: number;
  className?: string;
}

/**
 * Stand-in for the brand's Q isotype: only the full wordmark SVGs exist in
 * /public/logo today. Swap for the real isotype vector once it's provided —
 * call sites just need a square icon, so the signature won't need to change.
 */
function QIcon({ variant = "dark-green", size = 40, className }: QIconProps) {
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center rounded-full font-editorial",
        backgrounds[variant],
        className
      )}
      style={{ width: size, height: size, fontSize: size * 0.55 }}
      aria-hidden
    >
      Q
    </span>
  );
}

export { QIcon };
