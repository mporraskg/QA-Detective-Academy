// Route: "/" — the public landing page. Purely composition: each section
// lives in features/landing so this file stays easy to scan.
import { brief } from '@/data/program';
import { Brief } from '@/features/landing/Brief';
import { ProgramObjective } from '@/features/landing/ProgramObjective';
import { RankPreview } from '@/features/landing/RankPreview';
import { ModulePosters } from '@/features/landing/ModulePosters';
import { CallToAction } from '@/features/landing/CallToAction';

export default function LandingPage() {
  return (
    <main className="page page--landing">
      <section className="hero hero--landing">
        <p className="eyebrow">{brief.eyebrow}</p>
        <h1>QA Detective Program</h1>
        <p className="hero__sub">Security testing training for QA engineers, told as a case file at a time.</p>
      </section>

      <Brief />
      <ProgramObjective />
      <RankPreview />
      <ModulePosters />
      <CallToAction />
    </main>
  );
}
