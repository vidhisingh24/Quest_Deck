import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'QuestDeck — Gamified AI Learning Platform',
  description: 'Master computer science, networking, web dev, and cybersecurity with interactive simulator missions, dual-mode AI roadmaps, and gamified Questboard streaks.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#FAFAF7] text-warm-900 antialiased selection:bg-sky-light selection:text-sky-deep">
        {children}
      </body>
    </html>
  );
}
