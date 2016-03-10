'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var flatten = require('gulp-flatten');
var browserSync = require('browser-sync');
var globbing = require('gulp-css-globbing');
var config = require('../../config').sass.development;
var debug = require('gulp-debug');

gulp.task('sass', ['sass:components'], function () {
  gulp.src(config.main)
    .pipe(globbing({
      extensions: ['.scss']
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(flatten())
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.stream());
});

gulp.task('sass:components', function () {
  gulp.src(config.source)
    .pipe(globbing({
      extensions: ['.scss']
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(debug({title: 'sass:dev'}))
    .pipe(gulp.dest(config.destsource));
});
