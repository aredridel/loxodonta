const collect = require('stream-collector-p');
const pmap = require('map-p');
const promiseHandler = require('../bits/promise-handler');
const ts = require('internet-timestamp');
const { as2feed2atom } = require('../bits/as2');

module.exports = function ({server, config, db}) {
    server.get('/users/:user.atom', promiseHandler((req, res) => {
        const user = db.accounts.get(req.params.user)
        const entryIDs = user.then(user => collect(db.timelines.forUser(user.username).createValueStream({reverse: true, limit: 100})));
        const entries = entryIDs.then(ids => pmap(ids, id => db.posts.get(id).then(e => Object.assign({id}, e)).catch(err => {
                if (err.name != 'NotFoundError') throw err;
            })))

        return Promise.all([user, entries]).then(([user, entries]) => {
            const actor = toActor(user.username);
            
            function toActor(username) {
                return {
                    objectType: 'person',
                    id: username
                };
            }
            const as2 = {
                updated: ts(new Date()),
                actor,
                items: entries.map(e => ({
                    id: e.localid,
                    updated: ts(new Date()),
                    published: ts(new Date()),
                    title: e.title,
                    content: e.content,
                    actor: toActor(e.author) || actor
                }))
            }
            res.setHeader('Content-Type', 'application/atom+xml; charset=utf-8');
            return as2feed2atom(as2, { host: config.HOST }).toString();
        });
    }));
};
