var express = require('express')
var app = express()
var WebSocketServer = require('ws').Server

app.use(express.static('public'))

var server = app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
});

var wss = new WebSocketServer({
  server: server
})

wss.on('connection', function (ws) {
  console.log(ws)
  console.log((new Date()) + ' Connection from ' + ws.origin + ' accepted. At ' + ws.resource);
  ws.on('message', function (message, flags) {
    console.log('Received Message: ' + message);
    ws.send(message);
  });
  ws.on('close', function (reasonCode, description) {
    console.log((new Date()) + ' Peer ' + ws.remoteAddress + ' disconnected.');
  });
});
