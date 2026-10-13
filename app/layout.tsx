import type { Metadata } from 'next';
import { Bricolage_Grotesque, Figtree } from 'next/font/google';
import './globals.css';
import { SITE } from '@/lib/site';
import { siteUrl } from '@/lib/url';
import CartProvider from '@/components/CartProvider';
import CartDrawer from '@/components/CartDrawer';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const display = Bricolage_Grotesque({ subsets: ['latin'], weight: ['500', '700'], variable: '--font-display', display: 'swap' });
const body = Figtree({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-body', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  openGraph: { siteName: SITE.name, locale: 'en_AU', type: 'website' },
  title: { default: `${SITE.name} | Mr. Detox Foot Spa Powder`, template: `%s | ${SITE.name}` },
  description: 'Mr. Detox Foot Spa Powder: dissolve in warm water and soak your feet for 30 minutes. Delivered across Australia.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={`${display.variable} ${body.variable}`}>
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
