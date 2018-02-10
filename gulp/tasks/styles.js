/**
 * Compile, minify, prefix and optimize styles.
 */
gulp.task('styles', function() {

    var app = gulp.src(build.files.styles.map(function (file) { return paths.styles.src + '/' + file; }))
        .pipe($.sass({
            indentedSyntax: true,
            outputStyle: sassStyle
        }).on('error', $.sass.logError))
        // @see https://github.com/ai/autoprefixer
        .pipe($.autoprefixer(build.autoprefixer && build.autoprefixer.browsers ? build.autoprefixer.browsers : 'last 2 versions'));

    return merge(gulp.src(bower(build.files.styles)), app)
        .pipe($.concat('styles.css'))
        .pipe(isProduction ? $.mergeMediaQueries({ log: true }) : _.noop())
        .pipe(isProduction ? $.minifyCss({ keepSpecialComments: 1, advanced: false }) : _.noop())
        .pipe(gulp.dest(paths.styles.dest))
        .pipe($.size({ title: 'styles done.' }))
        .pipe(browserSync.reload({ stream: true }));
});
