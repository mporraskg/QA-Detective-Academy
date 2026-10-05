'use client';

/**
 * Dynamic rank ladder shown on `/badges`: unlike `RankPreview` (landing page,
 * static marketing copy), this version reflects the signed-in student's
 * actual progress and marks each rank as done, current, or locked.
 */

import { rankDetails } from '../../data/program';
import { levels } from '../../data/levels';
import { countClosedLevels, useProgress } from '../../lib/hooks/useProgress';
import { RankShield } from '../landing/RankPreview';

export function RankLadder() {
  const { progress, ready } = useProgress();
  if (!ready) return null;

  const closed = countClosedLevels(progress);
  const currentIndex = Math.min(closed, rankDetails.length - 1);
  const currentRank = rankDetails[currentIndex];

  return (
    <>
      <p className="section-note">
        You are currently a <strong>{currentRank.name}</strong>. Case files closed: {closed} of {levels.length}.
      </p>
      <div className="ranks ranks--ladder">
        <div className="ranks__thread" aria-hidden="true" />
        {rankDetails.map((rank, i) => {
          const state = i < currentIndex ? 'done' : i === currentIndex ? 'current' : 'locked';
          return (
            <div className={`rank rank--${state}`} key={rank.name}>
              <RankShield color={rank.color} label={i + 1} isFinal={i === rankDetails.length - 1} />
              <h3>{rank.name}</h3>
              <p className="rank__role">{rank.role}</p>
              <p className="rank__note">{rank.note}</p>
              {state === 'current' && <span className="rank__tag">Current rank</span>}
              {state === 'locked' && <span className="rank__tag rank__tag--locked">Locked</span>}
            </div>
          );
        })}
      </div>
    </>
  );
}
