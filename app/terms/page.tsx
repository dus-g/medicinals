import LegalPage from '@/components/LegalPage';
import { LEGAL, SITE } from '@/lib/site';

export const metadata = { title: 'Terms and Conditions' };

export default function Terms() {
  return (
    <LegalPage title="Terms and Conditions">
      <p>By using this website or placing an order you agree to these terms. Please read them with our <a href="/privacy">Privacy Policy</a>, <a href="/shipping">Shipping</a> and <a href="/returns">Returns</a> pages.</p>

      <h2>1. Who you are buying from</h2>
      <p>
        This website is operated under the name {LEGAL.tradingName}. Goods are sold and shipped by {LEGAL.sellerName} (ABN / registration: {LEGAL.abn}), {LEGAL.address} (&quot;the seller&quot;).
      </p>

      <h2>2. Orders</h2>
      <p>
        When you place an order on the site you are making an offer to buy. No payment is taken on the site. We contact you by email to confirm the order and arrange payment, and a contract is formed when we confirm your order. We may decline or cancel an order, for example if an item is unavailable, a price is wrong or we cannot deliver to your address, and will refund anything you have paid for it.
      </p>

      <h2>3. Prices and payment</h2>
      <p>All prices are in Australian dollars. Prices include GST where GST applies. Delivery costs, if any, are shown at checkout before you place your order. We may change prices at any time but not for orders we have already confirmed.</p>

      <h2>4. Delivery</h2>
      <p>We deliver to addresses in Australia. {SITE.delivery} See our <a href="/shipping">Shipping</a> page for details.</p>

      <h2>5. Our goods come with consumer guarantees</h2>
      <p>
        Our goods come with guarantees that cannot be excluded under the Australian Consumer Law. You are entitled to a replacement or refund for a major failure and compensation for any other reasonably foreseeable loss or damage. You are also entitled to have the goods repaired or replaced if they fail to be of acceptable quality and the failure does not amount to a major failure. See our <a href="/returns">Returns and Refunds</a> page.
      </p>

      <h2>6. Using the products safely</h2>
      <ul>
        <li>Our products are for comfort and relaxation. They are not medicines and are not intended to diagnose, treat, cure or prevent any condition.</li>
        <li>If you are pregnant, have diabetes, poor circulation, skin conditions, open wounds or any medical condition, ask your doctor before use.</li>
        <li>Read and follow the instructions supplied with each product. Check the water temperature with your hand before putting your feet in, and never leave children unsupervised.</li>
      </ul>

      <h2>7. Website use</h2>
      <p>You agree not to misuse the site, attempt to break into it, or use it for anything unlawful. Content on this site, including text, design and logos, belongs to us or our licensors and may not be copied without permission.</p>

      <h2>8. Limits on our liability</h2>
      <p>To the extent the law allows, we are not liable for indirect or consequential loss arising from use of the site or products. Nothing in these terms limits any right you have under the Australian Consumer Law or any other law that cannot be excluded.</p>

      <h2>9. Privacy</h2>
      <p>We handle your personal information as described in our <a href="/privacy">Privacy Policy</a>.</p>

      <h2>10. Changes and governing law</h2>
      <p>We may update these terms and will change the date above. The terms in force when you place an order apply to that order. These terms are governed by the laws of {LEGAL.governingLaw}, and you submit to the courts of that place and the Commonwealth of Australia.</p>

      <h2>11. Contact</h2>
      <p>{SITE.email}</p>
    </LegalPage>
  );
}
