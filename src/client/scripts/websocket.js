
var socket = null

module.exports = {
  connect: function () {
    socket = new WebSocket('ws://' + location.host + location.pathname)
    return socket
  },
  socket: socket
}
