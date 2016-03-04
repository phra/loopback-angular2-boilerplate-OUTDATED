var gulp = require('gulp');
var shell = require('gulp-shell');
var env = require('../../../../env.json');

gulp.task('lbng', shell.task('node_modules/loopback-sdk-angular-cli/bin/lb-ng server/server.js app/src/lib/lb-services.js'));

gulp.task('lbng:dev', shell.task('node_modules/loopback-sdk-angular-cli/bin/lb-ng server/server.js -u "http://localhost:"' + env.development.PORT + ' app/src/lib/lb-services.js'));

gulp.task('lbng2', shell.task('node_modules/loopback-sdk-angular-cli/bin/lb-ng server/server.js -l angular2 app/src/lib/lb-services.ts'));

gulp.task('lbng2:dev', shell.task('node_modules/loopback-sdk-angular-cli/bin/lb-ng server/server.js -l angular2 -u "http://localhost:"' + env.development.PORT + ' app/src/lib/lb-services.ts'));
