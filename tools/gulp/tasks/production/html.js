var gulp = require('gulp');
var flatten = require('gulp-flatten');
var config = require('../../config').html.production;
var removeCode = require('gulp-remove-code');
var inject = require('gulp-inject');

gulp.task('html-deploy', function () {
  return gulp.src(config.source)
    .pipe(removeCode({production: true}))
    .pipe(gulp.dest(config.dest));

});
