var gulp = require('gulp');
var runSequence = require('run-sequence');

/**
 * Run all tasks needed for a build in defined order
 */
gulp.task('deploy', function (callback) {
  runSequence('delete-deploy',
    'lbng2',
    ['deploy-templates',
    'html-deploy',
    'sass-deploy:components',
    'sass-deploy'],
    'typescript-deploy',
    'production-jspm-config',
    ['test:backend',
    'test-deploy'],
    ['production-images',
    'copy-deploy',
    'scripts-bundle'],
    'delete-deploy-src',
    callback);
});

gulp.task('deploysourcemaps', function (callback) {
  runSequence('delete-deploy',
    'lbng2',
    ['deploy-templates',
    'html-deploy',
    'sass-deploy:components',
    'sass-deploy'],
    'typescript-deploy',
    'production-jspm-config',
    ['test:backend',
    'test-deploy'],
    ['production-images',
    'copy-deploy',
    'scripts-bundle:sourcemaps'],
    'delete-deploy-src',
    callback);
});
