import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { PRODUCTS, SITE, STATES, orderNumber } from '@/lib/site';

export const dynamic = 'force-dynamic';

const str = (v: unknown, max: number) => String(v ?? '').trim().slice(0, max);

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }
  if (body.website) return NextResponse.json({ ok: true, number: 'HM-00000' }); // honeypot

  if (body.agree !== true) return NextResponse.json({ error: 'Please agree to the terms to place your order.' }, { status: 400 });

  const name = str(body.name, 120);
  const email = str(body.email, 200);
  const phone = str(body.phone, 40) || null;
  const address1 = str(body.address1, 200);
  const address2 = str(body.address2, 200) || null;
  const suburb = str(body.suburb, 100);
  const state = str(body.state, 8);
  const postcode = str(body.postcode, 8);
  const notes = str(body.notes, 1000) || null;

  if (!name || !address1 || !suburb) return NextResponse.json({ error: 'Please fill in all required fields.' }, { status: 400 });
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return NextResponse.json({ error: 'Please enter a valid email.' }, { status: 400 });
  if (!(STATES as readonly string[]).includes(state)) return NextResponse.json({ error: 'Please choose a state.' }, { status: 400 });
  if (!/^\d{4}$/.test(postcode)) return NextResponse.json({ error: 'Postcode must be 4 digits.' }, { status: 400 });

  // Prices always come from the server's product list, never from the browser.
  const rawItems = Array.isArray(body.items) ? body.items.slice(0, 20) : [];
  const items: { productId: string; name: string; unitCents: number; quantity: number }[] = [];
  for (const it of rawItems as { id?: unknown; qty?: unknown }[]) {
    const p = PRODUCTS.find((x) => x.id === it.id);
    const qty = Math.floor(Number(it.qty));
    if (!p || !(qty >= 1 && qty <= 10)) continue;
    items.push({ productId: p.id, name: p.name, unitCents: p.priceCents, quantity: qty });
  }
  if (items.length === 0) return NextResponse.json({ error: 'Your cart is empty.' }, { status: 400 });

  const subtotalCents = items.reduce((s, i) => s + i.unitCents * i.quantity, 0);
  const shippingCents = SITE.shippingCents;

  try {
    const order = await prisma.order.create({
      data: {
        name, email, phone, address1, address2, suburb, state, postcode, notes,
        subtotalCents, shippingCents, totalCents: subtotalCents + shippingCents,
        items: { create: items },
      },
    });
    return NextResponse.json({ ok: true, number: orderNumber(order.id) });
  } catch (e) {
    console.error('order failed', e);
    return NextResponse.json({ error: 'Could not place the order. Please try again or email us.' }, { status: 500 });
  }
}
