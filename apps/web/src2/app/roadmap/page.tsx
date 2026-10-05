// Route: "/roadmap" — the interactive case board (nav label: "Classes").
import { Roadmap } from '@/features/roadmap/Roadmap';

export default function RoadmapPage() {
  return (
    <main className="page">
      <section className="hero hero--compact">
        <h1>Case board</h1>
        <p className="hero__sub">Your active investigation. Close a case file with a perfect field exam to unseal the next.</p>
      </section>
      <section aria-labelledby="board-title">
        <h2 id="board-title" className="sr-only">
          Case files
        </h2>
        <Roadmap />
      </section>
    </main>
  );
}
