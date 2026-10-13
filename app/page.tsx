import AddToCart from '@/components/AddToCart';
import EnquiryForm from '@/components/EnquiryForm';
import { PRODUCTS, SITE, money } from '@/lib/site';

export default function Home() {
  return (
    <div className="wrap">
      <div className="hero" id="top">
        <div>
          <h1>Quiet evenings start at your feet.</h1>
          <p className="lead">
            Mr. Detox Foot Spa Powder. Dissolve it in warm water, sit back and soak your feet for 30 minutes. Ordered online, packed and posted to your door in Australia.
          </p>
          <div className="cta-row">
            <a className="btn" href="#shop">Shop now</a>
            <a className="btn ghost" href="#use">How to use</a>
          </div>
        </div>
        <svg className="ripples" viewBox="0 0 200 200" role="img" aria-label="Ripples spreading across still water">
          <circle cx="100" cy="100" r="24" strokeWidth="2.5" />
          <circle cx="100" cy="100" r="46" strokeWidth="2" opacity=".75" />
          <circle cx="100" cy="100" r="68" strokeWidth="1.6" opacity=".55" />
          <circle cx="100" cy="100" r="90" strokeWidth="1.2" opacity=".35" />
        </svg>
      </div>

      <section id="shop">
        <div className="kicker">Shop</div>
        {PRODUCTS.map((p) => (
          <article className="feature" key={p.id}>
            <div className={`art ${p.tint}`}>
              {p.image ? <img src={p.image} alt={p.name} /> : <svg viewBox="0 0 48 48" aria-hidden="true"><path d={p.icon} /></svg>}
            </div>
            <div className="detail">
              <h2>{p.name}</h2>
              <p className="sub" style={{ marginTop: 0 }}>{p.blurb}</p>
              <div className="price big">{money(p.priceCents)}</div>
              <AddToCart id={p.id} name={p.name} />
              <p className="small muted">Packed and shipped across Australia by our supplier. See <a href="#how">how ordering works</a>.</p>
            </div>
          </article>
        ))}
      </section>

      <section id="use">
        <div className="kicker">Directions</div>
        <h2>How to use</h2>
        <div className="steps four">
          <div className="step"><h3>1. Fill with warm water</h3><p>Fill a basin or foot spa with warm to hot water, deep enough to cover your feet. Test it with your hand first. It should be comfortably hot, never scalding.</p></div>
          <div className="step"><h3>2. Add the powder</h3><p>Add the Mr. Detox Foot Spa Powder to the water (use the amount shown on the pack) and stir until it dissolves.</p></div>
          <div className="step"><h3>3. Soak for 30 minutes</h3><p>Put your feet in the water and relax for 30 minutes. Top up with warm water if it cools.</p></div>
          <div className="step"><h3>4. Dry and rinse</h3><p>Lift your feet out, pat them dry, and empty and rinse the basin.</p></div>
        </div>
        <p className="small muted" style={{ marginTop: 16, maxWidth: '64ch' }}>
          Stop if you feel any discomfort, and do not use on broken or irritated skin. If you have diabetes, poor circulation or any medical condition, ask your doctor first.
        </p>
      </section>

      <section id="how">
        <div className="kicker">Ordering</div>
        <h2>How ordering works</h2>
        <div className="steps">
          <div className="step"><h3>Add to cart</h3><p>Add what you like to your cart and check out in under a minute. No account needed.</p></div>
          <div className="step"><h3>Confirm and pay</h3><p>We email you to confirm your order and send payment details. Orders are handled by {SITE.supplier}.</p></div>
          <div className="step"><h3>Delivered to you</h3><p>Your order is packed and posted straight to your address, with tracking. {SITE.delivery}</p></div>
        </div>
      </section>

      <section>
        <div className="band">
          <div className="kicker">Good to know</div>
          <h2>Made for relaxing, nothing more</h2>
          <p className="sub" style={{ color: 'inherit', opacity: 0.85 }}>
            This product is for comfort and relaxation. It is not a medicine and are not intended to diagnose, treat or cure any condition. If you have a medical condition, diabetes or circulation concerns, ask your doctor before using foot spa powder.
          </p>
        </div>
      </section>

      <section id="faq">
        <div className="kicker">Questions</div>
        <h2>Before you order</h2>
        <div style={{ marginTop: 20 }}>
          <details><summary>Who sells and ships the products?</summary><p>Orders are sold and shipped by {SITE.supplier}.</p></details>
          <details><summary>How long does delivery take?</summary><p>Orders ship from the supplier and arrive with tracking. {SITE.delivery} You will get a tracking number by email once your order ships.</p></details>
          <details><summary>What if something arrives faulty?</summary><p>Under Australian Consumer Law you are entitled to a repair, replacement or refund for faulty goods. Contact us with your order number and a photo and we will pass it to the supplier.</p></details>
          <details><summary>How do I use it?</summary><p>Dissolve the powder in warm to hot water, then soak your feet for 30 minutes. Full directions are in <a href="#use">How to use</a>.</p></details>
          <details><summary>Is it suitable for everyone?</summary><p>Not necessarily. Skip it on broken or irritated skin, and ask your doctor first if you have diabetes, poor circulation or any medical condition.</p></details>
        </div>
      </section>

      <section id="contact">
        <div className="kicker">Contact</div>
        <h2>Send us a message</h2>
        <p className="sub">Or email <strong>{SITE.email}</strong>.</p>
        <EnquiryForm />
      </section>

    </div>
  );
}
