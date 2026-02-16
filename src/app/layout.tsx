import type { Metadata } from 'next';
import { Playfair_Display, Raleway } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { LayoutWrapper } from '@/components/layout/LayoutWrapper';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-playfair',
  display: 'swap',
});

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-raleway',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Namdev Infratech',
    default: 'Namdev Infratech | Building a Stronger Tomorrow',
  },
  description:
    'Namdev Infratech - Your trusted source for high-quality structural materials, custom fabrication, laser cutting, and precision engineering. Founded in 2003, serving construction, architecture, and interior design industries.',
  keywords: [
    'infrastructure',
    'fabrication',
    'steel fabrication',
    'structural steel',
    'custom fabrication',
    'laser cutting',
    'Namdev Infratech',
    'construction materials',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Namdev Infratech',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${raleway.variable}`}>
      <body className={raleway.className}>
        <Providers>
          <LayoutWrapper>{children}</LayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}
