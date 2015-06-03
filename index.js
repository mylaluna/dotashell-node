var http = require('http');
var heroService = require('./lib/heroes');
var responder = require('./lib/responseGenerator');
var staticFile = responder.staticFile('/public');
var fs = require('fs');

http.createServer(function (req, res) {
// A parsed url to work with in case there are parameters
var _url;
// In case the client uses lower case for methods.
req.method = req.method.toUpperCase();
console.log(req.method + ' ' + req.url);

if (req.method !== 'GET') {
	res.writeHead(501, {
		'Content-Type': 'text/plain'
	});
	return res.end(req.method + ' is not implemented by this server.');
}

if (_url = /^\/heroes$/i.exec(req.url)) {
	heroService.getHeroes(function (error, data) {
		if (error) {
			return responder.send500(error, res);
		}
		return responder.sendJson(data, res);
	});
} else if (_url = /^\/heroes\/(\d+)$/i.exec(req.url)) {
	heroService.getHero(_url[1], function (error, data) {
		if (error) {
			return responder.send500(error, res);
		}
		if (!data) {
			return responder.send404(res);
		}
		return responder.sendJson(data,res);
	});
}
else {
	// try to send the static file
	 //res.writeHead(200);
	 //res.end("static file");
	 //require('fs').createReadStream('./public/home.html').pipe(res)
	  fs.readFile('./public/home.html', function(err, data){
	  	res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
         res.write(data);
         res.end();	
	  })
     
	//return staticFile;
	//Test local change to github then to server
}

}).listen(1337, '128.199.123.131');
console.log('Server running at http://128.199.123.131:1337/');