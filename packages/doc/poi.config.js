const isProduction = process.env.NODE_ENV === 'production';

const existFilter = a => a;

module.exports = {
  entry: [
    '../../node_modules/@babel/polyfill',
    isProduction && 'entries/disableReactDevtools',
    isProduction && 'entries/registerServiceWorker',
    'src/index',
  ].filter(existFilter),
  output: {
    publicUrl: process.env.PUBLIC_URL || '/',
  },
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
    // path might be too long
    config.module
      .rule('font')
      .use('file-loader')
      .options({
        name: 'assets/fonts/[name].[hash:8].[ext]',
      });
  },
};
