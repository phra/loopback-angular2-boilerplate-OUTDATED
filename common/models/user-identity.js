module.exports = function(userIdentity) {
    userIdentity.observe('before save', function updateTimestamp(ctx, next) {
        console.log('beforesave');
        if (ctx.instance) {
            ctx.instance.updated = new Date();
        } else {
            ctx.data.updated = new Date();
        }

        next();
    });
};
