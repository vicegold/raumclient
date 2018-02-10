svgSprite               = require('gulp-svg-sprite');

config                  = {
    mode                    : {
        inline              : true,     // Prepare for inline embedding
        symbol              : true      // Create a «symbol» sprite
    }
};

gulp.src(build.files.svgsprites.map(function (file) { return paths.svgsprites.src + '/' + file; }))
    .pipe(svgSprite( config ))
    .pipe(gulp.dest(paths.svgsprites.dest))
