const dbP = require('./db')()
const context = require('./context')
const selfurl = require('selfurl')
const { send } = require('micro')
const bole = require('bole')(__filename)

module.exports = async (req, res) => {
    const db = await dbP

    const url = selfurl(req)

    bole({url})

    const obj = await db.jsonld.get(url, context)
    if (obj) {
        return obj
    } else {
        send(res, 404, "Not Found")
    }
}
