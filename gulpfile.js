var elixir = require('laravel-elixir');

require('laravel-elixir-imagemin');
require('laravel-elixir-vue-2');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir.config.sourcemaps = false;
elixir.config.publicPath = 'public/';
elixir.config.assetsPath = 'resources/assets/';

elixir.config.images = {
    folder: 'images',
    outputFolder: 'img'
};

elixir(function(mix) {
    mix.styles([
            'style.css',
        ], 'public/style.css');
    mix.sass('app.scss')
       .webpack('app.js');
});
