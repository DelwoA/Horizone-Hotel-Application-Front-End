import { cn } from "@/lib/utils";

/**
 * Skeleton Component
 *
 * A loading placeholder component that displays a pulsing animation.
 * Used to indicate that content is loading and maintain layout during data fetching.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes to customize size and appearance
 * @returns {JSX.Element} - Rendered skeleton placeholder
 */
function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}

export { Skeleton };
