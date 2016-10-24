<template lang="jade">
#app
  h1 {{ msg }}
  h2 Webpack!
</template>

<script>
var Socket = require('./scripts/websocket')

export default {
  name: 'app',
  data () {
    return {
      msg: 'Hello World'
    }
  }
}
var socket = Socket.connect()
socket.onmessage = (e) => {
  console.log('Message: ', e.data)
}
socket.onopen = () => {
  socket.send('Hello')
}
window.socket = socket
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
