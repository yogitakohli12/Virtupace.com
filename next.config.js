/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
  i18n: {
    locales: [
      'ar',
      'bg',
      'cs',
      'de',
      "en",
      "es",
      "fi",
      'fr',
      "id",
      'it',
      'ja',
      "nl",
      'pt',
      'sk',
      "th",
      'vi',
      "zh",
      "zh-TW",
    ],
    defaultLocale: "en",
    localeDetection: true,
  },
};

module.exports = nextConfig;
