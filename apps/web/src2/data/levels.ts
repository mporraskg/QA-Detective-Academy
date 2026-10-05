/**
 * Demo curriculum content: case files (levels), their labs and quiz questions.
 *
 * This is static placeholder data for the prototype. Once the backend exists,
 * this whole file is replaced by a `GET /levels` (or `/roadmap`) API call —
 * the shapes below (`Level`, `Lab`, `Question`) are a good starting point for
 * that response, so keep them in sync with the Prisma schema as it grows.
 */

export interface Lab {
  id: string;
  title: string;
  /** The scenario/instructions shown to the student. */
  scene: string;
  /** Demo-only: the flag is hardcoded here. In production this is verified server-side. */
  flag: string;
}

export interface Question {
  q: string;
  options: string[];
  /** Index into `options` of the correct answer. */
  answer: number;
  /** Shown after answering, regardless of whether the student was right. */
  why: string;
}

export interface Level {
  id: string;
  /** 1-based order in the roadmap. */
  number: number;
  title: string;
  topic: string;
  objective: string;
  theory?: { label: string; url: string };
  labs: Lab[];
  quiz: Question[];
  /** False for case files that only show a briefing (content not built yet). */
  playable: boolean;
}

/** Academy ranks, in order. The last one is only reached by graduating. */
export const ranks = ['Recruit', 'Cadet', 'Field Trainee', 'Senior Cadet', 'Graduate Detective'];

export const levels: Level[] = [
  {
    id: 'detective-mindset',
    number: 1,
    title: "The Detective's Mindset",
    topic: 'Security fundamentals',
    objective:
      'Learn to see an application the way an attacker does: what needs protecting, who wants it, and where they can get in.',
    theory: {
      label: 'Threat Modeling Cheat Sheet (OWASP)',
      url: 'https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html',
    },
    playable: true,
    labs: [
      {
        id: 'map-scene',
        title: 'Map the crime scene',
        scene: 'Open the practice app and list every entry point: forms, URL parameters, headers and API routes.',
        flag: 'FLAG{surface-mapped}',
      },
    ],
    quiz: [
      {
        q: 'Which question best describes threat modeling?',
        options: ['Which tool scans fastest?', 'What could go wrong, and how do we stop it?', 'Which browser do users prefer?'],
        answer: 1,
        why: 'Threat modeling is structured thinking about what can go wrong.',
      },
      {
        q: 'Which of these is NOT part of the CIA triad?',
        options: ['Confidentiality', 'Integrity', 'Availability', 'Usability'],
        answer: 3,
        why: 'The triad is Confidentiality, Integrity and Availability.',
      },
      {
        q: 'What is an "attack surface"?',
        options: [
          'Every point where an attacker can try to enter or extract data',
          'The visual design of the login page',
          'The servers in the data center',
        ],
        answer: 0,
        why: 'More entry points means more places to test.',
      },
    ],
  },
  {
    id: 'reading-witnesses',
    number: 2,
    title: 'Reading the Witnesses',
    topic: 'Injection and XSS',
    objective:
      'Applications trust what users send them. Learn to spot where that trust is misplaced and prove it with SQL injection and XSS.',
    theory: { label: 'OWASP Top 10: A03 Injection', url: 'https://owasp.org/Top10/A03_2021-Injection/' },
    playable: true,
    labs: [
      {
        id: 'forged-login',
        title: 'The forged login',
        scene: 'Get into the practice app as another user without knowing their password.',
        flag: 'FLAG{sqli-login-bypass}',
      },
      {
        id: 'echo-box',
        title: 'The echoing search box',
        scene: "Make the search page run your own script in the visitor's browser.",
        flag: 'FLAG{reflected-xss}',
      },
    ],
    quiz: [
      {
        q: 'SQL injection happens when...',
        options: ['The database is offline', 'User input is concatenated into a query', 'Passwords are too short'],
        answer: 1,
        why: 'Input becomes part of the SQL instead of data.',
      },
      {
        q: 'What is the best fix for SQL injection?',
        options: ['Hide the error messages', 'Parameterized queries', 'Longer passwords'],
        answer: 1,
        why: 'Parameters keep data separate from code.',
      },
      {
        q: 'Reflected XSS occurs when input is...',
        options: ['Stored forever in the database', 'Echoed back without output encoding', 'Sent over HTTP/2'],
        answer: 1,
        why: 'The response executes attacker-controlled script.',
      },
    ],
  },
  {
    id: 'broken-alibis',
    number: 3,
    title: 'Broken Alibis',
    topic: 'Authentication and sessions',
    objective: 'Weak passwords, leaky tokens and sloppy recovery flows: find the identities that can be faked.',
    labs: [],
    quiz: [],
    playable: false,
  },
  {
    id: 'restricted-areas',
    number: 4,
    title: 'Restricted Areas',
    topic: 'Access control and APIs',
    objective: 'Find the doors that should be locked: IDOR, privilege escalation and unprotected endpoints.',
    labs: [],
    quiz: [],
    playable: false,
  },
  {
    id: 'final-audit',
    number: 5,
    title: 'The Final Audit',
    topic: 'Capstone',
    objective: 'Investigate a full application end to end and file a complete report of findings.',
    labs: [],
    quiz: [],
    playable: false,
  },
];
