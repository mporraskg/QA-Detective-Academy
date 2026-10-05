'use client';

/** Sign in / Profile control shown at the right of the Nav. See `useMockAuth` for caveats. */

import Link from 'next/link';
import { useMockAuth } from '@/lib/hooks/useMockAuth';

export function AuthButton() {
  const { signedIn, ready, signIn, signOut } = useMockAuth();

  // Avoid a signed-out flash while localStorage is being read on mount.
  if (!ready) return <span className="auth-slot" aria-hidden="true" />;

  if (!signedIn) {
    return (
      <button className="btn btn--small" onClick={signIn}>
        Sign in
      </button>
    );
  }

  return (
    <span className="nav-profile">
      <Link href="/profile" className="nav-profile__link">
        Profile
      </Link>
      <button className="nav-profile__out" onClick={signOut}>
        Sign out
      </button>
    </span>
  );
}
