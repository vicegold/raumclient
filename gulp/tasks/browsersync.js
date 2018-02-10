/**
 * BrowserSync makes your tweaking and testing faster by synchronising file
 * changes and interactions across multiple devices. It’s wicked-fast and
 * totally free.
 *
 * @see http://www.browsersync.io/
 */
gulp.task('browser-sync', function() {
    browserSync({
        proxy: ('browserSync' in build) && ('proxy' in build.browserSync) ? build.browserSync.proxy : 'localhost',
        notify: ('browserSync' in build) && ('notify' in build.browserSync) ? build.browserSync.notify : true,
    });

    if ('browserSync' in build && 'watchForChange' in build.browserSync) {
        $.watch(build.browserSync.watchForChange, function() {
            browserSync.reload();
        });
    }
});
