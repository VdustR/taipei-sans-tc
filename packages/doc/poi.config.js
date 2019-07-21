const isProduction = process.env.NODE_ENV === 'production';

const existFilter = a => a;

module.exports = {
  entry: [
    '../../node_modules/@babel/polyfill',
    isProduction && '../../node_modules/disable-react-devtools',
    isProduction && 'src/registerServiceWorker',
    'src/index',
  ].filter(existFilter),
  plugins: [
    {
      resolve: '@poi/plugin-eslint',
    },
    {
      resolve: '@poi/plugin-pwa',
    },
  ],
  chainWebpack: config => {
    config.resolve.alias.set('react-dom', '@hot-loader/react-dom');
    const mdx = config.module.rule('mdx').test(/\.mdx$/);
    mdx.use('babel').loader('babel-loader');
    mdx.use('mdx').loader('@mdx-js/loader');
  },
};
