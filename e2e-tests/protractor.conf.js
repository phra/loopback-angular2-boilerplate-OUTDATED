exports.config = {
    allScriptsTimeout: 60000,

    specs: [
        'tests/**/*.js'
    ],

    capabilities: {
        'browserName': 'phantomjs',
        'phantomjs.binary.path': require('phantomjs').path
    },

    baseUrl: 'http://localhost:3003/',

    framework: 'jasmine',

    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    }
};
