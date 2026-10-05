// Route: "/profile" — the student's own detective file: avatar, stats,
// completed cases, badge collection, and their current mission.
'use client';

import Link from 'next/link';
import { useMockAuth } from '@/lib/hooks/useMockAuth';
import { ProfileHeader } from '@/features/profile/ProfileHeader';
import { StatsGrid } from '@/features/profile/StatsGrid';
import { CurrentMission } from '@/features/profile/CurrentMission';
import { CompletedCases } from '@/features/profile/CompletedCases';
import { BadgeCollection } from '@/features/profile/BadgeCollection';

export default function ProfilePage() {
  const { signedIn, ready, signIn } = useMockAuth();

  if (!ready) return null;

  if (!signedIn) {
    return (
      <main className="page">
        <section className="panel">
          <h1>Sign in to view your profile</h1>
          <p>Your detective file — avatar, rank, XP, and case history — is saved to your account once you sign in.</p>
          <button className="btn btn--small" onClick={signIn}>
            Sign in
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="page">
      <ProfileHeader />
      <StatsGrid />
      <CurrentMission />
      <CompletedCases />
      <BadgeCollection />
      <p className="section-note profile-footnote">
        Looking for the full academy ladder instead? <Link href="/badges">View all ranks →</Link>
      </p>
    </main>
  );
}
