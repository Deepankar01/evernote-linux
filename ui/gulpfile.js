let gulp = require('gulp');
let less = require('gulp-less');
let minifyCSS = require('gulp-csso');
let browserSync = require('browser-sync').create();
let clean = require('gulp-clean');

/**
 * less to css
 */
gulp.task('css', ['clear'], function () {
    return gulp.src('app/less/*.less')
        .pipe(less())
        .pipe(minifyCSS())
        .pipe(gulp.dest('public/build/css'))
        .pipe(browserSync.stream())
});

gulp.task('css-without-clear', function () {
    return gulp.src('app/less/*.less')
        .pipe(less())
        .pipe(minifyCSS())
        .pipe(gulp.dest('public/build/css'))
        .pipe(browserSync.stream())
})

// Static server
gulp.task('browser-sync', ['copyImages'], function () {
    browserSync.init({
        server: {
            baseDir: './'
        }
    })
    gulp.watch('app/less/*.less', ['css-without-clear'])
    //reload html
    gulp.watch('*.html').on('change', browserSync.reload)
});

/**
 * Clear task to remove build
 */
gulp.task('clear', function () {
    return gulp.src('public/build/', { read: false })
        .pipe(clean())
});

//copy task
gulp.task('copyVendor', ['css'], () => gulp
    .src('app/vendor/**')
    .pipe(gulp.dest('public/build/vendor')));

//copy images directory
gulp.task('copyImages', ['copyVendor'], () => gulp
    .src('app/images/**')
    .pipe(gulp.dest('public/build/images')));


gulp.task('build', ['copyImages']);
gulp.task('default', ['copyImages', 'browser-sync']);