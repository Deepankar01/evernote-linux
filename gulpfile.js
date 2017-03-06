let gulp = require('gulp');
let less = require('gulp-less');
let minifyCSS = require('gulp-csso');

/**
 * less to css
 */
gulp.task('css', function () {
    return gulp.src('css/*.less')
        .pipe(less())
        .pipe(minifyCSS())
        .pipe(gulp.dest('build/css'))
});


//copy task
gulp.task('copy', () => gulp
    .src('src/app/vendor/**')
    .pipe(gulp.dest('build/vendor')));


gulp.task('build', ['css', 'copy']);