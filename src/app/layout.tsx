import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Quest — Learn by Playing. Grow by Completing Quests.',
  description: 'A gamified AI-powered learning platform where students learn through interactive missions instead of passive videos. Minimal, friendly, Notion + Linear aesthetics.',
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
