const dbP = require('./db')()
const context = require('./context')
const parseAcct = require('./parseAcct')
const typedId = require('./typedId')

module.exports = async function (acct, content, summary) {
    const db = await dbP

    const post = {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Note",
        id: await urlFor(acct, 'post'),
        summary,
        content,
    }

    await db.jsonld.put(post, context)

    return post.id
}

function urlFor(acct, type) {
    if (type != 'post') throw new Error(`Unsupported type "${type}"`)

    const { user, host } = parseAcct(acct)

    return `//${host}/@${user}/${typedId.generate('post')}`
}
