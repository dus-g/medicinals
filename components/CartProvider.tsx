'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { PRODUCTS, SITE } from '@/lib/site';

type Line = { id: string; qty: number };

type CartCtx = {
  lines: Line[];
  count: number;
  subtotalCents: number;
  shippingCents: number;
  totalCents: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = 'huoma-cart';
const MAX_QTY = 10;

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error('useCart must be used inside CartProvider');
  return c;
}

export default function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Line[];
        setLines(
          parsed.filter((l) => PRODUCTS.some((p) => p.id === l.id) && l.qty > 0).map((l) => ({ id: l.id, qty: Math.min(l.qty, MAX_QTY) })),
        );
      }
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {}
  }, [lines, ready]);

  const add = useCallback((id: string) => {
    setLines((cur) => {
      const found = cur.find((l) => l.id === id);
      if (found) return cur.map((l) => (l.id === id ? { ...l, qty: Math.min(l.qty + 1, MAX_QTY) } : l));
      return [...cur, { id, qty: 1 }];
    });
    setOpen(true);
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setLines((cur) => (qty <= 0 ? cur.filter((l) => l.id !== id) : cur.map((l) => (l.id === id ? { ...l, qty: Math.min(qty, MAX_QTY) } : l))));
  }, []);

  const remove = useCallback((id: string) => setLines((cur) => cur.filter((l) => l.id !== id)), []);
  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartCtx>(() => {
    const count = lines.reduce((n, l) => n + l.qty, 0);
    const subtotalCents = lines.reduce((sum, l) => {
      const p = PRODUCTS.find((x) => x.id === l.id);
      return sum + (p ? p.priceCents * l.qty : 0);
    }, 0);
    const shippingCents = count > 0 ? SITE.shippingCents : 0;
    return { lines, count, subtotalCents, shippingCents, totalCents: subtotalCents + shippingCents, open, setOpen, add, setQty, remove, clear };
  }, [lines, open, add, setQty, remove, clear]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
