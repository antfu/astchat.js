<template lang="pug">
#app
  #messages_scroll
    #messages_pool
      .msg(v-for="m in messages")
        .p {{m.msg}}
  #send_input_div
    .link(v-html="emoji('🙂')")
    .link(v-html="emoji('📎')")
    .ui.transparent.inverted.fluid.input
      input#send_input(type='text', placeholder='Send Message...', autocomplete='off')
</template>

<script>
import Socket from './scripts/websocket'
import Emoji from 'emojione/lib/js/emojione'

export default {
  name: 'app',
  data() {
    return {
      messages: []
    }
  },
  methods: {
    emoji(t) {
      return Emoji.toImage(t)
    }
  },
  created() {
    let socket = window.socket = new Socket()

    socket.on('json', obj => {
      console.log('Message: ', obj)
      this.messages.push(obj)
    }).on('open', () => {
      socket.json({action:'ping',msg:'Hello'})
    })
  }
}
</script>

<style lang="less">
#app {
  text-align: center;
  color     : #2c3e50;
  margin-top: 60px;
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
