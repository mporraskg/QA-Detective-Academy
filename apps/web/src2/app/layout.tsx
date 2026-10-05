// Root layout: loads all global styles once, and renders the chrome shared
// by every page (Nav + Footer). Route files under app/ stay focused on
// composing feature components — no styling or shared UI logic here.
import '@/styles/tokens.css';
import '@/styles/base.css';
import '@/styles/nav.css';
import '@/styles/hero.css';
import '@/styles/roadmap.css';
import '@/styles/landing.css';
import '@/styles/badges.css';
import '@/styles/level.css';

import { Nav } from '@/features/navigation/Nav';
import { Footer } from '@/features/navigation/Footer';

export const metadata = {
  title: 'QA Detective Program',
  description: 'Security testing training for QA engineers: case files, crime scenes and field exams.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
