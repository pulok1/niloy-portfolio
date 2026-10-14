import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = (props: IconProps) => ({
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
  ...props,
});

export const ArrowRight = (p: IconProps) => (
  <svg {...base(p)}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const ArrowLeft = (p: IconProps) => (
  <svg {...base(p)}><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
);
export const ExternalLink = (p: IconProps) => (
  <svg {...base(p)}><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></svg>
);
export const Copy = (p: IconProps) => (
  <svg {...base(p)}><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3" /></svg>
);
export const Check = (p: IconProps) => (
  <svg {...base(p)}><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
);
export const Mail = (p: IconProps) => (
  <svg {...base(p)}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3.5 6.5 12 13l8.5-6.5" /></svg>
);
export const Document = (p: IconProps) => (
  <svg {...base(p)}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5M9 13h6M9 17h4" /></svg>
);
export const Download = (p: IconProps) => (
  <svg {...base(p)}><path d="M12 4v11M7 10l5 5 5-5M5 20h14" /></svg>
);
export const Sun = (p: IconProps) => (
  <svg {...base(p)}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
);
export const Moon = (p: IconProps) => (
  <svg {...base(p)}><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" /></svg>
);
export const Menu = (p: IconProps) => (
  <svg {...base(p)}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
);
export const Close = (p: IconProps) => (
  <svg {...base(p)}><path d="M6 6l12 12M18 6 6 18" /></svg>
);
export const Unlock = (p: IconProps) => (
  <svg {...base(p)}><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 7.5-2" /></svg>
);
export const Globe = (p: IconProps) => (
  <svg {...base(p)}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>
);
export const Graduation = (p: IconProps) => (
  <svg {...base(p)}><path d="M2 9l10-5 10 5-10 5z" /><path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5M22 9v5" /></svg>
);

/** ORCID iD mark: "iD" in a circle. */
export const Orcid = (p: IconProps) => (
  <svg {...base({ ...p, stroke: "none" })} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="11" fill="#A6CE39" />
    <path fill="#fff" d="M8.3 17.2H6.9V7.5h1.4zM7.6 4.9a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8zM10.3 7.5h3.8c3.6 0 5.2 2.6 5.2 4.9 0 2.5-2 4.9-5.2 4.9h-3.8zm1.4 8.5h2.3c3.2 0 3.9-2.4 3.9-3.6 0-2-1.3-3.6-3.9-3.6h-2.3z" />
  </svg>
);

export const LinkedIn = (p: IconProps) => (
  <svg {...base(p)}><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 10.5V17M8 7.3v.2M12 17v-3.8c0-1.6 1-2.7 2.3-2.7s2 .9 2 2.7V17M12 10.5V17" /></svg>
);

export const Scholar = (p: IconProps) => (
  <svg {...base(p)}><path d="M12 3 2 10h20z" /><circle cx="12" cy="16" r="4.5" /></svg>
);

export const ResearchGate = (p: IconProps) => (
  <svg {...base(p)}><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8.5 17V8h3a2.5 2.5 0 0 1 0 5h-3M11.5 13l3 4" /></svg>
);

/** Generic index/database icon used for Scopus. */
export const Index = (p: IconProps) => (
  <svg {...base(p)}><ellipse cx="12" cy="6" rx="7" ry="3" /><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" /></svg>
);

/* Research-area illustrations (decorative). */
export const CapsuleMotif = (p: IconProps) => (
  <svg {...base({ ...p, strokeWidth: 1.6 })} viewBox="0 0 48 48">
    <rect x="6" y="17" width="28" height="14" rx="7" transform="rotate(-35 20 24)" />
    <path d="M20 14.5 24.5 33" transform="rotate(-35 20 24) translate(-2 0)" />
    <path d="M34 30l4.3-2.5 4.3 2.5v5l-4.3 2.5L34 35z" />
    <path d="M38.3 27.5V24" />
  </svg>
);

export const SugarMotif = (p: IconProps) => (
  <svg {...base({ ...p, strokeWidth: 1.6 })} viewBox="0 0 48 48">
    {/* Pyranose-style ring: six-membered ring with one ring oxygen. */}
    <path d="M14 20l9-6 10 4 1 11-9 6-10-4z" />
    <circle cx="33" cy="18" r="2.6" fill="currentColor" stroke="none" />
    <path d="M14 20l-6-3M23 14v-6M34 29l6 3M25 35v6M15 31l-6 3" />
  </svg>
);

export const SolarMotif = (p: IconProps) => (
  <svg {...base({ ...p, strokeWidth: 1.6 })} viewBox="0 0 48 48">
    <circle cx="12" cy="12" r="4.5" />
    <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4" />
    <path d="M18 42l6-18h20l-6 18z" />
    <path d="M21 33h20M31 24l-3 18" />
  </svg>
);
