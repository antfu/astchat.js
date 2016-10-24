<template lang="pug">
#app
  h1 {{ msg }}
  h2 Webpack!
</template>

<script>
import Socket from './scripts/websocket'

export default {
  name: 'app',
  data () {
    return {
      msg: 'Hello World'
    }
  }
}

var socket = new Socket()
socket.on('message', e => {
  console.log('Message: ', e.data)
})
socket.on('json', obj => {
  console.log('JSON: ', obj)
})
socket.on('open', () => {
  socket.json({a:1,b:'234'})
})
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
