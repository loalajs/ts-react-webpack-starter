const sourcemaps = require('gulp-sourcemaps');
const ts = require('gulp-typescript');
const webpack = require('webpack');
const gutil = require('gulp-util');
const sass = require('gulp-sass');
const gulp = require('gulp');

/**
 * Build client source code task
 */
const clientWebpack = webpack(require('./src/client/config/webpack.config'));

gulp.task('build-client-src', (done) => {
  clientWebpack.run((err, stats) => {
    if (err) {
      throw new gutil.PluginError('build-client-src', err);
    }

    gutil.log('[build-client-src]', stats.toString({
      chunks: false,
      colors: true,
    }));

    done();
  });
});

/**
 * Build client
 */
gulp.task('build-client', ['build-client-src']);

/**
 * Build client and watch for changes
 */
gulp.task('build-client:watch', ['build-client'], () => {
  gulp.watch('src/client/**/*.tsx', ['build-client']);
});

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
gulp.task('build-server', ['build-server-src']);

/**
 * Build server and watch for changes
 */
gulp.task('build-server:watch', ['build-server'], () => {
  gulp.watch('src/server/**/*.ts', ['build-server']);
});

/**
 * Sass compilation
 */
gulp.task('build-sass', () => gulp.src('src/server/static/styles/main.scss')
  .pipe(sourcemaps.init())
  .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('dist/server/static/styles')));

/**
 * Build styles source code
 */
gulp.task('build-styles', ['build-sass']);

/**
 * Build assets watch task
 */
gulp.task('build-styles:watch', ['build-styles'], () => {
  gulp.watch('src/server/static/styles/**/*.scss', ['build-styles']);
});

/**
 * Default task
 */
gulp.task('default', ['build-styles', 'build-server']);

/**
 * Watch task
 */
gulp.task('watch', ['build-styles:watch', 'build-server:watch']);