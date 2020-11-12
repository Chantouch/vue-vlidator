const path = require('path');

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vlidator/'
    : '/',
  css: {
    extract: process.env.EXTRACT_CSS === 'true'
  },
  configureWebpack: {
    output: {
      libraryExport: 'default'
    },
    resolve: {
      alias: {
        '~': path.resolve(__dirname, 'src'),
        '@': path.resolve(__dirname),
      },
      extensions: ['.js', '.vue', '.json']
    }
  }
};
