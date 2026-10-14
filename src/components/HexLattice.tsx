import styles from "./Hero.module.css";

/*
 * Decorative honeycomb lattice for the hero. Pure SVG rendered on the server:
 * one <pattern> tile plus a few highlighted rings drawn on the same grid, so it
 * costs a couple of KB and no JavaScript.
 *
 * Pointy-top hexagons with side S. A pattern tile (W × 3S) holds one full hexagon
 * and the vertical bond that links it to the row below.
 */
const S = 28;
const W = Math.sqrt(3) * S; // ≈ 48.5
const H = 3 * S; // 84

function hexPoints(cx: number, cy: number): [number, number][] {
  return [
    [cx, cy - S],
    [cx + W / 2, cy - S / 2],
    [cx + W / 2, cy + S / 2],
    [cx, cy + S],
    [cx - W / 2, cy + S / 2],
    [cx - W / 2, cy - S / 2],
  ];
}

/** Centre of a lattice cell: row "a" cells sit in the tile, row "b" cells are offset by half a tile. */
const cell = (i: number, j: number, row: "a" | "b"): [number, number] =>
  row === "a" ? [W / 2 + W * i, S + H * j] : [W * i, 2.5 * S + H * j];

const fmt = (n: number) => Math.round(n * 10) / 10;
const ring = (pts: [number, number][]) => `M${pts.map(([x, y]) => `${fmt(x)} ${fmt(y)}`).join("L")}Z`;

// Two fused rings with substituents (right of the avatar on wide screens) and a single ring (lower left).
const rings = [cell(22, 3, "a"), cell(23, 3, "a"), cell(3, 6, "b")];
const ringPaths = rings.map(([x, y]) => ring(hexPoints(x, y)));
const [r1, r2] = [hexPoints(...rings[0]!), hexPoints(...rings[1]!)];
const bonds: [number, number, number, number][] = [
  // substituent off the outer ring, and a short chain
  [r2[1]![0], r2[1]![1], r2[1]![0] + W / 2, r2[1]![1] - S / 2],
  [r2[1]![0] + W / 2, r2[1]![1] - S / 2, r2[1]![0] + W / 2, r2[1]![1] - 1.5 * S],
  [r1[4]![0], r1[4]![1], r1[4]![0] - W / 2, r1[4]![1] + S / 2],
];
const atoms = [...r1, ...r2.slice(1, 4), [r2[1]![0] + W / 2, r2[1]![1] - 1.5 * S], [r1[4]![0] - W / 2, r1[4]![1] + S / 2]];
const heteroAtoms = [r2[2]!, [r2[1]![0] + W / 2, r2[1]![1] - 1.5 * S]];

export function HexLattice() {
  return (
    <svg className={styles.lattice} viewBox="0 0 1200 720" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <defs>
        <pattern id="hex-tile" width={fmt(W)} height={H} patternUnits="userSpaceOnUse">
          <path
            d={`${ring(hexPoints(W / 2, S))}M${fmt(W / 2)} ${2 * S}V${H}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </pattern>
        <radialGradient id="hex-fade" cx="72%" cy="38%" r="75%">
          <stop offset="0" stopColor="#fff" stopOpacity="1" />
          <stop offset="0.55" stopColor="#fff" stopOpacity="0.45" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="hex-mask">
          <rect width="1200" height="720" fill="url(#hex-fade)" />
        </mask>
      </defs>
      <g mask="url(#hex-mask)">
        <rect width="1200" height="720" fill="url(#hex-tile)" className={styles.grid} />
        <g className={styles.molecule}>
          {ringPaths.map((d) => (
            <path key={d} d={d} />
          ))}
          {bonds.map(([x1, y1, x2, y2]) => (
            <line key={`${x1}${y1}${x2}`} x1={fmt(x1)} y1={fmt(y1)} x2={fmt(x2)} y2={fmt(y2)} />
          ))}
          {atoms.map(([x, y]) => (
            <circle key={`${x},${y}`} cx={fmt(x!)} cy={fmt(y!)} r="3.2" className={styles.atom} />
          ))}
          {heteroAtoms.map(([x, y]) => (
            <circle key={`h${x},${y}`} cx={fmt(x!)} cy={fmt(y!)} r="5" className={styles.hetero} />
          ))}
        </g>
      </g>
    </svg>
  );
}
