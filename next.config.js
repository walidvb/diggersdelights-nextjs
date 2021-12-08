const { withExpo } = require('@expo/next-adapter');
const { withUnimodules } = require('@expo/webpack-config/addons');

const customExpoConfig = {
  ...withExpo(),
  webpack(nextConfig, options) {
    const babel = {
      dangerouslyAddModulePathsToTranspile: [
        'twrnc',
      ],
    };

    const expoConfig = withUnimodules(
      nextConfig,
      { projectRoot: __dirname, babel },
      { supportsFontLoading: false },
    );

    if (expoConfig.output && nextConfig.output) {
      expoConfig.output.publicPath = nextConfig.output.publicPath;
    }

    if (typeof nextConfig.webpack === 'function') {
      return nextConfig.webpack(expoConfig, options);
    }

    return expoConfig;
  }
};

module.exports = customExpoConfig;