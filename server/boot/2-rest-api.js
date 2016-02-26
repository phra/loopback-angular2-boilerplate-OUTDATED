module.exports = function mountRestApi(server, cb) {
    var restApiRoot = server.get('restApiRoot');
    server.use(restApiRoot, server.loopback.rest());
    cb();
};
