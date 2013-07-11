var http = require('http');
var url = require('url');

var mappings = {
  'magholder': {
		action: 'redirect',
		url: 'http://magholder.info',
		type: 'permanent'
	},
	'ursel': {
		action: 'download',
		url: 'http://www.facebook.com/photo.php?fbid=10201281285979248&l=76a440aac7',
		fileName: 'ursel.jpg',
		forceDownload: false
	}
};
var actions = {
	'download': function (res,mapping) {
		console.log('fetching ' + mapping.url);
		http.get(url.parse(mapping.url), function(data) {
			var contentDisposition = mapping.forceDownload ? 'attachment' : 'inline';
			res.writeHead(data.statusCode, { 
				'Content-Type': mapping.contentType,
				'Content-Disposition': contentDisposition + '; filename=' + mapping.fileName + ';'
			});
			data.pipe(res);	
		});
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
			'Location': mapping.url
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
	actions[mapping.action](res,mapping);
	console.log(mapping);
}).listen(3000);
