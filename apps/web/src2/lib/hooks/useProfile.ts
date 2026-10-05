'use client';

/**
 * Demo-only student identity: just a display name, kept in localStorage so
 * the profile page has something to show and rename before real accounts
 * exist. Replace with the `User`/`Profile` records from the backend once
 * auth is built — the returned shape (`name`, `setName`) is meant to be a
 * drop-in for that swap.
 */

import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'qasec-profile-v1';
const DEFAULT_NAME = 'New Recruit';

export function useProfile() {
  const [name, setNameState] = useState(DEFAULT_NAME);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setNameState(saved);
    } catch {
      // Ignore: fall back to the default name.
    }
    setReady(true);
  }, []);

  const setName = useCallback((next: string) => {
    const trimmed = next.trim() || DEFAULT_NAME;
    setNameState(trimmed);
    try {
      localStorage.setItem(STORAGE_KEY, trimmed);
    } catch {}
  }, []);

  return { name, setName, ready };
}
