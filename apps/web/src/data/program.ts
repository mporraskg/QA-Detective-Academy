/**
 * Landing page copy: the program brief, its objective, rank descriptions and
 * the full 11-topic curriculum shown as "case file" posters.
 *
 * Like `data/levels.ts`, this is static content for the prototype. It will
 * eventually move to the `content/` folder (or a CMS) so instructors can
 * edit copy without touching code.
 */

export const brief = {
  eyebrow: 'Case #0 — Orientation',
  paragraphs: [
    'Every application has secrets, and someone is always trying to get at them. The QA Detective Program exists to train the people who stand in the way.',
    "You already know how to test: you write cases, you find bugs, you file reports. This program teaches you to test like a detective — to read an application the way an investigator reads a crime scene, and to prove a vulnerability the way a detective proves a case: with evidence, not guesses.",
    "You'll enroll as a Recruit. Each case file you close promotes you, until you graduate as a full Detective.",
  ],
};

export const objective = {
  title: 'Program objective',
  lead: 'By the end of this program, you will be able to think and test like a security-minded QA engineer:',
  points: [
    'Recognize the OWASP Top 10 categories in a real application, not just on a slide.',
    'Design and run test cases that target authentication, session handling, access control, and input validation.',
    'Use the same tools working security testers use: proxies, scanners, and API clients.',
    'Turn a raw finding into a report a developer can actually act on.',
    'Fold security checks into an everyday QA process instead of treating them as a separate audit.',
  ],
};

export interface Rank {
  name: string;
  /** Which case files this rank covers, or the completion milestone. */
  role: string;
  color: string;
  note: string;
}

/** Keep `name` values in sync with the `ranks` array in `data/levels.ts`. */
export const rankDetails: Rank[] = [
  { name: 'Recruit', role: 'Day one', color: '#f2b84b', note: 'Learning to see an application the way an attacker does.' },
  { name: 'Cadet', role: 'Case files 3–6', color: '#4fc3c7', note: 'Naming and proving the OWASP Top 10 in practice.' },
  { name: 'Field Trainee', role: 'Case files 7–9', color: '#5ec98a', note: 'Working with real tools, real process, real APIs.' },
  { name: 'Senior Cadet', role: 'Case files 10–11', color: '#e0605e', note: 'Reporting findings and watching the newest frontier: AI.' },
  { name: 'Graduate Detective', role: 'Program complete', color: '#fff2c9', note: 'Every case file closed with a perfect field exam.' },
];

export interface Module {
  id: string;
  number: number;
  title: string;
  stage: string;
  color: string;
  blurb: string;
  /** Set only for the case files that are playable in this prototype. */
  demoLevelId?: string;
}

export const modules: Module[] = [
  { id: 'foundations', number: 1, title: 'Security Testing Foundations & Mindset', stage: 'Foundations', color: '#f2b84b',
    blurb: 'Think like the suspect before you test like a detective.', demoLevelId: 'detective-mindset' },
  { id: 'how-the-web-works', number: 2, title: 'How the Web Works (Security Lens)', stage: 'Foundations', color: '#f2b84b',
    blurb: 'Requests, cookies, and headers — read them like clues.' },
  { id: 'owasp-top-10', number: 3, title: 'OWASP Top 10 for QA', stage: 'Vulnerabilities', color: '#4fc3c7',
    blurb: 'The ten usual suspects, and how to recognize each one.' },
  { id: 'access-control', number: 4, title: 'Access Control & IDOR Testing', stage: 'Vulnerabilities', color: '#4fc3c7',
    blurb: "Can you open a door that isn't yours?" },
  { id: 'auth-sessions', number: 5, title: 'Authentication & Session Testing', stage: 'Vulnerabilities', color: '#4fc3c7',
    blurb: 'Fake alibis: broken logins, tokens, and session handling.' },
  { id: 'injection-xss', number: 6, title: 'Input Validation: Injection & XSS', stage: 'Vulnerabilities', color: '#4fc3c7',
    blurb: "What happens when the witness repeats everything it hears.", demoLevelId: 'reading-witnesses' },
  { id: 'tools', number: 7, title: 'Security Testing Tools for QA', stage: 'Tools & Process', color: '#5ec98a',
    blurb: "Proxies and scanners: the detective's field kit." },
  { id: 'process', number: 8, title: 'Integrating Security into the QA Process', stage: 'Tools & Process', color: '#5ec98a',
    blurb: 'Security testing as a habit, not a once-a-year audit.' },
  { id: 'api-security', number: 9, title: 'API Security Testing', stage: 'Tools & Process', color: '#5ec98a',
    blurb: 'The hallways with no doors: endpoints nobody documented.' },
  { id: 'reporting', number: 10, title: 'Reporting, Escalation & Documentation', stage: 'Delivery & Frontier', color: '#e0605e',
    blurb: 'Closing the case file so someone else can act on it.' },
  { id: 'ai-security', number: 11, title: 'AI Security: Tools & Emerging Risk', stage: 'Delivery & Frontier', color: '#e0605e',
    blurb: "The newest witness: an AI that believes everything it's told." },
];
