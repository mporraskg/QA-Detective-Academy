'use client';

/** Avatar, editable display name, and current rank shield. */

import { useState } from 'react';
import { rankDetails } from '@/data/program';
import { countClosedLevels, useProgress } from '@/lib/hooks/useProgress';
import { useProfile } from '@/lib/hooks/useProfile';
import { RankShield } from '@/components/RankShield';

export function ProfileHeader() {
  const { progress, ready: progressReady } = useProgress();
  const { name, setName, ready: profileReady } = useProfile();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');

  if (!progressReady || !profileReady) return null;

  const currentIndex = Math.min(countClosedLevels(progress), rankDetails.length - 1);
  const currentRank = rankDetails[currentIndex];

  const startEditing = () => {
    setDraft(name);
    setEditing(true);
  };
  const commitEditing = () => {
    setName(draft);
    setEditing(false);
  };

  return (
    <section className="profile-header">
      <img
        className="profile-header__avatar"
        src="/art/avatars/character.png"
        alt="Your detective avatar"
        width={120}
        height={120}
      />

      <div className="profile-header__info">
        {editing ? (
          <form
            className="profile-header__name-form"
            onSubmit={(e) => {
              e.preventDefault();
              commitEditing();
            }}
          >
            <input
              autoFocus
              aria-label="Display name"
              value={draft}
              maxLength={40}
              onChange={(e) => setDraft(e.target.value)}
              onBlur={commitEditing}
            />
          </form>
        ) : (
          <button className="profile-header__name" onClick={startEditing} title="Click to rename">
            {name}
          </button>
        )}

        <div className="profile-header__rank">
          <RankShield color={currentRank.color} label={currentIndex + 1} isFinal={currentIndex === rankDetails.length - 1} />
          <div>
            <p className="profile-header__rank-name">{currentRank.name}</p>
            <p className="profile-header__rank-note">{currentRank.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
