// Route: "/level/:id" — a single case file (briefing, labs, field exam).
import { notFound } from 'next/navigation';
import { LevelView } from '@/features/level/LevelView';
import { levels } from '@/data/levels';

export function generateStaticParams() {
  return levels.map((level) => ({ id: level.id }));
}

export default function LevelPage({ params }: { params: { id: string } }) {
  const level = levels.find((l) => l.id === params.id);
  if (!level) notFound();

  return (
    <main className="page page--level">
      <LevelView level={level} />
    </main>
  );
}
