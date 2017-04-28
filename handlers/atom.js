const collect = require('stream-collector-p');
const pmap = require('map-p');
const promiseHandler = require('../bits/promise-handler');
const ts = require('internet-timestamp');
const { as2feed2atom, as2entry2atom } = require('../bits/as2');

module.exports = function ({server, config, db}) {
    server.get('/users/:user.atom', promiseHandler((req, res) => {
        const user = db.accounts.get(req.params.user)
        const entryIDs = user.then(user => collect(db.postsByAuthor.forUser(user.username).createValueStream({reverse: true, limit: 100})));
        const entries = entryIDs.then(ids => pmap(ids, id => db.posts.get(id).catch(err => {
                if (err.name != 'NotFoundError') throw err;
            })))

        return Promise.all([user, entries]).then(([user, entries]) => {
            const actor = toActor(user.username);

	    entries = entries.filter(e => !!e);

	    const updated = entries.reduce((a, e) => {
		const stamp = e.updated ? e.updated : e.published;
		return stamp > a ? stamp : a;
	    }, "0");

	    console.warn(updated);

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

            res.setHeader('Content-Type', 'application/atom+xml; charset=utf-8');
            res.setHeader('Cache-Control', 'max-age=0, private, must-revalidate');
            return as2feed2atom(as2, { host: config.HOST, hub: config.hub }).toString();
        });
    }));

    server.get('/users/:user/updates/:id.atom', promiseHandler((req, res) => {
        const user = db.accounts.get(req.params.user);

		const entry = Promise.all([db.posts.get(req.params.id), user]).then(([post, user]) => {
		    if (post.author != user.username) throw new Error(`post-user mismatch: ${post.author} ${user.username}`);
		    return post;
		});

		const as2 = Promise.all([entry, user]).then(([post, user]) => {
		    return {
			id: post.localid,
			updated: post.updated || post.published || ts(new Date()),
			published: post.published || ts(new Date()),
			title: post.title,
			content: post.content,
			actor: toActor(post.author) || toActor(user.username)
		    };
		});

        return as2.then(as2 => {
            res.setHeader('Content-Type', 'application/atom+xml; charset=utf-8');
            res.setHeader('Cache-Control', 'max-age=0, private, must-revalidate');
            return as2entry2atom(as2, { host: config.HOST, hub: config.hub }).toString();
        });
		
	}));
};

function toActor(username) {
    return {
        objectType: 'person',
        id: username
    };
}
