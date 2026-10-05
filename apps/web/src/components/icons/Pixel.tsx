/**
 * Tiny pixel-art icons, drawn as an 8x8 grid of SVG rects (no image assets).
 * Add a new icon by adding an 8-row grid of '.'/'#' characters to `GRIDS`.
 */

const GRIDS = {
  lock: ['..####..', '.#....#.', '.#....#.', '########', '########', '###..###', '###..###', '########'],
  check: ['........', '.......#', '......##', '#....##.', '##..##..', '.####...', '..##....', '........'],
  lens: ['.####...', '#....#..', '#....#..', '#....#..', '.####...', '....##..', '.....##.', '......##'],
  star: ['...##...', '...##...', '#.####.#', '########', '.######.', '.######.', '.##..##.', '.#....#.'],
} as const;

export function Pixel({ name, size = 16 }: { name: keyof typeof GRIDS; size?: number }) {
  return (
    <svg viewBox="0 0 8 8" width={size} height={size} shapeRendering="crispEdges" fill="currentColor" aria-hidden="true">
      {GRIDS[name].flatMap((row, y) =>
        [...row].map((cell, x) => (cell === '#' ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" /> : null))
      )}
    </svg>
  );
}
