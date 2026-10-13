'use client';

import { useCart } from '@/components/CartProvider';

export default function AddToCart({ id, name }: { id: string; name: string }) {
  const { add } = useCart();
  return (
    <button className="btn small" type="button" onClick={() => add(id)} aria-label={`Add ${name} to cart`}>
      Add to cart
    </button>
  );
}
