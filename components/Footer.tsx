import Link from 'next/link';
import { SITE } from '@/lib/site';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="wrap cols">
        <div>
          <div className="brand">{SITE.name}</div>
          <p className="small">Mr. Detox Foot Spa Powder for slower evenings. Sold and shipped across Australia by {SITE.supplier}.</p>
        </div>
        <div>
          <h4>Shop</h4>
          <Link href="/#shop">All products</Link>
          <Link href="/checkout">Cart and checkout</Link>
        </div>
        <div>
          <h4>Help</h4>
          <Link href="/#use">How to use</Link>
          <Link href="/#faq">Questions</Link>
          <Link href="/#contact">Contact us</Link>
        </div>
        <div>
          <h4>Policies</h4>
          <Link href="/terms">Terms and Conditions</Link>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/shipping">Shipping</Link>
          <Link href="/returns">Returns and Refunds</Link>
          <Link href="/cookies">Cookies and Storage</Link>
        </div>
      </div>
      <div className="wrap legal">
        <p>
          These products are for comfort and relaxation. They are not medicines and are not intended to diagnose, treat or cure any condition. Statements on this site have not been evaluated by the Therapeutic Goods Administration. Prices are in Australian dollars.
        </p>
        <p>&copy; {year} {SITE.name} · {SITE.email}</p>
      </div>
    </footer>
  );
}
