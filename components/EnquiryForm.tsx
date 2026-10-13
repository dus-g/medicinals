'use client';

import { FormEvent, useState } from 'react';

export default function EnquiryForm() {
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setState('sending');
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(f.entries())),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Something went wrong.');
      setState('done');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
      setState('error');
    }
  }

  if (state === 'done') {
    return <p className="note">Thanks, we have your message and will reply by email.</p>;
  }

  return (
    <form onSubmit={onSubmit} className="form">
      <label htmlFor="name">Name</label>
      <input id="name" name="name" required maxLength={120} autoComplete="name" />
      <label htmlFor="email">Email</label>
      <input id="email" name="email" type="email" required maxLength={200} autoComplete="email" />
      <label htmlFor="message">Message</label>
      <textarea id="message" name="message" required maxLength={2000} rows={4} />
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hp" />
      <button className="btn" type="submit" disabled={state === 'sending'}>
        {state === 'sending' ? 'Sending…' : 'Send message'}
      </button>
      {state === 'error' && <p className="err" role="alert">{error}</p>}
    </form>
  );
}
