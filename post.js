const dbP = require('./db')()
const context = require('./context')
const parseAcct = require('./parseAcct')
const typedId = require('./typedId')
const tag = require('tag-uri')
const config = require('./config')
const iso = require('iso8601-convert')

module.exports = async function (acct, content, summary) {
    const db = await dbP
    const id = await urlFor(acct, 'post')
    const date = iso.fromDate(Date.now())

    const post = {
        "@context": context,
        "type": "Create",
        id: id + '/activity',
        "actor": "https://mizar.nbtsc.org/users/aredridel",
        "published": date,
        "to": [
            "https://www.w3.org/ns/activitystreams#Public"
        ],
        "cc": [
            "https://mizar.nbtsc.org/users/aredridel/followers"
        ],
        "object": {
            summary,
            content,
            "inReplyTo": null,
            id,
            "type": "Note",
            "published": date,
            "url": id,
            "attributedTo": "https://mizar.nbtsc.org/users/aredridel",
            "to": [
                "https://www.w3.org/ns/activitystreams#Public"
            ],
            "cc": [
                "https://mizar.nbtsc.org/users/aredridel/followers"
            ],
            "sensitive": false,
            "inReplyToAtomUri": null,
            "conversation": tag(`https://${config.HOST}/${id}/conversation`, new Date),
            "attachment": [],
            "tag": []
        }
    }

    await db.jsonld.put(post, context)

    return post.id
}

async function urlFor(acct, type) {
    if (type != 'post') throw new Error(`Unsupported type "${type}"`)

    const { user, host } = parseAcct(acct)

    return `https://${host}/@${user}/${await typedId.generate('post')}`
}
