var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

var port = process.env.PORT || 3333;

server.listen(port);

app.configure( function(){
  app.use(express.static(__dirname + '/public'));
});

app.get('/', function(req, res){
  res.sendfile(__dirname + '/public/index.html');
});

io.sockets.on('connection', function (socket) {
  // socket is a reference to the single client.
  // io.sockets is a reference to all clients.
  socket.on('message', function (data) {
    io.sockets.emit('message', data);
  });
});
