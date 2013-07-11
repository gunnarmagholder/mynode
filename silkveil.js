var http = require('http');
var mappings = {
  'magholder': {
		action: 'redirect',
		url: 'http://magholder.info',
		type: 'permanent'
	},
	'ursel': {
		action: 'download',
		url: 'https://www.facebook.com/photo.php?fbid=10201281285979248&l=76a440aac7',
		fileName: 'ursel.jpg',
		forceDownload: false
	}
};
var actions = {
	'download': function (res, mapping) {
	},
	'error': function (res,mapping) {
		res.writeHead(mapping.statusCode, {
			'Content-Type': 'text/html'
		});
		res.end(mapping.statusCode + ' ' + mapping.data);
	},
	'redirect': function (res, mapping) {
		var statusCode = (mapping.type === 'permanent') ? 301 : 307;
		res.writeHead(statusCode, {
			'Location', mapping.url
		});
		res.end();
	}
};
http.createServer(function(req,res) {
	var alias = req.url.substring(1); 
	var mapping = mappings[alias] || {
		action: 'error',
		statusCode: 404,
		data: 'file not found'
	};
	actions[mapping.action](res.mapping);
	console.log(mapping);
}).listen(3000);
