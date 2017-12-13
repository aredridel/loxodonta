const xml = require('../../parseXML')
module.exports = async (req, res) => {

    const x = await xml(req)
    console.warn('WOMP', x)
}
