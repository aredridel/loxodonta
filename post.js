const dbP = require('./db')()

module.exports = async function (acct, content, summary) {
    const db = await dbP

    const post = {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Note",
        summary,
        content,
    }
}
