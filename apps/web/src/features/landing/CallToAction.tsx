/** Final call to action, sending the student into the interactive case board. */
import Link from 'next/link';

export function CallToAction() {
  return (
    <section className="cta">
      <h2>Ready to open your first case file?</h2>
      <p>Enroll as a Recruit and start with Case File №1.</p>
      <Link className="btn btn--large" href="/roadmap">
        Start the classes
      </Link>
    </section>
  );
}
