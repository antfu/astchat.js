<template lang="pug">
#app
  #messages_scroll
    #messages_pool
      div(v-for="m in messages")
        p.msg.title(v-if="!hide_date")
          span.msg.datetime(v-if="m.__time") {{datetime(m.__time)}}
          span.msg.user(v-if="m.__user") {{m.__user}}
        p.msg.content(v-html="emoji(m.msg)")
  #send_input_div
    .link(v-html="emoji('🙂')")
    .link(v-html="emoji('📎')")
    .ui.transparent.inverted.fluid.input
      input#send_input(type='text', placeholder='Enter Message...', autocomplete='off', v-model='inputs', @keyup.enter='send()')
</template>

<script>
import Socket from './scripts/websocket'
import UtilsMixin from './scripts/utils'
import Actions from './scripts/actions'

export default {
  name: 'app',
  data() {
    return {
      messages: [],
      hide_date: false,
      user: null,
      inputs: '',
      opened: false
    }
  },
  mixins: [{methods: UtilsMixin}],
  methods: {
    send(msg, action) {
      action = action || 'chat'
      if (!msg) {
        msg = this.inputs + ''
        this.inputs = ''
      }
      if (!msg) return
      this.socket.json(this.actions.make({msg: msg}, action))
    }
  },
  created() {
    console.log('Vue instance: ', window.vm = this)
    let socket = this.socket = new Socket()
    let actions = this.actions = new Actions({
      chat: obj => {
        console.log('Message: ', obj)
        this.messages.push(obj)
      }
    })

    socket
    .on('json', obj => actions.onmessage(obj))
    .on('open', () => {
      this.opened = true
    })
  }
}
</script>

<style lang="less">
#app {
}
html {
  height: 100%;
}
* {
  -webkit-font-smoothing : antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family            : "Open Sans", Helvetica, Arial, sans-serif, "Microsoft YaHei UI";
}
body {
  background: #222;
  height    : 100%;
  overflow  : hidden;
}
p {
  color: #fff;
}
.msg {
  margin: 0;
}
.msg.title {
  margin-bottom: -0.2em;
}
.msg.datetime {
  font-style: italic;
  font-size : 0.7em;
  color     : #fff;
  opacity   : 0.5;
}
.msg.from {
  font-style : italic;
  font-size  : 0.8em;
  color      : #fff;
  opacity    : 0.8;
  font-weight: 100;
}
.msg.user {
  font-size       : 0.65em;
  color           : #fff;
  opacity         : 1;
  background-color: rgba(255,255,255,0.1);
  border-radius   : 0.3em;
  padding         : 0.1em 0.5em;
  margin-left     : 1em;
}
.msg.context {
  color        : #fff;
  margin-bottom: 0.5em;
}
.msg.image {
  margin-top: 0.5em;
}
.emojione {
  font-size     : inherit;
  height        : 3ex;
  width         : 3.1ex;
  min-height    : 20px;
  min-width     : 20px;
  display       : inline-block;
  margin        : -.2ex 0.15em 0.2ex;
  line-height   : normal;
  vertical-align: middle;
}
#messages_scroll {
  position: absolute;
  left    : 0;
  right   : 0;
  top     : 0;
  bottom  : 3.3em;
  padding : 1em;
  margin  : 0;
  overflow: auto;
}
#send_input_div {
  position      : absolute;
  left          : 0;
  right         : 0;
  bottom        : 0;
  padding       : 1em;
  background    : #1e1e1e;
  vertical-align: middle;
  .link {
    float       : left;
    margin-right: 0.5em;
  }
}
#send_input {
  line-height: 1.55em;
  margin-left: 1em;
}
#emoji_popup {
  padding  : 0;
  max-width: 10em;
}
#emoji_tabs {
  max-height: 15em;
  overflow  : auto;
}
#emoji_popup .emojione {
  margin: 0.25em;
}
#emoji_popup .segment {
  margin: 0;
}
#emoji_menu .item {
  padding: 0.5em;
}
#emoji_menu .item img {
  width: auto !important;
}
</style>
