var gulp = require('gulp');
var config = require('../../config').watch;

/**
 * Start browsersync task and then watch files for changes
 */
gulp.task('watch', ['test:backend', 'server:start', 'build', 'browsersync'], function () {
  gulp.watch(config.sass, ['sass']);
  gulp.watch(config.scripts, ['typescript-dev']);
  gulp.watch(config.html, ['html-dev']);
  gulp.watch(config.assets, ['copy-dev']);
  gulp.watch(config.models, ['lbng2:dev', 'typescript-dev', 'server:restart']);
  gulp.watch(config.server, ['server:restart']);
});
