import type { ReactNode } from "react";
import { isFilled, type Placeholder } from "@/lib/placeholder";
import { hidePlaceholders } from "@/lib/site";

/** The visible "TODO" marker for a missing value. */
export function TodoBadge({ label, title }: { label: string; title?: string }) {
  if (hidePlaceholders) return null;
  return (
    <span className="todo" title={title ?? "Placeholder: see TODO.md"}>
      TODO: {label}
    </span>
  );
}

/**
 * Renders a placeholder's value through `children`, or a TODO badge when it is
 * empty. Never substitutes made-up content.
 */
export function PlaceholderValue<T>({
  p,
  children,
}: {
  p: Placeholder<T>;
  children?: (value: T) => ReactNode;
}) {
  if (isFilled(p)) return <>{children ? children(p.value) : String(p.value)}</>;
  return <TodoBadge label={p.label} title={`Placeholder ${p.token}: see TODO.md`} />;
}
