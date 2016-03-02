'use strict';

var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task('lbservices', shell.task('lb-ng server/server.js app/src/lib/lb-services.js'));
gulp.task('lbservices2', shell.task('lb-ng server/server.js app/src/lib/lb-services.ts -l angular2'));

gulp.task('lbservices:cordova', shell.task('lb-ng server/server.js -u https://www.ordinodacasa.it/api app/src/lib/lb-services.js'));

