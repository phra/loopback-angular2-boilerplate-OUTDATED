'use strict';

var path = require('path');
var loopback = require('loopback');
var boot = require('loopback-boot');
var bodyParser = require('body-parser');
var config = require('../env.json')[process.env.NODE_ENV || 'development'];
var app = module.exports = loopback();
var passportConfigurator = require('loopback-component-passport').PassportConfigurator(app);

if (config.morgan) {
    var morgan = require('morgan');
    app.use(morgan('combined'));
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
for (var s in config.providers) {
    var c = config.providers[s];
    c.session = c.session !== false;
    passportConfigurator.configureProvider(s, c);
}

app.start = function() {
    // start the web server
    return app.listen(config.PORT, function() {
        app.emit('started');
        console.log('Web server listening at: %s', app.get('url'));
    });
};

// start the server if `$ node server.js`
if (require.main === module) {
    app.start();
}
