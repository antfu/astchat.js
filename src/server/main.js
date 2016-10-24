var express = require('express')
var app = express()
var WebSocketServer = require('websocket').server

app.use(express.static('public'))

var server = app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
});

var wsServer = new WebSocketServer({ httpServer : server })

function originIsAllowed(origin) {
  // put logic here to detect whether the specified origin is allowed.
  return true;
}

wsServer.on('request', function(request) {
    if (!originIsAllowed(request.origin)) {
      request.reject();
      console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
      return;
    }

    var connection = request.accept(null, request.origin);
    console.log((new Date()) + ' Connection from '+ request.origin +' accepted. At ' + request.resource);
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log('Received Message: ' + message.utf8Data);
            connection.sendUTF(message.utf8Data);
        }
    });
    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});
