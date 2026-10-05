'use client';

/** Callout pointing the student at the next actionable case file. */

import Link from 'next/link';
import { levels } from '@/data/levels';
import { isUnlocked, useProgress } from '@/lib/hooks/useProgress';

export function CurrentMission() {
  const { progress, ready } = useProgress();
  if (!ready) return null;

  const nextLevelIndex = levels.findIndex((level, i) => isUnlocked(progress, i) && !progress[level.id]?.done);

  if (nextLevelIndex === -1) {
    return (
      <section className="panel panel--done current-mission">
        <h2>Program complete</h2>
        <p>Every case file is closed. Welcome to the ranks of Graduate Detective.</p>
      </section>
    );
  }

  const level = levels[nextLevelIndex];
  return (
    <section className="panel current-mission">
      <h2>Current mission</h2>
      <p className="section-note">Case file {level.number}</p>
      <h3>{level.title}</h3>
      <p>{level.objective}</p>
      <Link className="btn btn--small" href={`/level/${level.id}`}>
        Continue investigation
      </Link>
    </section>
  );
}
