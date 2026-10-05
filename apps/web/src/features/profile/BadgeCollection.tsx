'use client';

/**
 * Trophy shelf: the ranks the student has actually earned so far.
 * For the full ladder (earned + current + locked), see /badges (RankLadder).
 */

import Link from 'next/link';
import { rankDetails } from '@/data/program';
import { countClosedLevels, useProgress } from '@/lib/hooks/useProgress';
import { RankShield } from '@/components/RankShield';

export function BadgeCollection() {
  const { progress, ready } = useProgress();
  if (!ready) return null;

  const currentIndex = Math.min(countClosedLevels(progress), rankDetails.length - 1);
  // A rank counts as "earned" once the student has been promoted past it,
  // and the current rank is shown too so the shelf is never empty on day one.
  const earned = rankDetails.slice(0, currentIndex + 1);

  return (
    <section aria-labelledby="badges-title" className="badge-collection">
      <div className="badge-collection__head">
        <h2 id="badges-title">Badge collection</h2>
        <Link href="/badges" className="link">
          View full rank ladder →
        </Link>
      </div>
      <div className="badge-shelf">
        {earned.map((rank, i) => (
          <div className="badge-shelf__item" key={rank.name}>
            <RankShield color={rank.color} label={i + 1} isFinal={i === rankDetails.length - 1} />
            <span>{rank.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
