module.exports = function enableAuthentication(server, cb) {
    // enable authentication
    server.enableAuth();
    cb();
};
