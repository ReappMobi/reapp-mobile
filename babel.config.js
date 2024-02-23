module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'nativewind/babel',
      'expo-router/babel',
      [
        'module-resolver',
        {
          root: '.',
          extensions: ['.ts', '.tsx', '.js'],
          alias: {},
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
