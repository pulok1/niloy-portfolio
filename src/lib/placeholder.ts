/**
 * A value the site owner still has to supply. Unfilled placeholders render as a
 * clearly marked TODO badge (or nothing, if NEXT_PUBLIC_HIDE_PLACEHOLDERS=true)
 * and are never replaced with made-up content. Every token is listed in TODO.md.
 */
export type Placeholder<T = string> = {
  /** Token as listed in TODO.md, e.g. "{{EMAIL}}". */
  token: string;
  /** Human-readable label shown in the TODO badge. */
  label: string;
  value: T | null;
};

export function todo<T = string>(token: string, label: string, value: T | null = null): Placeholder<T> {
  return { token, label, value };
}

export function isFilled<T>(p: Placeholder<T>): p is Placeholder<T> & { value: T } {
  if (p.value === null || p.value === undefined) return false;
  return typeof p.value !== "string" || p.value.trim() !== "";
}
