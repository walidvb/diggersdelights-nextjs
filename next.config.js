const { withExpo } = require("@expo/next-adapter");

module.exports = {
  experimental: {
    forceSwcTransforms: true,
  },
};
module.exports = withExpo({
  reactStrictMode: true,
  swcMinify: true,
  // transpilePackages is a Next.js +13.1 feature.
  // older versions can use next-transpile-modules
  transpilePackages: [
    'react-native',
    'expo',
    'twrnc',
    'react-native-super-grid',
    // Add more React Native/Expo packages here...
  ],
  experimental: {
    forceSwcTransforms: true,
  },
});
