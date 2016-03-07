var gulp = require('gulp');
var shell = require('gulp-shell');
var env = require('../../../../env.json');

gulp.task('lbng', shell.task('node_modules/loopback-sdk-angular-cli/bin/lb-ng server/server.js app/src/lib/lb-services.js'));

gulp.task('lbng2', shell.task('node_modules/loopback-sdk-angular-cli/bin/lb-ng server/server.js app/src/lib/lb-services.ts -l angular2'));
