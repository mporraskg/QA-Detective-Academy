/** The program's storyline intro, framed as an orientation case file. */
import { brief } from '@/data/program';

export function Brief() {
  return (
    <section aria-labelledby="brief-title" className="brief">
      <h2 id="brief-title">The brief</h2>
      {brief.paragraphs.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
    </section>
  );
}
