/**
 * Configure watching task.
 */
gulp.task('watch', [ 'images', 'styles', 'scripts', 'fonts', 'browser-sync' ], function() {

    // watch styles
    $.watch(build.files.styles.map(function (file) {
        return paths.styles.src + '/' + file;
    }), function() {
        gulp.start('styles');
    });

    // watch for JavaScript changes
    $.watch(build.files.scripts.map(function (file) {
        return paths.scripts.src + '/' + file;
    }), function() {
        gulp.start('scripts');
    });

    // watch images
    $.watch(build.files.images.map(function (file) {
        return paths.images.src + '/' + file;
    }), function() {
        gulp.start('images');
    });

    // watch fonts
    $.watch(build.files.fonts.map(function (file) {
        return paths.fonts.src + '/' + file;
    }), function() {
        gulp.start('fonts');
    });

    // watch fonts
    $.watch(build.files.svgsprites.map(function (file) {
        return paths.svgsprites.src + '/' + file;
    }), function() {
        gulp.start('svgsprites');
    });
});
