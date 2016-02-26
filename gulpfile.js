'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var debug = require('gulp-debug');
var glob = require('glob');
var jasmine = require('minijasminenode2');
var runSequence = require('run-sequence');
var del = require('del');
var protractor = require('gulp-protractor').protractor;
var nodeModules = 'node_modules';
var bowerComponents = 'client/vendor';
var connect = require('gulp-connect');
var server = require('gulp-develop-server');
var bs = require('browser-sync').create();
var rename = require('gulp-rename');
var shell = require('gulp-shell');
var stylus = require('gulp-stylus');
var kouto = require('kouto-swiss');
var minifyHTML = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var postcss = require('gulp-postcss');
var cssnext = require('cssnext');
var sprity = require('sprity');
var gulpif = require('gulp-if');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var size = require('gulp-size');
var imagemin = require('gulp-imagemin');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var useref = require('gulp-useref');
var karma = require('gulp-karma');
var jeet = require('jeet');
var rupture = require('rupture');

var back = {
    js   : 'server/',
    models: 'common/models/'
};

var tests = {
    fronte2e: 'e2e-tests/',
    front   : 'client/tests/',
    back    : 'spec/'
};

var src = {
    html : 'client/src/',
    tpl  : 'client/src/partials/',
    styl : 'client/src/stylus/',
    css  : 'client/src/styles/',
    js   : 'client/src/scripts/',
    lib : 'client/src/scripts/lib/',
    bower: 'client/vendor/',
    img  : 'client/src/images/',
    fonts: 'client/src/fonts/',
    vendor: 'client/vendor/',
    video: 'client/src/video/',
};

var dev = {
    html : 'client/dev/',
    tpl  : 'client/dev/partials/',
    css  : 'client/dev/styles/',
    js   : 'client/dev/scripts/',
    img  : 'client/dev/images/',
    fonts: 'client/dev/fonts/',
    video: 'client/dev/video/',
};

var dist = {
    html : 'client/dist/',
    tpl  : 'client/dist/partials/',
    css  : 'client/dist/styles/',
    js   : 'client/dist/scripts/',
    img  : 'client/dist/images/',
    fonts: 'client/dist/fonts/',
    video: 'client/dist/video',
};

gulp.task('clean:dev', function(cb) {
    var paths = [];
    var key;
    for (key in dev) {
        paths.push(dev[key] + '**');
        paths.push('!' + dev[key]);
    }

    del(paths).then(function(paths) {
        console.log('File Deleted:', paths.join('\n'));
        cb();
    });
});

gulp.task('clean:dist', function(cb) {
    var paths = [];
    var key;
    for (key in dist) {
        paths.push(dist[key] + '**/*');
        paths.push('!' + dist[key]);
    }

    del(paths).then(function(paths) {
        console.log('File Deleted:', paths.join('\n'));
        cb();
    });
});

gulp.task('clean', function(cb) {
    runSequence(['clean:dev', 'clean:dist'], cb);
});

gulp.task('clean:dep', function(cb) {
    return del([nodeModules, bowerComponents], function (err, deletedFiles) {
        if (err) {
            throw err;
        }
        console.log('Files deleted:', deletedFiles.join(', '));
        cb();
    });
});

