export default class Socket {
  constructor(url) {
    this.url = url || 'ws://' + location.host + location.pathname
    this.socket = new WebSocket(this.url)
    this.onfuncs = {}
    this.socket.onopen = e => { this.call_on('open', e) }
    this.socket.onerror = e => { this.call_on('error', e) }
    this.socket.onclose = e => { this.call_on('close', e) }
    this.socket.onmessage = e => {
      this.call_on('message', e)
      try {
        let json_obj = JSON.parse(e.data)
        this.call_on('json',json_obj)
      } catch (err) {
        console.error(err)
      }
    }
  }

  on(type, func) {
    this.onfuncs[type] = this.onfuncs[type] || []
    this.onfuncs[type].push(func)
    return this
  }

  call_on(type, e) {
    let funcs = this.onfuncs[type] || []
    for (var f of funcs)
      try {
        f(e)
      } catch (err) {
        console.error(err)
      }
  }

  send(e) {
    this.socket.send(e)
  }

  json(obj) {
    this.send(JSON.stringify(obj))
  }

  close(code, reason) {
    this.socket.close.apply(code, reason)
  }
}
