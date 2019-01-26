const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const csso = require('gulp-csso');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const svgStore = require('gulp-svgstore');
const postHtml = require('gulp-posthtml');
const include = require('posthtml-include');
const del = require('del');
const uglifyES = require('gulp-uglify-es').default;
const concat = require('gulp-concat');
const htmlmin = require('gulp-htmlmin');
const server = require('browser-sync').create();
const w3cjs = require('gulp-w3cjs'); // валидатор HTML
const babel = require('gulp-babel'); // транспайлер для js, переписывает скрипты, написанные на современном синтаксисе JavaScrypt, в синтаксис ES5 для совместимости со старыми браузерами

// Конвертация препроцессорного кода и минификация CSS
gulp.task('css', () => gulp.src('source/sass/style.scss')
  .pipe(plumber())
  .pipe(sass())
  .pipe(postcss([
    autoprefixer(),
  ]))
  .pipe(gulp.dest('build/css'))
  .pipe(csso())
  .pipe(rename('style.min.css'))
  .pipe(gulp.dest('build/css'))
  .pipe(server.stream()));

// Минификация JS-скриптов
gulp.task('script', () => gulp.src('source/js/*.js')
  .pipe(babel())
  .pipe(concat('main.js'))
  .pipe(uglifyES())
  .pipe(rename('main.min.js'))
  .on('error', (err) => {
    // eslint-disable-next-line no-console
    console.log(err);
  })
  .pipe(gulp.dest('build/js')));

// Минификация HTML
gulp.task('minifyHtml', () => gulp.src('source/*.html')
  .pipe(w3cjs())
  .pipe(htmlmin({
    collapseWhitespace: true,
    collapseInlineTagWhitespace: true,
    removeComments: true,
    removeEmptyAttributes: true,
  }))
  .pipe(gulp.dest('build')));

// Минификация изображений
gulp.task('images', () => gulp.src('source/img/**/*.{png,jpg,svg}')
  .pipe(imagemin([
    imagemin.optipng({ optimizationLavel: 3 }),
    imagemin.jpegtran({ progressive: true }),
    imagemin.svgo(),
  ]))
  .pipe(gulp.dest('source/img')));

// Конвертация изображений в формат .webp
gulp.task('webp', () => gulp.src('source/img/**/*.{png,jpg}')
  .pipe(webp({ quality: 90 }))
  .pipe(gulp.dest('source/img')));

// Сборка SVG-спрайта
gulp.task('sprite', () => gulp.src('source/img/**/*.svg')
  .pipe(svgStore({
    inlineSvg: true,
  }))
  .pipe(rename('sprite.svg'))
  .pipe(gulp.dest('build/img')));

// Вставка SVG-спрайта в HTML
gulp.task('html', () => gulp.src('source/*.html')
  .pipe(postHtml([
    include(),
  ]))
  .pipe(gulp.dest('build')));

// Удаление папки build перед сборкой
gulp.task('clean', () => del('build'));

// Коирование файлов в папку build
gulp.task('copy', () => gulp.src([
  'source/fonts/**/*.{woff,woff2}',
  'source/img/**',
  'source/js/lib/*.js',
], {
  base: 'source',
})
  .pipe(gulp.dest('build')));


// Запуск локального сервера
gulp.task('server', () => {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false,
  });

  gulp.watch('source/sass/**/*.{scss,sass}', gulp.series('css'));
  gulp.watch('source/*.html', gulp.series('html', 'refresh'));
  gulp.watch('source/img/*.svg', gulp.series('sprite', 'html', 'refresh'));
  gulp.watch('source/js/*.js', gulp.series('build', 'refresh'));
});

// Обновление локального сервера
gulp.task('refresh', (done) => {
  server.reload();
  done();
});

// Сборка проекта
gulp.task('build', gulp.series('clean', 'copy', 'css', 'sprite', 'html', 'minifyHtml', 'script'));

// Запуск локального сервера и сборка проекта
gulp.task('start', gulp.series('build', 'server'));
