require('dotenv').config()
const burpl = require('burpl');
const { promisify } = require('util')
const listen = promisify(require('unix-listen'))

const config = require('./config');
const db = require('./db')({config});
const App = require('./app');

const match = require('fs-router')(__dirname + '/routes')
const { send } = require('micro')

module.exports = async function(req, res) {
  let matched = match(req)
  if (matched) return await matched(req, res)
  send(res, 404, { error: 'Not found' })
}

const repl = burpl({
  die: () => process.exit(0)
})

listen(repl, process.env.ADMINSOCKET || 'admin.sock')

return

const app = new App({ server, config, db });
const ctx = { server, config, db, app };

require('./handlers/atom')(ctx);
require('./handlers/salmon')(ctx);
require('./handlers/pubsubhubbub')(ctx);

server.listen(process.env.PORT || 8014);
