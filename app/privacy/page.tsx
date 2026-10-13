import LegalPage from '@/components/LegalPage';
import { LEGAL, SITE } from '@/lib/site';

export const metadata = { title: 'Privacy Policy' };

export default function Privacy() {
  return (
    <LegalPage title="Privacy Policy">
      <p>
        {LEGAL.tradingName} (&quot;we&quot;, &quot;us&quot;) respects your privacy. This policy explains what personal information we collect, why, who we share it with and your rights, in line with the Privacy Act 1988 (Cth) and the Australian Privacy Principles.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li><strong>Order details:</strong> your name, email, phone number (optional), delivery address, delivery notes and the items you order.</li>
        <li><strong>Messages:</strong> the name, email and message you send through our contact form.</li>
        <li><strong>Technical data:</strong> basic information our hosting provider records when you visit, such as your IP address, browser type and the pages requested.</li>
      </ul>
      <p>We do not collect your card details on this site.</p>

      <h2>Why we collect it</h2>
      <ul>
        <li>to process, confirm, deliver and support your order;</li>
        <li>to reply to your enquiries;</li>
        <li>to keep records required by tax and consumer law; and</li>
        <li>to keep the site secure and working.</li>
      </ul>
      <p>We will not send you marketing emails unless you have clearly agreed to receive them, and every marketing message will let you unsubscribe.</p>

      <h2>Who we share it with</h2>
      <ul>
        <li>
          <strong>The seller and supplier, {LEGAL.sellerName}</strong>, who pack and ship your order. They are located in <strong>China</strong>, so your name, contact and delivery details are disclosed overseas for this purpose. By placing an order you agree to this disclosure. We take reasonable steps to make sure they handle your information appropriately.
        </li>
        <li><strong>Technology providers</strong> that host the site and store our database (currently Vercel and Neon), which may store data in data centres outside Australia.</li>
        <li><strong>Authorities</strong>, if the law requires it.</li>
      </ul>
      <p>We do not sell your personal information.</p>

      <h2>Cookies and browser storage</h2>
      <p>See our <a href="/cookies">Cookies and Storage</a> page. In short, we store your cart in your browser and do not use advertising or tracking cookies.</p>

      <h2>Keeping your information safe</h2>
      <p>We use reputable hosting providers, encrypted connections and password-protected access to order data. No system is perfectly secure, and if a data breach is likely to cause you serious harm we will notify you and the Office of the Australian Information Commissioner as required by law.</p>

      <h2>How long we keep it</h2>
      <p>We keep order records for up to seven years for tax and legal reasons. Contact-form messages are kept for as long as needed to deal with your enquiry. After that we delete or de-identify the information.</p>

      <h2>Your rights</h2>
      <p>
        You can ask to see the personal information we hold about you, ask us to correct it, or ask us to delete it where we are allowed to. Email <strong>{LEGAL.privacyEmail}</strong>. If you are unhappy with how we handle your information, contact us first. If we cannot resolve it, you can complain to the Office of the Australian Information Commissioner at oaic.gov.au.
      </p>

      <h2>Who we are</h2>
      <p>{LEGAL.tradingName}, {LEGAL.address}. Orders are sold and shipped by {LEGAL.sellerName}. Contact: {SITE.email}.</p>

      <h2>Changes</h2>
      <p>We may update this policy and will change the date above when we do.</p>
    </LegalPage>
  );
}
