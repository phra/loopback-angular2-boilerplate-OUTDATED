'use strict';

var redis = require('redis');
var client = redis.createClient();

client.on('error', function(err) {
    console.log('Error ' + err);
});

module.exports = function(accessToken) {
    accessToken.observe('before save', function updateTimestamp(ctx, next) {
        console.log('beforesave');
        if (ctx.instance) {
            ctx.instance.updated = new Date();
        } else {
            ctx.data.updated = new Date();
        }

        next();
    });

    accessToken.observe('after save', function updateTimestamp(ctx, next) {
        console.log('aftersave');
        client.expire('accessToken:' + ctx.instance.id, 1209600);
        client.expire('i:accessToken:userId:' + ctx.instance.userId, 1209600);
        next();
    });

    accessToken.check = function(req, cb) {
        req.accessToken.userId = parseInt(req.accessToken.userId);
        req.accessToken.created = req.accessToken.updated = new Date();
        req.accessToken.save(cb);
    };

    accessToken.remoteMethod('check', {
        accepts: {
            arg: 'req',
            type: 'object',
            http: { source: 'req'},
        },
        http: {path:'/check', verb: 'put'},
    });
};
