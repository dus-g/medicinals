import LegalPage from '@/components/LegalPage';

export const metadata = { title: 'Cookies and Storage' };

export default function Cookies() {
  return (
    <LegalPage title="Cookies and Storage">
      <h2>What we store on your device</h2>
      <ul>
        <li><strong>Your cart.</strong> We save the items in your cart in your browser&apos;s local storage (under the name <code>huoma-cart</code>) so it is still there if you leave and return. This is essential for the shop to work and is never sent to advertisers.</li>
        <li><strong>Admin sign-in.</strong> Only the site owner&apos;s admin area uses a login. Customers are never asked to sign in.</li>
      </ul>

      <h2>What we do not use</h2>
      <p>We do not use advertising cookies, tracking pixels or third-party analytics on this site. For that reason we do not show a cookie banner. If we add analytics or advertising tools in future, we will update this page and ask for your consent first.</p>

      <h2>Technical logs</h2>
      <p>Our hosting provider keeps standard server logs (such as IP address and pages requested) for security and reliability.</p>

      <h2>Clearing your data</h2>
      <p>You can empty your cart at any time, or clear this site&apos;s data in your browser settings.</p>
    </LegalPage>
  );
}
