/* eslint-disable @typescript-eslint/no-var-requires */
const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');

module.exports = withPlugins(
  [
    withImages({
      inlineImageLimit: false,
    }),
  ],
  {
    images: { disableStaticImages: true },
    poweredByHeader: false,
    async redirects() {
      return [
        {
          source: '/block',
          destination: '/',
          permanent: true,
        },
      ];
    },
  }
);
