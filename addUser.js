const dbP = require('./db')()

module.exports = async (user, host, password) => {
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
