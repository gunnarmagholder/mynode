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
