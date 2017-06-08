var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass');

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

gulp.task('default', ['sass', 'watch']);