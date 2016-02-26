var path = require('path');
module.exports = function() {
    return function prerender(req, res, next) {
        res.sendFile('index.html', { root: path.resolve(__dirname, '..', '..', 'client', 'dist')});
    };
};
