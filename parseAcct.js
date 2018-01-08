module.exports = function (acct) {
    if (typeof acct == 'object') return acct

    const m = /^(?:@|acct:)?([^@]+)@(.*)$/.exec(acct)
    if (m) {
        const [, user, host] = m
        return { user, host }
    } else {
        return null
    }
}
