import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    // The site has two root layouts (the current site and /v0), so unmatched URLs need one shared 404
    globalNotFound: true,
  },
  async redirects() {
    // Pages from the previous version of the site now live in sections of the single-page site.
    // Temporary redirects, so browsers do not cache them forever.
    return [
      { source: "/about", destination: "/#about", permanent: false },
      { source: "/resume", destination: "/#work", permanent: false },
      { source: "/cs-projects", destination: "/#projects", permanent: false },
      { source: "/cs-projects/:slug", destination: "/#projects", permanent: false },
      { source: "/graphics", destination: "/", permanent: false },
      { source: "/contact", destination: "/#contact", permanent: false },
    ];
  },
};

export default nextConfig;
