var elixir = require('laravel-elixir');

require('laravel-elixir-imagemin');

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
elixir.config.assetsPath = 'resources/';

elixir.config.images = {
    folder: 'images',
    outputFolder: 'img'
};


elixir(function(mix) {
    mix.sass(['site.scss'], 'public/css/site.min.css');
    mix.imagemin({
        interlaced: true
    });
});

