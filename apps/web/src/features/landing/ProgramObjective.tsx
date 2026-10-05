/** What a student will be able to do by the end of the program. */
import { objective } from '@/data/program';

export function ProgramObjective() {
  return (
    <section aria-labelledby="objective-title" className="objective">
      <h2 id="objective-title">{objective.title}</h2>
      <p className="section-note">{objective.lead}</p>
      <ul className="objective__list">
        {objective.points.map((point, i) => (
          <li key={i}>{point}</li>
        ))}
      </ul>
    </section>
  );
}
