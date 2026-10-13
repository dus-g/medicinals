import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="wrap confirm">
      <h1>Page not found</h1>
      <p>The page you are looking for does not exist or has moved.</p>
      <Link className="btn" href="/">Back to the shop</Link>
    </div>
  );
}
