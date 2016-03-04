var gulp = require('gulp');
var server = require('gulp-develop-server');
var config = require('../../config').watch;

gulp.task('server:start', [], function(cb) {
    server.listen({ path: config.serverjs, env: { NODE_ENV: 'development' }}, function(err) {
        if (err) {
            throw err;
        }

        cb();
    });
});

gulp.task('server:restart', [], function() {
    gulp.watch([config.server], server.restart);
});
