var http = require('http');
var finalhandler = require('finalhandler');
var serveIndex   = require('serve-index');
var serveStatic  = require('serve-static');

module.exports = function(rootDir, config, callback) {
    callback = callback || function() {};
    rootDir = rootDir || process.cwd();
    var nolog = config.nolog || false;
    var index = serveIndex(rootDir, {
        icons: true,
        hidden: true
    });

    var serve = serveStatic(rootDir, {
        index: config.index
    });

    // Create server
    var server = http.createServer(function onRequest(req, res) {
        var done = finalhandler(req, res);
        serve(req, res, function onNext(err) {
            if (err) {
                return done(err);
            }
            index(req, res, done);
        });
    });

    var banner = '\n--------------------------------------\n >>> Server is listen on port: ' + config.port + '\n--------------------------------------\n';

    // Listen
    server.listen(config.port, function() {
        if (!nolog) {
            console.log(banner);
        }
        callback(null, server);
    });
};
