import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/url';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  return ['', '/privacy', '/terms', '/shipping', '/returns', '/cookies'].map((p) => ({
    url: base + p,
    lastModified: new Date(),
  }));
}
