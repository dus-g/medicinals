import { prisma } from '@/lib/prisma';
import { money, orderNumber } from '@/lib/site';
import { setOrderStatus } from './actions';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Admin', robots: { index: false } };

type OrderRow = {
  id: number;
  status: string;
  name: string;
  email: string;
  phone: string | null;
  address1: string;
  address2: string | null;
  suburb: string;
  state: string;
  postcode: string;
  notes: string | null;
  totalCents: number;
  createdAt: Date;
  items: { id: number; name: string; quantity: number }[];
};
type EnquiryRow = { id: number; name: string; email: string; message: string; createdAt: Date };

const fmt = (d: Date) => d.toLocaleString('en-AU', { timeZone: 'Australia/Adelaide' });

export default async function Admin() {
  const [orders, enquiries]: [OrderRow[], EnquiryRow[]] = await Promise.all([
    prisma.order.findMany({ orderBy: { createdAt: 'desc' }, take: 200, include: { items: true } }),
    prisma.enquiry.findMany({ orderBy: { createdAt: 'desc' }, take: 100 }),
  ]);
  const open = orders.filter((o) => o.status === 'new').length;

  return (
    <div className="wrap" style={{ paddingBlock: 40 }}>
      <h1 style={{ fontSize: '2rem' }}>Admin</h1>

      <div className="admin-head">
        <h2>Orders ({orders.length}, {open} new)</h2>
        <a className="btn small ghost" href="/admin/orders-csv">Download CSV</a>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>Order</th><th>Date</th><th>Customer</th><th>Ship to</th><th>Items</th><th>Total</th><th>Status</th></tr>
          </thead>
          <tbody>
            {orders.length === 0 && <tr><td colSpan={7}>No orders yet.</td></tr>}
            {orders.map((o) => (
              <tr key={o.id}>
                <td>{orderNumber(o.id)}</td>
                <td>{fmt(o.createdAt)}</td>
                <td>{o.name}<br />{o.email}{o.phone ? <><br />{o.phone}</> : null}</td>
                <td>
                  {o.address1}{o.address2 ? `, ${o.address2}` : ''}<br />{o.suburb} {o.state} {o.postcode}
                  {o.notes ? <><br /><em>{o.notes}</em></> : null}
                </td>
                <td>{o.items.map((i) => <div key={i.id}>{i.quantity} × {i.name}</div>)}</td>
                <td>{money(o.totalCents)}</td>
                <td>
                  <form action={setOrderStatus} className="status-form">
                    <input type="hidden" name="id" value={o.id} />
                    <select name="status" defaultValue={o.status} aria-label={`Status for ${orderNumber(o.id)}`}>
                      <option value="new">New</option>
                      <option value="paid">Paid</option>
                      <option value="shipped">Shipped</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    <button className="btn small ghost" type="submit">Save</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="admin-head"><h2>Messages ({enquiries.length})</h2></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Date</th><th>Name</th><th>Email</th><th>Message</th></tr></thead>
          <tbody>
            {enquiries.length === 0 && <tr><td colSpan={4}>No messages yet.</td></tr>}
            {enquiries.map((e) => (
              <tr key={e.id}>
                <td>{fmt(e.createdAt)}</td><td>{e.name}</td><td>{e.email}</td>
                <td style={{ whiteSpace: 'pre-wrap' }}>{e.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
