const parseAcct = require('./parseAcct')
const typedId = require('./typedId')

const types = new Set(['post', 'user', 'followers'])

module.exports = async function urlFor(acct, type) {
    if (!types.get(type)) throw new Error(`Unsupported type "${type}"`)

    const { user, host } = parseAcct(acct)

    if (type == 'user') {
        return `https://${host}/@${user}`
    } else if (type == 'followers') {
        return `https://${host}/@${user}/followers`
    } else {
        return `https://${host}/@${user}/${await typedId.generate('post')}`
    }
}

