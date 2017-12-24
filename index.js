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

const match = require('fs-router')(__dirname + '/routes')
const {send} = require('micro')

module.exports = async function(req, res) {
  let matched = match(req)
  if (matched) return await matched(req, res)
  send(res, 404, {
    error: 'Not found'
  })
}

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
