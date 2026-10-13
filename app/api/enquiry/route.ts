import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }
  if (body.website) return NextResponse.json({ ok: true }); // honeypot: bots fill this in

  const name = String(body.name ?? '').trim().slice(0, 120);
  const email = String(body.email ?? '').trim().slice(0, 200);
  const message = String(body.message ?? '').trim().slice(0, 2000);
  if (!name || !message || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: 'Please fill in your name, a valid email and a message.' }, { status: 400 });
  }
  try {
    await prisma.enquiry.create({ data: { name, email, message } });
  } catch (e) {
    console.error('enquiry failed', e);
    return NextResponse.json({ error: 'Could not send. Please email us instead.' }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
