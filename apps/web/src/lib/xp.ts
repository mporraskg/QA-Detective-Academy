/**
 * Experience-point calculation.
 *
 * This formula is a placeholder for the prototype: it rewards solving labs,
 * scoring well on the quiz, and closing the case file outright. Once the
 * backend exists, XP should be computed and stored server-side (so it can't
 * be tampered with client-side) — this file documents the intended shape.
 */

import type { Level } from '@/data/levels';
import type { LevelProgress, Progress } from '@/lib/hooks/useProgress';
import { emptyLevelProgress } from '@/lib/hooks/useProgress';

const XP_PER_SOLVED_LAB = 25;
const XP_PER_10_QUIZ_POINTS = 5;
const XP_CASE_CLOSED_BONUS = 50;

export function computeLevelXp(levelProgress: LevelProgress): number {
  const labXp = levelProgress.labs.length * XP_PER_SOLVED_LAB;
  const quizXp = Math.round(levelProgress.best / 10) * XP_PER_10_QUIZ_POINTS;
  const bonusXp = levelProgress.done ? XP_CASE_CLOSED_BONUS : 0;
  return labXp + quizXp + bonusXp;
}

export function computeTotalXp(progress: Progress, levels: Level[]): number {
  return levels.reduce((total, level) => total + computeLevelXp(progress[level.id] ?? emptyLevelProgress), 0);
}
