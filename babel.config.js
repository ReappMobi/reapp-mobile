module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
    plugins: [
      'react-native-worklets/plugin',
      [
        'babel-plugin-transform-imports',
        {
          'lucide-react-native': {
            transform: (name) =>
              `lucide-react-native/dist/esm/icons/${name
                .replace(/Icon$/, '')
                .replace(/([a-z])([A-Z])/g, '$1-$2')
                .toLowerCase()}`,
            preventFullImport: true,
          },
        },
      ],
    ],
  };
};
