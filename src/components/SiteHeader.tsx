"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Close, Menu } from "./Icons";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./SiteHeader.module.css";

const NAV = [
  { id: "about", label: "About" },
  { id: "research", label: "Research" },
  { id: "publications", label: "Publications" },
  { id: "methods", label: "Methods" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
] as const;

export function SiteHeader({ name, initials }: { name: string; initials: string }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const pathname = usePathname();
  const onHome = pathname === "/";
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Highlight the section currently in view (home page only).
  useEffect(() => {
    if (!onHome) return;
    const sections = NAV.map((n) => document.getElementById(n.id)).filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [onHome]);

  // Mobile menu: close on Escape (returning focus) and on outside click.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (!panelRef.current?.contains(target) && !toggleRef.current?.contains(target)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [open]);

  const links = NAV.map((n) => (
    <li key={n.id}>
      <Link
        href={`/#${n.id}`}
        className={styles.link}
        aria-current={onHome && active === n.id ? "location" : undefined}
        onClick={() => setOpen(false)}
      >
        {n.label}
      </Link>
    </li>
  ));

  return (
    <header className={styles.header}>
      <div className={`container ${styles.bar}`}>
        <Link href="/" className={styles.brand}>
          <span className={styles.mark} aria-hidden="true">
            {initials}
          </span>
          <span className={styles.brandName}>{name}</span>
        </Link>

        <nav aria-label="Main" className={styles.desktopNav}>
          <ul className={styles.list}>{links}</ul>
        </nav>

        <div className={styles.actions}>
          <ThemeToggle className={styles.iconBtn} />
          <button
            ref={toggleRef}
            type="button"
            className={`${styles.iconBtn} ${styles.menuBtn}`}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </div>

      <div id="mobile-nav" ref={panelRef} className={styles.mobilePanel} hidden={!open}>
        <nav aria-label="Main (mobile)" className="container">
          <ul className={styles.mobileList}>{links}</ul>
        </nav>
      </div>
    </header>
  );
}
