const path = require('path');

module.exports = {
    plugins: ['scss', 'workbox'],
    modify: (baseConfig, { target, dev }, webpack) => {

      /* make a copy of config */
      const config = Object.assign({}, baseConfig);
  
      config.resolve['alias'] = {
          'components': path.resolve(__dirname, './src/components'),
          'utils': path.resolve(__dirname, 'src/utils'),
          'demos': path.resolve(__dirname, 'src/demos'),
          'assets': path.resolve(__dirname, 'src/assets'),
          'hocs': path.resolve(__dirname, 'src/hocs'),
          'styles': path.resolve(__dirname, 'src/styles'),
          'stores': path.resolve(__dirname, 'src/stores'),
          'services': path.resolve(__dirname, 'src/services'),
          'pages': path.resolve(__dirname, 'src/pages'),
      }
  
      return config;
    }
};