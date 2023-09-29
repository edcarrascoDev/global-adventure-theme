const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const clean = require('gulp-clean-css');
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const themeKit = require('@shopify/themekit');
const urlEncode = require('gulp-css-urlencode-inline-svgs');

const AUTOPREFIXER_BROWSERS = [
  'ff >= 30',
  'chrome >= 34',
  'Safari >= 7',
  'ios >= 7',
  'Android >= 4.4',
  'bb >= 10'
];

gulp.task('sass', () => {
  return gulp.src('styles/**.scss')
      .pipe(sass({
        includePaths: ['node_modules']
      }))
      .pipe(autoprefixer())
      .pipe(urlEncode())
      .pipe(clean())
      .pipe(gulp.dest('assets'))
});

gulp.task('build', () => {
  return gulp.src('scripts/**.js')
      .pipe(babel({
        presets: ['@babel/preset-env']
      }))
      .pipe(gulp.dest('assets'))
});

gulp.task('watch', () => {
  gulp.watch('scripts/**/*.js', gulp.series('build'))
  gulp.watch('styles/**/*.scss', gulp.series('sass'))
  themeKit.command('watch', {
    allowLive: true,
    env: 'development'
  })
})

gulp.task('BUILD', () => {
  gulp.watch('scripts/**/*.js', gulp.series('build'))
  gulp.watch('styles/**/*.scss', gulp.series('sass'))
  themeKit.command('deploy', {
    allowLive: true,
    env: 'development'
  })
})
