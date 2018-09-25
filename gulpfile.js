const sourcemaps = require('gulp-sourcemaps');
const ts = require('gulp-typescript');
const sass = require('gulp-sass');
const gulp = require('gulp');

/**
 * Build server source code
 */
const tsProject = ts.createProject('./src/server/tsconfig.json');
gulp.task('build-server-src', () => {
  const result = tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(tsProject(ts.reporter.fullReporter()));

  return result.js
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/server'));
});

/**
 * Build server task
 */
gulp.task('build-server', gulp.series('build-server-src'));

/**
 * Build server and watch for changes
 */
gulp.task('build-server:watch', gulp.series('build-server', () => {
  gulp.watch('src/server/**/*.ts', gulp.series('build-server'));
}));

/**
 * Sass compilation
 */
gulp.task('build-sass', () => gulp.src('src/server/assets/styles/main.scss', { allowEmpty: true })
  .pipe(sourcemaps.init())
  .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('dist/server/assets/styles')));

/**
 * Build styles source code
 */
gulp.task('build-styles', gulp.series('build-sass'));

/**
 * Build assets watch task
 */
gulp.task('build-styles:watch', gulp.series('build-styles', () => {
  gulp.watch('src/server/assets/styles/**/*.scss', gulp.series('build-styles'));
}));

/**
 * Default task
 */
// gulp.task('default', ['build-styles', 'build-server']);
gulp.task('default', gulp.parallel('build-styles', 'build-server'));

/**
 * Watch task
 */
// gulp.task('watch', ['build-styles:watch', 'build-server:watch']);
gulp.task('watch', gulp.parallel('build-styles:watch', 'build-server:watch'));
