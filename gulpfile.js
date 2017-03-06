let gulp = require('gulp');
let less = require('gulp-less');
let minifyCSS = require('gulp-csso');

/**
 * less to css
 */
gulp.task('css', function () {
    return gulp.src('src/app/less/*.less')
        .pipe(less())
        .pipe(minifyCSS())
        .pipe(gulp.dest('public/build/css'))
});


//copy task
gulp.task('copyVendor', () => gulp
    .src('src/app/vendor/**')
    .pipe(gulp.dest('public/build/vendor')));

//copy images directory
gulp.task('copyImages',() => gulp
  .src('src/app/images/**')
  .pipe(gulp.dest('public/build/images')));

gulp.task('build', ['css', 'copyVendor','copyImages']);