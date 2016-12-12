const OUTPUT_DIRECTORY = require('./constants').OUTPUT_DIRECTORY;

function copyImg(gulp) {
    return () => {
        return gulp.src(['./node_modules/modig-frontend/modig-frontend-ressurser/src/main/resources/META-INF/resources/img/**/*', './img/**/*'])
            .pipe(gulp.dest(OUTPUT_DIRECTORY + 'img/'));
    };
}

module.exports = {
    copyImg: (gulp) => copyImg(gulp)
};