// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');
module.exports = (async () => {
  const config = await getDefaultConfig(__dirname);
  config.resolver.extraNodeModules = {
    ...config.resolver.extraNodeModules,
    // Mapea "url" a react-native-url-polyfill
    url: require.resolve('react-native-url-polyfill'),
  };
  return config;
})();
