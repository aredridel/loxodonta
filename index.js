require('dotenv').config()
const burpl = require('burpl')
const {promisify} = require('util')
const listen = promisify(require('unix-listen'))
const addUser = require('./addUser')
const post = require('./post')
const sparqlQuery = require('./sparqlQuery')
const asTable = require('as-table')

const config = require('./config')
const dbP = require('./db')({
  config
})

const dispatch = require('micro-route/dispatch')

module.exports = dispatch()
  .dispatch('/feeds/:user', ['GET'], require('./routes/feeds/:user.js'))
  .dispatch('/salmon/:user', ['GET', 'POST'], require('./routes/salmon/:user.js'))
  .dispatch('/.well-known/webfinger', ['GET'], require('./webfinger.js'))
  .dispatch('/.well-known/host-meta', ['GET'], require('./host-meta.js'))
  .otherwise(require('./objectFromDb'))

const repl = burpl({
  "die": () => process.exit(0),
  "sparql QUERY": async (query) => {
    return asTable(await sparqlQuery(await dbP, query))
  },
  "show users": async () => {
    const db = await dbP
    return (await db.search([{
      subject: db.v('account'),
      predicate: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
      object: 'https://github.com/aredridel/loxodonta/Account'
    }])).map(e => e.account).join('\n')
  },
  "user NAME host HOST password PASSWORD": addUser,
  "acct ACCT post POST": post,
  "acct ACCT post POST cn NOTE": post,
})

listen(repl, process.env.ADMINSOCKET || 'admin.sock')
