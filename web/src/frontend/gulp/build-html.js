const OUTPUT_DIRECTORY = require('./constants').OUTPUT_DIRECTORY;

function buildHtml(gulp) {
    return () => {
        return gulp.src('./index.html')
            .pipe(gulp.dest(OUTPUT_DIRECTORY));
    };
}

module.exports = {
    buildHtml: buildHtml,
};
