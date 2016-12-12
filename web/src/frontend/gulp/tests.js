var gutil = require('gulp-util');
module.exports = {
    test: function (gulp, tdd) {
        return function () {
            const babel = require('babel-core/register'); //eslint-disable-line no-unused-vars
            const mocha = require('gulp-mocha');

            return gulp.src(['app/**/**-test.js*'])
                .pipe(mocha(
                    {
                        require: ['./setup.js'],
                        compilers: 'js:babel-core/register'
                    }
                ))
                .once('error', function (error) {
                    gutil.log(error.name, error.message);
                    if(!tdd) {
                        process.exit(1);
                    } else {
                        this.emit('end');
                    }
                })
                .once('end', function () {
                    if(!tdd) {
                        process.exit(0);
                    }
                });
        };
    },
    watch: function (gulp) {
        return function () {
            gulp.watch('./app/**/*.js*', ['test-tdd']).on('error', function(){this.emit('end');});
        };
    }
};
