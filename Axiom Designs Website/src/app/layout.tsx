import type { Metadata } from 'next';
import { Playfair_Display, Syne } from 'next/font/google';
import './globals.css';
import ClientLayout from '@/components/ClientLayout';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
});

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
});

export const metadata: Metadata = {
  title: 'Axiom Design Studio',
  description: 'Premium interior design and contracting studio in Mumbai. Space Becomes Story.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${syne.variable}`}>
      <body className="antialiased min-h-screen bg-cream text-ink cursor-none">
        <ClientLayout>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ClientLayout>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
