var path = require('path');
var maxmind = require('maxmind');
var timezone = require('maxmind/lib/time_zone');
var moment1 = require('moment');
var momenttz = require('moment-timezone');
var loopback2 = require('loopback');
var recaptcha = require('express-recaptcha');
maxmind.init(['GeoLiteCity.dat', 'GeoLiteCityv6.dat',], {indexCache: true, checkForUpdates: true});
recaptcha.init('6LfkIRETAAAAAC2MIOUpMk0v04JGkMwJtwhEln9T', '6LfkIRETAAAAAA3mQE9GDpFoZ6N6_PbpaE1MLziT');

module.exports = function(User) {

    User.observe('before save', function updateTimestamp(ctx, next) {
        if (ctx.instance) {
            ctx.instance.updated = new Date();
        } else {
            ctx.data.updated = new Date();
        }

        next();
    });

    User.beforeRemote('create', function(context, user, next) {
        if (context.req.body.nocaptcha) {
            next();
        } else {
            recaptcha.verify(context.req, function(err) {
                return err ? next('RECAPTCHA FAILED') : next();
            });
        }
    });

    User.observe('after save', function(ctx, next) {
        if (ctx.isNewInstance) {
            User.app.models.file.createContainer({name: ctx.instance.id.toString()}, function(err, file) {
                if (err) console.log(err);
                next();
            });
        } else {
            next();
        }

    });

    User.afterRemote('create', function(context, user, next) {
        console.log('> user.afterRemote triggered', user);
        User.app.models.Role.findOne({where: {name: 'cliente'}}, function(err, role) {
            if (err) console.log(err);
            console.log('ruolo', role);
            role.principals.create({
                principalType: User.app.models.RoleMapping.USER,
                principalId: user.id,
            }, function(err, principal) {
                if (err) console.log(err);

                var options = {
                    type: 'email',
                    to: user.email,
                    from: 'noreply@ordinodacasa.it',
                    subject: 'Grazie per esserti registrato.',
                    redirect: '/',
                    user: user,
                    host: 'www.ordinodacasa.it',
                    port: 443,
                    protocol: 'https',
                    template: path.join(__dirname, '..', '..', 'server', 'views', 'verify.ejs'),
                };

                user.verify(options, function(err, response) {
                    if (err) {
                        console.log(err);
                        next(err);
                    }

                    console.log('> verification email sent:', response);
                    next();
                });
            });
        });
    });

    User.on('resetPasswordRequest', function(info) {
        var url = 'https://www.ordinodacasa.it/password-reset';
        var html = 'Clicca <a href="' + url + '?access_token=' + info.accessToken.id + '">qui</a> per resettare la tua password';
        User.app.models.Email.send({
            to: info.email,
            from: 'noreply@ordinodacasa.it',
            subject: 'Password reset',
            html: html,
        }, function(err) {
            if (err) return console.log('> error sending password reset email');
            console.log('> sending password reset email to:', info.email);
        });
    });

    User.time = function(req, cb) {
        var ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.connection.remoteAddress;
        if (ip.startsWith('192') || ip.startsWith('10') || ip.startsWith('127') || ip.startsWith('::1'))
            ip = '88.35.1.1';
        var l = maxmind.getLocationV6(ip) || maxmind.getLocation(ip);
        var tz = timezone(l.countryCode, l.region);
        var data = moment1().tz(tz).format();
        var res = {
            data: data,
            tz: tz,
        };
        cb(null, res);
    };

    User.remoteMethod('time', {
        accepts: [
            {arg: 'req', type: 'object', http: {source: 'req'}},
        ],
        returns: {arg: 'data', type: 'object'},
        http: {path:'/time', verb: 'get'},
    });

    User.creafornitore = function(req, fornitore, user, cb) {

        var err = function(err) {
            console.log('err', err);
            cb(err);
        };

        var err2 = function(err, tx) {
            console.log('err2', err);
            tx.rollback(function(e) {
                if (e) return cb(e);

                cb(err);
            });
        };

        var fixorari = function(fornitore) {
            for (var i = 0; i < fornitore.orari.length; i++) {
                if (fornitore.orari[i].length) {
                    for (var j = 0; j < fornitore.orari[i].length; j++) {
                        if (fornitore.orari[i][j].apertura) {
                            fornitore.orari[i][j].apertura = fornitore.orari[i][j].apertura.toString();
                            fornitore.orari[i][j].chiusura = fornitore.orari[i][j].chiusura.toString();
                        }
                    }
                }
            }
        };

        var makepsw = function(length) {
            var text = '';
            var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

            for( var i = 0; i < length; i++ )
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        };

        User.beginTransaction({isolationLevel: User.Transaction.READ_COMMITTED}, function(e, tx) {
            if (e) return err(e);

            fixorari(fornitore);
            console.log(fornitore, fornitore.orari);
            fornitore.geopoint = loopback2.GeoPoint({lat: fornitore.lat, lng: fornitore.lng});
            fornitore.completo = fornitore.via + ', ' + fornitore.civico + ', ' + fornitore.citta + ', ' + fornitore.provincia + ', ' + fornitore.stato;
            user.password = makepsw(8);
            var t = {transaction: tx};

            User.create(user, t, function(e, user) {
                if (e) return err2(e, tx);

                User.app.models.Role.findOne({where: {name: 'fornitore'}}, t, function(e, role) {
                    if (e) return err2(e, tx);

                    role.principals.create({principalType: User.app.models.RoleMapping.USER, principalId: user.id,}, t, function(e, principal) {
                        if (e) return err2(e, tx);

                        fornitore.userId = user.id;
                        User.app.models.Fornitore.create(fornitore, t, function(e, fornitore) {
                            if (e) return err2(e, tx);

                            tx.commit(function(e) {
                                if (e) return err2(e, tx);

                                User.resetPassword({email: user.email}, function(e) {
                                    if (e) return err(e);
                                        
                                    cb(null, user);
                                });
                            });
                        });
                    });
                });
            });
        });
    };

    User.remoteMethod('creafornitore', {
        accepts: [
        {arg: 'req', type: 'object', http: {source: 'req'}},
        {arg: 'fornitore', type: 'object'},
        {arg: 'user', type: 'object'},
        ],
        returns: {arg: 'data', type: 'object'},
        http: {path:'/creafornitore', verb: 'post'},
    });

};
