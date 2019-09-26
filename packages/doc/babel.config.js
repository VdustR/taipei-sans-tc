module.exports = {
  presets: [
    'react-app',
    [
      '@emotion/babel-preset-css-prop',
      {
        autoLabel: true,
        labelFormat: '[local]',
      },
    ],
  ],
  plugins: ['react-hot-loader/babel'],
};
