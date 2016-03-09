var config = require('../../env.json')[process.env.NODE_ENV || 'development'];
var path = require('path');
var loopback2 = require('loopback');
if (config.recaptcha) {
    var recaptcha = require('express-recaptcha');
    recaptcha.init('XXXXXXXXXXXXXXXXXXXXXXXX', 'XXXXXXXXXXXXXXXXXXXXXXXXxxxx');
}
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
                    from: 'noreply@' + config.DOMAIN,
                    subject: 'Grazie per esserti registrato.',
                    redirect: '/',
                    user: user,
                    host: config.HOST,
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
        var url = 'https://' + config.HOST + '/password-reset';
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

};
