import type { ReactNode } from 'react';
import { LEGAL } from '@/lib/site';

export default function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <article className="wrap legal-doc">
      <h1>{title}</h1>
      <p className="muted small">Last updated {LEGAL.lastUpdated}</p>
      {children}
    </article>
  );
}
