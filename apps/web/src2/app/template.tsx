// Re-mounted on every navigation, which re-triggers the `.enter` CSS
// animation defined in styles/base.css. Kept as a template (not part of
// layout.tsx) specifically so it resets per page instead of once per app load.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="enter">{children}</div>;
}
