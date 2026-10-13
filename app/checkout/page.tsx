import CheckoutForm from '@/components/CheckoutForm';

export const metadata = { title: 'Checkout' };

export default function CheckoutPage() {
  return (
    <div className="wrap" style={{ paddingBlock: 40 }}>
      <CheckoutForm />
    </div>
  );
}
