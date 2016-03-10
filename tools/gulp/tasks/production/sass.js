'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var flatten = require('gulp-flatten');
var config = require('../../config').sass.production;
var globbing = require('gulp-css-globbing');

gulp.task('sass-deploy', function () {
  gulp.src(config.main)
    .pipe(globbing({
      extensions: ['.scss']
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(flatten())
    .pipe(gulp.dest(config.dest));
});

gulp.task('sass-deploy:components', function () {
    gulp.src(config.source)
    .pipe(globbing({
      extensions: ['.scss']
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(config.destsource));
});
