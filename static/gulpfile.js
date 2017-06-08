var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    webserver = require('gulp-webserver');

gulp.task('sass', function() {
    gulp.src(['src/scss/*.scss',
            'src/components/*/scss/*.scss'])
        .pipe(concat('styles.scss'))
        .pipe(sass())
        .pipe(gulp.dest('src/assets'))
});

gulp.task('watch', function() {
    gulp.watch(['src/scss/*.scss',
            'src/components/*/scss/*.scss'], ['sass'])
});

gulp.task('webserver', function() {
    gulp.src('src')
        .pipe(webserver({
            livereload: true,
            directoryListing: false,
            open: true
        }));
});

gulp.task('default', ['watch', 'webserver']);