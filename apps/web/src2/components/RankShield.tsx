/**
 * Small pixel-art shield used everywhere a single rank needs a visual:
 * the landing page's rank preview, the /badges ladder, and the profile header.
 * Promoted here (out of features/landing) because more than one feature needs it.
 */
import { Pixel } from '@/components/icons/Pixel';

export function RankShield({ color, label, isFinal }: { color: string; label: number; isFinal: boolean }) {
  return (
    <div
      className={`rank__shield${isFinal ? ' rank__shield--grad' : ''}`}
      style={{ '--rank-color': color } as React.CSSProperties}
    >
      {isFinal ? <Pixel name="star" size={20} /> : <span>{label}</span>}
    </div>
  );
}
