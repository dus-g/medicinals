import { prisma } from '@/lib/prisma';
import { orderNumber } from '@/lib/site';

export const dynamic = 'force-dynamic';

const esc = (v: unknown) => {
  let s = String(v ?? '');
  if (/^[=+\-@]/.test(s)) s = "'" + s; // stop spreadsheet formula injection
  return `"${s.replace(/"/g, '""')}"`;
};

// One row per item, so the supplier can pick, pack and post straight from the file.
export async function GET() {
  const orders = await prisma.order.findMany({ orderBy: { createdAt: 'desc' }, include: { items: true } });
  const head = ['Order', 'Date', 'Status', 'Name', 'Email', 'Phone', 'Address 1', 'Address 2', 'Suburb', 'State', 'Postcode', 'Notes', 'Product', 'Qty', 'Unit (A$)', 'Order total (A$)'];
  const lines = [head.map(esc).join(',')];
  for (const o of orders) {
    for (const i of o.items) {
      lines.push(
        [
          orderNumber(o.id), o.createdAt.toISOString(), o.status, o.name, o.email, o.phone, o.address1, o.address2,
          o.suburb, o.state, o.postcode, o.notes, i.name, i.quantity, (i.unitCents / 100).toFixed(2), (o.totalCents / 100).toFixed(2),
        ].map(esc).join(','),
      );
    }
  }
  return new Response('﻿' + lines.join('\r\n'), {
    headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': 'attachment; filename="orders.csv"' },
  });
}
