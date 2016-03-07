var gulp = require('gulp');
var shell = require('gulp-shell');
var env = require('../../../../env.json');

gulp.task('lbng:dev', shell.task('node_modules/loopback-sdk-angular-cli/bin/lb-ng server/server.js -u "http://localhost:"' + env.development.PORT + '/api app/src/lib/lb-services.js'));

gulp.task('lbng2:dev', shell.task('node_modules/loopback-sdk-angular-cli/bin/lb-ng server/server.js -l angular2 -u "http://localhost:"' + env.development.PORT + '/api app/src/lib/lb-services.ts'));
