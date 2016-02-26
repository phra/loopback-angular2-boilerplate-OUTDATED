module.exports = function(config){
  'use strict';

  config.set({

    basePath : './',

    files : [
      'client/vendor/jquery/dist/jquery.js',
      'client/vendor/angular/angular.js',
      'client/vendor/angular-route/angular-route.js',
      'client/vendor/angular-loader/angular-loader.js',
      'client/vendor/angular-cookie/angular-cookie.js',
      'client/vendor/angular-messages/angular-messages.js',
      'client/vendor/angular-resource/angular-resource.js',
      'client/vendor/angular-mocks/angular-mocks.js',
      'client/vendor/angular-sanitize/angular-sanitize.js',
      'client/vendor/angular-animate/angular-animate.js',
      'client/vendor/angular-aria/angular-aria.js',
      'client/vendor/angular-touch/angular-touch.js',
      'client/dev/scripts/combined.js',
      'client/tests/**/*.js'
    ],

    autoWatch : false,

    frameworks: ['jasmine'],

    browsers : ['PhantomJS'],

    plugins : [
            /*'karma-chrome-launcher',
            'karma-firefox-launcher',*/
            'karma-jasmine',
            'karma-phantomjs-launcher',
            'karma-junit-reporter'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    },

    singleRun : true

  });
};
