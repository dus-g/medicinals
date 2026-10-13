'use client';

import Link from 'next/link';
import { useCart } from '@/components/CartProvider';
import { SITE } from '@/lib/site';

export default function Header() {
  const { count, setOpen } = useCart();
  return (
    <header className="site-header">
      <div className="wrap bar">
        <Link className="brand" href="/">
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path d="M12 3c3.5 4.4 6 7.4 6 10.5A6 6 0 0 1 6 13.5C6 10.4 8.5 7.4 12 3Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          </svg>
          <span>{SITE.name}</span>
        </Link>
        <nav className="links" aria-label="Main">
          <Link href="/#shop">Shop</Link>
          <Link href="/#use">How to use</Link>
          <Link href="/#faq">Questions</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
        <button className="cart-btn" type="button" onClick={() => setOpen(true)} aria-label={`Open cart, ${count} items`}>
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path d="M3 4h2.2l2 11h10.4l2-8H6.4M9.5 20a1 1 0 1 0 0 .01M16.5 20a1 1 0 1 0 0 .01" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {count > 0 && <span className="badge">{count}</span>}
        </button>
      </div>
    </header>
  );
}
