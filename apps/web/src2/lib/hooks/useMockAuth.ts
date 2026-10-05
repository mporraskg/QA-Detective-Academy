'use client';

/**
 * Demo-only sign-in state, so the Nav can show a "Sign in" vs "Profile"
 * control before real authentication exists.
 *
 * There is no password or server check here — clicking "Sign in" simply
 * flips a flag in localStorage. Replace this hook with real session state
 * (from the `auth` backend module) once it's built; the return shape
 * (`signedIn`, `signIn`, `signOut`) is written so that swap is a drop-in.
 */

import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'qasec-mock-auth';

export function useMockAuth() {
  const [signedIn, setSignedIn] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      setSignedIn(localStorage.getItem(STORAGE_KEY) === '1');
    } catch {
      // Ignore: default to signed out.
    }
    setReady(true);
  }, []);

  const signIn = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {}
    setSignedIn(true);
  }, []);

  const signOut = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    setSignedIn(false);
  }, []);

  return { signedIn, ready, signIn, signOut };
}
