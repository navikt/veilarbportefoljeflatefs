const constants = require('./constants');
const OUTPUT_DIRECTORY = constants.OUTPUT_DIRECTORY;

const onError = function (err) {
    const gutil = require('gulp-util');
    gutil.beep();
    gutil.log("Error: [line " + err.lineNumber + "] " + err.message);
};

const isProduction = () => process.env.NODE_ENV === 'production';
const isDevelopment = () => process.env.NODE_ENV !== 'production';

const babelifyReact = function (file) {
    const babelify = require('babelify');
    return babelify(file);
};


function bundle(gulp, bundle, bundleFileName) {
    const gulpif = require('gulp-if');
    const buffer = require('vinyl-buffer');
    const uglify = require('gulp-uglify');
    const source = require('vinyl-source-stream');
    const streamify = require('gulp-streamify');
    const replace = require('gulp-replace');

    return bundle
        .bundle()
        .on('error', function (err) {
            onError(err);
            this.emit('end');
        })
        .pipe(source(bundleFileName))
        .pipe(gulpif(isProduction(), buffer()))
        .pipe(gulpif(isProduction(), uglify())).on('error', function (error) {
            onError(error);
            process.exit(1);
        })
        .pipe(gulp.dest(OUTPUT_DIRECTORY + 'js/'));
}

function buildJs(gulp) {
    return () => {
        const browserify = require('browserify');
        const filterLess = require('browserify-file-filter');
        var bundler = browserify('./app/index.js', {
            debug: isDevelopment(),
            fullPaths: isDevelopment()
        })
            .transform(babelifyReact)
            .plugin(filterLess, { p: '\\.(?:css|less|scss|sass)$' });
        return bundle(gulp, bundler, 'bundle.js');
    };
}

function buildJsWatchify(gulp) {
    return () => {
        const watchify = require('watchify');
        const browserify = require('browserify');
        const filterLess = require('browserify-file-filter');
        const gutil = require('gulp-util');

        const browserifyOpts = {
            debug: isDevelopment(),
            entries: './app/index.js',
            cache: {},
            packageCache: {},
            fullPaths: isDevelopment()
        };

        var opts = Object.assign({}, watchify.args, browserifyOpts);
        var bundler = watchify(browserify(opts)).transform(babelifyReact).plugin(filterLess, { p: '\\.(?:css|less|scss|sass)$' });

        bundler.on('update', function () {
            gutil.log('Starting', gutil.colors.cyan("'watchify rebundle'"), '...');
            var start = new Date();

            return bundle(gulp, bundler, 'bundle.js').on('end', function () {
                var time = parseFloat((new Date() - start) / 1000).toFixed(2);
                gutil.log('Finished', gutil.colors.cyan("'watchify rebundle'"), 'after', gutil.colors.magenta(time + ' s'));
            });
        });

        return bundle(gulp, bundler, 'bundle.js');
    };
}




module.exports = {
    buildJs: (gulp) => buildJs(gulp),
    buildJsWatchify: (gulp) => buildJsWatchify(gulp)
};
