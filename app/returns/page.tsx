import LegalPage from '@/components/LegalPage';
import { LEGAL, SITE } from '@/lib/site';

export const metadata = { title: 'Returns and Refunds' };

export default function Returns() {
  return (
    <LegalPage title="Returns and Refunds">
      <h2>Faulty or damaged goods</h2>
      <p>
        Under the Australian Consumer Law, you are entitled to a repair, replacement or refund if goods are faulty, do not match their description or are not of acceptable quality. For a major failure you can choose a replacement or a refund. You do not need to prove who is at fault, and our change-of-mind rules below do not limit these rights.
      </p>
      <p>To make a claim, email <strong>{SITE.email}</strong> with your order number, a description of the problem and clear photos. We will reply promptly with the next steps and cover the reasonable cost of returning faulty goods.</p>

      <h2>Change of mind</h2>
      <p>
        You do not have a legal right to return goods because you changed your mind, but we offer a {LEGAL.returnWindowDays}-day change-of-mind return on eligible items:
      </p>
      <ul>
        <li>the item is unused, unopened and in its original packaging;</li>
        <li>you contact us within {LEGAL.returnWindowDays} days of receiving it; and</li>
        <li>you pay the cost of sending it back, unless we agree otherwise.</li>
      </ul>
      <p>For hygiene reasons we cannot accept change-of-mind returns of opened packs of foot spa powder.</p>

      <h2>Refunds</h2>
      <p>Approved refunds are paid by the same method you paid with, normally within 10 business days of us receiving and checking the returned goods, or of us approving a claim for goods that do not need to be returned.</p>

      <h2>Cancelling an order</h2>
      <p>You can cancel an order before it ships by emailing us your order number. We will refund anything you have paid.</p>

      <h2>Who handles your return</h2>
      <p>Orders are sold and shipped by {LEGAL.sellerName}. We coordinate returns with them on your behalf, so always contact us first at {SITE.email} before sending anything back.</p>
    </LegalPage>
  );
}
