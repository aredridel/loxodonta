const pmap = require('map-p')
const ts = require('internet-timestamp')
const { as2feed2atom } = require('./bits/as2')
const config = require('./config')
const dbP = require('./db')()

module.exports = async (req, res) => {
    const db = await dbP
    const user = await db.jsonld.get(`acct:${req.params.user}@${req.headers.host}`, { '@context': "https://www.w3.org/ns/activitystreams"})
    const userEntries = await db.search([
	{
	    subject: db.v('id'),
	    predicate: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
	    object: 'https://www.w3.org/ns/activitystreams#Object'
	},
	{
	    subject: db.v('id'),
	    predicate: 'https://www.w3.org/ns/activitystreams#Actor',
	    object: user['https://github.com/aredridel/loxodonta/url']
	}
    ])

    const entryIDs = userEntries.map(e => e.id)

    const entries = (await pmap(entryIDs, id => db.jsonld.get(id, { '@context': "https://www.w3.org/ns/activitystreams"}).catch(err => {
	if (err.name != 'NotFoundError') throw err
    }))).filter(e => !!e)

    console.warn('entries', entries, 'user', user)

    const actor = toActor(user['https://github.com/aredridel/loxodonta/url'])

    console.warn('actor', actor)

    const updated = entries.reduce((a, e) => {
	const stamp = e.updated ? e.updated : e.published
	return stamp > a ? stamp : a
    }, "0")

    const as2 = {
	updated,
	actor,
	items: entries.map(e => ({
	    id: e.localid,
	    updated: e.updated || null,
	    published: e.published || ts(new Date()),
	    title: e.title,
	    content: e.content,
	    actor: toActor(e.author) || actor
	}))
    }

    res.setHeader('Content-Type', 'application/atom+xml; charset=utf-8')
    res.setHeader('Cache-Control', 'max-age=0, private, must-revalidate')

    return as2feed2atom(as2, { host: config.HOST, hub: config.hub }).toString()
}
/*

    server.get('/users/:user/updates/:id.atom', promiseHandler((req, res) => {
        const user = db.accounts.get(req.params.user)

		const entry = Promise.all([db.posts.get(req.params.id), user]).then(([post, user]) => {
		    if (post.author != user.username) throw new Error(`post-user mismatch: ${post.author} ${user.username}`)
		    return post
		})

		const as2 = Promise.all([entry, user]).then(([post, user]) => {
		    return {
			id: post.localid,
			updated: post.updated || post.published || ts(new Date()),
			published: post.published || ts(new Date()),
			title: post.title,
			content: post.content,
			actor: toActor(post.author) || toActor(user.username)
		    }
		})

        return as2.then(as2 => {
            res.setHeader('Content-Type', 'application/atom+xml; charset=utf-8')
            res.setHeader('Cache-Control', 'max-age=0, private, must-revalidate')
            return as2entry2atom(as2, { host: config.HOST, hub: config.hub }).toString()
        })
		
	}))
}
*/

function toActor(username) {
    return {
        objectType: 'person',
        id: username
    }
}
