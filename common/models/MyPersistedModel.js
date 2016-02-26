'use strict';

module.exports = function(MyPersistedModel) {
    MyPersistedModel.observe('before save', function updateTimestamp(ctx, next) {
        if (ctx.instance) {
            ctx.instance.updated = new Date();
        } else {
            ctx.data.updated = new Date();
        }

        next();
    });
};
