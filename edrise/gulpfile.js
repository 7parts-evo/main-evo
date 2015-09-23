var gulp = require('gulp');
var inject = require('gulp-inject');
var mainBowerFiles = require('main-bower-files');

gulp.task('default', function () {
    gulp.src(mainBowerFiles())
        .pipe(gulp.dest('./src/templates/libs'));

    var fonts = gulp.src('./src/templates/css/fonts.css', { read: false });

    gulp.src('./src/templates/lab.php')
        .pipe(inject(fonts, { name: 'fonts', relative: true }))
        .pipe(gulp.dest('./src/templates'));
});

