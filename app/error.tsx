'use client';

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="wrap confirm">
      <h1>Something went wrong</h1>
      <p>Please try again. If it keeps happening, email us and we will sort it out.</p>
      <button className="btn" onClick={reset}>Try again</button>
    </div>
  );
}
