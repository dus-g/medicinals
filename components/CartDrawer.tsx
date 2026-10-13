'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useCart } from '@/components/CartProvider';
import { PRODUCTS, money } from '@/lib/site';

export default function CartDrawer() {
  const { open, setOpen, lines, setQty, remove, subtotalCents, count } = useCart();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, setOpen]);

  if (!open) return null;

  return (
    <div className="drawer-root">
      <button className="drawer-scrim" aria-label="Close cart" onClick={() => setOpen(false)} />
      <aside className="drawer" role="dialog" aria-modal="true" aria-label="Your cart">
        <div className="drawer-head">
          <h2>Your cart</h2>
          <button className="icon-btn" onClick={() => setOpen(false)} aria-label="Close cart">✕</button>
        </div>

        {lines.length === 0 ? (
          <div className="drawer-empty">
            <p>Your cart is empty.</p>
            <button className="btn ghost small" onClick={() => setOpen(false)}>Keep shopping</button>
          </div>
        ) : (
          <>
            <ul className="drawer-lines">
              {lines.map((l) => {
                const p = PRODUCTS.find((x) => x.id === l.id);
                if (!p) return null;
                return (
                  <li key={l.id}>
                    <div className={`thumb art ${p.tint}`}>
                      {p.image ? <img src={p.image} alt="" /> : <svg viewBox="0 0 48 48" aria-hidden="true"><path d={p.icon} /></svg>}
                    </div>
                    <div className="info">
                      <div className="name">{p.name}</div>
                      <div className="muted">{money(p.priceCents)}</div>
                      <div className="qty">
                        <button aria-label={`Fewer ${p.name}`} onClick={() => setQty(l.id, l.qty - 1)}>−</button>
                        <span aria-live="polite">{l.qty}</span>
                        <button aria-label={`More ${p.name}`} onClick={() => setQty(l.id, l.qty + 1)}>+</button>
                        <button className="link" onClick={() => remove(l.id)}>Remove</button>
                      </div>
                    </div>
                    <div className="line-total">{money(p.priceCents * l.qty)}</div>
                  </li>
                );
              })}
            </ul>
            <div className="drawer-foot">
              <div className="row"><span>Subtotal ({count})</span><strong>{money(subtotalCents)}</strong></div>
              <p className="small muted">Shipping is shown at checkout.</p>
              <Link className="btn block" href="/checkout" onClick={() => setOpen(false)}>Checkout</Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
