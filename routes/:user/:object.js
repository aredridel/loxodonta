const dbP = require('../../db')()
const context = require('../../context')
const selfurl = require('selfurl')

module.exports = async (req) => {
    const db = await dbP

    return db.jsonld.get(selfurl(req), context)
}
