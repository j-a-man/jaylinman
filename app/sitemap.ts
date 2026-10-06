import type { MetadataRoute } from 'next';

// Only the current site. /v0 is the easter egg and stays out of search.
export default function sitemap(): MetadataRoute.Sitemap {
    return [{ url: 'https://jaylinman.com/', changeFrequency: 'monthly', priority: 1 }];
}
