var http = require('http');

var server = http.createServer(function(req,res) {
  console.log('Initializing Server...');
  res.writeHead(200, {
    'content-type': 'text/plain'
  });
  res.write('Hallo ');
  setTimeout(function(){
    res.end('Welt!');
  },2000);
}).listen(3000);
