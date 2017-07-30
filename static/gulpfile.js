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

gulp.task('js', function() {
    gulp.src(['src/js/*.js',
        'src/components/*/js/*.js'])
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('src/assets'))
})

gulp.task('watchJS', function() {
    gulp.watch(['src/js/*.js',
            'src/components/*/js/*.js'],            
            ['js'])
});
gulp.task('watchCSS', function() {
    gulp.watch(['src/scss/*.scss',
            'src/components/*/scss/*.scss'],            
            ['sass'])
});

gulp.task('webserver', function() {
    gulp.src('src')
        .pipe(webserver({
            livereload: true,
            directoryListing: false,
            open: true,
            host: '0.0.0.0'
        }));
});

gulp.task('default', ['webserver', 'watchJS', 'watchCSS']);