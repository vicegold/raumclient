/**
 * Include gulp and additional plugins.
 */
gulp = require('gulp'),
$ = require('gulp-load-plugins')({ camelize: true }),
_ = $.loadUtils([ 'log', 'colors', 'env', 'noop' ]);

browserSync = require('browser-sync');
bower  = require('main-bower-files');
merge = require('merge-stream');
fs = require('fs');


/**
 * Load build configuration.
 */
build = require('../build.json');
paths = {
    images: {
        src: build.src + '/' + build.directories.images,
        dest: build.dest + '/' + build.directories.images
    },
    styles: {
        src: build.src + '/' + build.directories.styles,
        dest: build.dest + '/' + build.directories.styles
    },
    scripts: {
        src: build.src + '/' + build.directories.scripts,
        dest: build.dest + '/' + build.directories.scripts
    },
    fonts: {
        src: build.src + '/' + build.directories.fonts,
        dest: build.dest + '/' + build.directories.fonts
    },
    svgsprites: {
        src: build.src + '/' + build.directories.svgsprites,
        dest: build.dest + '/' + build.directories.svgsprites
    }
};


/**
 * By default build process is designed for production use.
 */
isProduction = true;
sassStyle = 'compressed';
sourceMap = false;


/**
 * There are some flags which give the ability to dynamically change the way
 * the build process is working.
 */
if (_.env.dev === true) {
    sassStyle = 'nested';
    sourceMap = true;
    isProduction = false;
}


/**
 * Tell which environment we're going to run for.
 */
console.log('\nBuilding for', _.colors.magenta(isProduction ? 'production' : 'development'), '...\n');


/**
 * Which task should be run?
 */
tasks = fs.readdirSync('./gulp/tasks/');
tasks.forEach(function(task) {
    require('./tasks/' + task);
});
