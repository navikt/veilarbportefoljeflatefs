function writeback(gulp) {
    const conditional = require('gulp-if');
    const condition = (file) => file.eslint && file.eslint.fixed;
    const write = gulp.dest('./app/');
    return conditional(condition, write);
}

function buildEslint(gulp) {
    return () => {
        const cliArgs = require('yargs').argv;
        const fix = !!cliArgs.fix;

        const eslint = require('gulp-eslint');
        return gulp.src(['./app/**/*.{js,jsx}'])
            .pipe(eslint({ fix: fix }))
            .pipe(writeback(gulp))
            .pipe(eslint.format())
            .pipe(eslint.failAfterError());
    };
}

module.exports = buildEslint;
