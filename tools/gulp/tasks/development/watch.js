var gulp = require('gulp');
var config = require('../../config').watch;

/**
 * Start browsersync task and then watch files for changes
 */
gulp.task('watch', ['build', 'test:backend', 'browsersync'], function () {
  gulp.watch(config.sass, ['sass']);
  gulp.watch(config.scripts, ['typescript-dev']);
  gulp.watch(config.html, ['html-dev']);
  gulp.watch(config.assets, ['copy-dev']);
});
