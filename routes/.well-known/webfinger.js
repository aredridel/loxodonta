const url = require('url')
const xrd = require('../../xrd-schema')
const XMLSchema = require('xml-schema')
const dbP = require('../../db')()

const xrdSchema = new XMLSchema(xrd.xrd)
const query = require('micro-query')

module.exports = async (req, res) => {
    const db = await dbP
    const q = query(req)
    if (!q.resource) throw new Error("Bad input: supply resource")
    const resource = url.parse(q.resource)

    const user = await db.jsonld.get(q.resource, {'@context': "https://www.w3.org/ns/activitystreams" })
    console.warn(q.resource, user)

    if (!user) {
        throw Object.assign(new Error("user not found"), {statusCode: 404})
    }

    const person = await db.jsonld.get(user['https://github.com/aredridel/loxodonta/url'], {'@context': "https://www.w3.org/ns/activitystreams" })

    if (!person) {
        throw Object.assign(new Error("account has no associated actor"), {statusCode: 500})
    }

    console.warn(person)

    res.setHeader('Content-Type', 'application/xrd+xml; charset=UTF-8')

    return xrdSchema.generate({
        subject: user.id,
        alias: person.id,
        links: [
            { rel: "http://webfinger.net/rel/profile-page", type: "text/html", href: `https://${resource.host}/@${person.preferredUsername}` },
            { rel: "http://schemas.google.com/g/2010#updates-from", type: "application/atom+xml", href: `https://${resource.host}/feeds/${person.preferredUsername}` },
            { rel: "salmon", href: `https://${resource.host}/salmon/${person.preferredUsername}` },
            { rel: "magic-public-key", href: `data:application/magic-public-key,${person['https://github.comm/aredridel/loxodonta/public_key']}` },
            { rel: "http://ostatus.org/schema/1.0/subscribe", template: `https://${resource.host}/authorize_follow?acct={uri}` }
        ]
    })

}
