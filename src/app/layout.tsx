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
    default: 'Namdev Infratech | Steel Products & Infrastructure Solutions Since 2003',
  },
  description:
    'Namdev Infratech supplies structural steel, roofing sheets, jali products, and exterior solutions. In-house fabrication, laser cutting, and engineering services for architects, builders, and contractors across India.',
  keywords: [
    'structural steel supplier India',
    'MS angle',
    'roofing sheets',
    'steel fabrication',
    'laser cutting',
    'jali products',
    'ACP cladding',
    'HPL sheets',
    'Namdev Infratech',
    'construction materials',
    'steel products Faridabad',
    'infrastructure solutions',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Namdev Infratech',
    title: 'Namdev Infratech | Steel Products & Infrastructure Solutions',
    description: 'Structural steel, roofing, fabrication, and engineering solutions. Trusted by 1000+ clients since 2003.',
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
