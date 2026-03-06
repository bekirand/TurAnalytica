import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/components/providers';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'TurAnalytica — AI-анализ и сравнение туров',
    template: '%s | TurAnalytica',
  },
  description:
    'Глубокий AI-анализ туров за границу. Объективные оценки по 8 критериям, сравнение туров, рекомендации. Полезно путешественникам и менеджерам турагентств.',
  keywords: ['туры', 'анализ туров', 'сравнение туров', 'AI', 'путешествия', 'отзывы'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className="dark">
      <body className={`${inter.variable} bg-[#0F172A] font-sans text-white antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
