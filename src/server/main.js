let express = require('express')
let app = express()
let url = require('url')
let WebSocketServer = require('ws').Server

let rooms = {}

app.get('/', function (req, res) {
  res.redirect('/lobby');
})

app.use('/dist', express.static('public/dist'))

app.get('/:room', function (req, res) {
  res.sendFile('index.html', {root: './public'})
})

let server = app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
});

let wss = new WebSocketServer({
  server: server
})

wss.on('connection', function (ws) {
  let location = url.parse(ws.upgradeReq.url, true)
  let name = location.path
  rooms[name] = rooms[name] || []
  rooms[name].push(ws)

  console.log((new Date()) + ' Connection from ' + ' accepted. At ' + location.path)
  ws.on('message', function (message, flags) {
    for (var c of rooms[name])
      c.send(message)
  });
  ws.on('close', function (reasonCode, description) {
    let index = rooms[name].indexOf(ws)
    if (index != -1)
      rooms[name].splice(index, 1);
    console.log((new Date()) + ' Peer ' + ws.remoteAddress + ' disconnected.')
  });
  ws.msg = msg => {
    ws.send(JSON.stringify({time: new Date().getTime(), user: '@Astchat', msg: msg}))
  }
  ws.msg('Welcome to Astchat! 🎊')
});
