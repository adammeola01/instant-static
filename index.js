module.exports = function(obj, cb) {
    var cp = require('child_process');
    var child = cp.fork(__dirname + '/worker.js', {});
    child.send(obj);
    child.on('message', function(data) {
        cb({
            port: data.portUsed,
            routes: obj.routes,
            localOnly: obj.localOnly
        });

    });
	process.on('exit', function(e){
		child.kill();
	});
};
