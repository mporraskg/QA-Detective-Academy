'use client';

/** List of case files the student has already closed. */

import Link from 'next/link';
import { levels } from '@/data/levels';
import { useProgress } from '@/lib/hooks/useProgress';
import { computeLevelXp } from '@/lib/xp';
import { Pixel } from '@/components/icons/Pixel';

export function CompletedCases() {
  const { progress, ready } = useProgress();
  if (!ready) return null;

  const completed = levels.filter((level) => progress[level.id]?.done);

  return (
    <section aria-labelledby="completed-title" className="completed-cases">
      <h2 id="completed-title">Completed cases</h2>
      {completed.length === 0 ? (
        <p className="section-note">No case files closed yet. Your first one is waiting on the case board.</p>
      ) : (
        <ul className="completed-list">
          {completed.map((level) => (
            <li key={level.id} className="completed-item">
              <span className="completed-item__icon">
                <Pixel name="check" size={14} />
              </span>
              <div className="completed-item__body">
                <Link href={`/level/${level.id}`}>
                  Case file {level.number}: {level.title}
                </Link>
                <p className="muted">{level.topic}</p>
              </div>
              <span className="completed-item__xp">+{computeLevelXp(progress[level.id]!)} XP</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
