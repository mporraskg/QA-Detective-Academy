/** The full 11-topic curriculum, shown as "wanted poster" cards. */
import Link from 'next/link';
import { modules } from '@/data/program';

export function ModulePosters() {
  return (
    <section aria-labelledby="modules-title">
      <h2 id="modules-title">The 11 case files</h2>
      <p className="section-note">Two are open for this preview. The rest unseal as the program is built out.</p>
      <div className="posters">
        {modules.map((module, i) => (
          <PosterCard key={module.id} module={module} index={i} />
        ))}
      </div>
    </section>
  );
}

function PosterCard({ module, index }: { module: (typeof modules)[number]; index: number }) {
  const isOpen = !!module.demoLevelId;

  const card = (
    <article
      className={`poster${isOpen ? ' poster--open' : ' poster--sealed'}`}
      style={{ '--stage-color': module.color, animationDelay: `${index * 60}ms` } as React.CSSProperties}
    >
      <header className="poster__ribbon">Case File №{module.number}</header>
      <div className="poster__body">
        <span className="poster__stage">{module.stage}</span>
        <h3>{module.title}</h3>
        <p>{module.blurb}</p>
      </div>
      <footer className="poster__foot">{isOpen ? 'Enter case file →' : 'Coming soon'}</footer>
      {!isOpen && <span className="poster__seal">SEALED</span>}
    </article>
  );

  return isOpen ? (
    <Link href={`/level/${module.demoLevelId}`} className="poster-link">
      {card}
    </Link>
  ) : (
    <div>{card}</div>
  );
}
