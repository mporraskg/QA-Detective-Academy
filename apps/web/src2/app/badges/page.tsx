// Route: "/badges" — the student's rank ladder, tied to their real progress.
import { RankLadder } from '@/features/badges/RankLadder';

export default function BadgesPage() {
  return (
    <main className="page">
      <section className="hero hero--compact">
        <h1>Badges &amp; ranks</h1>
        <p className="hero__sub">Track your promotion through the academy, one closed case file at a time.</p>
      </section>
      <section aria-labelledby="ladder-title">
        <h2 id="ladder-title" className="sr-only">
          Rank ladder
        </h2>
        <RankLadder />
      </section>
    </main>
  );
}
