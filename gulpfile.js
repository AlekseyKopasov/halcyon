'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var csso = require('gulp-csso');
var imagemin = require('gulp-imagemin');
var webp = require('gulp-webp');
var svgStore = require('gulp-svgstore');
var postHtml = require('gulp-posthtml');
var include = require('posthtml-include');
var del = require('del');
var uglifyES = require('gulp-uglify-es').default;
var concat = require('gulp-concat');
var htmlmin = require('gulp-htmlmin');
var server = require('browser-sync').create();

// Конвертация препроцессорного кода и минификация CSS
gulp.task('css', function () {
  return gulp.src('source/sass/style.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest('build/css'))
    .pipe(csso())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream());
});

// Минификация JS-скриптов
gulp.task('script', function () {
  return gulp.src('source/js/*.js')
  .pipe(concat('main.js'))
  .pipe(gulp.dest('source/js'))
  .pipe(rename('main.min.js'))
  .pipe(uglifyES())
  .on('error', function (err) { console.log( err ) })
  .pipe(gulp.dest('build/js'));
});

// Минификация HTML
gulp.task('minifyHtml', () => {
  return gulp.src('source/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'));
});

// Минификация изображений
gulp.task('images', function () {
  return gulp.src('source/img/**/*.{png,jpg,svg}')
  .pipe(imagemin([
    imagemin.optipng({optimizationLavel: 3}),
    imagemin.jpegtran({progressive: true}),
    imagemin.svgo()
  ]))
  .pipe(gulp.dest('source/img'));
});

// Конвертация изображений в формат .webp
gulp.task('webp', function () {
  return gulp.src('source/img/**/*.{png,jpg}')
  .pipe(webp({quality: 90}))
  .pipe(gulp.dest('source/img'));
});

// Сборка SVG-спрайта
gulp.task('sprite', function () {
  return gulp.src('source/img/**/*.svg')
  .pipe(svgStore({
    inlineSvg: true
  }))
  .pipe(rename('sprite.svg'))
  .pipe(gulp.dest('build/img'));
});

// Вставка SVG-спрайта в HTML
gulp.task('html', function () {
  return gulp.src('source/*.html')
  .pipe(postHtml([
    include()
  ]))
  .pipe(gulp.dest('build'));
});

// Удаление папки build перед сборкой
gulp.task('clean', function () {
  return del('build');
});

// Коирование файлов в папку build
gulp.task('copy', function () {
  return gulp.src([
    'source/fonts/**/*.{woff,woff2}',
    'source/img/**'
  ], {
    base: 'source'
  })
 .pipe(gulp.dest('build'));
});


// Запуск локального сервера
gulp.task('server', function () {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('source/sass/**/*.{scss,sass}', gulp.series('css'));
  gulp.watch('source/*.html', gulp.series('html', 'refresh'));
  gulp.watch('source/img/*.svg', gulp.series('sprite', 'html', 'refresh'));
  gulp.watch('source/js/*.js', gulp.series('build', 'refresh'));
});

//Обновление локального сервера
gulp.task('refresh', function (done) {
  server.reload();
  done();
});

// Сборка проекта
gulp.task('build', gulp.series('clean', 'copy', 'css', 'sprite', 'html', 'minifyHtml', 'script'));

// Запуск локального сервера и сборка проекта
gulp.task('start', gulp.series('build', 'server'));
