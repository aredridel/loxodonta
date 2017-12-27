const crypto = require('crypto')

module.exports = {
  generate: function (type) {
    const b = crypto.randomBytes(16)
    const id = [0, 1, 2, 3].map(p => b.readUInt32LE(p << 2).toString(36)).join('').toUpperCase()
    return `${type}-${id}`
  },
  parse: function(input) {
    const m = /^([^-]+)-([A-Z0-9]+)$/.exec(input)
    if (m) {
      const [, type, id] = Array.from(m)
      return { type, id }
    } else {
      return null
    }
  }
}
