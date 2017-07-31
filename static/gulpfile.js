var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    webserver = require('gulp-webserver'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify');

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

gulp.task('buildCSS', function() {
    gulp.src(['src/scss/*.scss',
            'src/components/*/scss/*.scss'])
        .pipe(sourcemaps.init())
            .pipe(concat('styles.scss'))        
            .pipe(sass({outputStyle: 'compressed'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/assets'))
});

gulp.task('buildJS', function() {
    gulp.src(['src/js/*.js',
            'src/components/*/js/*.js'])
        .pipe(sourcemaps.init())
            .pipe(concat('bundle.js'))
            .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/assets'))
});

gulp.task('copyHTML', function(){
    gulp.src(['src/index.html'])
        .pipe(gulp.dest('dist'))
});

gulp.task('copyFonts', function() {
    gulp.src(['src/assets/fonts/*.*'])
        .pipe(gulp.dest('dist/assets/fonts'))
});

gulp.task('copyImages', function() {
    gulp.src(['src/assets/images/*.*'])
        .pipe(gulp.dest('dist/assets/images'))
});


gulp.task('build', ['buildCSS', 'buildJS', 'copyHTML','copyFonts', 'copyImages']);

gulp.task('default', ['webserver', 'watchJS', 'watchCSS']);