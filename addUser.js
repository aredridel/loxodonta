const dbP = require('./db')()
const magicSig = require('magic-signatures')
const url = require('url')
const scrypt = require('scrypt')
const context = require('./context')

module.exports = async (user, host, password) => {
  const base = `https://${host}/@${user}/`

  const db = await dbP

  const key = await magicSig.generate(2048)

  await db.jsonld.put({
    "@context": context,
    "type": "Person",
    "id": base,
    "preferredUsername": user,
    "inbox": url.resolve(base, 'inbox/'),
    "publicKey": key.public_key,
    "outbox": url.resolve(base, 'outbox/'),
    "followers": url.resolve(base, 'followers/'),
    "following": url.resolve(base, 'following/'),
    "liked": url.resolve(base, 'liked/')
  })


  await db.jsonld.put({
    "@context": context,
    "@id": `acct:${user}@${host}`,
    "@type": "https://github.com/aredridel/loxodonta/Account",
    "privateKey": key.private_key,
    "https://github.com/aredridel/loxodonta/passwordScrypt": await scrypt.kdf(password, await scrypt.params(0.2)),
    "https://github.com/aredridel/loxodonta/url": base
  })

  return `Added @${user}@${host} and setting password`
}
