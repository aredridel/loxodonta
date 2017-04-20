const atom = require('../atom-schema');
const XMLSchema = require('xml-schema');
const promiseHandler = require('../bits/promise-handler');
const collect = require('stream-collector-p');
const pmap = require('map-p');

const atomSchema = new XMLSchema(atom.feed);

module.exports = function ({server, config, db}) {
    server.get('/users/:user.atom', promiseHandler((req, res) => {
        const user = db.accounts.get(req.params.user)
        const entryIDs = user.then(user => collect(db.timelines.forUser(user.username).createValueStream({reverse: true, limit: 100})));
        const entries = entryIDs.then(ids => pmap(ids, e => db.posts.get(e).catch(err => {
                if (err.name != 'NotFoundError') throw err;
            })))

        return Promise.all([user, entries]).then(([user, entries]) => {
            console.warn(entries);
            res.setHeader('Content-Type', 'application/atom+xml; charset=utf-8');
            return atomSchema.generate({
                "xmlns:thr": "http://purl.org/syndication/thread/1.0",
                "xmlns:activity": "http://activitystrea.ms/spec/1.0/",
                "xmlns:poco": "http://portablecontacts.net/spec/1.0",
                "xmlns:media": "http://purl.org/syndication/atommedia",
                "xmlns:ostatus": "http://ostatus.org/schema/1.0",
                "xmlns:mastodon": "http://mastodon.social/schema/1.0",
                id: `https://${config.HOST}/users/${user.username}.atom`,
                title: "WIP",
                updated: Date.now(),
                links: [
                    { rel: "alternate", type: "text/html", href: `https://${config.HOST}/@${user.username}` },
                    { rel: "self", type: "application/atom+xml", href: `https://${config.HOST}/users/${user.username}.atom` },
                    { rel: "hub", href: `https://pubsubhubbub.appspot.com/` },
                    { rel: "salmon", href: `https://${config.HOST}/api/salmon/${user.username}` },
                ],
                logo: "https://files.mastodon.social/accounts/avatars/000/019/483/original/media.png?1483649818",
                author: {
                    id: `https://${config.HOST}/users/${user.username}`,
                    "activity:object-type": "http://activitystrea.ms/schema/1.0/person",
                    uri: `https://${config.HOST}/users/${user.username}`,
                    name: user.username,
                    email: `${user.username}@${config.HOST}`,
                    links: [
                        { rel: "alternate", type: "text/html", href: `https://${config.HOST}/@${user.username}` },
                        { rel: "avatar", type: "image/png", "media:width": "120",  "media:height": "120", "href": "https://files.mastodon.social/accounts/avatars/000/019/483/original/media.png?1483649818" },
                        { rel: "header", type: "", "media:width": "700", "media:height": "335", "href": "/headers/original/missing.png" }
                    ],
                    "poco:preferredUsername": req.params.username,
                    "poco:displayName": "WIP",
                    "mastodon:scope": "public"
                },
                entries
            });
        });
    }));
};
