/**
 * Created by User on 17/03/2016.
 */
var gulp = require("gulp"),
    del = require('del'),
    sass = require("gulp-sass"),
    uglify = require("gulp-uglify"),
    jshint = require('gulp-jshint'),
    minifyCss = require("gulp-minify-css"),
    stylish = require('jshint-stylish'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync').create();


// Definición de direcotrios origen
var srcPaths = {
    scripts:  'src/js/',
    styles:   'src/sass/',
    files:    'src/'
};


// Definición de directorios destino
var distPaths = {
    scripts:  'dist/js/',
    styles:   'dist/css/',
    files:    'dist/'
};

// Limpieza del directorio dist
gulp.task('clean', function(cb) {
    del([ distPaths.files+'*.html', distPaths.scripts+'*.js', distPaths.styles+'*.css'], cb);
});


// Copia de los cambios en los ficheros html en el directorio dist.
gulp.task('html', function() {
    return gulp.src([srcPaths.files+'*.html'])
        .pipe(gulp.dest(distPaths.files))
        .pipe(browserSync.stream());
});
// css
gulp.task('sass', function () {
    return gulp.src(srcPaths.styles+'*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(minifyCss())
        .pipe(gulp.dest(distPaths.styles))
        .pipe(browserSync.stream());

});
// scripts

gulp.task('lint', function() {
    return gulp.src([srcPaths.scripts+'**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});


/*
 * Procesamiento de ficheros JS para la generación de un fichero
 * final único y minificado. Los sourcemaps se generan en una
 * carpeta independiente en vez de en el propio fichero.
 */
gulp.task('js', ['lint'], function() {
    return gulp.src([srcPaths.scripts+'main.js', srcPaths.scripts+'extra.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('all.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest(distPaths.scripts))
        .pipe(browserSync.stream());
});

gulp.task('serve', ['html', 'sass', 'js'], function() {
    browserSync.init({
        logLevel: "info",
        browser: ["google chrome", "Firefox"],
        proxy: "localhost:80",
        startPath: "/web/uoc/PEC01_P7/dist/"
    });

    gulp.watch(srcPaths.files+'*.html', ['html']);
    gulp.watch(srcPaths.styles+'**/*.scss', ['sass']);
    gulp.watch(srcPaths.scripts+'**/*.js', ['js']);
});


gulp.task('default', ['clean', 'serve'], function() {});
