/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/open-pole-barn-kits',
        destination: '/open-pole-barns',
        permanent: true,
      },
      {
        source: '/open-pole-barn-kits/',
        destination: '/open-pole-barns',
        permanent: true,
      },
      {
        source: '/enclosed-pole-barn-kits',
        destination: '/enclosed-pole-barns',
        permanent: true,
      },
      {
        source: '/enclosed-pole-barn-kits/',
        destination: '/enclosed-pole-barns',
        permanent: true,
      },
      {
        source: '/customizable-pole-barns',
        destination: '/',
        permanent: true,
      },
      {
        source: '/customizable-pole-barns/',
        destination: '/',
        permanent: true,
      },
      {
        source: '/the-benefits-of-pole-barns-cost-effective-barn-solutions',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/the-benefits-of-pole-barns-cost-effective-barn-solutions/',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/what-to-consider-before-building-your-pole-barn-kit',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/what-to-consider-before-building-your-pole-barn-kit/',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/contact',
        destination: '/quote',
        permanent: true,
      },
      {
        source: '/contact/',
        destination: '/quote',
        permanent: true,
      },
      {
        source: '/resources',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/resources/',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/thank-you',
        destination: '/quote',
        permanent: true,
      },
      {
        source: '/thank-you/',
        destination: '/quote',
        permanent: true,
      },
      {
        source: '/flogrown',
        destination: '/',
        permanent: true,
      },
      {
        source: '/flogrown/',
        destination: '/',
        permanent: true,
      },
      {
        source: '/johnmcdonaldjr',
        destination: '/',
        permanent: true,
      },
      {
        source: '/johnmcdonaldjr/',
        destination: '/',
        permanent: true,
      },
      {
        source: '/category/uncategorized',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/category/uncategorized/',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/category/:slug',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/facebook-ad',
        destination: '/',
        permanent: true,
      },
      {
        source: '/facebook-ad/',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
