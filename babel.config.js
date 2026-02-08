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
            transform: (name) => {
              if (['LucideIcon', 'LucideProps'].includes(name)) {
                return 'lucide-react-native';
              }
              return `lucide-react-native/dist/esm/icons/${name
                .replace(
                  /([A-Z0-9])/g,
                  (matches) => `-${matches[0].toLowerCase()}`
                )
                .replace(/^-/, '')
                .replace(/-icon$/, '')}`;
            },
            preventFullImport: true,
          },
        },
      ],
    ],
  };
};
