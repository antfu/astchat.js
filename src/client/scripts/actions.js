export default class Actions {
  constructor(actions, base) {
    this.actions = {}
    for (let key in actions)
    {
      let value = actions[key]
      if (typeof value === "function")
        value = [value]
      this.actions[key] = value
    }
    this.base = base || {}
  }

  add_actions(name, func) {
    this.actions[name] = this.actions[name] || []
    this.actions[name].push(func)
  }

  remove_actions(name, func) {
    if (!func)
      this.actions[name] = []
    else {
      let index = this.actions[name].indexOf(func)
      if (index != -1)
        this.actions[name].splice(index, 1);
    }
  }

  onmessage(message) {
    if (typeof message === 'string')
      message = JSON.parse(message)
    let action = message.__action || '__else'
    for (let f of (this.actions[action]||[])) {
      try {
        f(message)
      } catch (err) {
        console.error(err)
      }
    }
  }

  make(message, action) {
    let result = {
      __action: action,
      __time: new Date().getTime()
    }
    for (let key in this.base)
    {
      let value = this.base[key]
      if (typeof value === "function")
        value = value()
      if (value)
        result[key] = value
    }
    for (let key in message)
    {
      let value = message[key]
      if (value)
        result[key] = value
    }
    return result
  }
}
