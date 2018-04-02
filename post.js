const dbP = require('./db')()
const context = require('./context')
const tag = require('tag-uri')
const config = require('./config')
const iso = require('iso8601-convert')
const urlFor = require('./bits/urlFor')
const bole = require('bole')(__filename)

module.exports = async function (acct, content, summary, inReplyTo) {
    const db = await dbP
    const id = await urlFor(acct, 'post')

    bole({id})

    const date = iso.fromDate(Date.now())
    const inRe = inReplyTo ? await db.jsonld.get(inReplyTo) : null

    const post = {
        "@context": context,
        "type": "Create",
        id: id + '/activity',
        "actor": urlFor(acct, 'user'),
        "published": date,
        "to": [
            "https://www.w3.org/ns/activitystreams#Public"
        ],
        "cc": [
            urlFor(acct, 'followers')
        ],
        "object": {
            summary,
            content,
            inReplyTo,
            id,
            "type": "Note",
            "published": date,
            "url": id,
            "attributedTo": urlFor(acct, 'user'),
            "to": [
                "https://www.w3.org/ns/activitystreams#Public"
            ],
            "cc": [
                urlFor(acct, 'followers')
            ],
            "sensitive": false,
            "conversation": inRe ? inRe.conversation : tag(`https://${config.HOST}/${id}/conversation`, new Date),
            "attachment": [],
            "tag": []
        }
    }

    await db.jsonld.put(post, context)

    return post.id
}
