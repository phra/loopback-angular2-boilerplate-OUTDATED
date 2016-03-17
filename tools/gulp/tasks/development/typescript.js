'use strict';

var gulp = require('gulp');
var conf = require('../../config').typescript.development;
var typescript = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var tslint = require('gulp-tslint');
var cache = require('gulp-cached');
var browserSync = require('browser-sync');
var tsProject = typescript.createProject('tsconfig.json');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');

gulp.task('typescript-dev', [], function () {
  return gulp.src(conf.scripts)
    .pipe(cache('typescript'))
    .pipe(sourcemaps.init())
    .pipe(tslint())
    .pipe(tslint.report('verbose', {emitError: false}))
    .pipe(typescript(tsProject))
    //.pipe(sourcemaps.write('./maps', {includeContent: false, sourceRoot: '/app/src'}))
    .pipe(gulp.dest(conf.dest))
    .pipe(jshint())
    .pipe(jscs())
    .pipe(browserSync.stream());
});


