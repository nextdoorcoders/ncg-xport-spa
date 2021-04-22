const mix = require('laravel-mix')

mix.webpackConfig({
  resolve: {
    extensions: [
      '.js',
      '.vue',
      '.json'
    ],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': __dirname + '/src'
    }
  }
})

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('src/scripts/app.js', 'js')
  .sass('src/styles/app.scss', 'css')
  .sourceMaps(false)
  .setPublicPath('public')
  .extract([
    'axios',
    // 'bootstrap',
    // 'cross-env',
    'deepmerge',
    'laravel-echo',
    'lodash',
    'moment',
    'object-path',
    'socket.io-client',
    'vue',
    'vue-axios',
    'vue-moment',
    'vue-router',
    'vuex'
  ])
