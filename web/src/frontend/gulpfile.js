const gulp = require('gulp');
const gutil = require('gulp-util');
const less = require('gulp-less');

const isProduction = () => process.env.NODE_ENV === 'production';
const constants = require('./gulp/constants');
const OUTPUT_DIRECTORY = constants.OUTPUT_DIRECTORY;

process.env.NODE_ENV = gutil.env.prod != null ? 'production' : 'development';

gulp.task('build-html', require('./gulp/build-html').buildHtml(gulp));
gulp.task('build-less', require('./gulp/build-less')(gulp));
gulp.task('build-js', require('./gulp/build-js').buildJs(gulp));
gulp.task('build-js-watchify', require('./gulp/build-js').buildJsWatchify(gulp));
gulp.task('copy-img', require('./gulp/copy-img').copyImg(gulp));
gulp.task('eslint', require('./gulp/eslint')(gulp));
gulp.task('test', require('./gulp/tests').test(gulp, false));
gulp.task('test-tdd', require('./gulp/tests').test(gulp, true));
gulp.task('tdd', ['test-tdd'], require('./gulp/tests').watch(gulp));
gulp.task('build', ['build-js', 'build-html', 'build-less', 'eslint', 'copy-img' ], () => {
});

gulp.task('clean', function (callback) {
    const del = require('del');
    return del([
        // Delete all copied images and built .js- and .css-files in outputDirectory
        OUTPUT_DIRECTORY + 'img/',
        OUTPUT_DIRECTORY + 'js/',
        OUTPUT_DIRECTORY + 'css/',
        OUTPUT_DIRECTORY + 'index.html'
    ], { 'force': true }, callback);
});

gulp.task('watch', ['clean'], function () {
    process.env.NODE_ENV = 'development';

    gulp.start(['build-js-watchify','build-less','build-html', 'copy-img']);
    gulp.watch('./app/**/*.less', ['build-less']);
});

gulp.task('default', function () {
    gutil.log("-------- Start building for " + (isProduction() ? "production" : "development"));
    gulp.start('build');
});
