module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vlidator/'
    : '/',
  css: {
    extract: process.env.EXTRACT_CSS === 'true'
  }
};
