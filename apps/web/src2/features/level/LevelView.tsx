'use client';

/** A single case file: briefing, crime scenes (labs), and the field exam (quiz). */

import Link from 'next/link';
import { useState } from 'react';
import { Level, levels } from '@/data/levels';
import { emptyLevelProgress, isUnlocked, useProgress } from '@/lib/hooks/useProgress';

export function LevelView({ level }: { level: Level }) {
  const levelIndex = levels.findIndex((l) => l.id === level.id);
  const { progress, ready, updateLevel } = useProgress();

  const [flagInputs, setFlagInputs] = useState<Record<string, string>>({});
  const [invalidFlagLabId, setInvalidFlagLabId] = useState<string | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizScore, setQuizScore] = useState<number | null>(null);

  if (!ready) return null;

  if (!isUnlocked(progress, levelIndex)) {
    return (
      <div className="panel">
        <h2>Sealed file</h2>
        <p>Close the previous case file to open this one.</p>
        <Link href="/roadmap">Back to the case board</Link>
      </div>
    );
  }

  const current = progress[level.id] ?? emptyLevelProgress;

  // A level is "done" once every lab is solved AND the quiz was scored 100%.
  const computeCompletion = (solvedLabIds: string[], bestScore: number) => ({
    labs: solvedLabIds,
    best: bestScore,
    done: solvedLabIds.length === level.labs.length && bestScore === 100,
  });

  const submitFlag = (labId: string, expectedFlag: string) => {
    const submitted = (flagInputs[labId] ?? '').trim();
    if (submitted === expectedFlag) {
      setInvalidFlagLabId(null);
      updateLevel(level.id, (c) => computeCompletion(Array.from(new Set([...c.labs, labId])), c.best));
    } else {
      setInvalidFlagLabId(labId);
    }
  };

  const submitQuiz = () => {
    const correctCount = level.quiz.filter((question, i) => quizAnswers[i] === question.answer).length;
    const score = Math.round((correctCount / level.quiz.length) * 100);
    setQuizScore(score);
    updateLevel(level.id, (c) => computeCompletion(c.labs, Math.max(c.best, score)));
  };

  const nextLevel = levels[levelIndex + 1];

  return (
    <>
      <p className="crumb">
        <Link href="/roadmap">← Case board</Link>
      </p>
      <h1 className="level-title">
        Case file {level.number}: {level.title}
      </h1>
      <p className="section-note">{level.topic}</p>

      <section className="panel">
        <h2>Briefing</h2>
        <p>{level.objective}</p>
        {level.theory && (
          <p>
            Casebook:{' '}
            <a href={level.theory.url} target="_blank" rel="noreferrer">
              {level.theory.label}
            </a>
          </p>
        )}
      </section>

      {!level.playable ? (
        <section className="panel">
          <h2>Classified</h2>
          <p>The crime scenes and field exam for this file arrive in a later iteration.</p>
        </section>
      ) : (
        <>
          <section className="panel">
            <h2>Crime scenes</h2>
            {level.labs.map((lab) => {
              const solved = current.labs.includes(lab.id);
              return (
                <div key={lab.id} className="lab">
                  <h3>
                    {lab.title} {solved && <span className="ok">Evidence secured</span>}
                  </h3>
                  <p>{lab.scene}</p>
                  <p className="muted">
                    Lab environment: connected in a later phase. Demo evidence: <code>{lab.flag}</code>
                  </p>
                  {!solved && (
                    <div className="row">
                      <input
                        aria-label={`Evidence for ${lab.title}`}
                        placeholder="FLAG{...}"
                        value={flagInputs[lab.id] ?? ''}
                        onChange={(e) => setFlagInputs({ ...flagInputs, [lab.id]: e.target.value })}
                      />
                      <button className="btn btn--small" onClick={() => submitFlag(lab.id, lab.flag)}>
                        Submit evidence
                      </button>
                    </div>
                  )}
                  {invalidFlagLabId === lab.id && <p className="bad">That evidence doesn't match. Keep investigating.</p>}
                </div>
              );
            })}
          </section>

          <section className="panel">
            <h2>Field exam</h2>
            <p className="muted">Best score: {current.best}%. You need 100% to close the case.</p>
            {level.quiz.map((question, i) => (
              <fieldset key={i} className="q">
                <legend>
                  {i + 1}. {question.q}
                </legend>
                {question.options.map((option, j) => (
                  <label key={j} className="opt">
                    <input
                      type="radio"
                      name={`q${i}`}
                      checked={quizAnswers[i] === j}
                      onChange={() => setQuizAnswers({ ...quizAnswers, [i]: j })}
                    />{' '}
                    {option}
                  </label>
                ))}
                {quizScore !== null && (
                  <p className={quizAnswers[i] === question.answer ? 'ok' : 'bad'}>
                    {quizAnswers[i] === question.answer ? 'Correct. ' : 'Not quite. '}
                    {question.why}
                  </p>
                )}
              </fieldset>
            ))}
            <div className="row">
              <button className="btn btn--small" onClick={submitQuiz} disabled={Object.keys(quizAnswers).length < level.quiz.length}>
                Submit exam
              </button>
              {quizScore !== null && quizScore < 100 && (
                <button
                  className="link-btn"
                  onClick={() => {
                    setQuizAnswers({});
                    setQuizScore(null);
                  }}
                >
                  Retry
                </button>
              )}
            </div>
            {quizScore !== null && (
              <p className={quizScore === 100 ? 'ok' : 'bad'}>
                Score: {quizScore}%{quizScore < 100 && '. Review the casebook and try again.'}
              </p>
            )}
          </section>

          {current.done && (
            <section className="panel panel--done">
              <span className="stamp">CASE CLOSED</span>
              <p>{nextLevel ? `Case file ${nextLevel.number} is now unsealed.` : 'You closed every case file.'}</p>
              <Link className="btn btn--small" href={nextLevel ? `/level/${nextLevel.id}` : '/roadmap'}>
                {nextLevel ? 'Open next case file' : 'Back to the case board'}
              </Link>
            </section>
          )}
        </>
      )}
    </>
  );
}
