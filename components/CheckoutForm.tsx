'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { useCart } from '@/components/CartProvider';
import { PRODUCTS, STATES, money } from '@/lib/site';

export default function CheckoutForm() {
  const { lines, subtotalCents, shippingCents, totalCents, clear } = useCart();
  const [state, setState] = useState<'idle' | 'sending' | 'error'>('idle');
  const [error, setError] = useState('');
  const [done, setDone] = useState<{ number: string; email: string } | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget).entries());
    setState('sending');
    setError('');
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...f, agree: f.agree === 'on', items: lines }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.');
      clear();
      setDone({ number: data.number, email: String(f.email) });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
      setState('error');
    }
  }

  if (done) {
    return (
      <div className="confirm">
        <h1>Thank you, order {done.number} received</h1>
        <p>
          We have your order and will email <strong>{done.email}</strong> shortly to confirm it and send payment details. Keep your order number handy.
        </p>
        <Link className="btn" href="/">Back to the shop</Link>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="confirm">
        <h1>Your cart is empty</h1>
        <p>Add something you like and come back here to check out.</p>
        <Link className="btn" href="/#shop">Shop the range</Link>
      </div>
    );
  }

  return (
    <div className="checkout">
      <form onSubmit={onSubmit} className="form">
        <h1>Checkout</h1>
        <h2>Contact</h2>
        <label htmlFor="name">Full name</label>
        <input id="name" name="name" required maxLength={120} autoComplete="name" />
        <div className="two">
          <div>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required maxLength={200} autoComplete="email" />
          </div>
          <div>
            <label htmlFor="phone">Phone (optional)</label>
            <input id="phone" name="phone" type="tel" maxLength={40} autoComplete="tel" />
          </div>
        </div>

        <h2>Delivery address (Australia)</h2>
        <label htmlFor="address1">Street address</label>
        <input id="address1" name="address1" required maxLength={200} autoComplete="address-line1" />
        <label htmlFor="address2">Apartment, unit (optional)</label>
        <input id="address2" name="address2" maxLength={200} autoComplete="address-line2" />
        <div className="three">
          <div>
            <label htmlFor="suburb">Suburb</label>
            <input id="suburb" name="suburb" required maxLength={100} autoComplete="address-level2" />
          </div>
          <div>
            <label htmlFor="state">State</label>
            <select id="state" name="state" required defaultValue="">
              <option value="" disabled>Select</option>
              {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="postcode">Postcode</label>
            <input id="postcode" name="postcode" required inputMode="numeric" pattern="[0-9]{4}" maxLength={4} autoComplete="postal-code" />
          </div>
        </div>
        <label htmlFor="notes">Delivery notes (optional)</label>
        <textarea id="notes" name="notes" rows={2} maxLength={1000} />

        <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hp" />

        <label className="check" htmlFor="agree">
          <input id="agree" name="agree" type="checkbox" required />
          <span>I agree to the <Link href="/terms" target="_blank">Terms and Conditions</Link>, <Link href="/privacy" target="_blank">Privacy Policy</Link> and <Link href="/returns" target="_blank">Returns policy</Link>, and that my details are shared with the supplier in China to deliver my order.</span>
        </label>

        <p className="small muted">
          No payment is taken on this page. After you place the order we email you to confirm it and send payment details.
        </p>
        <button className="btn" type="submit" disabled={state === 'sending'}>
          {state === 'sending' ? 'Placing order…' : `Place order · ${money(totalCents)}`}
        </button>
        {state === 'error' && <p className="err" role="alert">{error}</p>}
      </form>

      <aside className="summary" aria-label="Order summary">
        <h2>Order summary</h2>
        <ul>
          {lines.map((l) => {
            const p = PRODUCTS.find((x) => x.id === l.id);
            if (!p) return null;
            return (
              <li key={l.id}>
                <span>{p.name} × {l.qty}</span>
                <span>{money(p.priceCents * l.qty)}</span>
              </li>
            );
          })}
        </ul>
        <div className="row"><span>Subtotal</span><span>{money(subtotalCents)}</span></div>
        <div className="row"><span>Shipping</span><span>{shippingCents === 0 ? 'Included' : money(shippingCents)}</span></div>
        <div className="row total"><span>Total</span><span>{money(totalCents)}</span></div>
      </aside>
    </div>
  );
}
