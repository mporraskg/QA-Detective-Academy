'use client';

/** Interactive case board: every level, its lock state, and the link to open it. */

import Link from 'next/link';
import { levels, ranks } from '@/data/levels';
import { isUnlocked, countClosedLevels, useProgress } from '@/lib/hooks/useProgress';
import { Pixel } from '@/components/icons/Pixel';

export function Roadmap() {
  const { progress, reset } = useProgress();
  const closed = countClosedLevels(progress);

  return (
    <>
      <p className="section-note">
        Your rank: <strong>{ranks[Math.min(closed, ranks.length - 1)]}</strong>. Case files closed: {closed} of{' '}
        {levels.length}. Score 100% on a field exam to unlock the next file.
      </p>

      <ol className="path">
        {levels.map((level, i) => {
          const levelProgress = progress[level.id];
          const open = isUnlocked(progress, i);
          const status = levelProgress?.done
            ? 'completed'
            : !open
              ? 'locked'
              : levelProgress && (levelProgress.labs.length || levelProgress.best)
                ? 'in_progress'
                : 'available';
          const label = { completed: 'Case closed', locked: 'Sealed', in_progress: 'In progress', available: 'Open' }[status];

          return (
            <li key={level.id} className={`node node--${status}`}>
              <span className="node__marker" aria-hidden="true">
                {status === 'locked' ? <Pixel name="lock" /> : status === 'completed' ? <Pixel name="check" /> : level.number}
              </span>
              <article className="node__card">
                <header className="node__head">
                  <h3>{level.title}</h3>
                  <span className="badge">{label}</span>
                </header>
                <p>
                  <strong>{level.topic}.</strong> {level.objective}
                </p>
                {open ? (
                  <Link className="btn btn--small" href={`/level/${level.id}`}>
                    {status === 'completed' ? 'Review case file' : status === 'in_progress' ? 'Continue' : 'Open case file'}
                  </Link>
                ) : (
                  <p className="node__hint">Close the previous case file to unseal this one.</p>
                )}
              </article>
            </li>
          );
        })}
      </ol>

      <button className="link-btn" onClick={reset}>
        Reset demo progress
      </button>
    </>
  );
}
