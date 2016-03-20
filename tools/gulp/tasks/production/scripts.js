var gulp = require('gulp');
var shell = require('gulp-shell');
var config = require('../../config').scripts.production;
var jspm = require('jspm');
var source = require('vinyl-source-stream');
var vinylBuffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');

gulp.task('scripts-bundle', function () {
  var builder = new jspm.Builder();
  var opt = { /*minify: true,*/ mangle: true };

  builder.config({
    paths: {
      "assets/app.css": "target/production/assets/app.css"
    },
    rootURL: "target/production/",
    options: opt
  });

  return new Promise(function(resolve, reject) {
    builder.buildStatic(config.source, opt)
      .then(function (output) {
        var stream = source('app.js');

        stream.write(output.source);
        process.nextTick(function () {
          stream.end();
        });

        return stream.pipe(vinylBuffer())
          .pipe(rename({ suffix: '.min' }))
          .pipe(gulp.dest(config.dest))
          .on('end', resolve)
          .on('error', reject);
      }, reject);
  });
});

gulp.task('scripts-bundle:sourcemaps', function () {
  var builder = new jspm.Builder();
  var opt = { /*minify: true,*/ mangle: true };

  builder.config({
    paths: {
      "assets/app.css": "target/production/assets/app.css"
    },
    rootURL: "target/production/",
    options: opt
  });

  return new Promise(function(resolve, reject) {
    builder.buildStatic(config.source, opt)
      .then(function (output) {
        var stream = source('app.js');

        stream.write(output.source);
        process.nextTick(function () {
          stream.end();
        });

        return stream.pipe(vinylBuffer())
          .pipe(sourcemaps.init())
          .pipe(rename({ suffix: '.min' }))
          .pipe(sourcemaps.write())
          .pipe(gulp.dest(config.dest))
          .on('end', resolve)
          .on('error', reject);
      }, reject);
  });
});
