module.exports = function(app) {
    app.get('/password-reset', function(req, res, next) {
        if (!req.accessToken) return res.sendStatus(401).send(new Error('no accessToken'));
        res.render('password-reset', {accessToken: req.accessToken.id});
    });

    app.post('/request-password-reset', function(req, res, next) {
        app.models.User.resetPassword({
            email: req.body.email
        }, function(err) {
            if (err) return res.status(401).send(err);

            res.render('response', {
                title: 'Password reset',
                content: 'Controlla la tua mail.',
                redirectTo: '/login',
                redirectToLinkText: 'Log in'
            });
        });
    });

    app.post('/reset-password', function(req, res, next) {
        if (!req.accessToken) return res.sendStatus(401);

        if (!req.body.password ||
            !req.body.confirmation ||
            req.body.password !== req.body.confirmation) {
                return res.sendStatus(400, new Error('Passwords do not match'));
            }

            app.models.User.findById(req.accessToken.userId, function(err, user) {
                if (err || !user) return res.sendStatus(404);
                user.updateAttribute('password', req.body.password, function(err, user) {
                    if (err) return res.sendStatus(404);
                    console.log('> password reset processed successfully');
                    res.render('response', {
                        title: 'Password reset',
                        content: 'La tua password è stata resettata con successo.',
                        redirectTo: '/login',
                        redirectToLinkText: 'Log in'
                    });
                });
            });
    });
};
