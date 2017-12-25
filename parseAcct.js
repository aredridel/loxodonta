module.exports = function (acct) {
    const m = /^@?([^@]+)@(.*)$/.exec(acct)
    if (m) {
        const [, user, host] = m
        return { user, host }
    } else {
        return null
    }
}
