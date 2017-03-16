const OUTPUT_DIRECTORY = require('./constants').OUTPUT_DIRECTORY;
const rename = require('gulp-rename');



function buildHtml(gulp, isProduction) {
    const htmlSrc = isProduction() ? './index.html' : './index-dev.html';
    return () => {
        return gulp.src(htmlSrc)
            .pipe(rename('index.html'))
            .pipe(gulp.dest(OUTPUT_DIRECTORY));
    };
}

module.exports = {
    buildHtml: buildHtml,
};
