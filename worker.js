const express = require('express');
const app = express();
const defaultPort = 3000;
var assetPort = defaultPort;
let server;
process.on('message', function(obj) {
    if (obj.preferedPort === undefined) obj.preferedPort = defaultPort;
    var port = obj.preferedPort;
    for (i = 0; i < obj.routes.length; i++) {
        app.use(obj.routes[i].url, express.static(obj.routes[i].location));
    }
    var suceeded = false;
    var calledCB = false;

    function attemptPort(number) {
        if (obj.localOnly) {
            server = app.listen(number, 'localhost', function() {
                suceeded = true;
            });
        } else {
            server = app.listen(number, function() {
                suceeded = true;
            });
        }
        setTimeout(function() {
            if (suceeded) {
                if (!calledCB) {
                    calledCB = true;
                    process.send({
                        portUsed: port
                    });
                }
            } else {
                port++;
                attemptPort(port);
            }
        }, 0);
    }
    attemptPort(port);
    process.on('uncaughtException', function(error) {});
});
