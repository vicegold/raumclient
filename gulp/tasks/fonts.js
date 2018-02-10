/**
 * This task handles all font files.
 */
gulp.task('fonts', function() {
    return gulp.src(bower(build.files.fonts).concat(build.files.fonts.map(function (file) { return paths.fonts.src + '/' + file; })))
        .pipe(gulp.dest(paths.fonts.dest))
        .pipe($.size({ title: 'fonts done.' }))
        .pipe(browserSync.reload({ stream: true }));
});
