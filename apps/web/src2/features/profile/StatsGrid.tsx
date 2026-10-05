'use client';

/** Quick-glance stats: XP, overall progress, and how many case files are closed. */

import { levels } from '@/data/levels';
import { countClosedLevels, useProgress } from '@/lib/hooks/useProgress';
import { computeTotalXp } from '@/lib/xp';

export function StatsGrid() {
  const { progress, ready } = useProgress();
  if (!ready) return null;

  const closed = countClosedLevels(progress);
  const totalXp = computeTotalXp(progress, levels);
  const percent = Math.round((closed / levels.length) * 100);

  const stats = [
    { label: 'Experience', value: `${totalXp} XP` },
    { label: 'Progress', value: `${percent}%` },
    { label: 'Completed cases', value: `${closed} / ${levels.length}` },
  ];

  return (
    <section aria-label="Stats" className="stats-grid">
      {stats.map((stat) => (
        <div className="stat-tile" key={stat.label}>
          <p className="stat-tile__value">{stat.value}</p>
          <p className="stat-tile__label">{stat.label}</p>
        </div>
      ))}
      <div className="stat-tile stat-tile--bar" aria-hidden="true">
        <div className="stat-tile__bar">
          <div className="stat-tile__bar-fill" style={{ width: `${percent}%` }} />
        </div>
      </div>
    </section>
  );
}
