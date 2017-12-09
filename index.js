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
  "user NAME host HOST password PASSWORD": async (user, host, password) => {
    const base = `https://${host}/@${user}/`

    const db = await dbP

    await db.jsonld.put({
      "@context": "https://www.w3.org/ns/activitystreams",
      "type": "Person",
      "id": base,
      "preferredUsername": user,
      "inbox": url.resolve(base, 'inbox/'),
      "outbox": url.resolve(base, 'outbox/'),
      "followers": url.resolve(base, 'followers/'),
      "following": url.resolve(base, 'following/'),
      "liked": url.resolve(base, 'liked/')
    })


    await db.jsonld.put({
      "@id": `acct:${user}@${host}`,
      "@type": "https://github.com/aredridel/loxodonta/Account",
      "https://github.com/aredridel/loxodonta/passwordScrypt": await scrypt.kdf(password, await scrypt.params(0.2)),
      "https://github.com/aredridel/loxodonta/url": base
    })

    return `Added @${user}@${host} and setting password`
  }
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
