'use strict';

var gulp = require('gulp');
var glob = require('glob');
var jasmine = require('minijasminenode2');
var runSequence = require('run-sequence');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');

var back = {
    js   : 'server/',
    models: 'common/models/'
};

var tests = {
    back    : 'spec/'
};

gulp.task('pretest:jshint:back', function() {
    return gulp.src([back.js + '**/*.js', back.models + '**/*.js', tests.back + '**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('pretest:jscs:back', function() {
    return gulp.src([back.js + '**/*.js', back.models + '**/*.js', tests.back + '**/*.js'])
    .pipe(jscs());
});

gulp.task('test:jasmine', function(cb) {
    glob(tests.back + '**/*.js', function(err, files) {
        var options = {
            specs: files,
            onComplete: function(passed) { if (passed) cb(); else throw Error('backend tests FAIL!!'); },
            isVerbose: true,
            showColors: true,
            includeStackTrace: true,
            defaultTimeoutInterval: 10000
        };
        jasmine.executeSpecs(options);
    });
});

gulp.task('test:backend', function(cb) {
    runSequence('pretest:jshint:back', 'pretest:jscs:back', 'test:jasmine', cb);
});