gulp.task('pretest:jshint', function() {
    return gulp.src([src.js + '**/*.js', tests.front + '**/*.js', tests.fronte2e + '**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('pretest:jscs', function() {
    return gulp.src([src.js + '**/*.js', tests.front + '**/*.js', tests.fronte2e + '**/*.js'])
    .pipe(jscs());
});

gulp.task('pretest:jshint:back', function() {
    return gulp.src([back.js + '**/*.js', back.models + '**/*.js', tests.back + '**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('pretest:jscs:back', function() {
    return gulp.src([back.js + '**/*.js', back.models + '**/*.js', tests.back + '**/*.js'])
    .pipe(jscs());
});

gulp.task('styles:dev', function() {
    return gulp.src(src.styl + '*.styl')
    .pipe(stylus({
        use: [kouto(),jeet(),rupture()]
    }))
    .pipe(postcss([cssnext({browsers: ['> 0.1%'], compress: true})]))
    .pipe(gulp.dest(src.css));
});

// Optimize images
gulp.task('images', function() {
    return gulp.src(dev.img + '**/*')
    .pipe(imagemin({
        progressive: true,
        interlaced: true
    }))
    .pipe(gulp.dest(dist.img))
    .pipe(size({title: 'Ottimizzo img'}));
});

gulp.task('images:dev', function() {
    //return sprity.src({
    //    src: 'client/src/images/*.{jpg,png}',
	  //    style: 'sprite.css'
    //})
    //.pipe(gulpif('*.{png,jpg}', gulp.dest(dev.img), gulp.dest(src.css)));
    return gulp.src('client/src/images/*.{jpg,png}')
    .pipe(gulp.dest(dev.img));
});

gulp.task('video:dev', function() {
    return gulp.src(src.video + '**/*')
    .pipe(gulp.dest(dev.video))
    .pipe(size({title: 'copio video'}));
});

gulp.task('video', function() {
    return gulp.src(dev.video + '**/*')
    .pipe(gulp.dest(dist.video))
    .pipe(size({title: 'copio video dist'}));
});

// Copy web fonts to dist
gulp.task('fonts', function() {
    return gulp.src([dev.fonts + '**/*'])
    .pipe(gulp.dest(dist.fonts))
    .pipe(size({title: 'Copio font'}));
});

gulp.task('fonts:dev', function() {
    return gulp.src([src.fonts + '**/*'])
    .pipe(gulp.dest(dev.fonts))
    .pipe(size({title: 'Copio font'}));
});

gulp.task('partials', function() {
    return gulp.src([dev.tpl + '**/*'])
    .pipe(minifyHtml())
    .pipe(gulp.dest(dist.tpl))
    .pipe(size({title: 'Copio partials'}));
});

gulp.task('partials:dev', function() {
    return gulp.src([src.tpl + '**/*'])
    .pipe(gulp.dest(dev.tpl))
    .pipe(size({title: 'Copio partials'}));
});

gulp.task('minify-js', function() {
    return gulp.src(dev.js + 'combined.js')
    .pipe(uglify({mangle: true, compress: false}))
    .pipe(gulp.dest(dist.js))
    .pipe(size({title: 'minify-js'}));
});

gulp.task('minify-css', function() {
    return gulp.src(dev.css + 'combined.css')
    .pipe(minifyCss())
    .pipe(gulp.dest(dist.css))
    .pipe(size({title: 'minify-css'}));
});

gulp.task('html', function() {
    return gulp.src(dev.html + 'index.html')
    .pipe(minifyHTML({conditionals: true, empty: true}))
    .pipe(gulp.dest(dist.html))
    .pipe(size({title: 'Copio index'}));
});

gulp.task('html:dev', function() {
    return gulp.src(src.html + 'index.html')
    // Concatenate and minify JavaScript
    .pipe(useref())
    // Output files
    .pipe(gulp.dest(dev.html))
    .pipe(size({title: 'Genero index'}));
});

gulp.task('test:karma', function() {
    return gulp.src('./foobar')
    .pipe(karma({
        configFile:__dirname + '/karma.conf.js',
        action: 'start'
    })).on('error', function(err) {
        throw err;
    });
});

gulp.task('server:start', ['server:start:nobs'], function() {
    bs.init({
        proxy: 'http://localhost:3003'
    });
});

gulp.task('server:start:nobs', function(cb) {
    server.listen({ path: 'server/server.js', env: { NODE_ENV: 'development' }}, function(err) {
            if (err) {
                throw err;
            }

            cb();
        });
});

gulp.task('server:watch',  function() {
    return gulp.watch( ['server/**/*'], server.restart);
});

gulp.task('server:models', function() {
    return gulp.watch(['common/models/**/*'], function() {
        runSequence('build:dist:notest', function() { server.restart(bs.reload); });
    });
});

gulp.task('server:watch:src', function() {
    return gulp.watch(['client/src/**/*', '!client/src/scripts/lib/**/*', '!client/src/styles/**/*'], function() {
        runSequence('build:dist:notest', bs.reload);
    });
});

gulp.task('server:stop', function() {
    return server.kill();
});

gulp.task('watch', function(cb) {
    runSequence('server:start', 'server:models', 'server:watch', 'server:watch:src', cb);
});

gulp.task('test:protractor', function() {
    return gulp.src(['./e2e-tests/tests/**/*.js'])
    .pipe(protractor({
        configFile: 'e2e-tests/protractor.conf.js'
    })).on('error', function(e) { throw e; });
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

gulp.task('test', function(cb) {
    runSequence('pretest:jshint', 'pretest:jscs', 'pretest:jshint:back', 'pretest:jscs:back', 'test:jasmine', 'test:karma', /*'server:start:nobs', 'test:protractor', 'server:stop',*/ cb);
});

gulp.task('lbservices', shell.task('lb-ng server/server.js client/src/scripts/lib/lb-services.js'));

gulp.task('lbservices:cordova', shell.task('lb-ng server/server.js -u https://www.ordinodacasa.it/api client/src/scripts/lib/lb-services.js'));

gulp.task('build:dev', function(cb) {
    runSequence('styles:dev', 'lbservices', ['video:dev', 'partials:dev', 'images:dev', 'fonts:dev', 'html:dev'], cb);
});

gulp.task('build:dist', function(cb) {
    runSequence('deploy:dev', ['images', 'fonts', 'video', 'html', 'partials', 'minify-css', 'minify-js'], cb);
});

gulp.task('build:dist:notest', function(cb) {
    runSequence('deploy:dev:notest', ['images', 'fonts', 'video', 'html', 'partials', 'minify-css', 'minify-js'], cb);
});

gulp.task('deploy:dev', function(cb) {
    runSequence('clean', ['pretest:jshint', 'pretest:jscs', 'pretest:jshint:back', 'pretest:jscs:back'],'build:dev', 'test', cb);
});

gulp.task('deploy:dev:notest', function(cb) {
    runSequence('clean', /*'pretest:jshint', 'pretest:jscs', 'pretest:jshint:back', 'pretest:jscs:back',*/'build:dev', /*'test',*/ cb);
});

gulp.task('deploy:dist', function(cb) {
    runSequence('build:dist', /*'gzip',*/ cb);
});
