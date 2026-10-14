"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "./Icons";

type Theme = "light" | "dark";

/** Inline script for <head>: applies a saved theme before first paint (no flash). */
export const themeInitScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

const media = () => window.matchMedia("(prefers-color-scheme: dark)");

function currentTheme(): Theme {
  const explicit = document.documentElement.dataset.theme;
  if (explicit === "light" || explicit === "dark") return explicit;
  return media().matches ? "dark" : "light";
}

function subscribe(onChange: () => void) {
  const mq = media();
  mq.addEventListener("change", onChange);
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => {
    mq.removeEventListener("change", onChange);
    observer.disconnect();
  };
}

export function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore<Theme | null>(subscribe, currentTheme, () => null);
  const next: Theme = theme === "dark" ? "light" : "dark";

  const toggle = () => {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage unavailable: theme still applies for this visit */
    }
  };

  return (
    <button
      type="button"
      className={className}
      onClick={toggle}
      aria-label={theme ? `Switch to ${next} theme` : "Toggle colour theme"}
      title={theme ? `Switch to ${next} theme` : "Toggle colour theme"}
    >
      {theme === "dark" ? <Sun /> : <Moon />}
    </button>
  );
}
