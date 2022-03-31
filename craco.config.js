const path = require('path');
const enableImportsFromExternalPaths = require('./src/helpers/craco/enableImportsFromExternalPaths');

// Paths to the code you want to use
const lib_1 = path.resolve(__dirname, './thirdweb-dev/sdk');
const lib_2 = path.resolve(__dirname, './thirdweb-dev/sdk/index.js');
const lib_3 = path.resolve(__dirname, './thirdweb-dev/react');
const lib_4 = path.resolve(__dirname, './thirdweb-dev/react/index.js');
const lib_5 = path.resolve(__dirname, './thirdweb-dev/SDK/dist');
const lib_6 = path.resolve(__dirname, './thirdweb-dev/SDK/dist/index.js');

module.exports = {
  style: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
  webpack: {
    configure: {
      module: {
        rules: [
          {
            type: 'javascript/auto',
            // test: /\.mjs$/,
            test: /\.(js|jsx|tsx|ts|mjs)$/,
            // exclude: /node_modules/,
          },
        ],
      },
    },
  },
  plugins: [
    {
      plugin: {
        overrideWebpackConfig: ({ webpackConfig }) => {
          enableImportsFromExternalPaths(webpackConfig, [
            // Add the paths here
            lib_1,
            lib_2,
            lib_3,
            lib_4,
            lib_5,
            lib_6,
          ]);
          return webpackConfig;
        },
      },
    },
  ],
};
