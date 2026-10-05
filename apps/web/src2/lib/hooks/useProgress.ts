'use client';

/**
 * Tracks the student's progress through the curriculum.
 *
 * Demo-only: state lives in localStorage so the prototype works with no
 * backend. Once the API exists, this hook should read/write `Progress`
 * through `GET/POST /progress` instead of `localStorage`, and the shape
 * below (`LevelProgress`) maps closely to the `Progress` Prisma model
 * described in the architecture proposal.
 */

import { useCallback, useEffect, useState } from 'react';
import { levels } from '@/data/levels';

const STORAGE_KEY = 'qasec-progress-v1';

export interface LevelProgress {
  /** IDs of labs solved within this level. */
  labs: string[];
  /** Best quiz score achieved (0-100). */
  best: number;
  /** True once all labs are solved AND the quiz was scored 100%. */
  done: boolean;
}

export type Progress = Record<string, LevelProgress>;

export const emptyLevelProgress: LevelProgress = { labs: [], best: 0, done: false };

/** A level is unlocked if it's the first one, or the previous one is done. */
export function isUnlocked(progress: Progress, levelIndex: number): boolean {
  return levelIndex === 0 || !!progress[levels[levelIndex - 1].id]?.done;
}

/** How many levels the student has fully closed. Drives rank progression. */
export function countClosedLevels(progress: Progress): number {
  return levels.filter((level) => progress[level.id]?.done).length;
}

export function useProgress() {
  const [progress, setProgress] = useState<Progress>({});
  const [ready, setReady] = useState(false);

  // Load once on mount (localStorage isn't available during SSR).
  useEffect(() => {
    try {
      setProgress(JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'));
    } catch {
      // Corrupt or missing data: start fresh.
    }
    setReady(true);
  }, []);

  const persist = (next: Progress): Progress => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Storage may be unavailable (private browsing, quota, etc.); demo still works in-memory.
    }
    return next;
  };

  const updateLevel = useCallback(
    (levelId: string, updater: (current: LevelProgress) => LevelProgress) =>
      setProgress((prev) => persist({ ...prev, [levelId]: updater(prev[levelId] ?? emptyLevelProgress) })),
    []
  );

  const reset = useCallback(() => setProgress(persist({})), []);

  return { progress, ready, updateLevel, reset };
}
