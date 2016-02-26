module.exports = function(app, cball) {
    console.log('resolverfile');
    function reject(cb, err) {
        if (err) {
            return cb(err);
        }

        cb(null, false);
    }

    var Role = app.models.Role;
    var User = app.models.User;
    Role.registerResolver('fornitoreOrdine', function(role, context, cb) {
        console.log('registerResolver is resolving Role ' + role);
        if (context.modelName !== 'ordine') {
            return reject('RBAC: NOT ORDINE, BUT ' + context.modelName);
        }

        //se gestita correttamente la cascata di acl
        //non dovrebbe essere necessario
        //controllare l'accesstoken
        var userId = parseInt(context.accessToken.userId);
        if (!userId) {
            return reject(cb, 'RBAC: NOT AUTH');
        }

        var ordineId = context.remotingContext.args.req.body.ordineId;
        context.model.findById(ordineId, function(err, ordine) {
            if (err || !ordine) {
                return reject(cb, err);
            }

            if (parseInt(ordine.userfornitoreId) === userId)
                return cb(null, true);
            else
                reject(cb, 'RBAC: USER #' + userId + ' IS NOT FORNITORE OF ORDINE #' + ordine);
        });
    });

    Role.registerResolver('clienteOrdine', function(role, context, cb) {
        console.log('registerResolver is resolving Role ' + role);

        if (context.modelName !== 'ordine') {
            return reject(cb, 'RBAC: NOT ORDINE, BUT ' + context.modelName);
        }

        //se gestita correttamente la cascata di acl
        //non dovrebbe essere necessario
        //controllare l'accesstoken
        var userId = parseInt(context.accessToken.userId);
        if (!userId) {
            return reject(cb, 'RBAC: NOT AUTH');
        }

        var ordineId = context.remotingContext.args.req.body.ordineId;
        context.model.findById(ordineId, function(err, ordine) {
            if (err || !ordine) {
                return reject(cb, err);
            }

            console.log('resolver', ordine.clienteId, userId, ordine);
            if (parseInt(ordine.clienteId) === userId)
                return cb(null, true);
            else
                reject(cb, 'RBAC: USER #' + userId +
                       ' NOT CLIENTE OF ORDINE #' + ordine);
        });
    });

    Role.registerResolver('clienteFornitoreOrdine', function(role, context, cb) {
        console.log('registerResolver is resolving Role ' + role);
        if (context.modelName !== 'ordine') {
            return reject('RBAC: NOT ORDINE, BUT ' + context.modelName);
        }

        //se gestita correttamente la cascata di acl
        //non dovrebbe essere necessario
        //controllare l'accesstoken
        var userId = context.accessToken.userId;
        if (!userId) {
            return reject(cb, 'RBAC: NOT AUTH');
        }

        userId = parseInt(userId);
        context.model.findById(context.modelId, function(err, ordine) {
            if (err || !ordine) {
                return reject(cb, err);
            }

            if (ordine.userfornitoreId === userId || ordine.clienteId === userId)
                return cb(null, true);

            User.findOne({ where: { id: userId} }, function(e, user) {
                if (user.ruolo === 1)
                    return cb(null, true);
                else
                    reject(cb, 'RBAC');
            });
        });
    });

    Role.registerResolver('cliente', function(role, context, cb) {
        var userId = context.accessToken.userId;
        if (!userId)
            return reject(cb, 'RBAC: NOT AUTH');

        User.findById(userId, function(err, user) {
            if (err)
                return reject(cb, err);
            return user.ruolo === 2 ? cb(null, true) : reject(cb, 'USER #' + user.id + ' IS NOT CLIENTE');
        });
    });

    cball();
};
