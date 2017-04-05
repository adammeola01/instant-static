const express = require('express');
const app = express();
const defaultPort = 3000;
const tcpPortUsed = require('tcp-port-used');
var assetPort = defaultPort;
let server;
process.on('message', function(obj) {
    if (obj.preferedPort === undefined) obj.preferedPort = defaultPort;
    var port = obj.preferedPort;
    for (i = 0; i < obj.routes.length; i++) {
        app.use(obj.routes[i].url, express.static(obj.routes[i].location));
    }


	function openServer(num) {
		tcpPortUsed.check(num, '127.0.0.1').then(function(inUse) {
			if (inUse) {
				num++;
				openServer(obj);
			} else {
				app.listen(num, function() {
					process.send({
                        portUsed: num
                    });
				});
			}
		}, function(err) {
			console.error('Error on check:', err.message);
		});
	}
	openServer(port, function(num) {
		console.log(`source ejs up at: http://localhost:${num}`);
		if(charlieWork.args[0].open) open(`http://localhost:${num}`);

	});

});
