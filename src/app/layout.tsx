import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { LayoutWrapper } from '@/components/layout/LayoutWrapper';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Namdev Infratech',
    default: 'Namdev Infratech | Infrastructure & Fabrication Excellence',
  },
  description:
    'Namdev Infratech delivers excellence in infrastructure development and fabrication services. From industrial projects to creative installations, we build with precision and innovation.',
  keywords: [
    'infrastructure',
    'fabrication',
    'steel fabrication',
    'industrial projects',
    'construction',
    'Namdev Infratech',
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
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        <Providers>
          <LayoutWrapper>{children}</LayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}
