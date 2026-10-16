export const RESERVE_ACTION = {
  '@type': 'ReserveAction',
  name: 'Book a project call',
  target: {
    '@type': 'EntryPoint',
    urlTemplate: 'https://booqer.ai/shops/florida-pole-barn/book',
    actionPlatform: [
      'http://schema.org/DesktopWebPlatform',
      'http://schema.org/MobileWebPlatform',
    ],
  },
} as const
