/**
 * Static preview of the rank ladder, for marketing purposes on the landing page.
 * For the version tied to the signed-in student's actual progress, see
 * `features/badges/RankLadder.tsx`.
 */
import { rankDetails } from '@/data/program';
import { RankShield } from '@/components/RankShield';

export function RankPreview() {
  return (
    <section aria-labelledby="ranks-title">
      <h2 id="ranks-title">Ranks of the academy</h2>
      <p className="section-note">Every closed case file promotes you, from Recruit to Graduate Detective.</p>
      <div className="ranks">
        <div className="ranks__thread" aria-hidden="true" />
        {rankDetails.map((rank, i) => (
          <div className="rank" key={rank.name}>
            <RankShield color={rank.color} label={i + 1} isFinal={i === rankDetails.length - 1} />
            <h3>{rank.name}</h3>
            <p className="rank__role">{rank.role}</p>
            <p className="rank__note">{rank.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
