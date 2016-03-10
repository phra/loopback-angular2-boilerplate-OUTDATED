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

  builder.config({
    paths: {
      "assets/material-icons.css": "target/production/assets/material-icons.css",
      "assets/app.css": "target/production/assets/app.css"
    },
    rootURL: "target/production/",
    options: { minify: true, mangle: true }
  });

  return new Promise(function(resolve, reject) {
    builder.buildStatic(config.source, { sourceMaps: true })
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
