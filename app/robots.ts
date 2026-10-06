import type { MetadataRoute } from 'next';

// /v0 is kept out of search with a noindex meta tag instead of a Disallow line,
// because listing it here would hand the easter egg to anyone who reads robots.txt.
export default function robots(): MetadataRoute.Robots {
    return {
        rules: { userAgent: '*', allow: '/' },
        sitemap: 'https://jaylinman.com/sitemap.xml',
    };
}
