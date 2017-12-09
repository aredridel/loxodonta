require('dotenv').config()
const burpl = require('burpl');
const {promisify} = require('util')
const listen = promisify(require('unix-listen'))
const url = require('url')

const config = require('./config');
const dbP = require('./db')({
  config
});
const App = require('./app');

const match = require('fs-router')(__dirname + '/routes')
const {send} = require('micro')

const scrypt = require('scrypt')

module.exports = async function(req, res) {
  let matched = match(req)
  if (matched) return await matched(req, res)
  send(res, 404, {
    error: 'Not found'
  })
}

const repl = burpl({
  "die": () => process.exit(0),
  "show users": async () => {
    const db = await dbP
    return (await db.search([{
      subject: db.v('account'),
      predicate: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
      object: 'https://github.com/aredridel/loxodonta/Account'
    }])).map(e => e.account).join('\n')
  },
  "user NAME host HOST password PASSWORD": addUser
})

listen(repl, process.env.ADMINSOCKET || 'admin.sock')

return

const app = new App({
  server,
  config,
  db
});
const ctx = {
  server,
  config,
  db,
  app
};

require('./handlers/atom')(ctx);
require('./handlers/salmon')(ctx);
require('./handlers/pubsubhubbub')(ctx);

server.listen(process.env.PORT || 8014);
