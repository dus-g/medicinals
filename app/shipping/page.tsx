import LegalPage from '@/components/LegalPage';
import { LEGAL, SITE, money } from '@/lib/site';

export const metadata = { title: 'Shipping and Delivery' };

export default function Shipping() {
  return (
    <LegalPage title="Shipping and Delivery">
      <h2>Where we deliver</h2>
      <p>We deliver to street addresses in Australia. We cannot deliver to PO boxes or overseas addresses at this time.</p>

      <h2>Delivery times</h2>
      <p>{SITE.delivery} Orders are sent by the seller, {LEGAL.sellerName}, once your order is confirmed and payment is received. Times are estimates and can be affected by customs, weather and carrier delays.</p>

      <h2>Delivery cost</h2>
      <p>{SITE.shippingCents === 0 ? 'Delivery is included in the price of your order.' : `Delivery costs ${money(SITE.shippingCents)} per order.`}</p>

      <h2>Tracking</h2>
      <p>We email you tracking details when your order ships. If you have not heard from us after the estimated time, contact us with your order number.</p>

      <h2>Duties and GST</h2>
      <p>The price you pay includes any GST that applies. You do not need to pay any further import charges on delivery.</p>

      <h2>Wrong address or missed delivery</h2>
      <p>Please check your address before you place your order. If a parcel is returned to the seller because of an incorrect address or a missed delivery, we will contact you to arrange re-delivery, which may cost extra.</p>

      <h2>Damaged or lost parcels</h2>
      <p>If your order arrives damaged, or does not arrive, email <strong>{SITE.email}</strong> with your order number and, for damage, photos of the item and packaging. We will arrange a replacement or refund. See <a href="/returns">Returns and Refunds</a>.</p>
    </LegalPage>
  );
}
