/**
 * This task handles all JavaScript files. Loads all vendor scripts (e.g from a
 * package manager like Bower) and then all applications scripts. Once this is
 * done additional tasks will happen like concatenation, uglification and
 * several other optimizations for production use.
 *
 * If the flag '--dev' was given, some of those tasks are skipped.
 */
var amdo = require('amd-optimize');

gulp.task('scripts', function() {

    var vendor = gulp.src(bower(build.files.scripts))
        .pipe($.concat('plugins.js'))
        .pipe(isProduction ? $.uglify() : _.noop())
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe($.size({ title: 'vendor scripts done.' }));

    var app = gulp.src(build.files.scripts.map(function (file) { return paths.scripts.src + '/' + file; }))
        .pipe($.jshint({ 'esnext' : true }))
        .pipe($.babel())
        .pipe($.notify(function (file) {

            // don't show something if success
            if (file.jshint.success) {
                return false;
            }

            var errors = file.jshint.results.map(function (data) {
                if (data.error) {
                    return '(' + data.error.line + ':' + data.error.character + ') ' + data.error.reason;
                }
            }).join('\n');

            return {
                title: 'Warning',
                message: file.relative + ' (' + file.jshint.results.length + ' errors)\n' + errors
            };
        }))
        .pipe($.jshint.reporter('fail'))
        .on('error', function (error) { this.emit('end') })
        .pipe($.concat('app.js'))
        .pipe(isProduction ? $.uglify() : _.noop())
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe($.size({ title: 'app scripts done.' }))
        .pipe(browserSync.reload({ stream: true }));

    return merge(vendor, app);
});
