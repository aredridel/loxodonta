const dbP = require('../../db')()
const context = require('../../context')
const selfurl = require('selfurl')
const { send } = require('micro')

module.exports = async (req, res) => {
    const db = await dbP

    const obj = await db.jsonld.get(selfurl(req), context)
    if (obj) {
        return obj
    } else {
        send(res, 404, "Not Found")
    }
}
