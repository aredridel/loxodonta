const xrd = require('../../xrd-schema')
const XMLSchema = require('xml-schema')
const xrdSchema = new XMLSchema(xrd.xrd)
const config = require('../../config')
const { send } = require('micro')

module.exports = async (req, res) => {
    res.setHeader('Content-Type', 'application/xrd+xml; charset=UTF-8')
    return xrdSchema.generate({
        "xmlns:hm": "http://host-meta.net/xrd/1.0",
        links: [
            { rel: "lrdd", type: "application/xrd+xml", template: `https://${config.HOST}/.well-known/webfinger?resource={uri}` }
        ]
    })
}

