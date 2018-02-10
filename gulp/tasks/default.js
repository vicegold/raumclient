/**
 * This is the default task that is being run when you just call `gulp`.
 */
gulp.task('default', [ 'clean' ], function() {
    return gulp.start('styles', 'scripts', 'images', 'fonts');
});
