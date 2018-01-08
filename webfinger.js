const url = require('url')
const dbP = require('./db')()
const urlFor = require('./urlFor')
const parseAcct = require('./parseAcct')
const context = require('./context')

const query = require('micro-query')

module.exports = async (req, res) => {
    const db = await dbP
    const q = query(req)
    if (!q.resource) throw new Error("Bad input: supply resource")
    const resource = url.parse(q.resource)

    const user = await db.jsonld.get(q.resource, {'@context': "https://www.w3.org/ns/activitystreams" })

    if (!user) {
        throw Object.assign(new Error("user not found"), {statusCode: 404})
    }

    const person = await db.jsonld.get(user['https://github.com/aredridel/loxodonta/url'], {'@context': "https://www.w3.org/ns/activitystreams" })

    if (!person) {
        throw Object.assign(new Error("account has no associated actor"), {statusCode: 500})
    }

    res.setHeader('Content-Type', 'application/jrd+json; charset=UTF-8')

    return {
        subject: user.id,
        alias: person.id,
        links: [
            { rel: "http://webfinger.net/rel/profile-page", type: "text/html", href: `https://${resource.host}/@${person.preferredUsername}` },
            { rel: "http://schemas.google.com/g/2010#updates-from", type: "application/atom+xml", href: `https://${resource.host}/feeds/${person.preferredUsername}` },
            { rel: "self", type: "application/activity+json", href: await urlFor(q.resource, 'user') },
            { rel: "salmon", href: `https://${resource.host}/salmon/${person.preferredUsername}` },
            { rel: "magic-public-key", href: `data:application/magic-public-key,${person.publicKey}` },
            { rel: "http://ostatus.org/schema/1.0/subscribe", template: `https://${resource.host}/authorize_follow?acct={uri}` }
        ]
    }
}
