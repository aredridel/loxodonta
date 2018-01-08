const tap = require('estap')
const test = tap()

const parseAcct = require('./parseAcct')

test(t => {
    t.same(parseAcct('acct:test@test'), { user: 'test', host: 'test'})
    t.same(parseAcct('@test@test'), { user: 'test', host: 'test'})
    t.same(parseAcct('test@test'), { user: 'test', host: 'test'})
    t.same(parseAcct('test'), null)
})
