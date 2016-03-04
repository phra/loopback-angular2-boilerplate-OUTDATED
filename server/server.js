'use strict';

var path = require('path');
var morgan = require('morgan');
var loopback = require('loopback');
var boot = require('loopback-boot');
var bodyParser = require('body-parser');
var env = require('../env.json')[process.env.NODE_ENV || 'development'];
var app = module.exports = loopback();
var passportConfigurator = require('loopback-component-passport').PassportConfigurator(app);
var config;

if (env.morgan) app.use(morgan('combined'));
try {
    config = env.providers;
} catch (err) {
    console.trace(err);
    process.exit(1);
}

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));

// to support JSON-encoded bodies
app.use(bodyParser.json());

// to support URL-encoded bodies
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(loopback.logger('dev'));
boot(app, __dirname);

// The access token is only available after boot
app.use(loopback.token({
    model: app.models.accessToken,
}));

passportConfigurator.init();

// Set up related models
passportConfigurator.setupModels({
    userModel: app.models.user,
    userIdentityModel: app.models.userIdentity,
    userCredentialModel: app.models.userCredential,
});

// Configure passport strategies for third party auth providers
for (var s in config) {
    var c = config[s];
    c.session = c.session !== false;
    passportConfigurator.configureProvider(s, c);
}

app.start = function() {
    // start the web server
    return app.listen(env.PORT, function() {
        app.emit('started');
        console.log('Web server listening at: %s', app.get('url'));
    });
};

// start the server if `$ node server.js`
if (require.main === module) {
    app.start();
}
